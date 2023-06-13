import connect from 'database/connect'
import Users from 'database/schemas/users'
import Units from 'database/schemas/units'
import Payments from 'database/schemas/payments'
import Receipts from 'database/schemas/receipt'
import Soas from 'database/schemas/soas'

export default async (req, res) => {
    const { method } = req
    await connect()

    switch (method) {
        case 'GET':
            try {
                const data = await Payments.find({}).sort({ createdAt: -1 })
                res.status(200).send(data)
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        case 'POST':
            try {
                const { data } = req.body
                const unit = await Units.findById({ _id: data.unit })

                if (data.method === 'Advance') {
                    await Units.findByIdAndUpdate(
                        { _id: data.unit },
                        {
                            tenant: {
                                user: unit.tenant.user,
                                advance: unit.tenant.advance - 1,
                                deposit: unit.tenant.deposit,
                                status: true
                            },
                            updated: new Date().toLocaleString('en-US', {
                                timeZone: 'Asia/Manila'
                            })
                        }
                    )
                }

                if (data.method === 'Deposit') {
                    await Units.findByIdAndUpdate(
                        { _id: data.unit },
                        {
                            tenant: {
                                user: unit.tenant.user,
                                advance: unit.tenant.advance,
                                deposit: Math.abs(
                                    Number(unit.tenant.deposit) -
                                        Number(data.total)
                                ),
                                status: true
                            },
                            updated: new Date().toLocaleString('en-US', {
                                timeZone: 'Asia/Manila'
                            })
                        }
                    )
                }

                await Soas.findByIdAndUpdate(
                    { _id: data.soa._id },
                    {
                        payed: true,
                        updated: new Date().toLocaleString('en-US', {
                            timeZone: 'Asia/Manila'
                        })
                    }
                )

                const payment = await Payments.create({
                    user: data.user,
                    unit: data.unit,
                    soa: data.soa._id,
                    type: data.type,
                    total: data.total,
                    cash: data.cash,
                    change: data.change,
                    method: data.method,
                    proof: data.proof,
                    data: data,
                    created: new Date().toLocaleString('en-US', {
                        timeZone: 'Asia/Manila'
                    }),
                    updated: new Date().toLocaleString('en-US', {
                        timeZone: 'Asia/Manila'
                    })
                })

                await Receipts.create({
                    user: data.user,
                    unit: data.unit,
                    payment: payment._id,
                    total: data.total,
                    cash: data.cash,
                    change: data.change,
                    data: data,
                    created: new Date().toLocaleString('en-US', {
                        timeZone: 'Asia/Manila'
                    }),
                    updated: new Date().toLocaleString('en-US', {
                        timeZone: 'Asia/Manila'
                    })
                })

                if (data.method === 'Advance' || data.method === 'Deposit') {
                    await Payments.findByIdAndUpdate(
                        { _id: payment._id },
                        { status: 'Accepted' }
                    )
                }

                res.status(200).send('request success.')
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        case 'PATCH':
            try {
                const { id, data } = req.body
                console.log(req.body)

                if (data.status === 'Accepted') {
                    if (data.type === 'Rent') {
                        const unit = await Units.findById({ _id: data.unit })

                        await Units.findByIdAndUpdate(
                            { _id: data.unit },
                            {
                                tenant: {
                                    user: unit.tenant.user,
                                    advance: unit.tenant.advance,
                                    deposit: unit.tenant.deposit,
                                    status: true
                                },
                                updated: new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Manila'
                                })
                            }
                        )

                        await Payments.findByIdAndUpdate(
                            { _id: id },
                            {
                                status: 'Accepted',
                                updated: new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Manila'
                                })
                            }
                        )

                        return res.status(200).send('request success.')
                    }

                    if (data.type === 'Reserve') {
                        await Payments.findByIdAndUpdate(
                            { _id: id },
                            {
                                status: 'Accepted',
                                updated: new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Manila'
                                })
                            }
                        )

                        return res.status(200).send('request success.')
                    }

                    if (data.type === 'Soa') {
                        await Payments.findByIdAndUpdate(
                            { _id: id },
                            {
                                status: 'Accepted',
                                updated: new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Manila'
                                })
                            }
                        )

                        return res.status(200).send('request success.')
                    }
                } else {
                    if (data.type === 'Rent') {
                        await Users.findByIdAndUpdate(
                            { _id: data.user },
                            {
                                unit: '',
                                role: 'User',
                                updated: new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Manila'
                                })
                            }
                        )

                        await Units.findByIdAndUpdate(
                            { _id: data.unit },
                            {
                                tenant: {
                                    user: '',
                                    advance: 0,
                                    deposit: '',
                                    status: false
                                },
                                status: 'Vacant',
                                updated: new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Manila'
                                })
                            }
                        )

                        await Payments.findByIdAndUpdate(
                            { _id: id },
                            {
                                status: 'Rejected',
                                updated: new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Manila'
                                })
                            }
                        )

                        return res.status(200).send('request success.')
                    }

                    if (data.type === 'Reserve') {
                        await Users.findByIdAndUpdate(
                            { _id: data.user },
                            {
                                unit: '',
                                role: 'User',
                                updated: new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Manila'
                                })
                            }
                        )

                        await Units.findByIdAndUpdate(
                            { _id: data.unit },
                            {
                                status: 'Vacant',
                                updated: new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Manila'
                                })
                            }
                        )

                        await Payments.findByIdAndUpdate(
                            { _id: id },
                            {
                                status: 'Rejected',
                                updated: new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Manila'
                                })
                            }
                        )

                        return res.status(200).send('request success.')
                    }

                    if (data.type === 'Soa') {
                        // 60%

                        await Payments.findByIdAndUpdate(
                            { _id: id },
                            {
                                status: 'Rejected',
                                updated: new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Manila'
                                })
                            }
                        )

                        return res.status(200).send('request success.')
                    }
                }

                res.status(200).send('request success.')
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        case 'DELETE':
            try {
                res.status(200).send('request success.')
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        default:
            res.status(400).send('request failed.')
            break
    }
}

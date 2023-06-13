import connect from 'database/connect'
import Users from 'database/schemas/users'
import Units from 'database/schemas/units'
import Payments from 'database/schemas/payments'
import Receipts from 'database/schemas/receipt'

export default async (req, res) => {
    await connect()

    try {
        const { data } = req.body

        await Users.findByIdAndUpdate(
            { _id: data.user },
            {
                unit: data.unit,
                name: data.name,
                contact: data.contact,
                company: data.company,
                files: data.files,
                role: 'Tenant',
                updated: new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Manila'
                })
            }
        )

        await Units.findByIdAndUpdate(
            { _id: data.unit },
            {
                tenant: {
                    user: data.user,
                    advance: 0,
                    deposit: 0,
                    status: false
                },
                status: 'Reserved',
                updated: new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Manila'
                })
            }
        )

        const payment = await Payments.create({
            user: data.user,
            unit: data.unit,
            type: data.type,
            cash: data.cash,
            total: data.total,
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

        res.status(200).send('request success.')
    } catch (error) {
        return res.status(400).send('request failed.')
    }
}

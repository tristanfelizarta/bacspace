import connect from 'database/connect'
import Users from 'database/schemas/users'
import Units from 'database/schemas/units'

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
                    status: true
                },
                status: 'Occupied',
                updated: new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Manila'
                })
            }
        )

        res.status(200).send('request success.')
    } catch (error) {
        return res.status(400).send('request failed.')
    }
}

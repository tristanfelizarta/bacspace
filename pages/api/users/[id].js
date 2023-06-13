import connect from 'database/connect'
import Users from 'database/schemas/users'

export default async (req, res) => {
    await connect()

    try {
        const { id } = req.query
        const data = await Users.findById({ _id: id })
        res.status(200).send(data)
    } catch (error) {
        return res.status(400).send('request failed.')
    }
}

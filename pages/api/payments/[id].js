import connect from 'database/connect'
import Payments from 'database/schemas/payments'

export default async (req, res) => {
    await connect()

    try {
        const { id } = req.query
        const data = await Payments.findById({ _id: id })
        res.status(200).send(data)
    } catch (error) {
        return res.status(400).send('request failed.')
    }
}

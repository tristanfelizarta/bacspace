import connect from 'database/connect'
import Receipts from 'database/schemas/receipt'

export default async (req, res) => {
    await connect()

    try {
        const { id } = req.query
        const data = await Receipts.findOne({ payment: id })
        res.status(200).send(data)
    } catch (error) {
        return res.status(400).send('request failed.')
    }
}

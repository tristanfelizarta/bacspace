import { Schema, model, models } from 'mongoose'

const ReceiptSchema = new Schema(
    {
        user: {
            type: String,
            default: ''
        },
        unit: {
            type: String,
            default: ''
        },
        payment: {
            type: String,
            default: ''
        },
        total: {
            type: String,
            default: ''
        },
        cash: {
            type: String,
            default: ''
        },
        change: {
            type: String,
            default: ''
        },
        data: {
            type: Object,
            default: {}
        },
        created: {
            type: String,
            default: ''
        },
        updated: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
)

const Receipts = models.Receipts || model('Receipts', ReceiptSchema)

export default Receipts

import { Schema, model, models } from 'mongoose'

const PaymentSchema = Schema(
    {
        user: {
            type: String,
            default: ''
        },
        unit: {
            type: String,
            default: ''
        },
        soa: {
            type: String,
            default: ''
        },
        type: {
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
        method: {
            type: String,
            default: ''
        },
        proof: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'Processing'
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

const Payments = models.Payments || model('Payments', PaymentSchema)

export default Payments

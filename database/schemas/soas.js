import { Schema, model, models } from 'mongoose'

const SoaSchema = new Schema(
    {
        user: {
            type: String,
            default: ''
        },
        unit: {
            type: String,
            default: ''
        },
        start: {
            type: String,
            default: ''
        },
        due: {
            type: String,
            default: ''
        },
        monthly: {
            type: Number,
            default: 0
        },
        camc: {
            type: String,
            default: ''
        },
        vat: {
            type: String,
            default: ''
        },
        lapses: {
            type: String,
            default: ''
        },
        water: {
            previous: {
                reading: {
                    type: Number,
                    default: 0
                },
                date: {
                    type: String,
                    default: ''
                }
            },
            current: {
                reading: {
                    type: Number,
                    default: 0
                },
                date: {
                    type: String,
                    default: ''
                }
            },
            amount: {
                type: String,
                default: ''
            }
        },
        subtotal: {
            type: String,
            default: ''
        },
        taxes: {
            type: String,
            default: ''
        },
        total: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'Drafted'
        },
        payed: {
            type: Boolean,
            default: false
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

const Soas = models.Soas || model('Soas', SoaSchema)

export default Soas

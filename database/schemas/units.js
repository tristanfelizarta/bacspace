import { Schema, model, models } from 'mongoose'

const UnitSchema = Schema(
    {
        tenant: {
            user: {
                type: String,
                default: ''
            },
            advance: {
                type: Number,
                default: 0
            },
            deposit: {
                type: String,
                default: ''
            },
            status: {
                type: Boolean,
                default: false
            }
        },
        image: {
            type: String,
            default: ''
        },
        number: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: ''
        },
        sqm: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            default: 'Vacant'
        },
        trashed: {
            type: Boolean,
            default: false
        },
        deleted: {
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

const Units = models.Units || model('Units', UnitSchema)

export default Units

import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
    {
        unit: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            default: ''
        },
        company: {
            name: {
                type: String,
                default: ''
            },
            email: {
                type: String,
                default: ''
            }
        },
        files: {
            type: String,
            default: ''
        },
        role: {
            type: String,
            default: 'User'
        },
        status: {
            type: String,
            default: 'Active'
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

const Users = models.Users || model('Users', UserSchema)

export default Users

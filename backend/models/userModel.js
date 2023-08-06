const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, 'Please add an phone number'],
            unique: false,
        },
        title: {
            type: String,
            required: [true, 'Please add an phone number'],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        photo: {
            type: String,
            required: [true, 'Please add a photo'],
        },
        admin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
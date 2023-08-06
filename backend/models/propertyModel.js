const mongoose = require('mongoose')

const propertySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: [true, 'Please add a property title'],
        },
        description: {
            type: String,
            required: [true, 'Please add a property description'],
        },
        reference: {
            type: String,
            required: [true, 'Please add a property reference code'],
        },
        category: {
            type: String,
            required: [true, 'Please select a category'],
            enum: ['Sale', 'Rent']
        },
        type: {
            type: String,
            required: [true, 'Please select property type'],
            enum: ['Apartment/Flat', 'Villa/House', 'Townhouse', 'Penthouse', 'Land',]
        },
        bedrooms: {
            type: Number,
            required: [true, 'Please selected bedrooms'],
            enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        bathrooms: {
            type: Number,
            required: [true, 'Please select bathrooms'],
            enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
        },
        size: {
            type: Number,
            required: [true, 'Please add size'],
        },
        location: {
            type: String,
            required: [true, 'Please add a property location'],
        },
        geolocation: {
            type: Array,
            required: [true, 'Please select location on map'],
        },
        // geolocation: {
        //     type: { type: String },
        //     coordinates: []
        // },
        photos: {
            type: Array
        },
        status: {
            type: String,
            required: [true, 'Please select status'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Property', propertySchema)
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Property = require('../models/propertyModel')


// @desc    get user properties
// @route   GET /api/properties
// @access  Private
const getProperties = asyncHandler(async (req, res) => {

    //const user = await User.findById(req.user.id)
    const user = await User.findOne({ '_id': req.user.id })

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const properties = await Property.find({ user: req.user.id }).sort({ createdAt: -1 })

    res.status(200).json(properties)

})




// @desc    get properties for rent
// @route   GET /api/properties/rent
// @access  Public
const getPropertiesForRent = asyncHandler(async (req, res) => {

    const properties = await Property.find({ "category": "Rent" }).sort({ createdAt: -1 })

    res.status(200).json(properties)

})

// @desc    get properties for Sale
// @route   GET /api/properties/sale
// @access  Public
const getPropertiesForSale = asyncHandler(async (req, res) => {

    const properties = await Property.find({ "category": "Sale" }).sort({ createdAt: -1 })

    res.status(200).json(properties)

})




// @desc    get single listing
// @route   GET /api/properties/:id
// @access  Private
const getProperty = asyncHandler(async (req, res) => {
    const mongoose = require('mongoose')
    const ObjectId = mongoose.Types.ObjectId;
    const listing = await Property.aggregate([
        { $match: { _id: ObjectId(req.params.id) } },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        }
    ])
    res.status(200).json(listing)
})





// @desc    create user properties
// @route   POST /api/properties
// @access  Private
const createProperty = asyncHandler(async (req, res) => {
    const { title, description, reference, category, type, bedrooms, bathrooms, price, size, location, geolocation, status } = req.body
    const files = req.files

    if (files) {
        if (files.length != 0) {
            var photos = []
            for (let file of files) {
                photos.push(file.location)
            }
        }
    }

    if (!title || !description || !reference || !category || !type || !bedrooms || !bathrooms || !price || !size || !location || !status) {
        res.status(400)
        throw new Error('Please add all the fields')
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const listing = await Property.create({
        title,
        description,
        reference,
        category,
        type,
        bedrooms,
        bathrooms,
        price,
        size,
        location,
        geolocation,
        photos,
        status,
        user: req.user.id,
    })

    res.status(201).json(listing)
})


// @desc    Delete listing
// @route   DELETE /api/properties/:id
// @access  Private
const deleteProperty = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const listing = await Property.findById(req.params.id)

    if (!listing) {
        res.status(404)
        throw new Error('Property listing not found')
    }

    if (listing.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    await listing.remove()

    res.status(200).json({ sucess: true })

})


// @desc    Update listing
// @route   PUT /api/properties/:id
// @access  Private
const updateProperty = asyncHandler(async (req, res) => {

    const { title, description, reference, category, type, bedrooms, bathrooms, price, size, location, geolocation, status } = req.body
    const files = req.files

    if (files) {
        if (files.length != 0) {
            var photos = []
            for (let file of files) {
                photos.push(file.location)
            }
        }
    } else {
        var photos = req.body(photos)
    }
    console.log(photos)

    if (!title || !description || !reference || !category || !type || !bedrooms || !bathrooms || !price || !size || !location || !status) {
        res.status(400)
        throw new Error('Please add all the fields')
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const listing = await Property.findById(req.params.id)

    if (!listing) {
        res.status(404)
        throw new Error('Property listing not found')
    }

    if (listing.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id,
        {
            title,
            description,
            reference,
            category,
            type,
            bedrooms,
            bathrooms,
            price,
            size,
            location,
            geolocation,
            photos,
            status,
            user: req.user.id,
        },
        { new: true })

    res.status(200).json(updatedProperty)

})




module.exports =
{
    getProperties,
    getPropertiesForRent,
    getPropertiesForSale,
    getProperty,
    createProperty,
    deleteProperty,
    updateProperty
}
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')





// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, title, password, admin, skey } = req.body

    const photo = req.file?.location

    // Validation
    if (!name || !email || !phone || !title || !photo || !password || !skey) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Validation
    if (skey !== process.env.REGISTRATION_SECRET_KEY) {
        res.status(400)
        throw new Error('Incorrect registration key')
    }

    // Find if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        phone,
        title,
        password: hashedPassword,
        photo,
        admin,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
            title: user.title,
            admin: user.admin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new error('Invalid user data')
    }
})


// @desc    Update current user
// @route   /api/users/me
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
    const { name, email, phone, title } = req.body
    const photo = req.file?.location
    const user = await User.findByIdAndUpdate(req.user.id, {
        name,
        email,
        phone,
        title,
        photo,
    }, { new: true })
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
            title: user.title,
            admin: user.admin,
            token: generateToken(user._id),
        })
    }
})

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ 'email': { '$regex': email, $options: '?-i' } })
    // Check user and passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
            title: user.title,
            admin: user.admin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        phone: req.user.phone,
        title: req.user.title,
        admin: user.admin,
    }
    res.status(200).json(user)
})




// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports =
{
    registerUser,
    loginUser,
    getMe,
    updateMe,
}
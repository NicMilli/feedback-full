const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler( async(req, res) => {
    const { email } = req.body

    //Validation
    if(!email) {
        res.status(400)
        throw new Error('Please provide an email')
    }

    // Find if user already exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Create user
    const user = await User.create({
        email,
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler( async(req, res) => {
    const {email} = req.body

    const user = await User.findOne({email})
// Check user and passwords match
    if (user) {
        res.status(200).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

//Generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
}
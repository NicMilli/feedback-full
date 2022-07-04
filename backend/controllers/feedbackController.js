const asyncHandler = require('express-async-handler')

const Feedback = require('../models/feedbackModel')

// @desc Add feedback 
// @route /api/feedback
// @access public (unless spam is received)
const createFeedback = asyncHandler(async (req, res) => {
    const {id, rating, message} = req.body

    //Validation
    if(!rating || !message) {
        res.status(400)
        throw new Error('Please ensure you include a rating and message')
    }

    // Add feedback
    const feedback = await Feedback.create({
        id,
        rating,
        message,
    })

    if(feedback) {
        res.status(201).json({
            _id: feedback._id,
            rating: feedback.rating,
            message: feedback.message,
        })
    } else {
        res.status(400)
        throw new Error('Unable to upload feedback')
    }
})

module.exports = {
    createFeedback
}
const asyncHandler = require('express-async-handler')

const Feedback = require('../models/feedbackModel')
const User = require('../models/userModel')

// @desc Add feedback 
// @route POST /api/feedback
// @access public (unless spam is received)
const createFeedback = asyncHandler(async (req, res) => {
    const {rating, text} = req.body

    //Validation
    if(!rating || !text) {
        res.status(400)
        throw new Error('Please ensure you include a rating and message')
    }

     // get user with JWT id
     const user = await User.findById(req.user.id)

     if(!user) {
         res.status(401)
         throw new Error('User not found')
     }

    // Add feedback
    const feedback = await Feedback.create({
        rating,
        text,
        user: req.user.id,
    })

    res.status(201).json({feedback})
})

// @desc Get feedbacks
// @route GET /api/feedback/
// @access public (unless spam is received)
const getFeedbacks = asyncHandler(async (req, res) => {

    // Add feedback
    const feedbacks = await Feedback.find()

    if(feedbacks) {
        res.status(201).json(feedbacks)
    } else {
        res.status(404)
        throw new Error('Feedbacks not found')
    }
})

// // @desc Delete a single feedback
// // @route DELETE /api/feedback/:_id
// // @access public (unless spam is received)
// const deleteFeedback = asyncHandler(async (req, res) => {

//     // find feedback
//     const feedback = await Feedback.findById(req.params.id)

//     if(!feedback) {
//         res.status(404)
//         throw new Error('Feedback not found')
//     }

//     // await feedback.remove()
//     // Since there is no auth deletes will be reversible by me
//     await Feedback.findByIdAndUpdate(req.params.id, {deleted: true})

//     res.status(200).json({success: true})
// })

// @desc delete a single feedback, made reversible incase there is good advice/criticism for me to reference (can still edit)
// @route PATCH /api/feedback/:_id
// @access public (unless spam is received)
const deleteFeedback = asyncHandler(async (req, res) => {

    // get user with JWT id
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // find feedback
    const feedback = await Feedback.findById(req.params.id)
    
    if(!feedback) {
        res.status(404)
        throw new Error('Feedback not found')
    }

    if(feedback.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Sorry, you can only delete your own feedback')
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body)

    res.status(200).json({updatedFeedback})
})

// @desc edit a single feedback
// @route PPUT /api/feedback/:_id
// @access public (unless spam is received)
const editFeedback = asyncHandler(async (req, res) => {

    // get user with JWT id
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // find feedback
    const feedback = await Feedback.findById(req.params.id)
    
    if(!feedback) {
        res.status(404)
        throw new Error('Feedback not found')
    }

    if(feedback.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Sorry, you can only edit your own feedback')
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body)

    res.status(200).json(updatedFeedback)
})


// @desc get a single feedback
// @route GET /api/feedback/:_id
// @access public (unless spam is received)
const getFeedback = asyncHandler(async (req, res) => {

    // find feedback
    const feedback = await Feedback.findById(req.params.id)

    if(!feedback) {
        res.status(404)
        throw new Error('Feedback not found')
    }

    res.status(200).json(feedback)
})

module.exports = {
    createFeedback,
    getFeedbacks,
    deleteFeedback,
    editFeedback,
    getFeedback,
}
const express = require('express')
const router = express.Router()
const {createFeedback, getFeedbacks, getFeedback, deleteFeedback, editFeedback} = require('../controllers/feedbackController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, createFeedback).get(getFeedbacks)

router
.route('/:id')
.get(getFeedback)
.patch(protect, deleteFeedback)
.put(protect, editFeedback)

module.exports = router
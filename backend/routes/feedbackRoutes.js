const express = require('express')
const router = express.Router()
const {createFeedback, getFeedbacks, getFeedback, deleteFeedback, editFeedback} = require('../controllers/feedbackController')

router.route('/').post(createFeedback).get(getFeedbacks)

router
.route('/:id')
.get(getFeedback)
.patch(deleteFeedback)
.put(editFeedback)

module.exports = router
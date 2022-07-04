const express = require('express')
const router = express.Router()
const {createFeedback} = require('../controllers/feedbackController')

router.post('/', createFeedback)

module.exports = router
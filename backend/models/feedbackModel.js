const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: [true, 'Please add a rating']
    },
    text: {
        type: String,
        required: [true, 'Please add a feedback message']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Feedback', feedbackSchema)
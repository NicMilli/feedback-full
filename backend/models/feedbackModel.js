const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    rating :{
        type: Number,
        required: [true, 'Please add a rating']
    },
    message :{
        type: String,
        required: [true, 'Please add a feedback message']
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Feedback', feedbackSchema)
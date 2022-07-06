import axios from 'axios'

const API_URL = 'http://localhost:5000/api/feedback/'

//Create new feedback
const createFeedback = async (feedbackData) => {

    const response = await axios.post(API_URL, feedbackData)

    return response.data
}

//Get feedbacks
const getFeedbacks = async () => {

    const response = await axios.get(API_URL)

    return response.data
}

//Edit feedback
const editFeedback = async (id, newText, newRating) => {
    
    const response = await axios.put(
        API_URL + id, 
        {text: newText, rating: newRating}
        )

        return response.data
}

//Delete feedback
const deleteFeedback = async (id) => {

    const response = await axios.patch(
        API_URL + id, 
        {deleted: true}
        )

        return response.data
}


const feedbackService ={
    createFeedback,
    getFeedbacks,
    editFeedback,
    deleteFeedback,
}

export default feedbackService
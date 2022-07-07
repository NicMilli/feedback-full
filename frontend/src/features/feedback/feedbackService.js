import axios from 'axios'

const API_URL = 'http://localhost:5000/api/feedback/'

//Create new feedback
const createFeedback = async (feedback, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, feedback, config)

    return response.data
}

//Get feedbacks
const getFeedbacks = async () => {

    const response = await axios.get(API_URL)

    return response.data
}

//Edit feedback
const editFeedback = async (id, newText, newRating, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(
        API_URL + id, 
        {text: newText, rating: newRating},
        config
        )

        return response.data
}

//Delete feedback
const deleteFeedback = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.patch(
        API_URL + id, 
        {deleted: true},
        config
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
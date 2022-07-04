import { useState } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const {addFeedback, feedbackEdit, updateFeedback, editCancel} = useContext(FeedbackContext)

    useEffect(() => {
        if(feedbackEdit.edit === true){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleTextChange = ({ target: {value} }) => {
       if(value !== '' && value.replace(/\s/g,'').length < 10) {
            setMessage('Please type at least 10 characters')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.replace(/\s/g,'').length >= 10){
            const newFeedback = {
                text,
                rating
            }

            if(feedbackEdit.edit){
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
            addFeedback(newFeedback)
            }

            setText('')
            setRating(10)
            setBtnDisabled(true)
        }
    }

    const handleCancelEdit = () => {
        setText('')
        setRating(10)
        setBtnDisabled(true)
        editCancel(feedbackEdit.item.id)
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>Please leave a rating and any tips for my website and projects!</h2>
        <RatingSelect select={setRating} selected={rating}/>
        <div className='input-group'>
            <input onChange={handleTextChange} 
            type="text" placeholder='Write a review' 
            value={text} />
            <Button type='submit'
            isDisabled={btnDisabled} >Send</Button>
            {feedbackEdit.edit ? (<button className='btn btn-primary' type='button' onClick={handleCancelEdit} >Cancel</button>) : null}
        </div>

        {message ? <div className='message'>{message}</div> : null}
        </form>
    </Card>
  )
}

export default FeedbackForm
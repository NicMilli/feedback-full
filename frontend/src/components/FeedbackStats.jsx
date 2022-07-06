import { useSelector } from "react-redux"

function FeedbackStats() {
  //const { feedback } = useContext(FeedbackContext)
  //Redux:
  const {feedback} = useSelector(state => state.feedback)

// Calculate avg rating
  // let average = feedback.reduce((acc, cur) => {
  //   return acc + cur.rating
  // }, 0) / feedback.length
  let average = 10

  //Regular expression to remove trailing zeros
  average = average.toFixed(1).replace(/[.,]0$/, '')


  return (
    <div className='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

export default FeedbackStats
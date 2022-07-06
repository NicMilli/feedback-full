import { useSelector } from "react-redux"

function FeedbackStats() {
  //const { feedback } = useContext(FeedbackContext)
  //Redux:
  const {feedbacks} = useSelector(state => state.feedback)
  
  
    const activeFeedbacks = feedbacks.filter(function (n) { 
       return (n.deleted !== true )})

// Calculate avg rating
  let average = activeFeedbacks.reduce((acc, cur) => {
    return acc + cur.rating
  }, 0) / activeFeedbacks.length

  //Regular expression to remove trailing zeros
  average = average.toFixed(1).replace(/[.,]0$/, '')


  return (
    <div className='feedback-stats'>
        <h4>{activeFeedbacks.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

export default FeedbackStats
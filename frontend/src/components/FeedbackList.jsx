import {motion, AnimatePresence} from 'framer-motion'
import FeedbackItem from "./FeedbackItem"
import Spinner from './shared/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedbacks } from '../features/feedback/feedbackSlice'
import { useEffect } from 'react'
import { toast } from "react-toastify"

function FeedbackList() {
  //const {feedback, isLoading} = useContext(FeedbackContext)
  //Redux state:
  const {feedbacks, isLoading, isError, feedback, status} = useSelector(state => state.feedback)

  const dispatch = useDispatch()

  useEffect(() => {
    if(isError) {
        toast.error(status)
    }

    dispatch(getFeedbacks())
}, [dispatch, isError, status, feedback])

    if(!isLoading && (!feedbacks || feedbacks.length === 0)) {
        return <p>No Feedback Yet</p>
    }

//Adding animation - fade out/in reviews when deleted/added
return isLoading 
  ? (<Spinner/>) 
  : (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedbacks.map((item) => (
          <motion.div 
          key={item._id}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}>
            <FeedbackItem key={item._id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
    )
  }

export default FeedbackList


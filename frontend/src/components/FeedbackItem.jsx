import {FaTimes, FaEdit} from 'react-icons/fa'
import { deleteFeedback } from '../features/feedback/feedbackSlice'
import { useContext } from 'react'
import PropTypes from 'prop-types'
import Card from './shared/Card'
import {useSelector, useDispatch} from 'react-redux'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackItem({item}) {
  const {editFeedback} = useContext(FeedbackContext)
  //Redux:
   // Redux
   const dispatch = useDispatch()

  return (
    <>
    {item.deleted ? null :
    <Card >
       <div className='num-display'>{item.rating}</div>
        <button onClick={() => dispatch(deleteFeedback(item._id))} className="close">
          <FaTimes color='purple'/>
        </button>
        <button onClick={() => editFeedback(item)} className="edit">
          <FaEdit color='purple'/>
        </button>
        <div className='text-display'>{item.text}</div>
    </Card>
    }
    </>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem
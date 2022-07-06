import {createContext, useState} from 'react'
import { useDispatch } from 'react-redux'
import {sendUpdateFeedback} from '../features/feedback/feedbackSlice'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedbackEdit, setFeedbackEdit] = useState({
      item: {},
      edit: false,
    })

    const dispatch = useDispatch()

      //Update feedback
      const updateFeedback = async (id, updItem) => {
        const newText = updItem.text
        const newRating = updItem.rating
         dispatch(sendUpdateFeedback({id, newText, newRating}))
        
          // Fix a bug in course code where the app gets stuck in edit mode
          setFeedbackEdit({   
            item:{},
            edit: false
        })
      }

      //Set item to be edited - changed so that clicking while in edit mode will exit edit mode
      const editFeedback = (item) => {
        // if(feedbackEdit.edit === true){
        //   setFeedbackEdit({
        //     item,
        //     edit: false, 
        //   })
        // } else {
        setFeedbackEdit({
          item,
          edit: true,
        })}
     // }

      //Adding function to handle cancelling an edit
      const editCancel = (itm) => {
        setFeedbackEdit({
          itm,
          edit: false, 
        })
      }
    
    return <FeedbackContext.Provider value={{
        feedbackEdit,
        editFeedback,
        updateFeedback,
        editCancel
        // feedbackEdit is the state and editFeedback is the function updating that piece of state
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext
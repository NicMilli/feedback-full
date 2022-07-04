import {createContext, useState, useEffect} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState ([])
    const [feedbackEdit, setFeedbackEdit] = useState({
      item: {},
      edit: false,
    })

    useEffect(() => {
      fetchFeedback()
    }, [])

    //Fetch feedback from mock backend
    const fetchFeedback = async () => {
      const response = await fetch(`/feedback?_sort=id&_order=desc`)
      const data = await response.json()

      setFeedback(data)
      setIsLoading(false)
    }

    const deleteFeedback = async (id) => {
      setFeedbackEdit({   
        item:id,
        edit: false
    })
        if(window.confirm('Are you sure you want to permanently delete this item')){
          await fetch(`/feedback/${id}`, {method: 'DELETE'})

          setFeedback(feedback.filter((item) => item.id !== id))
        }
      }

      const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newFeedback)
        })

        const data = await response.json()
        
          setFeedback([data, ...feedback])
      }

      //Update feedback
      const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updItem)
        })

        const data = await response.json()
        
        setFeedback(feedback.map((item) => (item.id === id ? data : item)))
        
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
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        editCancel
        // feedbackEdit is the state and editFeedback is the function updating that piece of state
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext
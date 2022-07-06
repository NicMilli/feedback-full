import feedbackService from "./feedbackService";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    feedbacks: [],
    feedback: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    status: '',
    //feedbackEdit: {item: {}, edit: false},
}

// Add feedback to the database
export const addFeedback = createAsyncThunk('feedback/add',
 async(feedback, thunkAPI) => {
   try {
     return feedbackService.createFeedback(feedback)
   } catch (error) {
    const message = (error.response 
        && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()

    return thunkAPI.rejectWithValue(message)
   }
 })

 //Update feedback in the database
 export const sendUpdateFeedback = createAsyncThunk('feedback/edit',
 async({id, newText, newRating}, thunkAPI) => {
    try {
            return await feedbackService.editFeedback(id, newText, newRating)
      } catch (error) {
       const message = (error.response 
           && error.response.data && error.response.data.message) 
           || error.message 
           || error.toString()
   
       return thunkAPI.rejectWithValue(message)
      }
 })

  //Delete feedback in the database
  export const deleteFeedback = createAsyncThunk('feedback/delete',
  async(id, thunkAPI) => {
        try {
            if(window.confirm('Are you sure you want to permanently delete this item')){
                return await feedbackService.deleteFeedback(id)
              }
          } catch (error) {
           const message = (error.response 
               && error.response.data && error.response.data.message) 
               || error.message 
               || error.toString()
       
           return thunkAPI.rejectWithValue(message)
          }
  })

 // Get feedback fromn the database
 export const getFeedbacks = createAsyncThunk('feedback/get',
 async(_, thunkAPI) => {
    try {
        return await feedbackService.getFeedbacks()
    } catch (error) {
        const message = (error.response 
            && error.response.data && error.response.data.message) 
            || error.message 
            || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
 })

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        reset: (state) => initialState,
        // editFeedback: (state, item) =>  {state.feedbackEdit = {
        //     item.payload,
        //     edit: true,
        //   }},
        //   editCancel: (state, item) =>  state.feedbackEdit = {
        //     item,
        //     edit: false,
        //   },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getFeedbacks.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getFeedbacks.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.feedbacks = action.payload
        })
        .addCase(getFeedbacks.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(addFeedback.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addFeedback.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.feedback = action.payload
        })
        .addCase(addFeedback.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteFeedback.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteFeedback.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.feedback = action.payload
        })
        .addCase(deleteFeedback.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(sendUpdateFeedback.pending, (state) => {
            state.isLoading = true
        })
        .addCase(sendUpdateFeedback.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.feedback = action.payload
        })
        .addCase(sendUpdateFeedback.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = feedbackSlice.actions

export default feedbackSlice.reducer
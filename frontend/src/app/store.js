import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from '../features/feedback/feedbackSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    auth: authReducer,
  },
});

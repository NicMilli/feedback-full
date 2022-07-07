import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    status: ''
}

//Register a new user
export const register = createAsyncThunk('auth/register', 
async (user, thunkAPI) =>{
    try {
        return await authService.register(user)
    } catch (error) {
        const status = (error.response 
            && error.response.data && error.response.data.message) 
            || error.message 
            || error.toString()

        return thunkAPI.rejectWithValue(status)
    }
})

//login an existing user
export const login = createAsyncThunk('auth/login', 
async (user, thunkAPI) =>{
    try {
        return await authService.login(user)
    } catch (error) {
        const status = (error.response 
            && error.response.data && error.response.data.message) 
            || error.message 
            || error.toString()

        return thunkAPI.rejectWithValue(status)
    }
})

//Logout
export const logout = createAsyncThunk('auth/logout', 
async() => {
    authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) =>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.status= ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.isError = false
            })
            .addCase(register.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.status = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.isError = false
            })
            .addCase(login.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.status = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions

export default authSlice.reducer
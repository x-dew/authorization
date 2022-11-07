import {createSlice} from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'auth',
    initialState: {
        refresh_token: '',
        refresh_token_expired: '',
        token: '',
    },
    reducers: {
        setAuth: (state, action) => {
            state.token = action.payload.token
            state.refresh_token = action.payload.refresh_token
            state.refresh_token_expired = action.payload.refresh_token_expired

            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('refresh_token_expired', action.payload.refresh_token_expired)
            localStorage.setItem('refresh_token', action.payload.refresh_token)
        },
        clearAuth: (state, action) => {
            state.token = ''
            state.refresh_token = ''
            state.refresh_token_expired = ''

            localStorage.setItem('token', '')
            localStorage.setItem('refresh_token_expired', '')
            localStorage.setItem('refresh_token', '')
        },
        setAuthFromStorage:(state,action)=>{
            state.token = localStorage.getItem('token', '')
            state.refresh_token = localStorage.getItem('refresh_token', '')
            state.refresh_token_expired = localStorage.getItem('refresh_token_expired', 0)
        }
    }
    ,
})

export const {setAuth, clearAuth,setAuthFromStorage} = counterSlice.actions


export default counterSlice.reducer
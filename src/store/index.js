import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import  userDataReduce from './user'

export default configureStore({
    reducer: {
        auth: authReducer,
        user:userDataReduce
    },
})
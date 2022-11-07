import {createSlice} from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'user',
    initialState: {
        login: '',
        name: '',
        id: '',
        status: 0,
        image: null
    },
    reducers: {
        setLogin: (state, action) => {
            state.name = action.payload.name
            state.login = action.payload.login
            state.id = action.payload.id
            state.status = action.payload.status
            state.image = action.payload.image
        }
    }
})

export const {setLogin} = user.actions
export default user.reducer

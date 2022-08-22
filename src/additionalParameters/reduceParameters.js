import React from 'react'

export const departmetns = {
    token:localStorage.getItem('access_token'),
    id:'',
    name:''
}

export const reduceDepart = (state, action) => {
    return {
        ...state,
        [action.payload.name]: action.payload.value
    }
}
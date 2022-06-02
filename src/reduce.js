import React from "react";

export const  signIn = {
    login:'',
    pwd:'devdevdev'
}

export const tokenAdmin = {
    token:'',
}

export const reduce = (state, action) => {
    return {
        ...state,
        [action.payload.name]: action.payload.value
    }
}
import React from "react";

export const  signIn = {
    login:'admin',
    pwd:'admin'
}

export const reduce = (state, action) => {
    return {
        ...state,
        [action.payload.name]: action.payload.value
    }
}

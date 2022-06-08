import React from "react";

export const users = {
    token: localStorage.getItem('access_token'),
    login: "",
    pwd: "",
    name: "",
    role: "user",
    group_id: '',
    department_id: '',
    position_id: '',
    numbers: '',
    emails: ''
}

export const userReduce = (state, action) => {
    return {
        ...state,
        [action.payload.name]: action.payload.value
    }
}


import React from "react";

export const users = {
    token: localStorage.getItem('access_token'),
    login: null,
    pwd: null,
    name: "",
    role: "user",
    group_id: null,
    department_id: null,
    position_id: null,
    numbers: '',
    emails: '',
    sip_pwd:'',
    image:''
}

export const userReduce = (state, action) => {
    return {
        ...state,
        [action.payload.name]: action.payload.value
    }
}


import React from "react";

export const users ={
    token:localStorage.getItem('access_token'),
    login: "",
    pwd: "",
    name: "",
    role: "user",
    group_id: null,
    department_id: null,
    position_id: null,
    numbers:'',
    emails:''
}

export const userReduce =(action,state)=>{
    return{
        ...state,
        [action.payload.name]:action.payload.value
    }
}

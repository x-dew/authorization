import axios from "axios";
import user from "./user"
import department from "./department"
import position from "./position"
import group from "./group"
import login from "./login"

const API = 'http://localhost:8089'

export const http = (method, url, data) => {
    const options = {
        method: method,
        data: {
            ...data,
            token: localStorage.getItem('token')
        },
    }
    return axios.request(`${API}/${url}`, options)
}

export default {
    user,
    department,
    position,
    group,
    login
}
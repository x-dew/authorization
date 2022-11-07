import axios from "axios";
import user from "./user"
import department from "./department"
import position from "./position"
import group from "./group"
import login from "./login"
import store from "../store";
import history from "../utils/history"

const API = 'http://localhost:8089'
export const http = (method, url, data = {}, isAuth = true) => {
    const auth = store.getState().auth
    const options = {
        method: method,
        data: data
    }

    if (isAuth) {
        options.data.token = auth.token
    }
    
    if (isAuthorized() === false) {
        history.push("/logout")
    }

    return axios.request(`${API}/${url}`, options)
}

const isAuthorized = () => {
    const auth = store.getState().auth
    return auth.token !== ''
}

export default {
    user,
    department,
    position,
    group,
    login
}
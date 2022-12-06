import axios from "axios";
import user from "./user"
import department from "./department"
import position from "./position"
import group from "./group"
import login, {debounceRefreshTokens} from "./auth"
import {isAuth as isToken, isTimeLeft, isTokenRefresh} from "../utils/auth";
import history from "../utils/history";

const API = 'http://localhost:8089'

export const http = (method, url, data = {}, isAuth = true) => {

    const instance = axios.create({
        url: `${API}/${url}`,
        method: method,
        data: data
    })

    if (isAuth) {
        instance.interceptors.request.use(request => {
            request.data.token = localStorage.getItem("token")
            if (isToken() === false) {
                history.push('/logout')
                window.location.reload()
            } else if (isTimeLeft() === true && isTokenRefresh() === true) {
                return debounceRefreshTokens().then(() => {
                    request.data.token = localStorage.getItem("token")
                    return request
                }).catch(error => Promise.reject(error))
            } else {
                return request
            }
        })
    }
    return instance.request(`${API}/${url}`, {data})
}

export default {
    user,
    department,
    position,
    group,
    login,


}
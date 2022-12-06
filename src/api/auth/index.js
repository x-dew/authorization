import React from 'react'
import {http} from "../index";
import axios from "axios";
import store from "../../store";
import {setAuth} from "../../store/auth";

export const debounce = (inner, ms = 0) => {
    let timer = null
    let resolves = []
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            const result = inner()
            resolves.forEach(value => value(result))
            resolves = []
        }, ms)
        return new Promise(resolve => resolves.push(resolve))
    }
}

export const refreshToken = () => {
    return axios.put('http://localhost:8089/auth/refresh_token', {token: localStorage.getItem('refresh_token')}
    ).then((res) => {
        store.dispatch(setAuth(res.data.auth))
        return res.data
    }).catch((error) => Promise.reject(error))
}

export const debounceRefreshTokens = debounce(() => {
    return refreshToken()
}, 100)

const signin = (data) => {
    return http('post', 'auth/signin', data, false)
}
export default {
    signin
}
import React from 'react'
import {clearAuth} from "../store/auth";
import {useDispatch} from "react-redux";
import history from "../utils/history";

const Logout = () => {
    const dispatch = useDispatch()
    dispatch(clearAuth())
    history.push("/login")
}
export default Logout
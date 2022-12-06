import React, {useEffect} from 'react'
import {clearAuth} from "../store/auth";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(clearAuth())
        navigate("/login")
    }, [])
    return <></>
}
export default Logout
import React, {useEffect} from 'react'
import {matchPath, useLocation, useNavigate} from "react-router";
import {routesList} from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {clearAuth} from "../store/auth";


const RouterContainer = ({children}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    const token = localStorage.getItem("token")

    const isAuth = () => {
        if (token === null || token === '') {
            dispatch(clearAuth())
            return false
        }
        return true
    }
    const check = () => {
        let routerFilter = routesList.filter(value => matchPath(location.pathname, value.path))

        if (routerFilter.length === 0) return navigate('/404')


        routerFilter = routerFilter.filter(value => {
            if (value.auth === undefined) return true
            if (isAuth() === false && value.auth === true) return false
            return !(isAuth() === true && value.auth === false);

        })

        if (isAuth() === false && routerFilter.length === 0) return navigate('/login')
        if (isAuth() === true && routerFilter.length === 0) return navigate('/')
    }

    useEffect(() => {
        isAuth()
        check()
    }, [location])
    return children
}

export default RouterContainer
import React, {useEffect, useState} from 'react'
import {Routes, useLocation} from "react-router";
import Router from './router'
import {routesList} from "./routes";
import RouterContainer from "./routerContainer";
import Loading from "../components/layout/loading";


const AppRouter = () => {
    const location = useLocation()
    const [routes, setRoutes] = useState(null)

    useEffect(() => {
        setRoutes(routesList.map(value => Router(value)))
    }, [location])

    return (
        <RouterContainer>
            <Loading/>
            <Routes>{routes}</Routes>
        </RouterContainer>
    )
}

export default AppRouter
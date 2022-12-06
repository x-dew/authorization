import React from 'react'
import {Route} from "react-router"
import {isAuth} from "../utils/auth";
import Header from "../components/layout/header";

const Element = (element) => {
    return <>
        <Header/>
        {element}
    </>
}

const Router = (props) => {
    const {auth} = props

    if (auth === true && isAuth() === false) return null
    if (auth === false && isAuth() === true) return null

    if (props.layout){
        return <Route key={props.path} element={Element(props.element)} path={props.path}/>
    }

    return <Route key={props.path} element={props.element} path={props.path}/>
}
export default Router
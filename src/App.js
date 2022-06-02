import React, {useState} from "react";

import './App.css';
import Header from "./header/header";
import Authorization from "./autorization/authorization";
import {Routes, Switch, Route, useNavigate} from "react-router-dom";
import AuthorizationPage from "./autorization/authorizationPage/authorizationPage";
import Registration from "./registration/registration";
import Admin from "./admin/admin";
import CircularProgress from '@mui/material/CircularProgress';



function App() {

    const [tokenGet,setTokenGet] = useState(localStorage.getItem('access_token'))

    const input = (value, e) => {
        value({
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<Authorization/>}/>
                <Route path="authorization"
                       element={<AuthorizationPage input={input}/>}/>
                <Route path="registration" element={<Registration/>}/>
                <Route path="admin" element={<Admin/>}/>
            </Routes>
        </div>
    );
}

export default App;

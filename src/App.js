import React from "react";

import './App.css';
import Header from "./header/header";
import StartPage from "./autorization/startPage";
import {Routes, Route} from "react-router-dom";
import AuthorizationPage from "./autorization/authorizationPage/authorizationPage";
import Registration from "./registration/registration";
import ListUser from "./admin/userList/listUser";

const App = () => {

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
                <Route path="/" element={<StartPage/>}/>
                <Route path="authorization"
                       element={<AuthorizationPage input={input}/>}/>
                <Route path="registration" element={<Registration/>}/>
                <Route path="admin" element={<ListUser/>}/>
            </Routes>
        </div>
    );
}

export default App;

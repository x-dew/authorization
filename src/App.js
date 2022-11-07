import React from "react";
import './assets/styles/App.css';
import Header from "./components/layout/header";
import {Routes, Route} from "react-router-dom";
import Login from "./views/login";
import User from "./views/user";
import Department from "./views/department";
import Group from "./views/group";
import Position from "./views/position";
import useAuth from "./hooks/useAuth";

const App = () => {
    useAuth()
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="login" element={<Login />}/>
                <Route path="group" element={<Group/>}/>
                <Route path="department" element={<Department/>}/>
                <Route path="position" element={<Position/>}/>
                <Route path="/" element={<User/>}></Route>
            </Routes>
        </div>
    );
}

export default App;

import React, {useState} from "react";
import './App.css';
import Header from "./header/header";
import {Routes, Route} from "react-router-dom";
import AuthorizationPage from "./autorization/authorizationPage";
import ListUser from "./admin/userList/listUser";
import Department from "./additionalParameters/department/department";
import Group from "./additionalParameters/group/group";
import Position from "./additionalParameters/position/position";

const App = () => {
const [login,setLogin]=useState('')
    return (
        <div className="App">
            <Header login={login}/>
            <Routes>
                <Route path="login" element={<AuthorizationPage setLogin={setLogin}/>}/>
                <Route path="group" element={<Group/>}/>
                <Route path="department" element={<Department/>}/>
                <Route path="position" element={<Position/>}/>
                <Route path="/" element={<ListUser/>}></Route>
            </Routes>
        </div>
    );
}

export default App;

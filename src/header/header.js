import React from "react";
import './header.css'
import Menu from "../menu/menu";
import MenuAdmin from "../admin/menuAdmin";


const Header = ({setAddUser}) => {
    return (
        <div className='header'>
            <MenuAdmin setAddUser={setAddUser}/>
        </div>
    )
}

export default Header
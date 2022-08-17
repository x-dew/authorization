import React from "react";
import './header.css'
import MenuAdmin from "../menu/menuAdmin";


const Header = ({setAddUser}) => {
    return (
        <div className='header'>
            <MenuAdmin setAddUser={setAddUser}/>
        </div>
    )
}

export default Header
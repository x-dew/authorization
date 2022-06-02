import React from "react";
import './header.css'
import Menu from "../menu/menu";
import MenuAdmin from "../admin/menuAdmin";


const Header = () => {
    return (
        <div className='header'>
            <MenuAdmin/>
        </div>
    )
}

export default Header
import React from "react";
import './header.css'
import MenuAdmin from "../menu/menuAdmin";


const Header = ({login}) => {
    return (
        <div className='header'>
            <MenuAdmin login={login}/>
        </div>
    )
}

export default Header
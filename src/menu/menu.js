import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import './menu.css'
import {useEffect, useState} from "react";


const Menu = () => {
useEffect(()=>{setButtonHome('click')},[])
    const [buttonHome, setButtonHome] = useState('')

    return (
        <div className='menu'>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Новости
                        </Typography>
                        <Link onClick={()=>{setButtonHome('click')}} to="/authorization">
                            <Button color="inherit">Авторизоваться</Button>
                        </Link>
                        <Link onClick={()=>{setButtonHome('click')}} to="/registration">
                            <Button color="inherit">Регистрация</Button>
                        </Link>
                        {buttonHome === 'click' ? <Link onClick={()=>{setButtonHome('')}} to="/">
                            <Button color="inherit">Главная</Button>
                        </Link> : ''}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Menu
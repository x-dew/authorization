import React, {useReducer, useState} from "react";
import './authorizationPage.css'
import {useForm} from "react-hook-form";
import {reduce, signIn} from '../../reduce'
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const AuthorizationPage = ({input}) => {

    const [authorization, dispatchAuthorization] = useReducer(reduce, signIn)
    const [errorAxios, setErrorAxios] = useState('')
    const [adminPage, setAdminPage] = useState('1')


    const getAxios = () => {
        axios.post(`http://localhost:8088/auth/signin`, {
            login: authorization.login,
            pwd: authorization.pwd,
        }).then((response) => {
                localStorage.setItem('access_token', response.data.auth.token)
                localStorage.setItem('expires_in', response.data.auth.refresh_token_expired)
                localStorage.setItem('refresh_token', response.data.auth.refresh_token)
                setErrorAxios('')
                setTimeout(() => {
                    navigate("/admin");
                    setAdminPage('1')
                }, 2000)

            }
        ).catch((error) => {
            console.log(error);
            setErrorAxios('error')
            setAdminPage('1')
        });
    }
    const navigate = useNavigate();
    return (
        <div className='authorizationPage'>
            <div className='link'>
            </div>
            <Box
                className='form'
                component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    className=' input'
                    onChange={(e) => input(dispatchAuthorization, e)}
                    id="outlined-basic"
                    label="Логин"
                    variant="outlined"
                    name='login'/>
                <TextField
                    className=' input'
                    onChange={(e) => input(dispatchAuthorization, e)}
                    id="outlined-basic"
                    label="Пароль"
                    variant="outlined"
                    name='pwd'
                    type="password"/>
            </Box>

            {adminPage === '0' ? <CircularProgress/> : ''}
            <div className='buttonAuthorization'>
                <button onClick={() => {
                    setAdminPage('0')
                    getAxios()
                }} className='button' type='submit'>Отправить
                </button>
            </div>
            {
                errorAxios === 'error' ? <h2 className='text-error'>Неправельный логин или пароль</h2> : ''
            }
        </div>
    )
}

export default AuthorizationPage
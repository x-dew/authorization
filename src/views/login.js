import React, {useReducer, useState} from "react";
import '../assets/styles/login.css'
import {reduce, signIn} from '../reduce'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import api from '../api'
import {useSelector, useDispatch} from 'react-redux'
import {setToken} from '../store/user'
import {setLogin} from "../store/login";

const Login = () => {
    const dispatch = useDispatch()
    const [authorization, dispatchAuthorization] = useReducer(reduce, signIn)
    const [errorAxios, setErrorAxios] = useState('')
    const [adminPage, setAdminPage] = useState('1')
    const navigate = useNavigate();

    const value = (e) => {
        dispatchAuthorization({
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }
    const getAxios = () => {
        const data = {
            login: authorization.login,
            pwd: authorization.pwd,
        }
        api.login.signin(data).then((response) => {
            dispatch(setToken(response.data.auth))
            dispatch(setLogin(response.data.user))
                localStorage.setItem('token', response.data.auth.token)
                localStorage.setItem('refresh_token_expired', response.data.auth.refresh_token_expired)
                localStorage.setItem('refresh_token', response.data.auth.refresh_token)
                setErrorAxios('')
            console.log(response)
                setTimeout(() => {
                    navigate("/");
                    setAdminPage('1')
                }, 2000)

            }
        ).catch((error) => {
            console.log(error);
            setErrorAxios('error')
            setAdminPage('1')
        });
    }

    return (
        <div className='login'>
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
                    onChange={(e) => value(e)}
                    id="outlined-basic"
                    label="Логин"
                    variant="outlined"
                    name='login'/>
                <TextField
                    className=' input'
                    onChange={(e) => value(e)}
                    id="outlined-basic"
                    label="Пароль"
                    variant="outlined"
                    name='pwd'
                    type="password"/>
            </Box>

            {adminPage === '0' ? <CircularProgress color="success"/> : ''}
            <div className='buttonAuthorization'>
                <button
                    onClick={() => {
                        setAdminPage('0')
                        getAxios()
                    }}
                    className='button'
                    style={{cursor: 'pointer'}}
                    type='submit'>Отправить
                </button>
            </div>
            {
                errorAxios === 'error' ? <h2 className='text-error'>Неправельный логин или пароль</h2> : ''
            }
        </div>
    )
}

export default Login
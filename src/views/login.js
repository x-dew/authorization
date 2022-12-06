import React, {useReducer, useState} from "react";
import '../assets/styles/login.css'
import '../assets/styles/loading.css'
import {reduce, signIn} from '../reduce'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom";
import api from '../api'
import {useDispatch} from 'react-redux'
import {setAuth} from '../store/auth'
import {setLogin} from "../store/user"


const Login = () => {
    const dispatch = useDispatch()
    const [authorization, dispatchAuthorization] = useReducer(reduce, signIn)
    const [errorAxios, setErrorAxios] = useState('')
    const navigate = useNavigate();

    const value = (e) => {
        dispatchAuthorization({
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }
    const getUser = () => {
        api.login.signin(authorization).then((response) => {
                dispatch(setAuth(response.data.auth))
                dispatch(setLogin(response.data.user))
                setErrorAxios('')
                navigate("/");
            }
        ).catch((error) => {
            console.log(error);
            setErrorAxios('error')
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
                    id="outlined-basic_one"
                    label="Логин"
                    variant="outlined"
                    name='login'/>
                <TextField
                    className=' input'
                    onChange={(e) => value(e)}
                    id="outlined-basic_two"
                    label="Пароль"
                    variant="outlined"
                    name='pwd'
                    type="password"/>
            </Box>
            <div className='buttonAuthorization'>
                <button
                    onClick={() => {
                        getUser()
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
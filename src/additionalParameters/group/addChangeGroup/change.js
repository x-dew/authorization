import React, {useEffect, useState} from 'react'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {FormGroup} from "@mui/material";
import Joi from "joi";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Change = ({selectId, setOpen, setList, list}) => {

    const [error, setError] = useState({})
    const [errorSipPort, setErrorSipPort] = useState('')
    const [state, setState] = useState({
        name: "",
        settings: {
            sip_port: null,
            is_call: false,
            is_vcall: false,
            is_chat: false,
            is_stun: false,
            chat_ip: null,
            sip_pwd: null,
            sip_ip: null,
            sip_proxy: null,
            stun_srv: null,
            transport: null
        }
    })
    const upDataGroup = () => {
        const schema = Joi.object({
            username: Joi.string()
                .required()
                .pattern(/^[a-zA-Zа-яА-Я]+$/)
                .min(3)
                .messages({
                    'string.pattern.base': 'недопустимые символы',
                    'string.empty': "введите имя",
                    'string.min': 'длинна не должа быть меньше 3 символов',
                    'string.base': 'недопустимые символы'
                }),

        })
        const validate = schema.validate({
            username: state.name,
        })
        setError({})
        if (validate.error) {
            validate.error.details.forEach(v => {
                console.log(v)
                setError(e => ({
                    ...e,
                    [v.context.key]: v.message
                }))
            })
        } else {
            const upData = {
                name: state.name,
                setting: {
                    sip_port: state.settings.sip_port === '' ? null :!/[a-zA-Z]+/.test(state.settings.sip_port) ? Number(state.settings.sip_port) : state.settings.sip_port,
                    is_call: state.settings.is_call,
                    is_vcall: state.settings.is_vcall,
                    is_chat: state.settings.is_chat,
                    is_stun: state.settings.is_stun,
                    chat_ip: state.settings.chat_ip,
                    sip_pwd: state.settings.sip_pwd,
                    sip_ip: state.settings.sip_ip,
                    sip_proxy: state.settings.sip_proxy,
                    stun_srv: state.settings.stun_srv,
                    transport: state.settings.transport
                },
                token: localStorage.getItem('access_token'),
            }
            axios.put(`http://localhost:8088/admin/groups/${selectId}`, upData)
                .then((e) => {
                    setOpen(false)
                    setList(list + 1)
                }).catch((error) => {
                console.log(error)
            })
        }

    }

    const deleteGroup = () => {
        axios.delete(`http://localhost:8088/admin/groups/${selectId}`, {
            data: {token: localStorage.getItem('access_token')}
        }).then((e) => {
            setOpen(false)
            setList(list + 1)
        })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        axios.post(`http://localhost:8088/admin/groups/${selectId}`,
            {token: localStorage.getItem('access_token')})
            .then((res) => {
                setState(res.data)
            }).catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <div className='addGroup'>
            <div className='addTitle'>
                <h3>Изменить группу</h3>
                <HighlightOffIcon
                    fontSize={"large"}
                    style={{cursor: 'pointer'}}
                    onClick={() => setOpen(false)}/>
            </div>
            <Box
                className='addGroupInput'
                component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <div className='inputBlock'>
                    <TextField
                        onChange={(e) => {
                            setState({...state, name: e.target.value})
                        }}
                        name='name'
                        value={state.name}
                        label="Имя"
                        error={!!error.username}
                        helperText={error.username}
                        id="outlined-basic"
                        variant="outlined"/>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch onChange={event => setState({
                                ...state,
                                settings: {...state.settings, is_call: event.target.checked}
                            })}
                                             checked={state.settings.is_call}/>} label="Голосовые вызовы"/>
                        <FormControlLabel control={<Switch onChange={event => {
                            setState({...state, settings: {...state.settings, is_vcall: event.target.checked}})
                        }} checked={state.settings.is_vcall}/>} label="Выдео вызовы"/>
                        <FormControlLabel control={<Switch onChange={event => {
                            setState({...state, settings: {...state.settings, is_chat: event.target.checked}})
                        }} checked={state.settings.is_chat}/>} label="Чат"/>
                    </FormGroup>
                    <TextField
                        onChange={(e) => {
                            setState({...state, settings: {...state.settings, chat_ip: e.target.value}})
                        }}
                        name='chat_ip'
                        value={state.settings.chat_ip === null ? '' : state.settings.chat_ip}
                        label="Адрес чат сервера"
                        id="outlined-basic"
                        variant="outlined"/>
                    <TextField
                        onChange={(e) => {
                            setState({...state, settings: {...state.settings, sip_pwd: e.target.value}})
                        }}
                        name='sip_pwd'
                        value={state.settings.sip_pwd === null ? '' : state.settings.sip_pwd}
                        type='password'
                        label="Пароль sip"
                        id="outlined-basic"
                        variant="outlined"/>
                    <TextField
                        onChange={(e) => {
                            setState({...state, settings: {...state.settings, sip_ip: e.target.value}})
                        }}
                        name='sip_ip'
                        value={state.settings.sip_ip === null ? '' : state.settings.sip_ip}
                        label="Адрес sip сервера"
                        id="outlined-basic"
                        variant="outlined"/>
                </div>
                <div className='inputBlock'>

                    <TextField
                        onChange={(e) => {
                            if (/[a-zA-Z]+/.test(e.target.value)) {
                                setErrorSipPort('Недопустимые символы')
                            }
                            setState({...state, settings: {...state.settings, sip_port: e.target.value}})
                        }}
                        name='sip_port'
                        value={state.settings.sip_port}
                        label="Порт sip"
                        error={!!errorSipPort}
                        helperText={errorSipPort}
                        id="outlined-basic"
                        variant="outlined"/>
                    <TextField
                        onChange={(e) => {
                            setState({...state, settings: {...state.settings, sip_proxy: e.target.value}})
                        }}
                        name='sip_proxy'
                        value={state.settings.sip_proxy === null ? '' : state.settings.sip_proxy}
                        label="SIP proxy"
                        id="outlined-basic"
                        variant="outlined"/>
                    <FormControlLabel control={<Switch onChange={event => {
                        setState({...state, settings: {...state.settings, is_stun: event.target.checked}})
                    }} checked={state.settings.is_stun}/>} label="STUN"/>
                    <TextField
                        onChange={(e) => {
                            setState({...state, settings: {...state.settings, stun_srv: e.target.value}})
                        }}
                        name='stun_srv'
                        value={state.settings.stun_srv === null ? '' : state.settings.stun_srv}
                        label="Адрес сервера STUN"
                        id="outlined-basic"
                        variant="outlined"/>
                    <TextField
                        onChange={(e) => {
                            setState({...state, settings: {...state.settings, transport: e.target.value}})
                        }}
                        name='transport'
                        value={state.settings.transport === null ? '' : state.settings.transport}
                        label="Транспорт"
                        id="outlined-basic"
                        variant="outlined"/>
                </div>

            </Box>
            <Stack className='addDep' direction="row" spacing={2}>
                <Button
                    style={{background: 'red'}}
                    onClick={(e) => {
                        deleteGroup()
                    }} variant="contained" color="success">
                    Удалить
                </Button>
                <Button onClick={() => {
                    upDataGroup()
                }} variant="contained" color="success">
                    Изменить
                </Button>
            </Stack>
        </div>
    )
}
export default Change
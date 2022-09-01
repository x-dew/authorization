import React from 'react'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {FormGroup} from "@mui/material";
import {useState} from "react";
import Joi from "joi";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Add = ({setOpen, setList, list}) => {
    const [errorValidate, setErrorValidate] = useState({})
    const [state, setState] = useState({
        name: "",
        token: localStorage.getItem('access_token'),

        setting: {
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

    const createGroup = () => {
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
        setErrorValidate({})
        if (validate.error) {
            validate.error.details.forEach(v => {
                console.log(v)
                setErrorValidate(e => ({
                    ...e,
                    [v.context.key]: v.message
                }))
            })
        } else {
            axios.post('http://localhost:8088/admin/groups/create', state)
                .then((res) => {
                    setList(list + 1)
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <div className='addGroup'>
            <div className='addTitle addGroupInput'>
                <h3>Добавить группу</h3>
                <HighlightOffIcon
                    fontSize={"large"}
                    style={{cursor:'pointer'}}
                    onClick={()=>setOpen(false)}/>
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
                        }} name='name'
                        id="outlined-basic"
                        error={!!errorValidate.username}
                        helperText={errorValidate.username}
                        value={state.name}
                        label="Имя"
                        variant="outlined"/>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch onChange={event => setState({
                                ...state,
                                setting: {...state.setting, is_call: event.target.checked}
                            })}
                                             checked={state.setting.is_call}/>} label="Голосовые вызовы"/>
                        <FormControlLabel control={<Switch onChange={event => {
                            setState({...state, setting: {...state.setting, is_vcall: event.target.checked}})
                            console.log(event)
                        }} checked={state.setting.is_vcall}/>} label="Выдео вызовы"/>
                        <FormControlLabel control={<Switch onChange={event => {
                            setState({...state, setting: {...state.setting, is_chat: event.target.checked}})
                        }} checked={state.setting.is_chat}/>} label="Чат"/>
                    </FormGroup>
                    <TextField
                        onChange={(e) => {
                            setState({...state, setting: {...state.setting, chat_ip: e.target.value}})
                        }} name='chat_ip'
                        type='text'
                        id="outlined-basic"
                        label="Адрес чат сервера"
                        variant="outlined"/>
                    <TextField
                        onChange={(e) => {
                            setState({...state, setting: {...state.setting, sip_pwd: e.target.value}})
                        }} name='sip_pwd'
                        type='password'
                        id="outlined-basic"
                        label="Пароль sip"
                        variant="outlined"/>
                    <TextField
                        onChange={(e) => {
                            setState({...state, setting: {...state.setting, sip_ip: e.target.value}})
                        }} name='sip_ip'
                        id="outlined-basic"
                        label="Адрес sip сервера"
                        variant="outlined"/>
                </div>
                <div className='inputBlock'>

                    <TextField
                        onChange={(e) => {
                            if(!/[a-zA-Z]+/.test(e.target.value)){
                                setState({...state, setting: {...state.setting, sip_port: Number(e.target.value)}})
                            }else {
                                setState({...state, setting: {...state.setting, sip_port: ''}})
                            }
                        }} name='sip_port'
                        type='text'
                        id="outlined-basic"
                        value={state.setting.sip_port}
                        label="Порт sip"
                        variant="outlined"/>
                    <TextField
                        onChange={(e) => {
                            setState({...state, setting: {...state.setting, sip_proxy: e.target.value}})
                        }} name='sip_proxy'
                        type='text'
                        id="outlined-basic"
                        label="SIP proxy"
                        variant="outlined"/>
                    <FormControlLabel control={<Switch onChange={event => {
                        setState({...state, setting: {...state.setting, is_stun: event.target.checked}})
                    }} checked={state.setting.is_stun}/>} label="STUN"/>
                    <TextField
                        onChange={(e) => {
                            setState({...state, setting: {...state.setting, stun_srv: e.target.value}})
                        }} name='stun_srv'
                        type='text'
                        id="outlined-basic"
                        label="Адрес сервера STUN"
                        variant="outlined"/>
                    <TextField
                        onChange={(e) => {
                            setState({...state, setting: {...state.setting, transport: e.target.value}})
                        }} name='transport'
                        type='text'
                        id="outlined-basic"
                        label="Транспорт"
                        variant="outlined"/>
                </div>
                <Stack className='addDep' direction="row" spacing={2}>
                    <Button onClick={() => {
                        createGroup()
                    }} variant="contained" color="success">
                        Добавить
                    </Button>
                </Stack>
            </Box>
        </div>
    )
}

export default Add
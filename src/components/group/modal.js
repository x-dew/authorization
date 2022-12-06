import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Backdrop from "@mui/material/Backdrop";
import '../../assets/styles/modalGroup.css'
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {FormGroup} from "@mui/material";
import Joi from "joi";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import api from '../../api'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth:'500px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const ModalGroup = ({id, open, onChange}) => {

    const handleClose = () => {
        onChange('close');
    };

    const [errorValidate, setErrorValidate] = useState({})
    const [errorSipPort, setErrorSipPort] = useState('')
    const [state, setState] = useState({
        name: '',
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

    const create = () => {
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
                console.error(v)
                setErrorValidate(e => ({
                    ...e,
                    [v.context.key]: v.message
                }))
            })
        } else {
            const data = {
                ...state, settings: {
                    ...state.settings,
                    "sip_port": state.settings.sip_port === '' ? null : !/[a-zA-Z]+/.test(state.settings.sip_port) ? Number(state.settings.sip_port) : state.settings.sip_port,
                },
            }
                api.group.create(data).then((res) => {
                    onChange('create')
                    handleClose()
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    const update = () => {
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
                console.error(v)
                setErrorValidate(e => ({
                    ...e,
                    [v.context.key]: v.message
                }))
            })
        } else {
            const update = {
                name: state.name,
                settings: {
                    sip_port: state.settings.sip_port === '' ? null : !/[a-zA-Z]+/.test(state.settings.sip_port) ? Number(state.settings.sip_port) : state.settings.sip_port,
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
            }
                api.group.update(update,id).then((e) => {
                    onChange('update')
                    handleClose()
                }).catch((error) => {
                console.error(error)
            })
        }

    }

    const destroy = () => {
       api.group.destroy(id).then((e) => {
            onChange('destroy')
            handleClose()
        })
            .catch((e) => {
                console.error(e)
            })
    }


    useEffect(() => {
        if (id !== null) {
            api.group.view(id).then((res) => {
                setState(res.data)
            }).catch((error) => {
                console.error(error)
            })
        }
    }, [])
    return (
        <div className='modalParameters'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Box sx={style}>
                    <div className='addGroup'>
                        <div className='addTitle addGroupInput'>
                            <h3>{id === null ? 'Добавить группу' : 'Изменить группу'}</h3>
                            <HighlightOffIcon
                                fontSize={"large"}
                                style={{cursor: 'pointer'}}
                                onClick={() => handleClose()}/>
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
                                    error={!!errorValidate.username}
                                    helperText={errorValidate.username}
                                    value={state.name == null ? '' : state.name}
                                    label="Имя"
                                    variant="outlined"/>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch onChange={event => setState({
                                            ...state,
                                            settings: {...state.settings, is_call: event.target.checked}
                                        })}
                                                         checked={state.settings.is_call}/>} label="Голосовые вызовы"/>
                                    <FormControlLabel
                                        control={<Switch onChange={event => {
                                            setState({
                                                ...state,
                                                settings: {...state.settings, is_vcall: event.target.checked}
                                            })
                                        }} checked={state.settings.is_vcall}/>}
                                        label="Выдео вызовы"/>
                                    <FormControlLabel control={<Switch onChange={event => {
                                        setState({
                                            ...state,
                                            settings: {...state.settings, is_chat: event.target.checked}
                                        })
                                    }} checked={state.settings.is_chat}/>} label="Чат"/>
                                </FormGroup>
                                <TextField
                                    onChange={(e) => {
                                        setState({...state, settings: {...state.settings, chat_ip: e.target.value}})
                                    }}
                                    name='chat_ip'
                                    value={state.settings.chat_ip == null ? '' : state.settings.chat_ip}
                                    type='text'
                                    label="Адрес чат сервера"
                                    variant="outlined"/>
                                <TextField
                                    onChange={(e) => {
                                        setState({...state, settings: {...state.settings, sip_pwd: e.target.value}})
                                    }}
                                    value={state.settings.sip_pwd == null ? '' : state.settings.sip_pwd}
                                    name='sip_pwd'
                                    label="Пароль sip"
                                    variant="outlined"/>
                                <TextField
                                    onChange={(e) => {
                                        setState({...state, settings: {...state.settings, sip_ip: e.target.value}})
                                    }}
                                    value={state.settings.sip_ip == null ? '' : state.settings.sip_ip}
                                    name='sip_ip'
                                    label="Адрес sip сервера"
                                    variant="outlined"/>
                            </div>
                            <div className='inputBlock'>
                                <TextField
                                    onChange={(e) => {
                                        if (/[a-zA-Z]+/.test(e.target.value)) {
                                            setErrorSipPort('Недопустимые символы')
                                        } else {
                                            setState({
                                                ...state,
                                                settings: {...state.settings, sip_port: e.target.value}
                                            })
                                            setErrorSipPort('')
                                        }
                                    }}

                                    name='sip_port'
                                    type='text'
                                    value={state.settings.sip_port == null ? '' : state.settings.sip_port}
                                    error={!!errorSipPort}
                                    helperText={errorSipPort}
                                    label="Порт sip"
                                    variant="outlined"/>
                                <TextField
                                    onChange={(e) => {
                                        setState({...state, settings: {...state.settings, sip_proxy: e.target.value}})
                                    }}
                                    value={state.settings.sip_proxy == null ? '' : state.settings.sip_proxy}
                                    name='sip_proxy'
                                    type='text'
                                    label="SIP proxy"
                                    variant="outlined"/>
                                <FormControlLabel control={<Switch onChange={event => {
                                    setState({...state, settings: {...state.settings, is_stun: event.target.checked}})
                                }} checked={state.settings.is_stun}/>} label="STUN"/>
                                <TextField
                                    onChange={(e) => {
                                        setState({...state, settings: {...state.settings, stun_srv: e.target.value}})
                                    }}
                                    value={state.settings.stun_srv == null ? '' : state.settings.stun_srv}
                                    name='stun_srv'
                                    type='text'
                                    label="Адрес сервера STUN"
                                    variant="outlined"/>
                                <TextField
                                    onChange={(e) => {
                                        setState({...state, settings: {...state.settings, transport: e.target.value}})
                                    }}
                                    value={state.settings.transport == null ? '' : state.settings.transport}
                                    name='transport'
                                    type='text'
                                    label="Транспорт"
                                    variant="outlined"/>
                            </div>
                            {
                                id === null ?  <Stack className='deleteGroup' direction="row" spacing={2}>
                                    <Button onClick={create} variant="contained" color="success">
                                        Добавить
                                    </Button>
                                </Stack> : <Stack className='deleteGroup' direction="row" spacing={2}>
                                    <Button
                                        style={{background: 'red'}}
                                        onClick={destroy}
                                        variant="contained"
                                        color="success">
                                        Удалить
                                    </Button>
                                    <Button onClick={update} variant="contained"
                                            color="success">
                                        Изменить
                                    </Button>
                                </Stack>
                            }

                        </Box>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
export default ModalGroup
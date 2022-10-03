import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from "@mui/material/Backdrop";
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";
import ClearIcon from '@mui/icons-material/Clear';
import Joi from "joi";
import axios from "axios";
import {useState,useEffect} from "react";
import '../../header/header.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalPosition = ({id, open, onChange}) => {

    const [errorValidate, setErrorValidate] = useState({})

    const [position, setPosition] = useState({
        id: null,
        name: ''
    })

    const handleClose = () => {
        setPosition({...position, id: null, name: ''})
        onChange('close')
    };
    console.log(id)
    useEffect(() => {
        axios.post(`http://localhost:8089/admin/positions/${id}`, {
            token: localStorage.getItem('access_token'),
        })
            .then((res) => {
                setPosition({...position, id: res.data.id, name: res.data.name})
                console.log(res)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

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
            username: position.name
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
            const dispatchData = {
                token: localStorage.getItem('access_token'),
                name: position.name,
            }
            axios.post('http://localhost:8089/admin/positions/create', dispatchData)
                .then((res) => {
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
            username: position.name
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
            const dispatchData = {
                token: localStorage.getItem('access_token'),
                name: position.name,
            }
            axios.put(`http://localhost:8089/admin/positions/${id}`, dispatchData)
                .then((res) => {
                    onChange('update')
                    handleClose()
                })
                .catch((error) => {
                    console.error(error)
                })
        }

    }

    const destroy = () => {
        axios.delete(`http://localhost:8089/admin/positions/${id}`, {
            data: {token: localStorage.getItem('access_token')}
        },)
            .then((res) => {
                onChange('destroy')
                handleClose()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div className='positionModal'>
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

                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        className='inputFlex'
                    >
                        <p className='modalText'>{position.id === null ? 'Создание' : 'Редактирование'} Должности</p>
                        <ClearIcon style={{cursor: 'pointer'}} onClick={() => handleClose()}/>
                    </Typography>
                    <div className='modalAdd'>
                        <TextField
                            error={!!errorValidate.username}
                            helperText={errorValidate.username}
                            value={position.name}
                            className='modalAddInput'
                            onChange={(e) => setPosition({...position, name: e.target.value})}
                            id="modal-modal-description"
                            sx={{mt: 2}}>
                        </TextField>
                        <Stack className='addDep' direction="row" spacing={2}>
                            {position.id ?
                                <>
                                    <Button
                                        onClick={update}
                                        variant="contained"
                                        color="success"
                                    >
                                        Сохранить
                                    </Button>
                                    <Button
                                        onClick={destroy}
                                        variant="contained"
                                        style={{background: 'red', color: 'white'}}
                                    >
                                        Удалить
                                    </Button>
                                </> :
                                <Button onClick={create}
                                        variant="contained"
                                        color="success"
                                >
                                    Добавить
                                </Button>
                            }
                        </Stack>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
export default ModalPosition
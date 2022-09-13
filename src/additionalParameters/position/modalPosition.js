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
import {useState} from "react";

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

const ModalPosition = ({
                           selectName,
                           setSelectName,
                           open,
                           restartList,
                           setRestartList,
                           setOpen,
                           addPosition,
                           selectedId
                       }) => {

    const [errorValidate, setErrorValidate] = useState({})
    const [newPosition, setNewPosition] = useState('')

    const handleClose = () => setOpen(false);
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
            username: newPosition
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
            const dispatchData = {
                token: localStorage.getItem('access_token'),
                name: newPosition,
            }
            axios.post('http://localhost:8088/admin/positions/create', dispatchData)
                .then((res) => {
                    setNewPosition('')
                    setRestartList(restartList +1)
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    const upData = () => {
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
            username: selectName
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
            const dispatchData = {
                token: localStorage.getItem('access_token'),
                name: selectName,
            }
            axios.put(`http://localhost:8088/admin/positions/${selectedId}`, dispatchData)
                .then((res) => {
                    setRestartList(restartList +1)
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    const deletePosition = () => {
        axios.delete(`http://localhost:8088/admin/positions/${selectedId}`, {
            data: {token: localStorage.getItem('access_token')}
        },)
            .then((res) => {
                setOpen(false)
                setRestartList(restartList +1)
            })
            .catch((error) => {
                console.log(error)
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
                    {addPosition === 'add' ?
                        <div>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                className='inputFlex'
                            >
                                <p className='modalText'>Должность</p>
                                <ClearIcon style={{cursor: 'pointer'}} onClick={() => handleClose()}/>
                            </Typography>
                            <div className='modalAdd'>
                                <TextField
                                    error={!!errorValidate.username}
                                    helperText={errorValidate.username}
                                    className='modalAddInput'
                                    onChange={(e) => setNewPosition(e.target.value)}
                                    id="modal-modal-description"
                                    sx={{mt: 2}}>
                                </TextField>
                                <Stack className='addDep' direction="row" spacing={2}>
                                    <Button onClick={() => {
                                        create()
                                    }}
                                            variant="contained"
                                            color="success"
                                            disabled={!newPosition}>
                                        Добавить
                                    </Button>
                                </Stack>
                            </div>
                        </div> : <div>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="p"
                                className='inputFlex'>
                                <span className='modalText'>Редактирование Должностей</span>
                                <ClearIcon
                                    style={{cursor: 'pointer'}}
                                    onClick={() => handleClose()}
                                />
                            </Typography>
                            <div className='modalAdd'>
                                <TextField
                                    error={!!errorValidate.username}
                                    helperText={errorValidate.username}
                                    className='modalAddInput'
                                    onChange={(e) => setSelectName(e.target.value)}
                                    id="modal-modal-description"
                                    value={selectName}
                                    sx={{mt: 2}}>
                                </TextField>
                                <Stack className='changePos' direction="row" spacing={2}>
                                    <Button onClick={() => {
                                        if (selectName !== '') {
                                            upData()
                                        }
                                    }}
                                            variant="contained"
                                            color="success"
                                            disabled={!selectName}
                                    >
                                        Изменить
                                    </Button>
                                    <Button
                                        onClick={() => deletePosition()}
                                        variant="contained"
                                        style={{background: 'red', color: 'white'}}
                                        disabled={!selectName}
                                    >
                                        Удалить
                                    </Button>
                                </Stack>
                            </div>
                        </div>
                    }
                </Box>
            </Modal>
        </div>
    )
}
export default ModalPosition
import React, {useEffect} from 'react'
import '../../assets/styles/modalDepartment.css'
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
import api from "../../api";

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

const ModalDepartmetn = ({id, open, onChange}) => {
    const [errorValidate, setErrorValidate] = useState({})

    const [department, setDepartment] = useState({
        id: null,
        name: ''
    })

    const handleClose = () => {
        setDepartment({...department, id: null, name: ''})
        onChange('close');
    }

    useEffect(() => {
        api.department.view(id).then((res) => {
                setDepartment({...department, id: res.data.id, name: res.data.name})
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const create = () => {
        const schema = Joi.object({
            name: Joi.string()
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
            name: department.name
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
                api.department.create({name: department.name}).then((res) => {
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
            name: Joi.string()
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
            name: department.name
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
                api.department.update(department.name,department.id).then((res) => {
                    onChange('update')
                    handleClose()
                })
                .catch((error) => {
                    console.error(error)
                })
        }

    }

    const destroy = () => {
            api.department.destroy(id).then((res) => {
                onChange('destroy')
                handleClose()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div className='departmentModal'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Box sx={style}>
                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        className='inputFlex'
                    >
                        <p className='modalText'>{department.id === null ? 'Создание' : 'Редактирование'} департамента</p>
                        <ClearIcon style={{cursor: 'pointer'}} onClick={() => handleClose()}/>
                    </Typography>
                    <div className='modalAdd'>
                        <TextField
                            error={!!errorValidate.name}
                            helperText={errorValidate.name}
                            value={department.name}
                            className='modalAddInput'
                            onChange={e => setDepartment({...department, name: e.target.value})}
                            id="modal-description"
                            sx={{mt: 2}}>
                        </TextField>
                        <Stack className='addDep' direction="row" spacing={2}>
                            {department.id ?
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
export default ModalDepartmetn
import React, {useEffect, useReducer, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {userReduce, users} from "./userAddReduce";
import '../../../assets/styles/userAdd.css'
import axios from "axios";
import Joi from "joi";
import Image from "../image/image";
import api from '../../../api'


const UserAdd = ({handleClose,id,onChange}) => {

    const [user, dispatchUsers] = useReducer(userReduce, users)

    const [group, setGroup] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [jobTitle, setJobTitle] = React.useState('');
    const [buttonAction, setButtonAction] = useState('user')

    const [groupList, setGroupList] = useState([])
    const [departmentList, setDepartmentList] = useState([])
    const [jobTitleList, setJobTitleList] = useState([])
    const [checkErrorValidate, setCheckErrorValidate] = useState({})


    const handleChangeGroup = (event: SelectChangeEvent, name) => {
        setGroup(event.target.value);
    };
    const handleChangeDep = (event: SelectChangeEvent, name) => {
        setDepartment(event.target.value);
    };
    const handleChangeJob = (event: SelectChangeEvent, name) => {
        setJobTitle(event.target.value);
    };

    const changeObject = (e) => {
        dispatchUsers({
                payload: {
                    name: e.target.name,
                    value: e.target.value
                }
            }
        )
    }

    const changeImage = (file) => {
        dispatchUsers({
                payload: {
                    name: 'image',
                    value: file
                }
            }
        )
    }

    const schema = Joi.object({
        login: Joi.string()
            .messages({
                'string.empty': "введите логин",
                'string.base': 'введите логин',
            })
            .custom((value, helper) => {
                if (value.length < 5) {
                    return helper.message("не менее 5 символов")
                } else if (value.length > 15) {
                    return helper.message("не больше 15 символов")
                } else if (!value.match(/[a-zA-Z\d]+$/)) {
                    return helper.message("недопустимые символы")
                } else {
                    return true
                }

            }),
        password: Joi.string()
            .messages({
                'string.empty': "введите пароль",
                'string.base': 'введите пароль',
                "string.alphanum": 'недопустимые символы'
            })
            .custom((value, helper) => {
                if (value.length < 8) {
                    return helper.message("не менее 8 символов")
                } else if (value.length > 15) {
                    return helper.message("не больше 15 символов")
                } else {
                    return true
                }

            }),
        sip_pwd: Joi.string()
            .messages({
                'string.empty': "введите пароль",
                'string.base': 'введите пароль',
                "string.alphanum": 'недопустимые символы'
            })
            .custom((value, helper) => {
                if (value.length < 4) {
                    return helper.message("не менее 8 символов")
                } else if (value.length > 15) {
                    return helper.message("не больше 15 символов")
                } else {
                    return true
                }

            }),
        username: Joi.string()
            .required()
            .custom((value, helper) => {
                if (!value.match(/^[a-zA-Zа-яА-Я]+$/)) {
                    return helper.message("недопустимые символы")
                } else {
                    return true
                }

            })
            .messages({
                'string.empty': "введите имя",
            }),

    })

    const addUserAxios = () => {
        const checkValidate = buttonAction === 'user' ?
            schema.validate({
                login: user.login,
                password: user.pwd,
                username: user.name,
                sip_pwd: user.sip_pwd,
            }) : schema.validate({
                username: user.name,
            })
        setCheckErrorValidate({})
        if (checkValidate.error) {
            checkValidate.error.details.forEach(event => {
                setCheckErrorValidate(value => ({
                    ...value,
                    [event.context.key]: event.message
                }))
            })
        } else {
            const request = {
                ...user,
                "numbers": [user.numbers],
                "emails": [user.emails],
            }
            api.user.create(request).then((resp) => {
                    onChange('create')
                    handleClose()
                }).catch((error) => {
                console.log(error)
            })
        }

    }

    useEffect(() => {

        api.group.list().then((groups) => {
            setGroupList(groups.data.groups)
        }).catch((error) => {
            console.log(error)
        })

        api.department.list().then((department) => {
            setDepartmentList(department.data.departments)
        }).catch((error) => {
            console.log(error)
        })

        api.position.list().then((positions) => {
            setJobTitleList(positions.data.positions)
        }).catch((error) => {
            console.log(error)
        })
    }, [id])

    return (
        <div className='addUserInput'>
            <div className='checkbox'>
                <p>Роль</p>
                <div className='checkboxButton'>
                    <button
                        onClick={(e) => {
                            dispatchUsers({
                                payload: {
                                    name: e.target.name,
                                    value: 'user'
                                }
                            })
                            setButtonAction('user')
                        }}
                        name='role'
                        className={buttonAction === 'user' ? 'buttonRole checkboxButtonAction' : 'buttonRole'}>Пользователь
                    </button>
                    <button
                        onClick={(e) => {
                            dispatchUsers({
                                payload: {
                                    name: e.target.name,
                                    value: 'admin'
                                }
                            })
                            setButtonAction('admin')
                        }}
                        name='role'
                        className={buttonAction === 'admin' ? 'buttonRole checkboxButtonAction' : 'buttonRole'}>Администратор
                    </button>
                    <button
                        onClick={(e) => {
                            dispatchUsers({
                                payload: {
                                    name: e.target.name,
                                    value: 'contact'
                                }
                            })
                            setButtonAction('contact')
                        }}
                        name='role'
                        className={buttonAction === 'contact' ? 'buttonRole checkboxButtonAction' : 'buttonRole'}>Контакт
                    </button>
                </div>
            </div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >
                {buttonAction !== 'contact' ? <div className='inputUser'>
                    <TextField
                        onChange={changeObject}
                        name='login'
                        value={user.login == null ? '' : user.login}
                        error={!!checkErrorValidate.login}
                        helperText={checkErrorValidate.login}
                        label="Логин"
                        variant="outlined"/>
                    <TextField
                        onChange={changeObject}
                        name='pwd'
                        type='password'
                        error={!!checkErrorValidate.password}
                        helperText={checkErrorValidate.password}
                        label="Пароль"
                        value={user.pwd == null ? '' : user.pwd}
                        variant="outlined"/>
                </div> : ''
                }
                <TextField
                    onChange={changeObject}
                    name='name'
                    value={user.name == null ? '' : user.name}
                    error={!!checkErrorValidate.username}
                    helperText={checkErrorValidate.username}
                    label="Имя"
                    variant="outlined"/>
                <TextField
                    onChange={(e) => {
                        if (/^[0-9]?\d+$/.test(e.target.value)) {
                            changeObject(e)
                        }
                    }}
                    name='numbers'
                    value={user.numbers == null ? '' : user.numbers}
                    type='phone'
                    error={!!checkErrorValidate.number}
                    helperText={checkErrorValidate.number}
                    label="Телефон"
                    variant="outlined"/>
                <TextField
                    onChange={changeObject}
                    name='emails'
                    value={user.emails == null ? '' : user.emails}
                    type='email'
                    error={!!checkErrorValidate.email}
                    helperText={checkErrorValidate.email}
                    label="Email"
                    variant="outlined"/>
                <TextField
                    onChange={changeObject}
                    name='sip_pwd'
                    value={user.sip_pwd == null ? '' : user.sip_pwd}
                    type='email'
                    error={!!checkErrorValidate.sip_pwd}
                    helperText={checkErrorValidate.sip_pwd}
                    label="Sip Пароль"
                    variant="outlined"/>
            </Box>
            <div className='userSelect'>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">Группа</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={group == null ? '' : group}
                        onChange={(e) => {
                            handleChangeGroup(e)
                            changeObject(e)
                        }}
                        label="Age"
                        name='group_id'
                    >
                        {groupList === null ? <MenuItem>Нет данных</MenuItem> :
                            groupList.map((value, index) => {
                                return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }

                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">Департамент</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={department == null ? '' : department}
                        onChange={(e) => {
                            handleChangeDep(e)
                            changeObject(e)
                        }}
                        name='department_id'
                        label="Age"
                    >
                        {departmentList === null ? <MenuItem>Нет данных</MenuItem> :
                            departmentList.map((value, index) => {
                                return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">Должность</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={jobTitle == null ? '' : jobTitle}
                        onChange={(e) => {
                            handleChangeJob(e)
                            changeObject(e)
                        }}
                        label="Age"
                        name='position_id'
                    >
                        {jobTitleList === null ? <MenuItem>Нет данных</MenuItem> :
                            jobTitleList.map((value, index) => {
                                return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <Image
                    file={user.image}
                    onChange={changeImage}
                />
            </div>
            <div className='addButtonUser'>
                <button onClick={handleClose} className='buttonRole'>Отмена</button>
                <button
                    style={{background: '#1976d2', color: 'white'}}
                    className='buttonRole'
                    onClick={addUserAxios}
                >Добавить
                </button>
            </div>
        </div>

    );
}


export default UserAdd
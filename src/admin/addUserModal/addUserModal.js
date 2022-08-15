import React, {useEffect, useReducer, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {userReduce, users} from "../userAdd";
import './addUserModal.css'
import axios from "axios";
import Joi from "joi";

const AddUserModal = ({handleClose, setRestartList, restartList}) => {

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
            .alphanum()
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
        number: Joi.number()
            .integer()
            .required()
            .messages({
                'number.base': "введите номер"
            }),
        email: Joi.string()
            .required()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .messages({
                'string.empty': "введите email",
                'string.pattern.base': 'недопустимые символы'
            }),
    })

    const addUserAxios = () => {
        const checkValidate = buttonAction === 'user' ?
            schema.validate({
                login: user.login,
                password: user.pwd,
                username: user.name,
                number: user.numbers,
                email: user.emails
            }) : schema.validate({
                username: user.name,
                number: user.numbers,
                email: user.emails
            })

        console.log(checkValidate)
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
            axios.post('http://localhost:8088/admin/users/create', request)
                .then((resp) => {
                    handleClose()
                    setRestartList(restartList + 1)
                    console.log(resp)
                }).catch((error) => {
                setRestartList(restartList = 1)
                console.log(error)
            })
        }

    }

    useEffect(() => {

        axios.post('http://localhost:8088/admin/groups/list', {
            token: localStorage.getItem('access_token'),
        }).then((groups) => {
            setGroupList(groups.data.groups)
        }).catch((error) => {
            console.log(error)
        })

        axios.post('http://localhost:8088/admin/departments/list', {
            token: localStorage.getItem('access_token')
        }).then((department) => {
            setDepartmentList(department.data.departments)
        }).catch((error) => {
            console.log(error)
        })

        axios.post('http://localhost:8088/admin/positions/list', {
            token: localStorage.getItem('access_token'),
        }).then((positions) => {
            setJobTitleList(positions.data.positions)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
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
                {buttonAction === 'user' ? <div className='inputUser'>
                    <TextField
                        onChange={changeObject}
                        name='login'
                        value={user.login}
                        id="outlined-basic"
                        error={!!checkErrorValidate.login}
                        helperText={checkErrorValidate.login}
                        label="Логин"
                        variant="outlined"/>
                    <TextField
                        onChange={changeObject}
                        name='pwd'
                        type='password'
                        id="outlined-basic"
                        error={!!checkErrorValidate.password}
                        helperText={checkErrorValidate.password}
                        label="Пароль"
                        value={user.pwd}
                        variant="outlined"/>
                </div> : ''
                }
                <TextField
                    onChange={changeObject}
                    name='name'
                    value={user.name}
                    id="outlined-basic"
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
                    value={user.numbers}
                    type='phone'
                    id="outlined-basic"
                    error={!!checkErrorValidate.number}
                    helperText={checkErrorValidate.number}
                    label="Телефон"
                    variant="outlined"/>
                <TextField
                    onChange={changeObject}
                    name='emails'
                    value={user.emails}
                    type='email'
                    id="outlined-basic"
                    error={!!checkErrorValidate.email}
                    helperText={checkErrorValidate.email}
                    label="Email"
                    variant="outlined"/>
            </Box>
            <div className='userSelect'>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">Группа</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={group}
                        onChange={(e) => {
                            handleChangeGroup(e)
                            changeObject(e)
                        }}
                        label="Age"
                        name='group_id'
                    >
                        {
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
                        value={department}
                        onChange={(e) => {
                            handleChangeDep(e)
                            changeObject(e)
                        }}
                        name='department_id'
                        label="Age"
                    >
                        {
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
                        value={jobTitle}
                        onChange={(e) => {
                            handleChangeJob(e)
                            changeObject(e)
                        }}
                        label="Age"
                        name='position_id'
                    >
                        {
                            jobTitleList.map((value, index) => {
                                return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            <div className='addButtonUser'>
                <button onClick={handleClose} className='buttonRole'>Отмена</button>
                <button
                    style={{background: 'green', color: 'white'}}
                    className='buttonRole'
                    onClick={addUserAxios}
                >Добавить
                </button>
            </div>
        </div>

    );
}


export default AddUserModal
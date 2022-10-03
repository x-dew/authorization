import React, {useEffect, memo, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import '../userAdd/userAdd.css'
import axios from "axios";
import Joi from "joi"
import Image from "../image/image";


const UserChange = React.memo(({handleClose, setRestartList, userChangeId, restartList}) => {
    const [groupId, setGroupId] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [positionId, setPositionId] = useState('')

    const [errorValidate, setErrorValidate] = useState({})

    //Списки
    const [groups, setGroups] = useState([])
    const [departments, setDepartments] = useState([])
    const [positions, setPositions] = useState([])
    //Данные пользователя
    const [user, setUser] = useState({})
    const styleText = (value, text) => value.name === text ? {color: 'red'} : {color: 'black'}

    const changeImage = (file) => {
        setUser(user => ({...user, image: file}))
    }

    const handleChangeGroup = (event: SelectChangeEvent, name) => {
        setGroupId(event.target.value)
    };

    const handleChangeDep = (event: SelectChangeEvent, name) => {
        setDepartmentId(event.target.value)
    };

    const handleChangeJob = (event: SelectChangeEvent, name) => {
        setPositionId(event.target.value)
    };


    const schema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .messages({
                'string.email': 'введите действительную почту',
                'string.empty': "введите email"
            }),
        username: Joi.string()
            .required()
            .pattern(/^[a-zA-Z]+$/)
            .min(3)
            .max(10)
            .messages({
                'string.pattern.base': 'недопустимые символы',
                'string.empty': "введите имя",
                'string.min': 'длинна не должа быть меньше 3 символов',
                'string.max': 'длинна не должа превышать 10 символов',
            }),
        password: Joi.string()
            .min(8)
            .max(15)
            .empty('')
            .messages({
                'string.pattern.base': 'недопустимые символы',
                'string.min': 'длинна не должа быть меньше 8 символов',
                'string.max': 'длинна не должа превышать 15 символов',
            }),
        number: Joi.number()
            .integer()
            .required()
            .messages({
                'number.base': 'введите телефон',
            }),
        login: Joi.string()
            .min(5)
            .max(15)
            .messages({
                'string.empty': "введите логин",
                'string.min': 'не менее 5 символов',
                'string.max': 'не больше 15 символов',
                'string.base': 'введите логин',
                'string.pattern.base': 'недопустимые символы'
            })
    })

    const changeUserData = (e) => {
        const validate = user.role !== 'contact' ? schema.validate({
            email: user.email,
            password: user.pwd,
            username: user.name,
            number: user.number,
            login: user.login
        }) : schema.validate({
            email: user.email,
            username: user.name,
            number: user.number,
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
            const dataUser = {
                ...user,
                "pwd": user.pwd || null,
                "group_id": groupId === '' ? null : groupId === 'delete' ? null : groupId,
                "position_id": positionId === '' ? null : positionId === 'delete' ? null : positionId,
                "department_id": departmentId === '' ? null : departmentId === 'delete' ? null : departmentId,
                "numbers": [user.number],
                "emails": [user.email],
                "token": localStorage.getItem('access_token'),
            }
            axios.put(`http://localhost:8089/admin/users/${userChangeId}`, dataUser)
                .then((resp) => {
                    setRestartList(restartList + 1)
                    handleClose(e)
                }).catch((error) => {
                setRestartList(restartList = 1)
                console.error(error)
            })
        }

    }

    const deleteUser = (e) => {
        handleClose(e)
        axios.delete(`http://localhost:8089/admin/users/${userChangeId}`, {
            data: {
                token: localStorage.getItem('access_token')
            }
        }).then((del) => {
            setRestartList(restartList + 1)
        })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        axios.post(`http://localhost:8089/admin/users/${userChangeId}`, {
            token: localStorage.getItem('access_token')
        }).then((res) => {
            setGroupId(res.data?.group?.id)
            setDepartmentId(res.data?.department?.id)
            setPositionId(res.data?.position?.id)
            setUser({
                ...res.data,
                role: res.data.role.name,
                number: res.data.numbers && res.data.numbers.length > 0 ? res.data.numbers[0].number : "",
                email: res.data.emails && res.data.emails.length > 0 ? res.data.emails[0].email : "",
            })
        })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {

        axios.post('http://localhost:8089/admin/groups/list', {token: localStorage.getItem('access_token'),})
            .then((res) => {
                res.data.groups && res.data.groups.push({id: 'delete', name: 'Удалить Группу'})
                setGroups(res.data.groups)
            })
            .catch(error => console.error(error))

        axios.post('http://localhost:8089/admin/departments/list', {token: localStorage.getItem('access_token'),})
            .then((res) => {
                res.data.departments && res.data.departments.push({id: 'delete', name: 'Удалить Департамент'})
                setDepartments(res.data.departments)
            })
            .catch(error => console.error(error))

        axios.post('http://localhost:8089/admin/positions/list', {token: localStorage.getItem('access_token'),})
            .then((res) => {
                res.data.positions && res.data.positions.push({id: 'delete', name: 'Удалить Должность'})
                setPositions(res.data.positions)
            })
            .catch(error => console.error(error))

    }, [userChangeId])

    return (
        <div className='changeUserInput'>
            <div className='messageError'></div>
            <div className='checkbox'>
                <p>Роль</p>
                <div className='checkboxButton'>
                    <button
                        className={user.role === 'user' ? 'buttonRole actionRole' : 'buttonRole'}
                        style={{cursor: 'inherit'}}
                        name='role'
                        disabled={true}
                    >Пользователь
                    </button>
                    <button
                        className={user.role === 'admin' ? 'buttonRole actionRole' : 'buttonRole'}
                        style={{cursor: 'inherit'}}
                        name='role'
                        disabled={true}
                    >Администратор
                    </button>
                    <button
                        className={user.role === 'contact' ? 'buttonRole actionRole' : 'buttonRole'}
                        style={{cursor: 'inherit'}}
                        name='role'
                        disabled={true}
                    >Контакт
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
                {
                    user.role !== 'contact' ? <div className='inputUser'>
                        <TextField
                            onChange={(e) => {
                                setUser(user => ({...user, login: e.target.value}))
                            }}
                            error={!!errorValidate.login}
                            helperText={errorValidate.login}
                            name='login'
                            label='Логин'
                            value={user.login == null ? '' : user.login}
                            variant="outlined"/>
                        <TextField
                            onChange={(e) => {
                                setUser(user => ({...user, pwd: e.target.value}))
                            }}
                            name='pwd'
                            type='text'
                            error={!!errorValidate.password}
                            helperText={errorValidate.password}
                            label='Пароль'
                            value={user.pwd == null ? '' : user.login}
                            variant="outlined"/>

                    </div> : ''
                }
                <TextField
                    onChange={(e) => {
                        setUser(user => ({...user, name: e.target.value}))
                    }}
                    name='name'
                    value={user.name == null ? '' : user.name}
                    error={!!errorValidate.username}
                    helperText={errorValidate.username}
                    label='Имя'
                    variant="outlined"/>
                <TextField
                    onChange={(e) => {
                        setUser(user => ({...user, number: e.target.value}))
                    }}
                    value={user.number == null ? '' : user.number}
                    label='Номер'
                    name='numbers'
                    type='text'
                    error={!!errorValidate.number}
                    helperText={errorValidate.number}
                    variant="outlined"/>
                <TextField
                    onChange={(e) => {
                        setUser(user => ({...user, email: e.target.value}))
                    }}
                    value={user.email == null ? '' : user.email}
                    label='Email'
                    name='emails'
                    type='email'
                    error={!!errorValidate.email}
                    helperText={errorValidate.email}
                    variant="outlined"/>
                <TextField
                    onChange={(e) => {
                        setUser(user => ({...user, sip_pwd: e.target.value}))
                    }}
                    name='sip_pwd'
                    value={user.sip_pwd == null ? '' : user.sip_pwd}
                    type='text'
                    error={!!errorValidate.sip_pwd}
                    helperText={errorValidate.sip_pwd}
                    label="Sip Пароль"
                    variant="outlined"/>
            </Box>
            <div className='userSelect'>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel
                        id="demo-multiple-name-label">Группа</InputLabel>
                    <Select
                        value={groupId == null ? '' : groupId}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        onChange={handleChangeGroup}
                        label="Name"
                        name='groups'
                    >
                        {groups === null ? <MenuItem>Нет данных</MenuItem> :
                            groups.map((value, index) => {
                                return <MenuItem
                                    style={styleText(value, 'Удалить Группу')}
                                    key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel
                        id="demo-multiple-name-label">Департамент</InputLabel>
                    <Select
                        value={departmentId == null ? '' : departmentId}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        name='departments'
                        label="Name"
                        onChange={handleChangeDep}
                    >
                        {departments === null ? <MenuItem>Нет данных</MenuItem> :
                            departments.map((value, index) => {
                                return <MenuItem
                                    style={styleText(value, 'Удалить Департамент')}
                                    key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel
                        id="demo-multiple-name-label">Должность</InputLabel>
                    <Select
                        value={positionId == null ? '' : positionId}
                        onChange={handleChangeJob}
                        label="Name"
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        name='positions'
                    >
                        {positions === null ? <MenuItem>Нет данных</MenuItem> :
                            positions.map((value, index) => {
                                return <MenuItem
                                    style={styleText(value, 'Удалить Должность')}
                                    key={index} value={value.id}>{value.name}</MenuItem>
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
                    onClick={changeUserData}
                    className='checkboxButtonAction'
                >Сохранить
                </button>
                <button
                    onClick={deleteUser}
                    style={{background: 'red', color: 'white'}}
                    className='buttonRole'
                >Удалить
                </button>
            </div>
        </div>
    )
})
export default UserChange
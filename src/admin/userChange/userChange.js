import React, {useEffect, useReducer, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import '../addUserModal/addUserModal.css'
import axios from "axios";


const UserChange = ({handleClose, setRestartList, userChangeId, restartList}) => {
    const [user, setUser] = useState({
        role: "",
        login: "",
        pwd: null,
        name: "",
        number: "",
        email: "",
        group: {},
        department: {},
        position: {}
    })
    const [groups, setGroups] = useState([])
    const [departments, setDepartments] = useState([])
    const [positions, setPositions] = useState([])


    const [dataUser, setDataUser] = useState({})
    const [arrayData, setArrayData] = useState({
        group: [],
        department: [],
        jobTitle: [],
        number: [],
        email: [],
        id: 0,
        login: "",
        name: "",
        pwd: null,
        role: "",
        status: 0,
    })

    const [examination, setExamination] = useState('')


    const handleChangeGroup = (event: SelectChangeEvent, name) => {
        setUser(user => {
            return {...user, group: {id:event.target.value}}
        })
    };

    const handleChangeDep = (event: SelectChangeEvent, name) => {
        setArrayData(userDataChange => {
            return {...userDataChange, department: event.target.value}
        })
    };

    const handleChangeJob = (event: SelectChangeEvent, name) => {
        setArrayData(userDataChange => {
            return {...userDataChange, positions: event.target.value}
        })
    };


    const changeUserData = (e) => {
        handleClose(e)
        const dataUsers = {
            ...dataUser,
            "pwd": dataUser.pwd || null,
            "numbers": arrayData.number,
            "emails": arrayData.email,
            "role": dataUser.role.name,
            "token": localStorage.getItem('access_token'),
        }
        axios.put(`http://localhost:8088/admin/users/${userChangeId}`, dataUsers
        ).then((resp) => {
            setRestartList(restartList + 1)
        }).catch((error) => {
            setRestartList(restartList = 1)
            console.log(error)
        })
    }

    const deleteUser = (e) => {
        handleClose(e)
        axios.delete(`http://localhost:8088/admin/users/${userChangeId}`, {
            data: {
                token: localStorage.getItem('access_token')
            }
        }).then((del) => {
            setRestartList(restartList + 1)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        axios.post(`http://localhost:8088/admin/users/${userChangeId}`, {
            token: localStorage.getItem('access_token')
        }).then((res) => {
            setUser({
                ...res.data,
                number: res.data.numbers && res.data.numbers[0].number || "",
                email: res.data.emails && res.data.emails[0].email || "",
            })
        })
            .catch((error) => {
                console.log(error)
            })
    }, userChangeId)

    useEffect(() => {

        axios.post('http://localhost:8088/admin/groups/list', {token: localStorage.getItem('access_token'),})
            .then(res => setGroups(res.data.groups))
            .catch(error => console.log(error))

        axios.post('http://localhost:8088/admin/departments/list', {token: localStorage.getItem('access_token'),})
            .then(res => setDepartments(res.data.departments))
            .catch(error => console.log(error))

        axios.post('http://localhost:8088/admin/positions/list', {token: localStorage.getItem('access_token'),})
            .then(res => setPositions(res.data.positions))
            .catch(error => console.log(error))

    }, [])


    const userFunLogin = (e) => {
        if (e.target.value === '') {
            setRestartList(restartList = 1)
            setExamination('no')
        } else {
            setExamination('yes')
        }
        setDataUser(userDataChange => {
            return {...userDataChange, login: e.target.value}
        })
    }

    return (
        <div className='changeUserInput'>
            <div className='checkbox'>
                <p>Роль</p>
                <div className='checkboxButton'>
                    <button
                        className={arrayData.role === 'user' ? 'buttonRole actionRole' : 'buttonRole'}
                        style={{cursor: 'inherit'}}
                        name='role'
                        disabled={arrayData.role === 'contact'}
                    >Пользователь
                    </button>
                    <button
                        disabled={arrayData.role === 'user'}
                        style={{cursor: 'inherit'}}
                        className={arrayData.role === 'contact' ? 'buttonRole actionRole' : 'buttonRole'}
                        name='role'
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
                <TextField
                    onChange={userFunLogin}
                    className={examination === 'no' ? 'borderColorRed' : ''}
                    name='login'
                    id="outlined-basic"
                    label={examination === 'no' ? 'Придумайте логин' : 'Логин'}
                    placeholder={examination === 'no' ? 'Придумайте логин' : ''}
                    value={user.login}
                    variant="outlined"/>
                <TextField
                    onChange={(e) => {
                        setDataUser(userDataChange => {
                            return {...userDataChange, pwd: e.target.value}
                        })
                    }}
                    name='pwd'
                    id="outlined-basic"
                    label='Пароль'
                    value={user.pwd}
                    variant="outlined"/>
                <TextField
                    onChange={(e) => {
                        setDataUser(userDataChange => {
                            return {...userDataChange, name: e.target.value}
                        })
                    }}
                    name='name'
                    id="outlined-basic"
                    value={user.name}
                    label='Имя'
                    variant="outlined"/>
                <TextField
                    onChange={(e) => setArrayData(userDataChange => {
                        return {
                            ...userDataChange, number: dataUser.emails.map(value => {
                                return value.email = e.target.value
                            })
                        }
                    })}
                    value={user.number}
                    label='Номер'
                    name='numbers'
                    type='text'
                    id="outlined-basic"
                    variant="outlined"/>
                <TextField
                    onChange={(e) => setArrayData(userDataChange => {
                        return {
                            ...userDataChange, email: dataUser.emails.map(value => {
                                return value.email = e.target.value
                            })
                        }
                    })
                    }
                    value={user.email}
                    label='Email'
                    name='emails'
                    type='email'
                    id="outlined-basic"
                    variant="outlined"/>
            </Box>
            <div className='userSelect'>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel
                        id="demo-simple-select-standard-label">Группа</InputLabel>
                    <Select
                        value={user.group.id}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={handleChangeGroup}
                        /*onClick={(e) => {
                            setDataUser(userDataChange => {
                                return {...userDataChange, group: e.target.innerText}
                            })
                        }}*/
                        label="Age"
                        name='group_id'
                    >
                        {
                            groups.map((value, index) => {
                                return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel
                        id="demo-simple-select-standard-label">Департамент</InputLabel>
                    <Select
                        value={arrayData.department_id}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name='department_id'
                        label="Age"
                        onChange={handleChangeDep}
                        /*onClick={(e) => {
                            setDataUser(userChangeDep => {
                                return {...userChangeDep, department: e.target.innerText}
                            })
                        }}*/
                    >
                        {departments.map((value, index) => {
                            return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel
                        id="demo-simple-select-standard-label">Должность</InputLabel>
                    <Select
                        value={arrayData.position_id}
                        onChange={handleChangeJob}
                        /*onClick={(e) => {
                            setDataUser(userChangePos => {
                                return {...userChangePos, position: e.target.innerText}
                            })
                        }}*/
                        label="Age"
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name='position_id'
                    >
                        {
                            positions.map((value, index) => {
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
                    onClick={changeUserData}
                    className='buttonRole'
                    disabled={examination === 'no'}
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
}
export default UserChange
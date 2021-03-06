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
        group: [],
        department: [],
        positions: [],
        number: [],
        email: [],
        group_id: "",
        departments_id: "",
        positions_id: "",
    })


    const [groups, setGroups] = useState('')
    const [departments, setDepartments] = useState('')
    const [positions, setPositions] = useState('')

    const [dataUser, setDataUser] = useState({})
    const [examination, setExamination] = useState('')
    const [messageError,setMessageError] = useState('')


    const handleChangeGroup = (event: SelectChangeEvent, name) => {
        setGroups(event.target.value)
    };

    const handleChangeDep = (event: SelectChangeEvent, name) => {
        setDepartments(event.target.value)
    };

    const handleChangeJob = (event: SelectChangeEvent, name) => {
        setPositions(event.target.value)
    };

    const changeUserData = (e) => {
        const dataUsers = {
            ...dataUser,
            "pwd": dataUser.pwd || null,
            "numbers": user.number,
            "emails": user.email,
            "group_id": groups || null,
            "department_id": departments || null,
            "position_id": positions || null,
            "role": dataUser.role.name,
            "token": localStorage.getItem('access_token'),
        }
        axios.put(`http://localhost:8088/admin/users/${userChangeId}`, dataUsers
        ).then((resp) => {
            setRestartList(restartList + 1)
            handleClose(e)
        }).catch((error) => {
            setRestartList(restartList === 1)
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
            setDataUser(res.data)
            setUser(user => {
                return {
                    ...user,
                    number: res.data.numbers.map(value => value.number),
                    email: res.data.emails.map(value => value.email),
                    group_id: res.data.group.id,
                    departments_id: res.data.department.id,
                    positions_id: res.data.position.id,
                }
            })
            console.log(res.data)
        })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    setTimeout(() => {
        if (groups === '') setGroups(user.group_id)
        if (departments === '') setDepartments(user.departments_id)
        if (positions === '') setPositions(user.positions_id)
    }, )

    useEffect(() => {

        axios.post('http://localhost:8088/admin/groups/list', {token: localStorage.getItem('access_token'),})
            .then(res => setUser(user => {
                return {...user, group: res.data.groups}
            }))
            .catch(error => console.log(error))

        axios.post('http://localhost:8088/admin/departments/list', {token: localStorage.getItem('access_token'),})
            .then(res => setUser(user => {
                return {...user, department: res.data.departments}
            }))
            .catch(error => console.log(error))

        axios.post('http://localhost:8088/admin/positions/list', {token: localStorage.getItem('access_token'),})
            .then(res => setUser(user => {
                return {...user, positions: res.data.positions}
            }))
            .catch(error => console.log(error))

    }, [userChangeId])


    const userFunLogin = (e) => {
        if (e.target.value === '') {
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
            <div><h3></h3></div>
            <div className='checkbox'>
                <p>????????</p>
                <div className='checkboxButton'>
                    <button
                        className={user.role === 'user' ? 'buttonRole actionRole' : 'buttonRole'}
                        style={{cursor: 'inherit'}}
                        name='role'
                        disabled={user.role === 'contact'}
                    >????????????????????????
                    </button>
                    <button
                        disabled={user.role === 'user'}
                        style={{cursor: 'inherit'}}
                        className={user.role === 'contact' ? 'buttonRole actionRole' : 'buttonRole'}
                        name='role'
                    >??????????????
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
                    label={examination === 'no' ? '???????????????????? ??????????' : '??????????'}
                    placeholder={examination === 'no' ? '???????????????????? ??????????' : ''}
                    value={dataUser.login}
                    variant="outlined"/>
                <TextField
                    onChange={(e) => {
                        setDataUser(userDataChange => {
                            return {...userDataChange, pwd: e.target.value}
                        })
                    }}
                    name='pwd'
                    id="outlined-basic"
                    label='????????????'
                    value={dataUser.pwd}
                    variant="outlined"/>
                <TextField
                    onChange={(e) => {
                        setDataUser(userDataChange => {
                            return {...userDataChange, name: e.target.value}
                        })
                    }}
                    name='name'
                    id="outlined-basic"
                    value={dataUser.name}
                    label='??????'
                    variant="outlined"/>
                <TextField
                    onChange={(e) => setUser(userDataChange => {
                        return {
                            ...userDataChange, number: dataUser.emails.map(value => {
                                return value.email = e.target.value
                            })
                        }
                    })}
                    value={user.number}
                    label='??????????'
                    name='numbers'
                    type='text'
                    id="outlined-basic"
                    variant="outlined"/>
                <TextField
                    onChange={(e) => setUser(userDataChange => {
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
                        id="demo-multiple-name-label">????????????</InputLabel>
                    <Select
                        value={groups}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        onChange={handleChangeGroup}
                        onClick={(e) => {
                            setDataUser(userDataChange => {
                                return {...userDataChange, group: e.target.innerText}
                            })
                        }}
                        label="Name"
                        name='groups'
                    >
                        {
                            user.group.map((value, index) => {
                                return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel
                        id="demo-multiple-name-label">??????????????????????</InputLabel>
                    <Select
                        value={departments}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        name='departments'
                        label="Name"
                        onChange={handleChangeDep}
                        onClick={(e) => {
                            setDataUser(userChangeDep => {
                                return {...userChangeDep, department: e.target.innerText}
                            })
                        }}
                    >
                        {user.department.map((value, index) => {
                            return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel
                        id="demo-multiple-name-label">??????????????????</InputLabel>
                    <Select
                        value={positions}
                        onChange={handleChangeJob}
                        onClick={(e) => {
                            setDataUser(userChangePos => {
                                return {...userChangePos, position: e.target.innerText}
                            })
                        }}
                        label="Name"
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        name='positions'
                    >
                        {
                            user.positions.map((value, index) => {
                                return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            <div className='addButtonUser'>
                <button onClick={handleClose} className='buttonRole'>????????????</button>
                <button
                    onClick={changeUserData}
                    className={examination === 'no' ? 'checkboxButtonAction checkboxButtonDisabled' : 'checkboxButtonAction'}
                    disabled={examination === 'no'}
                >??????????????????
                </button>
                <button
                    onClick={deleteUser}
                    style={{background: 'red', color: 'white'}}
                    className='buttonRole'
                >??????????????
                </button>
            </div>
        </div>
    )
}
export default UserChange
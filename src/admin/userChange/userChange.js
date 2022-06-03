import React, {useEffect, useReducer, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {userReduce, users} from "../userAdd";
import '../addUserInput/addUserInput.css'
import axios from "axios";


const UserChange = ({handleClose,setRestartList, userChangeId,restartList}) => {

    const [group, setGroup] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [jobTitle, setJobTitle] = React.useState('');
    const [dataUser, setDataUser] = useState({})

    const [number,setNumber] = useState([])
    const [email,setEmail] = useState([])
    const [groupData,setGroupData] = useState([])
    const [departmentData,setDepartmentData] = useState([])
    const [jobTitleData,setJobTitleData] = useState([])
    const [roleData,setRoleData] = useState([])

    const [groupList, setGroupList] = useState([])
    const [departmentList, setDepartmentList] = useState([])
    const [jobTitleList, setJobTitleList] = useState([])


    const handleChangeGroup = (event: SelectChangeEvent, name) => {
        setGroup(event.target.value);
    };
    const handleChangeDep = (event: SelectChangeEvent, name) => {
        setDepartment(event.target.value);
    };
    const handleChangeJob = (event: SelectChangeEvent, name) => {
        setJobTitle(event.target.value);
    };

    const [user, dispatchUsers] = useReducer(userReduce, users)

    const deleteUser = () => {
        axios.delete(`http://localhost:8088/admin/users/${userChangeId}`, {
            data: {
                token: localStorage.getItem('access_token')
            }
        }).then((del) => {
            setRestartList(restartList + 1)
            console.log(del)
        })
            .catch((error) => {
                console.log(error)
            })
    }


    useEffect(() => {
        axios.post(`http://localhost:8088/admin/users/${userChangeId}`, {
            token: localStorage.getItem('access_token')
        }).then((res) => {
            console.log(res)
            setDataUser(res.data)
            setNumber(res.data.numbers.map(value => value.number))
            setEmail(res.data.emails.map(value => value.email))
            setGroupData(res.data.group.name)
            setDepartmentData(res.data.department.name)
            setJobTitleData(res.data.position.name)
            setRoleData(res.data.role.name)
        })
            .catch((error) => {
                console.log(error)
            })
    }, userChangeId)

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
        <div className='changeUserInput'>
            <div className='checkbox'>
                <p>Роль</p>
                <div className='checkboxButton'>
                    <button
                        className={roleData === 'user' ? 'buttonRole actionRole':'buttonRole'}
                        style={{cursor:'inherit'}}
                        name='role'
                        disabled={roleData === 'contact'}
                    >Пользователь
                    </button>
                    <button
                        disabled={roleData === 'user'}
                        style={{cursor:'inherit'}}
                        className={roleData === 'contact' ? 'buttonRole actionRole':'buttonRole'}
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

                    name='login'
                    id="outlined-basic"
                    label={dataUser.login}
                    variant="outlined"/>
                {/*<TextField*/}
                {/*    name='pwd'*/}
                {/*    type='password'*/}
                {/*    id="outlined-basic"*/}
                {/*    label={dataUser.password}*/}
                {/*    variant="outlined"/>*/}
                <TextField
                    name='name'
                    id="outlined-basic"
                    label={dataUser.name}
                    variant="outlined"/>
                <TextField
                    label={number}
                    name='numbers'
                    type='text'
                    id="outlined-basic"
                    variant="outlined"/>
                <TextField
                    label={email}
                    name='emails'
                    type='email'
                    id="outlined-basic"
                    variant="outlined"/>
            </Box>
            <div className='userSelect'>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">{groupData === null ? 'Добавить группу' : `${groupData}  (Группа) `}</InputLabel>
                    <Select
                        value={group}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={(e) => {
                            handleChangeGroup(e)
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
                    <InputLabel id="demo-simple-select-standard-label">{departmentData === null ? 'Добавить департамент' : `${departmentData}  (Департамент) `}</InputLabel>
                    <Select
                        value={department}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name='department_id'
                        label="Age"
                        onChange={(e) => {
                            handleChangeDep(e)
                        }}
                    >
                        {
                            departmentList.map((value, index) => {
                                return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">{jobTitleData === null ? 'Добавить должность' : `${jobTitleData}  (Должность) `}</InputLabel>
                    <Select
                        value={jobTitle}
                        onChange={(e) => {
                            handleChangeJob(e)
                        }}
                        label="Age"
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
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
                    onClick={handleClose} className='buttonRole'>Сохранить
                </button>
                <button
                    onClick={()=> {
                        deleteUser()
                        handleClose()
                    }}
                    style={{background: 'red', color: 'white'}}
                    className='buttonRole'
                >Удалить
                </button>
            </div>
        </div>
    )
}
export default UserChange
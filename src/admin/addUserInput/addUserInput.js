import React, {useReducer, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {userReduce, users} from "../userAdd";
import './addUserInput.css'

const AddUserInput = () => {

    const [group, setGroup] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [jobTitle, setJobTitle] = React.useState('');
    const [buttonAction, setButtonAction] = useState('user')

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
    console.log(user)
    const changeObject = (e) => {
        dispatchUsers({
                payload: {
                    name: e.target.name,
                    value: e.target.value
                }
            }
        )
    }

    return (
        <div className='addUserInput'>
            <div className='checkbox'>
                <p>Роль</p>
                <div className='checkboxButton'>
                    <button
                        onClick={(e)=>{
                            dispatchUsers({
                                payload:{
                                   name:e.target.name,
                                   value:'user'
                                }
                            })
                            setButtonAction('user')
                        }}
                        name='role'
                        className={buttonAction === 'user' ? 'buttonRole checkboxButtonAction' : 'buttonRole'}>Пользователь
                    </button>
                    <button
                        onClick={(e)=>{
                            dispatchUsers({
                                payload:{
                                    name:e.target.name,
                                    value:'contact'
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
                <TextField
                    onChange={(e) => changeObject(e)}
                    name='login'
                    value={user.login}
                    id="outlined-basic"
                    label="Логин"
                    variant="outlined"/>
                <TextField
                    onChange={(e) => changeObject(e)}
                    name='pwd'
                    type='password'
                    id="outlined-basic"
                    label="Пароль"
                    value={user.pwd}
                    variant="outlined"/>
                <TextField
                    onChange={(e) => changeObject(e)}
                    name='name'
                    value={user.name}
                    id="outlined-basic"
                    label="Имя"
                    variant="outlined"/>
                <TextField
                    onChange={(e) => changeObject(e)}
                    name='numbers'
                    value={user.numbers}
                    type='phone'
                    id="outlined-basic"
                    label="Телефон"
                    variant="outlined"/>
                <TextField
                    onChange={(e) => changeObject(e)}
                    name='emails'
                    value={user.emails}
                    type='email'
                    id="outlined-basic"
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
                        onChange={(e)=> {
                            handleChangeGroup(e)
                            changeObject(e)
                        }}
                        label="Age"
                        name='group_id'
                    >
                        <MenuItem value={'Группа'}>Группа</MenuItem>
                        <MenuItem value={'Департамент'}>Департамент</MenuItem>
                        <MenuItem value={'Должность'}>Должность</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">Департамент</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={department}
                        onChange={(e)=> {
                            handleChangeDep(e)
                            changeObject(e)
                        }}
                        name='department_id'
                        label="Age"
                    >
                        <MenuItem value={'Группа'}>Группа</MenuItem>
                        <MenuItem value={'Департамент'}>Департамент</MenuItem>
                        <MenuItem value={'Должность'}>Должность</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">Должность</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={jobTitle}
                        onChange={(e)=> {
                            handleChangeJob(e)
                            changeObject(e)
                        }}
                        label="Age"
                        name='position_id'
                    >
                        <MenuItem value={'Группа'}>Группа</MenuItem>
                        <MenuItem value={'Департамент'}>Департамент</MenuItem>
                        <MenuItem value={'Должность'}>Должность</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>

    );
}


export default AddUserInput
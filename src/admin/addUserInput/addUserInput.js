import React, {useReducer, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {userReduce, users} from "../userAdd";
import './addUserInput.css'

const AddUserInput = () => {

    const [group, setGroup] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [jobTitle, setJobTitle] = React.useState('');
    const [buttonAction,setButtonAction] = useState('user')

    const handleChangeGroup = (event: SelectChangeEvent,name) => {
        setGroup(event.target.value);
    };
    const handleChangeDep = (event: SelectChangeEvent,name) => {
        setDepartment(event.target.value);
    };
    const handleChangeJob = (event: SelectChangeEvent,name) => {
        setJobTitle(event.target.value);
    };

    const [user,dispatchUsers] = useReducer(userReduce,users)

    return (
        <div className='addUserInput'>
            <div className='checkbox'>
                <p>Роль</p>
                <div className='checkboxButton'>
                    <button className={buttonAction === 'user' ? 'buttonRole checkboxButtonAction' : 'buttonRole'}>Пользователь</button>
                    <button className={buttonAction === 'contact' ? 'buttonRole checkboxButtonAction' : 'buttonRole'}>Контакт</button>
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
                <TextField id="outlined-basic" label="Логин" variant="outlined"/>
                <TextField id="outlined-basic" label="Пароль" variant="outlined"/>
                <TextField id="outlined-basic" label="Имя" variant="outlined"/>
            </Box>
            <div className='userSelect'>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Группа</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={group}
                        onChange={handleChangeGroup}
                        label="Age"
                    >
                        <MenuItem value={'Группа'}>Группа</MenuItem>
                        <MenuItem value={'Департамент'}>Департамент</MenuItem>
                        <MenuItem value={'Должность'}>Должность</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Департамент</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={department}
                        onChange={handleChangeDep}
                        label="Age"
                    >
                        <MenuItem value={'Группа'}>Группа</MenuItem>
                        <MenuItem value={'Департамент'}>Департамент</MenuItem>
                        <MenuItem value={'Должность'}>Должность</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Должность</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={jobTitle}
                        onChange={handleChangeJob}
                        label="Age"
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
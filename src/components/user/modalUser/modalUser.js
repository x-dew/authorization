import React, {useEffect, useState} from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import '../../../assets/styles/modalUser.css'
import '../../../assets/styles/userAdd.css'
import BackspaceIcon from '@mui/icons-material/Backspace';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Image from "../image/image";
import Joi from "joi";
import api from "../../../api";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const ModalUser = ({id, onChange}) => {
    const [user, setUser] = useState({
        login: null,
        pwd: null,
        name: "",
        role: "user",
        group_id: null,
        department_id: null,
        position_id: null,
        number: '',
        email: '',
        sip_pwd: '',
        image: ''
    })

    const [groups, setGroups] = useState([])
    const [departments, setDepartments] = useState([])
    const [positions, setPositions] = useState([])

    const [checkErrorValidate, setCheckErrorValidate] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const buttonAction = [
        {name: 'user', lagel: 'Пользователь'},
        {name: 'admin', lagel: 'Администратор'},
        {name: 'contact', lagel: 'Контакт'}
    ]


    const styleText = (value, text) => value.name === text ? {color: 'red'} : {color: 'black'}

    const handleChangeGroup = (event: SelectChangeEvent) => {
        setUser({...user, group_id: event.target.value})
    };
    const handleChangeDep = (event: SelectChangeEvent) => {
        setUser({...user, department_id: event.target.value})
    };
    const handleChangePos = (event: SelectChangeEvent) => {
        setUser({...user, position_id: event.target.value})
    };
    const handleChangeImage = (file) => {
        setUser(user => ({...user, image: file}))
    }

    const handleChangeRole = (name) => {
        setUser({...user, role: name})
    }

    const sendingData = () => {
        if (id === null) {
            createUser()
        } else {
            changeUser()
        }
    }

    useEffect(() => {
        setCheckErrorValidate('')
        api.group.list().then((res) => {
            res.data.groups && res.data.groups.push({id: null, name: 'Удалить Группу'})
            setGroups(res.data.groups)
            setIsOpen(true)
        }).catch((error) => {
            console.error(error)
        })

        api.department.list().then((res) => {
            res.data.departments && res.data.departments.push({id: null, name: 'Удалить Департамент'})
            setDepartments(res.data.departments)
            setIsOpen(true)
        }).catch((error) => {
            console.error(error)
        })

        api.position.list().then((res) => {
            res.data.positions && res.data.positions.push({id: null, name: 'Удалить Должность'})
            setPositions(res.data.positions)
            setIsOpen(true)
        }).catch((error) => {
            console.error(error)
        })

        if (id !== null) {
            api.user.view(id).then((res) => {
                handleChangeRole(res.data.role.name)
                setUser({
                    ...res.data,
                    group_id: res.data?.group?.id === undefined ? null : res.data?.group?.id,
                    department_id: res.data?.department?.id === undefined ? null : res.data?.department?.id,
                    position_id: res.data?.position?.id === undefined ? null : res.data?.position?.id,
                    role: res.data.role.name,
                    number: res.data.numbers && res.data.numbers.length > 0 ? res.data.numbers[0].number : "",
                    email: res.data.emails && res.data.emails.length > 0 ? res.data.emails[0].email : "",
                })
                setIsOpen(true)
            })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [id])

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
                'string.base': 'введите имя',
            }),

    })
    const createUser = () => {
        const checkValidate = buttonAction === 'user' || buttonAction === 'admin' ?
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
                "numbers": [user.number],
                "emails": [user.email],
            }
            api.user.create(request).then((resp) => {
                onChange('create')
                handleClose()
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const changeUser = (e) => {
        const validate = user.role !== 'contact' ? schema.validate({
            password: user.pwd,
            username: user.name,
            login: user.login,
        }) : schema.validate({
            username: user.name,
        })

        setCheckErrorValidate({})
        if (validate.error) {
            validate.error.details.forEach(v => {
                console.log(v)
                setCheckErrorValidate(e => ({
                    ...e,
                    [v.context.key]: v.message
                }))
            })
        } else {
            const dataUser = {
                ...user,
                "pwd": user.pwd || null,
                "numbers": [user.number],
                "emails": [user.email],
            }
            api.user.update(dataUser, id).then((resp) => {
                onChange('update')
                handleClose()
            }).catch((error) => {
                console.error(error)
            })
        }

    }

    const deleteUser = (e) => {
        handleClose()
        api.user.destroy(id).then((del) => {
            onChange('destroy')
        })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleClose = () => onChange('close');
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={isOpen}>
                    <Box className='modal' sx={style}>
                        <div className='modalWindows'>
                            <h3>{id === null ? 'Добавление пользователя' : 'Изменение данных пользователя'}</h3>
                            <BackspaceIcon onClick={handleClose}/>
                        </div>
                        <div className='modalInput'>
                            <div className='addUserInput'>
                                <div className='checkbox'>
                                    <p>Роль</p>
                                    <div className='checkboxButton'>
                                        {buttonAction.map((value, index) => {
                                            return <button
                                                key={index}
                                                onClick={(e) => handleChangeRole(value.name)}
                                                disabled={id !== null}
                                                name={value.name}
                                                className={user.role === value.name ? 'buttonRole checkboxButtonAction' : 'buttonRole'}>{value.lagel}
                                            </button>
                                        })}
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
                                    {user.role !== 'contact' ? <div className='inputUser'>
                                        <TextField
                                            onChange={(e) =>
                                                setUser({...user, login: e.target.value})
                                            }
                                            name='login'
                                            value={user.login == null ? '' : user.login}
                                            error={!!checkErrorValidate.login}
                                            helperText={checkErrorValidate.login}
                                            label="Логин"
                                            variant="outlined"/>
                                        <TextField
                                            onChange={(e) =>
                                                setUser({...user, pwd: e.target.value})
                                            }
                                            name='pwd'
                                            type='password'
                                            autoComplete='on'
                                            error={!!checkErrorValidate.password}
                                            helperText={checkErrorValidate.password}
                                            label="Пароль"
                                            value={user.pwd == null ? '' : user.pwd}
                                            variant="outlined"/>
                                    </div> : ''
                                    }
                                    <TextField
                                        onChange={(e) =>
                                            setUser({...user, name: e.target.value})
                                        } name='name'
                                        value={user.name == null ? '' : user.name}
                                        error={!!checkErrorValidate.username}
                                        helperText={checkErrorValidate.username}
                                        label="Имя"
                                        variant="outlined"/>
                                    <TextField
                                        onChange={(e) => {
                                            if (/^[0-9]?\d+$/.test(e.target.value)) {
                                                setUser({...user, number: e.target.value})
                                            }
                                        }}
                                        name='numbers'
                                        value={user.number == null ? '' : user.number}
                                        type='phone'
                                        error={!!checkErrorValidate.number}
                                        helperText={checkErrorValidate.number}
                                        label="Телефон"
                                        variant="outlined"/>
                                    <TextField
                                        onChange={(e) =>
                                            setUser({...user, email: e.target.value})
                                        }
                                        name='emails'
                                        value={user.email == null ? '' : user.email}
                                        type='email'
                                        error={!!checkErrorValidate.email}
                                        helperText={checkErrorValidate.email}
                                        label="Email"
                                        variant="outlined"/>
                                    <TextField
                                        onChange={(e) =>
                                            setUser({...user, sip_pwd: e.target.value})
                                        }
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
                                            value={user.group_id === null ? '' : user.group_id}
                                            onChange={handleChangeGroup}
                                            label="Age"
                                            name='group'
                                        >
                                            {groups === null ? <MenuItem>Нет данных</MenuItem> :
                                                groups.map((value, index) => {
                                                    return <MenuItem
                                                        key={index}
                                                        style={styleText(value, 'Удалить Группу')}
                                                        value={value.id}>{value.name}</MenuItem>
                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                        <InputLabel id="demo-simple-select-standard-label">Департамент</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={user.department_id == null ? '' : user.department_id}
                                            onChange={handleChangeDep}
                                            name='department'
                                            label="Age"
                                        >
                                            {departments === null ? <MenuItem>Нет данных</MenuItem> :
                                                departments.map((value, index) => {
                                                    return <MenuItem
                                                        key={index}
                                                        style={styleText(value, 'Удалить Департамент')}
                                                        value={value.id}>{value.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                        <InputLabel id="demo-simple-select-standard-label">Должность</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={user.position_id == null ? '' : user.position_id}
                                            onChange={handleChangePos}
                                            label="Age"
                                            name='position'
                                        >
                                            {positions === null ? <MenuItem>Нет данных</MenuItem> :
                                                positions.map((value, index) => {
                                                    return <MenuItem
                                                        key={index}
                                                        style={styleText(value, 'Удалить Должность')}
                                                        value={value.id}>{value.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <Image
                                        file={user.image}
                                        onChange={handleChangeImage}
                                    />
                                </div>
                                <div className='addButtonUser'>
                                    <button onClick={handleClose} className='buttonRole'>Отмена</button>
                                    <button
                                        style={{background: '#1976d2', color: 'white'}}
                                        className='buttonRole'
                                        onClick={sendingData}
                                    >
                                        {id === null ? 'Добавить' : 'Изменить'}
                                    </button>
                                    {id !== null ? <button
                                        style={{background: 'red', color: 'white'}}
                                        onClick={deleteUser}
                                        className='buttonRole'>Удалить</button> : ''}
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalUser
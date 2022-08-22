import React, {useEffect, useReducer} from 'react'
import {useState} from "react";
import './department.css'
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {logDOM} from "@testing-library/react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import ModalDepartment from "./create/modalDepartment";
import Joi from "joi";

const Department = () => {
    const [listDepartment, setListDeapartment] = useState([])
    const [newDepartment, setNewDepartment] = useState('')
    const [withdrawList, setWithdrawList] = useState('')
    const [selectedId, setSelectedId] = useState('')
    const [selectName, setSelectName] = useState('')
    const [addDepartment, setAddDepartment] = useState('')
    const [list, setList] = useState(1)
    const [open, setOpen] = useState(false);
    const [errorValidate, setErrorValidate] = useState({})

    const handleOpen = () => setOpen(true);
    const create = () => {
        const schema = Joi.object({
            username: Joi.string()
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
            username: newDepartment
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
            const dispatchData = {
                token: localStorage.getItem('access_token'),
                name: newDepartment,
            }
            axios.post('http://localhost:8088/admin/departments/create', dispatchData)
                .then((res) => {
                    setNewDepartment('')
                    setList(list + 1)
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    const upData = () => {
        const schema = Joi.object({
            username: Joi.string()
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
            username: selectName
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
            const dispatchData = {
                token: localStorage.getItem('access_token'),
                name: selectName,
            }
            axios.put(`http://localhost:8088/admin/departments/${selectedId}`, dispatchData)
                .then((res) => {
                    setList(list + 1)
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    const deleteDepartment = () => {
        axios.delete(`http://localhost:8088/admin/departments/${selectedId}`, {
            data: {token: localStorage.getItem('access_token')}
        },)
            .then((res) => {
                setOpen(false)
                setList(list + 1)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        const dispatchData = {
            token: localStorage.getItem('access_token'),
            limit: 0,
            offset: 0
        }
        axios.post('http://localhost:8088/admin/departments/list', dispatchData)
            .then((res) => {
                setListDeapartment(res.data.departments)
            }).catch((error) => {
            console.log(error)
        })
    }, [list])


    return (
        <div className='department'>
            <Accordion>
                <AccordionSummary
                    onClick={() => {
                        withdrawList === '' ? setWithdrawList('list') : setWithdrawList('')
                    }}
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className='depart_title'><h2>Департаменты</h2></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className='depart_list'>
                            <Stack className='addDep' direction="row" spacing={2}>
                                <Button onClick={() => {
                                    handleOpen()
                                    setAddDepartment('add')
                                }} variant="contained" color="success">
                                    Добавить
                                </Button>
                            </Stack>
                            {withdrawList === 'list' ? <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Имя</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listDepartment.map((value, index) => (
                                            <TableRow
                                                style={{cursor: 'pointer'}}
                                                onClick={() => {
                                                    setAddDepartment('change')
                                                    setSelectedId(value.id)
                                                    setSelectName(value.name)
                                                    handleOpen()
                                                }}
                                                key={index}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell>{value.id}</TableCell>
                                                <TableCell>{value.name}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> : ''}
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <ModalDepartment
                creat={create}
                upData={upData}
                deleteDepartment={deleteDepartment}
                open={open}
                setOpen={setOpen}
                addDepartment={addDepartment}
                handleOpen={handleOpen}
                selectName={selectName}
                setSelectName={setSelectName}
                setNewDepartment={setNewDepartment}
                newDepartment={newDepartment}
                errorValidate={errorValidate}
            />
        </div>
    )
}
export default Department
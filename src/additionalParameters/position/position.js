import React from "react";
import './position.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModalPosition from "./modalPosition";
import Joi from "joi";

const Position = () => {
    const [listPosition, setListPosition] = useState([])
    const [newPosition, setNewPosition] = useState('')
    const [withdrawList, setWithdrawList] = useState('')
    const [selectedId, setSelectedId] = useState('')
    const [selectName, setSelectName] = useState('')
    const [addPosition, setAddPosition] = useState('')
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
            username: newPosition
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
        }else {
            const dispatchData = {
                token: localStorage.getItem('access_token'),
                name: newPosition,
            }
            axios.post('http://localhost:8088/admin/positions/create', dispatchData)
                .then((res) => {
                    setNewPosition('')
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
            axios.put(`http://localhost:8088/admin/positions/${selectedId}`, dispatchData)
                .then((res) => {
                    setList(list + 1)
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    const deletePosition = () => {
        axios.delete(`http://localhost:8088/admin/positions/${selectedId}`, {
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
        axios.post('http://localhost:8088/admin/positions/list', dispatchData)
            .then((res) => {
                setListPosition(res.data.positions)
            }).catch((error) => {
            console.log(error)
        })
    }, [list])


    return (
        <div className='position'>
            <Accordion className='accordions'>
                <AccordionSummary
                    onClick={() => {
                        withdrawList === '' ? setWithdrawList('list') : setWithdrawList('')
                    }}
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className='position_title'><h2>Должности</h2></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className='position_list'>
                            <Stack className='addDep' direction="row" spacing={2}>
                                <Button onClick={() => {
                                    handleOpen()
                                    setAddPosition('add')
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
                                        {listPosition.map((value, index) => (
                                            <TableRow
                                                style={{cursor: 'pointer'}}
                                                onClick={() => {
                                                    setAddPosition('change')
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
            <ModalPosition
                creat={create}
                upData={upData}
                deletePosition={deletePosition}
                open={open}
                setOpen={setOpen}
                addPosition={addPosition}
                handleOpen={handleOpen}
                selectName={selectName}
                setSelectName={setSelectName}
                setNewPosition={setNewPosition}
                newPosition={newPosition}
                errorValidate={errorValidate}
            />
        </div>
    )
}

export default Position
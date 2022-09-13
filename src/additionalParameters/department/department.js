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
import ModalDepartment from "./modalDepartment";
import Joi from "joi";
import {useNavigate} from "react-router-dom";

const Department = () => {

    const [selectedId, setSelectedId] = useState('')
    const [selectName, setSelectName] = useState('')
    const [listDepartment, setListDeapartment] = useState([])
    const [withdrawList, setWithdrawList] = useState('')
    const [addDepartment, setAddDepartment] = useState('')
    const [open, setOpen] = useState(false);
    const [restartList, setRestartList] = useState(0)
    const navigate = useNavigate()

    const handleOpen = () => setOpen(true);

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
            navigate("/")
            console.log(error)
        })
    }, [restartList])
    return (
        <div className='department'>
            <div className='userBlockHeader'>
                <h2>Департаменты</h2>
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => {
                        setAddDepartment('add')
                        handleOpen()
                    }}
                            variant="contained" color="success">
                        Добавить
                    </Button>
                </Stack>
            </div>
            <TableContainer component={Paper}>
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
            </TableContainer>
            <ModalDepartment
                restartList={restartList}
                setRestartList={setRestartList}
                open={open}
                setOpen={setOpen}
                addDepartment={addDepartment}
                selectName={selectName}
                setSelectName={setSelectName}
                selectedId={selectedId}
            />
        </div>
    )
}
export default Department
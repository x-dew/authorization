import React, {useEffect, useReducer, useState} from 'react'
import '../assets/styles/department.css'
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
import ModalDepartmetn from "../components/department/modal";
import Joi from "joi";
import {useNavigate} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {usePagination} from "../components/layout/pagination" ;
import api from "../api";


const Department = () => {
    const [id, setId] = useState('')
    const [listDepartment, setListDeapartment] = useState([])
    const [open, setOpen] = useState(false);
    const pagination = usePagination()
    const navigate = useNavigate()

    const handleOpen = (id) => {
        setId(id || null)
        setOpen(true)
    };

    const onChange = (action) => {
        switch (action) {
            case 'close': {
                setOpen(false);
                setId(null)
                break
            }
            case 'destroy':
            case 'create': {
                if (pagination.page === 1) {
                    getDepartmentList()
                } else {
                    pagination.pageChange(null, 1);
                }
                break
            }
            case 'update': {
                getDepartmentList()
                break
            }
        }
    }

    const getDepartmentList = () => {
        api.department.amount().then((res) => {
            pagination.amountChange(res.data.amount)
            api.department.list(pagination).then((list) => {
                setListDeapartment(list.data.departments || [])
            }).catch((error) => {
                console.error(error)
            })
        }).catch((error) => {
            navigate("/")
            console.error(error)
        })
    }

    useEffect(getDepartmentList, [pagination.page])

    return (
        <div className='department'>
            <div className='userBlockHeader'>
                <h2>Департаменты</h2>
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => handleOpen()} variant="contained" color="success">
                        Добавить
                    </Button>
                </Stack>
            </div>
            {listDepartment.length > 0 ? <TableContainer component={Paper}>
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
                                onClick={() => handleOpen(value.id)}
                                key={index}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>{value.id}</TableCell>
                                <TableCell>{value.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <p className='noData'>Нет данных</p>}
            <div className='departmentPagination'>
                <Stack spacing={2}>
                    <Pagination
                        page={pagination.page}
                        onChange={pagination.pageChange}
                        count={pagination.count}
                    />
                </Stack>
            </div>
            {open === true ?
                <ModalDepartmetn
                    open={open}
                    id={id}
                    onChange={onChange}
                /> : ''
            }

        </div>
    )
}
export default Department
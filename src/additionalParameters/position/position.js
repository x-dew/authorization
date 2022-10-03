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
import {useNavigate} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {usePagination} from "../../pagination/pagination";
import ModalDepartment from "../department/modalDepartment";


const Position = () => {
    const [id, setId] = useState('')
    const [listPosition, setListPosition] = useState([])
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
            case 'destroy': {
                pagination.pageChange(null, 1)
                break
            }
            case 'create': {
                pagination.pageChange(null, 1)
                break
            }
                ;
            case 'update': {
                getPositionList()
                break
            }
        }
    }

    const getPositionList = () => {
        axios.post('http://localhost:8089/admin/positions/amount', {token: localStorage.getItem('access_token'),})
            .then((res) => {
                pagination.amountChange(res.data.amount)
                axios.post('http://localhost:8089/admin/positions/list', {
                    ...pagination,
                    token: localStorage.getItem('access_token'),
                })
                    .then((list) => {
                        setListPosition(list.data.positions || [])
                    }).catch((error) => {
                    navigate("/login")
                    console.error(error)
                })
            }).catch((error) => {
            navigate("/login")
            console.error(error)
        })
    }

    useEffect(getPositionList, [pagination.page])

    return (
        <div className='position'>
            <div className='userBlockHeader'>
                <h2>Должности</h2>
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => handleOpen()}
                            variant="contained" color="success">
                        Добавить
                    </Button>
                </Stack>
            </div>
            {listPosition !== null ? <TableContainer component={Paper}>
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
            <div className='positionPagination'>
                <Stack spacing={2}>
                    <Pagination
                        page={pagination.page}
                        onChange={pagination.pageChange}
                        count={pagination.count}
                    />
                </Stack>
            </div>
            {open === true ?
                <ModalPosition
                    open={open}
                    id={id}
                    onChange={onChange}
                /> : ''
            }
        </div>
    )
}

export default Position
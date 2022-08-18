import React, {useEffect} from 'react'
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
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {logDOM} from "@testing-library/react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


const Department = () => {
    const [listDepartment, setListDeapartment] = useState([])
    const [newDepartment, setNewDepartment] = useState('')
    const [withdrawList, setWithdrawList] = useState('')

    useEffect(() => {
        const list = {
            token: localStorage.getItem('access_token'),
            limit: 0,
            offset: 0
        }
        axios.post('http://localhost:8088/admin/departments/list', list)
            .then((res) => {
                setListDeapartment(res.data.departments)
            }).catch((error) => {
            console.log(error)
        })
    }, [])

    const create = () => {
        const request = {
            token: localStorage.getItem('access_token'),
            name: newDepartment,
        }
        axios.post('http://localhost:8088/admin/departments/create', request)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <div className='department'>
            <Accordion onClick={() => {
                withdrawList === '' ? setWithdrawList('list'):setWithdrawList('')
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className='depart_title'><h2>Департаменты</h2></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className='depart_list'>
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
        </div>
    )
}
export default Department
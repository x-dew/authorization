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

const Position = () => {
    const [listPosition, setListPosition] = useState([])
    const [newPosition, setNewPosition] = useState('')
    const [withdrawList, setWithdrawList] = useState('')
    console.log(withdrawList)

    useEffect(() => {
        const list = {
            token: localStorage.getItem('access_token'),
            limit: 0,
            offset: 0
        }
        axios.post('http://localhost:8088/admin/positions/list', list)
            .then((res) => {
                setListPosition(res.data.positions)
            }).catch((error) => {
            console.log(error)
        })
    }, [])

    const create = () => {
        const request = {
            token: localStorage.getItem('access_token'),
            name: newPosition,
        }
        axios.post('http://localhost:8088/admin/positions/create', request)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className='position'>
            <Accordion>
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

export default Position
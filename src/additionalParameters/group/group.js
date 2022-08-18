import React from "react";
import './group.css'
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

const Group = () => {
    const [listGroup, setListGroup] = useState([])
    const [newGroup, setNewGroup] = useState('')
    const [withdrawList, setWithdrawList] = useState('')

    useEffect(() => {
        const list = {
            token: localStorage.getItem('access_token'),
            limit: 0,
            offset: 0
        }
        axios.post('http://localhost:8088/admin/groups/list', list)
            .then((res) => {
                setListGroup(res.data.groups)
            }).catch((error) => {
            console.log(error)
        })
    }, [])

    const create = () => {
        const request = {
            token: localStorage.getItem('access_token'),
            name: newGroup,
        }
        axios.post('http://localhost:8088/admin/groups/create', request)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className='group'>
            <Accordion onClick={() => {
                withdrawList === '' ? setWithdrawList('list'):setWithdrawList('')
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className='group_title'><h2>Группы</h2></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className='group_list'>
                            { withdrawList === 'list' ? <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Имя</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listGroup.map((value, index) => (
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

export default Group
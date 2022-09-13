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

const Position = () => {
    const [selectedId, setSelectedId] = useState('')
    const [selectName, setSelectName] = useState('')
    const [listPosition, setListPosition] = useState([])
    const [withdrawList, setWithdrawList] = useState('')
    const [addPosition, setAddPosition] = useState('')
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
        axios.post('http://localhost:8088/admin/positions/list', dispatchData)
            .then((res) => {
                setListPosition(res.data.positions)
            }).catch((error) => {
            navigate("/login")
            console.log(error)
        })
    }, [restartList])


    return (
        <div className='position'>
            <div className='userBlockHeader'>
                <h2>Должности</h2>
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => {
                        setAddPosition('add')
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
            </TableContainer>
            <ModalPosition
                restartList={restartList}
                setRestartList={setRestartList}
                open={open}
                setOpen={setOpen}
                addPosition={addPosition}
                selectName={selectName}
                setSelectName={setSelectName}
                selectedId={selectedId}
            />
        </div>
    )
}

export default Position
import React, {useReducer} from "react";
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
import ModalGroup from "./modalGroup";
import {useNavigate} from "react-router-dom";


const Group = () => {
    const [listGroup, setListGroup] = useState([])
    const [newGroup, setNewGroup] = useState('')
    const [withdrawList, setWithdrawList] = useState('')
    const [open, setOpen] = useState(false);
    const [selectId, setSelectId] = useState(0)
    const [buttonClick, setButtonClick] = useState('')
    const [restartList, setRestartList] = useState(0)
    const navigate = useNavigate()
    const styleText = (value, text) => value === text ? {color: 'red'} : value === null ? {color: ''} : {color: 'green'}
    const handleOpen = () => setOpen(true);

    useEffect(() => {
        const getList = {
            token: localStorage.getItem('access_token'),
            limit: 0,
            offset: 0
        }
        axios.post('http://localhost:8088/admin/groups/list', getList)
            .then((res) => {
                setListGroup(res.data.groups)
            }).catch((error) => {
            navigate("/")
            console.log(error)
        })
    }, [restartList])

    return (
        <div className='group'>
            <div className='userBlockHeader'>
                <h2>Группы</h2>
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => {
                        setButtonClick('add')
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
                            <TableCell>id</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Голосовые вызовы</TableCell>
                            <TableCell>Выдео вызовы</TableCell>
                            <TableCell>Чат</TableCell>
                            <TableCell>Адрес чат сервера</TableCell>
                            <TableCell>Пороль sip</TableCell>
                            <TableCell>Адрес sip сервера</TableCell>
                            <TableCell>Порт sip</TableCell>
                            <TableCell>SIP proxy</TableCell>
                            <TableCell>STUN</TableCell>
                            <TableCell>Адрес сервера STUN</TableCell>
                            <TableCell>Транспорт</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listGroup.map((value, index) => (
                            <TableRow
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                    setSelectId(value.id)
                                    setButtonClick('change')
                                    handleOpen()
                                }}
                                key={index}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>{value.id}</TableCell>
                                <TableCell>{value.name}</TableCell>
                                <TableCell
                                    style={styleText(value.settings.is_call, false)}>
                                    {value.settings.is_call === false ? 'Нет' : 'Да'}
                                </TableCell>
                                <TableCell
                                    style={styleText(value.settings.is_vcall, false)}>
                                    {value.settings.is_vcall === false ? 'Нет' : 'да'}
                                </TableCell>
                                <TableCell
                                    style={styleText(value.settings.is_chat, false)}>
                                    {value.settings.is_chat === false ? 'Нет' : 'да'}
                                </TableCell>
                                <TableCell
                                    style={styleText(value.settings.chat_ip, false)}>
                                    {value.settings.chat_ip === null ? '' : value.settings.chat_ip}
                                </TableCell>
                                <TableCell
                                    style={styleText(value.settings.sip_pwd, false)}>
                                    {value.settings.sip_pwd === null ? '' : value.settings.sip_pwd}
                                </TableCell>
                                <TableCell
                                    style={styleText(value.settings.sip_ip, false)}>
                                    {value.settings.sip_ip === null ? '' : value.settings.sip_ip}
                                </TableCell>
                                <TableCell
                                    style={styleText(value.settings.sip_port, false)}>
                                    {value.settings.sip_port === null ? '' : value.settings.sip_port}
                                </TableCell>
                                <TableCell
                                    style={styleText(value.settings.sip_proxy, false)}>
                                    {value.settings.sip_proxy === null ? '' : value.settings.sip_proxy}</TableCell>
                                <TableCell
                                    style={styleText(value.settings.is_stun, false)}>
                                    {value.settings.is_stun === false ? 'Нет' : 'Да'}</TableCell>
                                <TableCell
                                    style={styleText(value.settings.stun_srv, false)}>
                                    {value.settings.stun_srv === null ? '' : value.settings.stun_srv}</TableCell>
                                <TableCell
                                    style={styleText(value.settings.transport, false)}>
                                    {value.settings.transport === null ? '' : value.settings.transport}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ModalGroup
                setRestartList={setRestartList}
                restartList={restartList}
                buttonClick={buttonClick}
                selectId={selectId}
                open={open}
                setOpen={setOpen
                }/>
        </div>
    )
}

export default Group
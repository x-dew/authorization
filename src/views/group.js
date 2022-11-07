import React, {useReducer} from "react";
import '../assets/styles/group.css'
import {useEffect, useState} from "react";
import axios from "axios";
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
import ModalGroup from "../components/group/modal";
import {useNavigate} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {usePagination} from "../utils/pagination";
import api from '../api'


const Group = () => {
    const [listGroup, setListGroup] = useState([])
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0)

    const navigate = useNavigate()
    const pagination = usePagination()

    const styleText = (value, text) => value === text ? {color: 'red'} : value === null ? {color: ''} : {color: 'green'}
    const handleOpen = (id) => {
        setId(id || null)
        setOpen(true)
    };

    const onChange = (active) => {
        switch (active) {
            case 'close': {
                setId(null);
                setOpen(false)
                break
            }
            case 'destroy':
            case 'create': {
                if (pagination.page === 1) {
                    getGroupList()
                } else {
                    pagination.pageChange(null, 1);
                }
            }
            case 'update': {
                getGroupList()
                break
            }
        }
    }
    const getGroupList = () => {
        api.group.amount().then((res) => {
            pagination.amountChange(res.data.amount)
            api.group.list(pagination).then((list) => {
                setListGroup(list.data.groups || [])
            }).catch((error) => {
                
                console.error(error)
            })
        }).catch((error) => {
            
            console.error(error)
        })
    }
    useEffect(getGroupList, [pagination.page])

    return (
        <div className='group'>
            <div className='userBlockHeader'>
                <h2>Группы</h2>
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => handleOpen()}
                            variant="contained" color="success">
                        Добавить
                    </Button>
                </Stack>
            </div>
            {listGroup.length > 0 ? <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='headlinesTable'>id</TableCell>
                            <TableCell className='headlinesTable'>Имя</TableCell>
                            <TableCell className='headlinesTable'>Голосовые вызовы</TableCell>
                            <TableCell className='headlinesTable'>Выдео вызовы</TableCell>
                            <TableCell className='headlinesTable'>Чат</TableCell>
                            <TableCell className='headlinesTable'>Адрес чат сервера</TableCell>
                            <TableCell className='headlinesTable'>Пороль sip</TableCell>
                            <TableCell className='headlinesTable'>Адрес sip сервера</TableCell>
                            <TableCell className='headlinesTable'>Порт sip</TableCell>
                            <TableCell className='headlinesTable'>SIP proxy</TableCell>
                            <TableCell className='headlinesTable'>STUN</TableCell>
                            <TableCell className='headlinesTable'>Адрес сервера STUN</TableCell>
                            <TableCell className='headlinesTable'>Транспорт</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listGroup.map((value, index) => (
                            <TableRow
                                style={{cursor: 'pointer'}}
                                onClick={() => handleOpen(value.id)}
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
            </TableContainer> : <p className='noData'>Нет данных</p>}
            <div className='groupPagination'>
                <Stack spacing={2}>
                    <Pagination
                        page={pagination.page}
                        onChange={pagination.pageChange}
                        count={pagination.count}
                    />
                </Stack>
            </div>

            {open === true ?
                <ModalGroup
                    open={open}
                    id={id}
                    onChange={onChange}
                /> : ''
            }
        </div>
    )
}

export default Group
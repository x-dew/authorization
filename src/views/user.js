import React, {useEffect, useState} from "react";
import '../assets/styles/listUser.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ModalUser from "../components/user/modalUser/modalUser";
import Pagination from '@mui/material/Pagination';
import {usePagination} from "../utils/pagination";
import api from "../api";

const User = () => {
    const [user, setUser] = useState([])
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('')
    const pagination = usePagination()

    const handleOpen = (id) => {
        setOpen(true)
        setId(id || null)
    };

    const getListUser = () => {
        api.user.amount().then((res) => {
            pagination.amountChange(res.data.amount)
            api.user.list(pagination).then((res) => {
                setUser(res.data.users)
            }).catch((error) => {
                console.error(error)
            })
        }).catch((error) => {
            console.error(error)

        })
    }
    useEffect(getListUser, [pagination.page])


    const onChange = (action) => {
        switch (action) {
            case 'close': {
                setOpen(false);
                // setId(null)
                break
            }
            case 'destroy':
            case 'create': {
                if (pagination.page === 1) {
                    getListUser()
                } else {
                    pagination.pageChange(null, 1);
                }
                break
            }
            case 'update': {
                getListUser()
                break
            }
        }
    }


    return (
        <div className='admin'>
            <div className='userBlock'>
                <div className='userBlockHeader'>
                    <h2>Пользователи</h2>
                    <Stack direction="row" spacing={2}>
                        <Button onClick={() => {
                            setId(null)
                            handleOpen()
                        }} variant="contained" color="success">
                            Добавить
                        </Button>
                    </Stack>
                </div>
                    <div className='userTable'>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Логин</TableCell>
                                        <TableCell>Имя</TableCell>
                                        <TableCell>Роль</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.map((value, index) => {
                                        return <TableRow
                                            style={{cursor: 'pointer'}}
                                            onClick={() => handleOpen(value.id)}
                                            key={index}
                                            sx={{}}
                                        >
                                            <TableCell>{value.id}</TableCell>
                                            <TableCell>{value.login}</TableCell>
                                            <TableCell>{value.name}</TableCell>
                                            <TableCell>{value.role.name}</TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                <div className='pagination_list'>
                    <Stack spacing={2}>
                        <Pagination
                            page={pagination.page}
                            onChange={pagination.pageChange}
                            count={pagination.count}
                            variant="outlined"
                            color="primary"/>
                    </Stack>
                </div>
            </div>
            {open === true ? <ModalUser
                id={id}
                onChange={onChange}
            /> : ''}
        </div>
    )
}

export default User
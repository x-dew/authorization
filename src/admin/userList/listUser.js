import React, {useState, useEffect} from "react";
import './listUser.css'
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ModalUser from "../modalUser/modalUser";
import {useNavigate} from "react-router-dom";
import Pagination from '@mui/material/Pagination';

const ListUser = React.memo(() => {
    const [addUser, setAddUser] = useState('')
    const [userBlock, setUserBlock] = useState([])
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const [restartList, setRestartList] = useState(false)
    const [userChangeId, setUserChangeId] = useState('')
    const [amountUser, setAmountUser] = useState(0)
    const [pageUser, setPageUser] = useState(1)
    const [limit, setLimit] = useState(3)

    const navigate = useNavigate();

    useEffect(() => {
        axios.post(`http://localhost:8089/admin/users/amount`, {
                token: localStorage.getItem('access_token')
            }
        ).then((res) => {
            setAmountUser(res.data.amount)
        })
            .catch((error) => {
                console.log(error)
            })
        axios.post(`http://localhost:8089/admin/users/list`, {
            token: localStorage.getItem('access_token')
        }).then((res) => {
            setUserBlock(res.data.users.reverse())
        }).catch((error) => {
            navigate("login")
            localStorage.setItem('access_token', '')
            console.log(error)
        })
    }, [restartList])

    const lastPage = pageUser * limit
    const firstPage = lastPage - limit
    const userList = userBlock.slice(firstPage,lastPage)

    return (
        <div className='admin'>
            <div className='userBlock'>
                <div className='userBlockHeader'>
                    <h2>Пользователи</h2>
                    <Stack direction="row" spacing={2}>
                        <Button onClick={() => {
                            handleOpen()
                            setAddUser('addUser')
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
                                {userList.map((value, index) => {
                                    return <TableRow
                                        style={{cursor: 'pointer'}}
                                        onClick={() => {
                                            setUserChangeId(value.id)
                                            handleOpen()
                                            setAddUser('userChange')
                                        }}
                                        key={index}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
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
                            onChange={(event, page) => {setPageUser(page)}}
                            count={Math.ceil(amountUser / 3)}
                            variant="outlined"
                            color="primary"/>
                    </Stack>
                </div>
            </div>
            <ModalUser
                userChangeId={userChangeId}
                addUser={addUser}
                setRestartList={setRestartList}
                handleOpen={handleOpen}
                open={open}
                setOpen={setOpen}
                restartList={restartList}/>
        </div>
    )
})

export default ListUser
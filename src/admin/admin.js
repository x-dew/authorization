import React, {useState} from "react";
import './admin.css'
import {useEffect} from "react";
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
import AddUser from "./addUser/addUser";
import {logDOM} from "@testing-library/react";



const Admin = () => {

    const [addUser,setAddUser]=useState('')
    const [userBlock,setUserBlock] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const [restartList,setRestartList] = useState('')

    useEffect(() => {
        axios.post(`http://localhost:8088/admin/users/list`, {
            token: localStorage.getItem('access_token')
        }).then((res) => {
            setUserBlock(res.data.users)
        }).catch((error) => {
            console.log(error)
        })
    },[restartList])

    const deleteUser=()=>{
        axios.delete(`http://localhost:8088/admin/users/217`,{
            data:{
                token: localStorage.getItem('access_token')
            }
        }).then((del)=>{
            setRestartList('click')
            console.log(del)})
            .catch((error)=>{
                console.log(error)
            })
    }


    return (
        <div className='admin'>
            <div className='userBlock'>
                <div className='userBlockHeader'>
                    <h2>Пользователи</h2>
                    <Stack  direction="row" spacing={2}>
                        <Button  onClick={handleOpen} variant="contained" color="success">
                            Добавить
                        </Button>
                        <Button  onClick={deleteUser} style={{background:"red"}}  variant="contained" >
                            Удалить
                        </Button>
                    </Stack>
                </div>
                <div className='userTable'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Логин</TableCell>
                                    <TableCell>Имя</TableCell>
                                    <TableCell>Роль</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userBlock.map((value,index) => (
                                    <TableRow onClick={()=>(console.log(value.id))} key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{value.id}</TableCell>
                                        <TableCell>{value.login}</TableCell>
                                        <TableCell>{value.name}</TableCell>
                                        <TableCell>{value.role.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
             <AddUser
                 setRestartList={setRestartList}
                handleOpen={handleOpen}
                open={open}
                setOpen={setOpen}/>
        </div>
    )
}

export default Admin
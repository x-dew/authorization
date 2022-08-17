import React, {useEffect} from 'react'
import {useState} from "react";
import './department.css'
import axios from "axios";


const Department = () => {
    const [create, setCreate] = useState('')
    const [newDepartment, setNewDepartment] = useState('')
    console.log(newDepartment)
    console.log(localStorage.getItem('access_token'))
    useEffect(() => {
        const request = {
            token: localStorage.getItem('access_token'),
            name: newDepartment,
        }
        axios.post('http://localhost:8088/admin/departments/create',request)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [create])


    return (
        <div>
            <input onChange={(e) => {
                setNewDepartment(e.target.value)
            }} type="text"/>
            <button onClick={()=> {
                setCreate(+ 1)
            }}>dddd</button>
        </div>
    )
}
export default Department
import React, {useState} from 'react'
import './additionalParameters.css'
import Department from "./department/department";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Group from "./group/group";
import Position from "./position/position";

const AdditionalParameters = () => {
    return (
        <div className='AdditionalParameters'>
            <div className='addi-param_title'>
                <h2>Дополнительные парметры</h2>
            </div>
            <div className='addi-param_data'>
                <Group/>
                <Department/>
                <Position/>
            </div>
        </div>
    )
}
export default AdditionalParameters
import React from 'react'
import './additionalParameters.css'
import Department from "./department/department";
import Group from "./group/group";
import Position from "./position/position";

const AdditionalParameters = () => {
    return (
        <div className='AdditionalParameters'>
            <div className='addi-param_title'>
                <h2>Дополнительные парметры</h2>
            </div>
            <div className='addi-param_data_group'>
                <Group/>
            </div>
            <div className='addi-param_data'>
                <Department/>
                <Position/>
            </div>
        </div>
    )
}
export default AdditionalParameters
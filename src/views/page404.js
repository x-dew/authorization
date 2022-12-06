import React from 'react'
import {useNavigate} from "react-router-dom";
import '../assets/styles/page404.css'

const Logout = () => {
    const navigate = useNavigate()
    return <div className='page404'>
        <h4>404</h4>
        <p>Страница не найдена((</p>
        <button onClick={(e) => navigate('/')}>Гланая страница</button>
    </div>
}
export default Logout
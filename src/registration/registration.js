import React from "react";
import './registration.css'
import {Link} from "react-router-dom";


const Registration = () => {
    return (
        <div className='registration'>'
            <div className='link'>
                <Link to="/"><h2>Home</h2></Link>
                <Link to="/authorization"><h2>Sing In</h2></Link>
            </div>
            <form className='form'>
                <div className='name input'>
                    <label id='1'>
                        Имя пользователя
                    </label>
                    <input type="text" id='1' name='name'/>
                </div>
                <div className='email input'>
                    <label id='1'>
                        Электронный адрес
                    </label>
                    <input type="email" id='1' name='email'/>
                </div>
                <div className='password input'>
                    <label id='2'>Пароль</label>
                    <input type="password" id='2' name='password'/>
                </div>
                <div>
                    <button className='button' type='submit'>Зарегистрироваться</button>
                </div>
            </form>
        </div>
    )
}

export default Registration
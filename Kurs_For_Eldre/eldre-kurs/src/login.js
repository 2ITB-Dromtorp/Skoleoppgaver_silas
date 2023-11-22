import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Home from './home';
import Register from './register';


export default function Login() {

    const navigate = useNavigate();

    return(
    <div>
        <p>this is Login</p>

        <h1>logg in</h1>

        <label>
                epost: <input type='email' value={String} onChange={change}/> 
        </label>
        <label>
                passord: <input type='password' value={String} onChange={change}/> 
        </label>

        <p onClick={() => navigate('./register')}>Har du ikke en bruker? Registrer deg!</p>
    
        <button onClick={() => navigate(-1)}> Logg in </button>

    </div>

    )

}
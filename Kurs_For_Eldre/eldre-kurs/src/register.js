import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Login from './login';


export default function Register() {

    const navigate = useNavigate();

    
    return(
        <div>
        <p>this is register</p>


        <p onClick={() => navigate(-1)}>Har du allerede bruker? Logg in!</p>

        <button onClick={() => navigate(-2)}> Registrer deg </button>
        </div>

    
    )

}
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Register from './register';
import Login from './login';

export default function Home() {

const navigate = useNavigate();

return(
    <div>
        <p>this is home</p>

        <button onClick={() => navigate('./login')}> Logg in </button>
    </div>

)

}
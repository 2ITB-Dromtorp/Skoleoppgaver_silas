import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

export default function Empty({IsLoggedIn}) {

const navigate = useNavigate();


return(
    <>
        <div className='hjem'>
            <p>.....</p>
        </div>
    </>

    

)

}
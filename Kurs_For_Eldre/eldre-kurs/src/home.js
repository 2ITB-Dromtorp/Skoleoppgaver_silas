import './App.css';
import { useNavigate } from 'react-router-dom';
import { createElement, useEffect } from 'react';
import { useState } from 'react';
import Register from './register';
import Login from './login';
import DineKurs from './dineKurs';
import TilgjengeligeKurs from './tilgjengeligeKurs';
import { FaComputer } from "react-icons/fa6";
import { FaKitchenSet } from "react-icons/fa6";
import { RiSpeakLine } from "react-icons/ri";
import { FaRunning } from "react-icons/fa";

export default function Home({setIsLogedIn}) {

const navigate = useNavigate();

const [Kurs, setKurs] = useState([
    {
        id: 1,
        kurs:'Norsk',
        tid: 'Mandag: 08:10-09:55',
        img: <RiSpeakLine className='Icons'/>,
        status:'TilgjengeligeKurs'
    },
    {
        id: 2,
        kurs:'Grunnleggende Datakunnskap',
        tid: 'Mandag: 10:00-11:30',
        img: <FaComputer className='Icons'/>,
        status:'TilgjengeligeKurs'
    },
    {
        id: 3,
        kurs:'Heimkunnskap',
        tid: 'Mandag: 12:00-12:45',
        img: <FaKitchenSet className='Icons'/>,
        status:'TilgjengeligeKurs'
    },
    {
        id: 4,
        kurs:'Kroppsøving',
        tid: 'Mandag: 12:50-14:25',
        img: <FaRunning className='Icons'/>,
        status:'TilgjengeligeKurs'
    }
])

const updateStatus=(id,newStatus)=>{
    let allKurs=Kurs;
    allKurs=allKurs.map(Kurs=>{
        if(Kurs.id===id){
            console.log('in here')
            Kurs.status=newStatus;
        }
    return Kurs
    })
    setKurs(allKurs)
}

function LogOut() {
    setIsLogedIn(false)
}

return(
    <div className='hjem'>
        <header>
            <h1>Opplæring av godt voksene</h1>
            <img src='https://silsur1.github.io/images/profile-image.jpg' alt='profil bilde' onClick={LogOut}/>
        </header>
        <div className='main'>

            <DineKurs Kurs={Kurs} setKurs={setKurs} updateStatus={updateStatus}/>
            <TilgjengeligeKurs Kurs={Kurs} setKurs={setKurs} updateStatus={updateStatus}/>
        
        </div>




    </div>

)

}
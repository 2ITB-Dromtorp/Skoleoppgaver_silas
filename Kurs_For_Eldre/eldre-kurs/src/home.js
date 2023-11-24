import './App.css';
import { useNavigate } from 'react-router-dom';
import { createElement, useEffect } from 'react';
import { useState } from 'react';
import Register from './register';
import Login from './login';
import DineKurs from './dineKurs';
import TilgjengeligeKurs from './tilgjengeligeKurs';

export default function Home() {

const navigate = useNavigate();

const [Kurs, setKurs] = useState([
    {
        id: 1,
        kurs:'Norsk',
        tid: '08:10-09:55',
        status:'TilgjengeligeKurs'
    },
    {
        id: 2,
        kurs:'Grunnleggende Datakunnskap',
        tid: '10:00-11:30',
        status:'TilgjengeligeKurs'
    },
    {
        id: 3,
        kurs:'Heimkunnskap',
        tid: '12:00-12:45',
        status:'TilgjengeligeKurs'
    },
    {
        id: 4,
        kurs:'Kroppsøving',
        tid: '12:50-14:25',
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



return(
    <div className='hjem'>
        <header>
            <img src='https://silsur1.github.io/images/profile-image.jpg' alt='profil bilde'/>
        </header>

        <div className='main'>

            <DineKurs Kurs={Kurs} setKurs={setKurs} updateStatus={updateStatus}/>
            <TilgjengeligeKurs Kurs={Kurs} setKurs={setKurs} updateStatus={updateStatus}/>

        </div>




    </div>

)

}
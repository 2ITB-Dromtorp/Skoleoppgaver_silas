import './App.css';
import { useNavigate } from 'react-router-dom';
import { createElement, useEffect } from 'react';
import { useState } from 'react';
import Register from './register';
import Login from './login';
import DineKurs from './dineKurs';
import TilgjengeligeKurs from './tilgjengeligeKurs';

export default function Home({IsLoggedIn}) {

const navigate = useNavigate();

const [InNorsk, setInNorsk] = useState(false)
const [InGrunnleggendeDatakunnskap, setInGrunnleggendeDatakunnskap] = useState(false)
const [InHeimkunnskap, setInHeimkunnskap] = useState(false)
const [InKroppsøving, setInKroppsøving] = useState(false)

const [Kurs, setKurs] = useState([
    {
        id: 1,
        kurs:'Norsk',
        status:'TilgjengeligeKurs'
    },
    {
        id: 2,
        kurs:'GrunnleggendeDatakunnskap',
        status:'TilgjengeligeKurs'
    },
    {
        id: 3,
        kurs:'Heimkunnskap',
        status:'TilgjengeligeKurs'
    },
    {
        id: 4,
        kurs:'Kroppsøving',
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

{/*
            <div className='dineKurs'>
                <div className='nameOfBox'>
                   <p>Dine kurs</p> 
                </div>

                <div className='kursNorsk'>
                    <p>Norsk</p>
                </div> {/*slutt kursNorsk}

                <div className='kursGrunnleggende_datakunnskap'>
                    <p>Grunnleggende datakunnskap</p>
                </div> {/*slutt kursGrunnleggende_datakunnskap}

                <div className='kursHeimkunnskap'>
                    <p>Heimkunnskap</p>
                </div> {/*slutt kursHeimkunnskap}

                <div className='kursKroppsøving'>
                    <p>Kroppsøving</p> 
                </div> {/*slutt kursKroppsøving}
            </div> {/*slutt dineKurs}



            <div className='tilgjengeligeKurs'>

                <div className='nameOfBox'>
                    <p>tilgjengelige Kurs</p>
                    <button>check</button>
                </div>


                <div className='lines'>
                    <div className='kursNorsk'>
                        <p>Norsk</p>

                        <button>Bli med!</button>
                    </div> {/*slutt kursNorsk}

                    <div className='kursGrunnleggende_datakunnskap'>
                        <p>Grunnleggende datakunnskap</p>

                        <button>Bli med!</button>
                    </div> {/*slutt kursGrunnleggende_datakunnskap}
                </div>

                <div className='lines'>
                    <div className='kursHeimkunnskap'>
                        <p>Heimkunnskap</p>

                        <button>Bli med!</button>
                    </div> {/*slutt kursHeimkunnskap}

                    <div className='kursKroppsøving'>
                        <p>Kroppsøving</p>

                        <button>Bli med!</button>
                    </div> {/*slutt kursKroppsøving}
                </div>

            </div> {/*slutt tilgjengeligeKurs}
*/}

        </div>




    </div>

)

}
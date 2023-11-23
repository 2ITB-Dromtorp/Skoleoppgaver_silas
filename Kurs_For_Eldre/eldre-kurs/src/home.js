import './App.css';
import { useNavigate } from 'react-router-dom';
import { createElement, useEffect } from 'react';
import { useState } from 'react';
import Register from './register';
import Login from './login';

export default function Home({IsLoggedIn}) {

const navigate = useNavigate();

const [InNorsk, setInNorsk] = useState(false)
const [InGrunnleggendeDatakunnskap, setInGrunnleggendeDatakunnskap] = useState(false)
const [InHeimkunnskap, setInHeimkunnskap] = useState(false)
const [InKroppsøving, setInKroppsøving] = useState(false)


const joinNorsk = () =>{
    setInNorsk(true)
    console.log(InNorsk)
}
const joinGrunnleggendeDatakunnskap = () =>{
    setInGrunnleggendeDatakunnskap(true)
    console.log(InGrunnleggendeDatakunnskap)
}
const joinHeimkunnskap = () =>{
    setInHeimkunnskap(true)
    console.log(InHeimkunnskap)
}
const joinKroppsøving = () =>{
    setInKroppsøving(true)
    console.log(InKroppsøving)
}
const test = () => {
    console.log("is in Norsk:",InNorsk)
    console.log("is in grunnlegende datakunnskap:", InGrunnleggendeDatakunnskap)
    console.log("is in heimkunnskap:", InHeimkunnskap)
    console.log("is in kroppsøving:",InKroppsøving)
}

if (InNorsk) {
    
}

return(
    <div className='hjem'>
        <header>
            <img src='https://silsur1.github.io/images/profile-image.jpg' alt='profil bilde'/>
        </header>

        <div className='main'>

            <div className='dineKurs'>
                <div className='nameOfBox'>
                   <p>Dine kurs</p> 
                </div>

                <div className='kursNorsk'>
                    <p>Norsk</p>
                </div> {/*slutt kursNorsk*/}

                <div className='kursGrunnleggende_datakunnskap'>
                    <p>Grunnleggende datakunnskap</p>
                </div> {/*slutt kursGrunnleggende_datakunnskap*/}

                <div className='kursHeimkunnskap'>
                    <p>Heimkunnskap</p>
                </div> {/*slutt kursHeimkunnskap*/}

                <div className='kursKroppsøving'>
                    <p>Kroppsøving</p> 
                </div> {/*slutt kursKroppsøving*/}
            </div> {/*slutt dineKurs*/}



            <div className='tilgjengeligeKurs'>

                <div className='nameOfBox'>
                    <p>tilgjengelige Kurs</p>
                    <button onClick={test}>check</button>
                </div>


                <div className='lines'>
                    <div className='kursNorsk'>
                        <p>Norsk</p>

                        <button onClick={joinNorsk}>Bli med!</button>
                    </div> {/*slutt kursNorsk*/}

                    <div className='kursGrunnleggende_datakunnskap'>
                        <p>Grunnleggende datakunnskap</p>

                        <button onClick={joinGrunnleggendeDatakunnskap}>Bli med!</button>
                    </div> {/*slutt kursGrunnleggende_datakunnskap*/}
                </div>

                <div className='lines'>
                    <div className='kursHeimkunnskap'>
                        <p>Heimkunnskap</p>

                        <button onClick={joinHeimkunnskap}>Bli med!</button>
                    </div> {/*slutt kursHeimkunnskap*/}

                    <div className='kursKroppsøving'>
                        <p>Kroppsøving</p>

                        <button onClick={joinKroppsøving}>Bli med!</button>
                    </div> {/*slutt kursKroppsøving*/}
                </div>

            </div> {/*slutt tilgjengeligeKurs*/}

        </div>




    </div>

)

}
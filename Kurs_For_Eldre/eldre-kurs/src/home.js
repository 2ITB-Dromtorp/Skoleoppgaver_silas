import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Register from './register';
import Login from './login';

export default function Home({IsLoggedIn}) {

const navigate = useNavigate();

if (IsLoggedIn == true) {
    
} else {

}

return(
    <div className='hjem'>
        <header>
            <button id='loggInKnapp' onClick={() => navigate('./login')}> Logg in </button>
        </header>

        <div className='main'>

            <div className='dineKurs'>
                <div className='nameOfBox'>
                   <p>dine kurs</p> 
                </div>

                <div className='kursNorsk'>
                    <p>norsk</p>
                </div> {/*slutt kursNorsk*/}

                <div className='kursGrunnleggende_datakunnskap'>
                    <p>Grunnleggende_datakunnskap</p>
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
                </div>


                <div className='lines'>
                    <div className='kursNorsk'>
                        <p>norsk</p>

                        <button>Bli med!</button>
                    </div> {/*slutt kursNorsk*/}

                    <div className='kursGrunnleggende_datakunnskap'>
                        <p>Grunnleggende_datakunnskap</p>

                        <button>Bli med!</button>
                    </div> {/*slutt kursGrunnleggende_datakunnskap*/}
                </div>

                <div className='lines'>
                    <div className='kursHeimkunnskap'>
                        <p>Heimkunnskap</p>

                        <button>Bli med!</button>
                    </div> {/*slutt kursHeimkunnskap*/}

                    <div className='kursKroppsøving'>
                        <p>Kroppsøving</p>

                        <button>Bli med!</button>
                    </div> {/*slutt kursKroppsøving*/}
                </div>

            </div> {/*slutt tilgjengeligeKurs*/}

        </div>




    </div>

)

}
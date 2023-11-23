import './logged_out.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Register from './register';
import Login from './login';

export default function LoggedOut({IsLoggedIn}) {

const navigate = useNavigate();


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
            </div> {/*slutt dineKurs*/}



            <div className='tilgjengeligeKurs'>

                <div className='nameOfBox'>
                    <p>tilgjengelige Kurs</p>
                </div>


                <div className='lines'>
                    <div className='kursNorsk'>
                        <p>logg in for å se tilgjengelige kurs</p>

                        <button id='loggInKnapp' onClick={() => navigate('./login')}> Logg in </button>
                    </div> {/*slutt kursNorsk*/}

                </div>

            </div> {/*slutt tilgjengeligeKurs*/}

        </div>




    </div>

)

}
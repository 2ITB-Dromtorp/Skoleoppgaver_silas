import './App.css';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Login from './login';
import { hasUnreliableEmptyValue } from '@testing-library/user-event/dist/utils';


export default function Register({setPassord, setEpost}) {

    const navigate = useNavigate();

    const[InEmail, setInEmail] = useState("");
    const[InPassword, setInPassword] = useState("");
    let ErrorMes = "";

    const change1 = Event =>{
        setInEmail(Event.target.value)

    }

    const change2 = Event =>{
        setInPassword(Event.target.value)
    }

    const registrer = () =>{
        if (InEmail.length == 0 || InPassword.length == 0) {
            console.log("fyll in feltene")
            ErrorMes = "fyll in feltene"
        } else {
            setEpost(InEmail)
            setPassord(InPassword)
            navigate(-1)  
        }

    }

    
    return(
        <div className='outBox'>
            <div className='loginBox'>
                <h1>Registrer deg!</h1>

                <label>
                        epost: <br/> <input type='email' value={InEmail} onChange={change1}/> 
                </label>
                <label>
                        passord: <br/> <input type='password' value={InPassword} onChange={change2}/> 
                </label>
                <br/>
                <button onClick={registrer}> Registrer deg </button>  
                <br/>
                <a onClick={() => navigate(-1)}>Har du allerede bruker? Logg in!</a>

                <p> {ErrorMes} </p>

                <img src='https://silsur1.github.io/images/Freddy_fazbear_by_monsuirahab-d898wex.webp' className='freddyFazbear'/>
              
            </div>
        </div>

    
    )

}
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { hasUnreliableEmptyValue } from '@testing-library/user-event/dist/utils';


export default function Register({setPassord, setUsername}) {

    const navigate = useNavigate();

    const[InUsername, setInUsername] = useState("");
    const[InPassword, setInPassword] = useState("");
    let ErrorMes = "";

    const change1 = Event =>{
        setInUsername(Event.target.value)

    }

    const change2 = Event =>{
        setInPassword(Event.target.value)
    }

    const registrer = () =>{
        if (InUsername.length == 0 || InPassword.length == 0) {
            console.log("fyll in feltene")
            ErrorMes = "fyll in feltene"
        } else {
            setUsername(InUsername)
            setPassord(InPassword)
            navigate(-1)  
        }

    }

    
    return(
        <div className='outBox'>
            <div className='loginBox'>
                <h1>Registrer deg!</h1>

                <label>
                        Username: <br/> <input type='text' value={InUsername} onChange={change1}/> 
                </label>
                <label>
                        passord: <br/> <input type='password' value={InPassword} onChange={change2}/> 
                </label>
                <br/>
                <button onClick={registrer}> Registrer deg </button>  
                <br/>
                <a onClick={() => navigate(-1)}>Har du allerede bruker? Logg in!</a>

                <p> {ErrorMes} </p>
              
            </div>
        </div>

    
    )

}
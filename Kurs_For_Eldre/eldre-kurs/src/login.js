import './login.css';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Home from './home';
import Register from './register';
import App from './App';


export default function Login({Passord, Epost, setIsLogedIn}) {

    const navigate = useNavigate();

    const[InEmail, setInEmail] = useState("")
    const[InPassword, setInPassword] = useState("")
    let ErrorMes = ""

    const change1 = Event =>{
        setInEmail(Event.target.value)

    }

    const change2 = Event =>{
        setInPassword(Event.target.value)
    }

    const loggIn = () =>{
        if (InEmail == Epost && InPassword == Passord) {
            if (Passord.length == 0 || Epost.length == 0) {
                console.log("lag en bruker")
            } else {
            setIsLogedIn(true)
            navigate(-1)                
            }
        }else{
            ErrorMes = "epost eller passord feil" 
            console.log("epost eller passord feil")
        }
    }

    

    return(
    <div className='outBox'>

        <div className='loginBox'>
            <h1>Logg in!</h1>

            <label>
                    epost: <br/> <input type='email' value={InEmail} onChange={change1}/> 
            </label>
            <label>
                    passord: <br/> <input type='password' value={InPassword} onChange={change2}/> 
            </label>
            <br/>
            <button onClick={loggIn}> Logg in </button> 
            <br/>             
            <a onClick={() => navigate('./register')}>Har du ikke en bruker? Registrer deg!</a>
        
            <p> {ErrorMes} </p>
          
            <img src='https://silsur1.github.io/images/Freddy_fazbear_by_monsuirahab-d898wex.webp' className='freddyFazbear'/>
        </div>



    </div>

    )

}
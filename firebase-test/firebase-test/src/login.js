import './login.css';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';


export default function Login({Passord, Username, setIsLogedIn}) {

    const navigate = useNavigate();

    const[InUsername, setInUsername] = useState("")
    const[InPassword, setInPassword] = useState("")
    let ErrorMes = ""

    const change1 = Event =>{
        setInUsername(Event.target.value)

    }

    const change2 = Event =>{
        setInPassword(Event.target.value)
    }

    const loggIn = () =>{
        if (InUsername == Username && InPassword == Passord) {
            if (Passord.length == 0 || Username.length == 0) {
                console.log("lag en bruker")
            } else {
            setIsLogedIn(true)
            navigate(-1)                
            }
        }else{
            ErrorMes = "Username eller passord feil" 
            console.log("Username eller passord feil")
        }
    }

    

    return(
    <div className='outBox'>

        <div className='loginBox'>
            <h1>Logg in!</h1>

            <label>
                    Username: <br/> <input type='text' value={InUsername} onChange={change1}/> 
            </label>
            <label>
                    passord: <br/> <input type='password' value={InPassword} onChange={change2}/> 
            </label>
            <br/>
            <button onClick={loggIn}> Logg in </button> 
            <br/>             
            <a onClick={() => navigate('./register')}>Har du ikke en bruker? Registrer deg!</a>
        
            <p> {ErrorMes} </p>
        
        </div>



    </div>

    )

}
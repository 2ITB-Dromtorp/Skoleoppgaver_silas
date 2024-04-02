// login.js
import './login.css';
import { useState } from 'react';

export default function Login() {
  const [InUsername, setInUsername] = useState("");
  const [InPassword, setInPassword] = useState("");
  const [errorMes, setErrorMes] = useState("");

  const change1 = (event) => {
    setInUsername(event.target.value);
  }

  const change2 = (event) => {
    setInPassword(event.target.value);
  }

    return(
    <div className='outBox'>

        <div className='loginBox'>
            <h1>Login!</h1>

            <label>
                    Username: <br/> <input type='text' value={InUsername} onChange={change1}/> 
            </label>
            <label>
                    Password: <br/> <input type='password' value={InPassword} onChange={change2}/> 
            </label>
            <br/>
            <button> Login </button> 
            <br/>
        
            <p> {errorMes} </p>
        
        </div>



    </div>

    )

}

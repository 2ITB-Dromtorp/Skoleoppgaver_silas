// register.js
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const navigate = useNavigate();
  const [InUsername, setInUsername] = useState("");
  const [InPassword, setInPassword] = useState("");
  const [errorMes, setErrorMes] = useState("");

  const change1 = (event) => {
    setInUsername(event.target.value);
  }

  const change2 = (event) => {
    setInPassword(event.target.value);
  }

  const registrer = async () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
    
    return(
        <div className='outBox'>
            <div className='loginBox'>
                <h1>Sign up!</h1>

                <label>
                        Username: <br/> <input type='text' value={InUsername} onChange={change1}/> 
                </label>
                <label>
                        Password: <br/> <input type='password' value={InPassword} onChange={change2}/> 
                </label>
                <br/>
                <button onClick={registrer}> Sign up </button>  
                <br/>
                <a onClick={() => navigate(-1)}>already have an account? Login!</a>

                <p> {errorMes} </p>
              
            </div>
        </div>

    
    )

}
// login.js
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './firebase';

export default function Login({ setIsLogedIn }) {
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

  const loggIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(InUsername, InPassword);
      setIsLogedIn(true);
      navigate(-1);
    } catch (error) {
      setErrorMes("Username or password is wrong");
      console.error(error.message);
    }
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
            <button onClick={loggIn}> Login </button> 
            <br/>             
            <a onClick={() => navigate('./register')}>don't have an account? sign up!</a>
        
            <p> {errorMes} </p>
        
        </div>



    </div>

    )

}
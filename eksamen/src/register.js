// login.js
import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistrerComp() {

  let navigate = useNavigate();

  async function insertData() {

    const userCredentials = {
      InUsername: `${InUsername}`,
      InPassword: `${InPassword}`,
    };
   
    try {
      const response = await fetch('http://localhost:3001/registrer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });
   
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      navigate(-1)
   
    } catch (error) {
      console.error('Fetch error:', error);
      console.log(error);
    }
  }


  const [InUsername, setInUsername] = useState("");
  const [InPassword, setInPassword] = useState("");

  const change1 = (event) => {
    setInUsername(event.target.value);
  }

  const change2 = (event) => {
    setInPassword(event.target.value);
  }


    return(
    <div className='outBox'>

        <div className='loginBox'>
            <h1>Registrer deg!</h1>

            <label>
                    Username: <br/> <input type='text' value={InUsername} onChange={change1}/> 
            </label>
            <label>
                    Password: <br/> <input type='password' value={InPassword} onChange={change2}/> 
            </label>
            <br/>
            <button onClick={insertData} > Registrer </button> 
            <br/>
        
        </div>



    </div>

    )

}

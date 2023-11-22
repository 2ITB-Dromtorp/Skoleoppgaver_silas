import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Register from './register';
import { useState } from 'react';

function App() {

  const [Epost, setEpost] = useState("");
  const [Passord, setPassord] = useState("");
  const [IsLogedIn, setIsLogedIn] = useState(false);

  function setPass() {

  console.log("epost:", Epost, "passord:", Passord, "er logget in?:", IsLogedIn)
  }
  
  return (


    

    <>

      <button onClick={setPass}>er logget in?</button>

       <Routes>
          <Route path="/" element={<Home IsLogedIn={IsLogedIn} />} />
          <Route path="/Login/Register" element={<Register setEpost={setEpost} setPassord={setPassord} />} />
          <Route path="/Login" element={<Login Passord={Passord} Epost={Epost} setIsLogedIn={setIsLogedIn}/>} />

          
       </Routes>


    </>

  );
}

export default App;
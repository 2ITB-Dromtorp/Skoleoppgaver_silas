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

  function setPass() {
  setEpost("ekempel@gmail.com")
  setPassord("skole123")
  console.log(Epost, Passord)
  }
  
  return (




    <>
      <button onClick={setPass}>set password</button>

       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />

          
       </Routes>


    </>


  );
}

export default App;
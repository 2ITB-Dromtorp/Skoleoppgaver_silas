import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Register from './register';
import { useState } from 'react';
import LoggedOut from './logged_out';

function App() {

  const [Epost, setEpost] = useState("");
  const [Passord, setPassord] = useState("");
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  let homePage;


  if (IsLoggedIn == true) {
    homePage = <Home />;
  } else {
    homePage = <LoggedOut />;
  }

  function setPass() {

  console.log("epost:", Epost, "passord:", Passord, "er logget in?:", IsLoggedIn)
  }
  
  return (


    <>

     {/*<button onClick={setPass}>er logget in?</button>*/} 

       <Routes>
          <Route path="/" element={homePage } />
          <Route path="/Login/Register" element={<Register setEpost={setEpost} setPassord={setPassord} />} />
          <Route path="/Login" element={<Login Passord={Passord} Epost={Epost} setIsLogedIn={setIsLoggedIn}/>} />

          
       </Routes>


    </>

  );
}

export default App;
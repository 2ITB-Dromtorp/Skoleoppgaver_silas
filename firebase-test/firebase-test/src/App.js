import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Youlikecats from './YouLikeCats';
import LoggedOut from './loggedOut';
import Login from './login';
import Register from './register';

function App() {

  const [Username, setUsername] = useState("greg");
  const [Passord, setPassord] = useState("hotdog");
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  let homePage;

  if (IsLoggedIn == true) {
    homePage = <Youlikecats setIsLogedIn={setIsLoggedIn} Username={Username}/>;
  } else {
    homePage = <LoggedOut />;
  }

  function checkLogin() {
  console.log("Username:", Username, "passord:", Passord, "er logget in?:", IsLoggedIn)
  }

  return (
    <Router>
    <>
       <Routes>
          <Route path="/" element={homePage } />
          <Route path="/Login/Register" element={<Register setUsername={setUsername} setPassord={setPassord}/>} />
          <Route path="/Login" element={<Login Passord={Passord} Username={Username} setIsLogedIn={setIsLoggedIn}/>} />
        </Routes>


    </>
    </Router>
  );
}

export default App;

// app.js
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { auth } from './firebase'; // Import your Firebase auth instance
import Youlikecats from './YouLikeCats';
import LoggedOut from './loggedOut';
import Login from './login';
import Register from './register';

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [Num, setNum] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={
              IsLoggedIn ? (
                <Youlikecats setIsLogedIn={setIsLoggedIn} Num={Num} setNum={setNum}/>
              ) : (
                <LoggedOut />
              )
            }
          />
          <Route
            path="/Login/Register"
            element={<Register />}
          />
          <Route
            path="/Login"
            element={<Login setIsLogedIn={setIsLoggedIn} />}
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;

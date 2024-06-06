import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Meny from './meny';
import LoginComp from './login';
import FylleOp from './fylle_op';
import { useState } from 'react';

function App() {

  let navigate = useNavigate();

  const [Login, setLogin] = useState(false)

  function Logout() {
    setLogin(false)
    navigate('./')
  }

  return (
    <div className="App">

      <header className="App-header">
        <div className='buttons'>
          <button onClick={() => navigate('./')}> meny </button>
          {Login === true && (
            <button onClick={() => navigate('./FylleOp')}> fylle opp </button>
          )}
        </div>

          <h1>Kantinen</h1>

        <div className='other_stuff'>
          <button onClick={() => navigate('./Login')}> Login </button>
          {Login === true && (
            <button onClick={Logout}> logut </button>
          )}

        </div> {/*slutt other_stuff*/}

      </header>

      <div className='Info'>
      <Routes>
          <Route path="/" element={<Meny /> } />
          <Route path="/Login" element={<LoginComp setLogin={setLogin}/> } />
          <Route path="/FylleOp" element={<FylleOp /> } />
          
       </Routes>
      </div>
    </div>
  );
}

export default App;

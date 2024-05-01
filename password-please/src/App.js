import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Insert from './insert';
import Utstyrom from './utstyromm';
import Ettersporsel from './ettersporsel';
import Login from './login';
import Loggedout from './loggedout';
import Lantut from './lantut';
import { useState } from 'react';

function App() {

  let navigate = useNavigate();

  const [LoginL, setLoginL] = useState()
  const [LoginE, setLoginE] = useState()
  const [ElevID, setElevID] = useState()
  let homepage;

  if (!LoginL && !LoginE){
    homepage = <Loggedout />;
  } else if (LoginL == true) {
    homepage = <Insert />;
  } else if (LoginE == true) {
    homepage = <Ettersporsel ElevID={ElevID}/>;
  }

  function Logout() {
    setLoginE(false)
    setLoginL(false)
    setElevID(null)
    navigate('./')
  }

  return (
    <div className="App">

      <header className="App-header">
        <div className='buttons'>
          <button onClick={() => navigate('./')}> hjem </button>
          <button onClick={() => navigate('./Utstyrom')}> utstyrom </button>
          <button onClick={() => navigate('./Lantut')}> lånet ut </button>
        </div> {/*slutt buttons*/ }

        <div className='other_stuff'>
          <button onClick={() => navigate('./Login')}> Login </button>
          <button onClick={Logout}> logut </button>
        </div> {/*slutt other_stuff*/}

      </header>

      <div className='Info'>
      <Routes>
          <Route path="/" element={homepage } />
          <Route path="/Utstyrom" element={<Utstyrom />} />
          <Route path="/Lantut" element={<Lantut ElevID={ElevID}/>} />
          <Route path="/Login" element={<Login setLoginL={setLoginL} setLoginE={setLoginE} setElevID={setElevID}/>} />
          
       </Routes>
      </div>
    </div>
  );
}

export default App;

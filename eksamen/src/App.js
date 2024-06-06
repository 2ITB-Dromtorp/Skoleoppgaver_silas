import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Produkter from './produkter';
import LoginComp from './login';
import RegistrerComp from './register';
import Loggedout from './loggedout';
import ProduktSide from './produktside';
import Bestilinger from './bestilinger';
import { useState } from 'react';

function App() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let navigate = useNavigate();

  const [Login, setLogin] = useState()
  const [UserID, setUserID] = useState(null)

  function Logout() {
    setLogin(false)
    setUserID(null)
    navigate('./')
  }

  return (
    <div className="App">

      <header className="App-header">
        <div className='buttons'>
          <button onClick={() => navigate('./')}> Produkter </button>
        </div> {/*slutt buttons*/ }

        <h1>Vi Hjelper Deg</h1>

        <div className='other_stuff'>
        {!Login && (<button onClick={() => navigate('./Login')}> Login </button>)}
        {Login && (<button onClick={Logout}> logut </button>)}
        {Login && (<button onClick={() => navigate('./Bestilinger')}> historikk </button>)}
        </div> {/*slutt other_stuff*/}

      </header>

      <div className='Info'>
      <Routes>
          <Route path="/" element={<Produkter /> } />
          <Route path="/Login" element={<LoginComp setLogin={setLogin} setUserID={setUserID}/>} />
          <Route path="/Login/Registrer" element={<RegistrerComp />} />
          <Route path="/ProduktSide/:id" element={<ProduktSide UserID={UserID} />} />
          <Route path="/Bestilinger" element={<Bestilinger UserID={UserID} />} />
          
       </Routes>
      </div>
    </div>
  );
}

export default App;

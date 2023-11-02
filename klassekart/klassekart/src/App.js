import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Profile from './profile';
import Home from './home';

function App() {

  /*
  function refreshPage() {
    window.location.reload(false);
  }

   <button onClick={refreshPage}>Click to reload!</button>
  */
  return (

    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:profile" element={<Profile />} />
          
       </Routes>


    </>

        

  );
}

export default App;

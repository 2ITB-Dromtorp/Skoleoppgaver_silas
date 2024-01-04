import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import { useState } from 'react';
import Report from './report';

function App() {
  
  return (


    <>

       <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/Report" element={<Report />} />

          
       </Routes>


    </>

  );
}

export default App;
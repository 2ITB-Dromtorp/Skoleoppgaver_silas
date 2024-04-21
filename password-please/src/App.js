import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from './elev';
import Update from './update';
import Insert from './insert';
import Utstyromm from './utstyromm';
import Empty from './empty';
import Klasser from './klasser';
import Utstyr_modell from './utstyr_modell';

function App() {

  let navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => navigate('./Select')}> elev </button>
        <button onClick={() => navigate('./klasser')}> klasser </button>
        <button onClick={() => navigate('./Update')}> utstyr typer </button>
        <button onClick={() => navigate('./Utstyr_modell')}> Utstyr modell </button>
        <button onClick={() => navigate('./Insert')}> utlån </button>
        <button onClick={() => navigate('./Utstyromm')}> utstyromm </button>
      </header>

      <div className='Info'>
      <Routes>
          <Route path="/" element={<Empty /> } />
          <Route path="/Select" element={<Select /> } />
          <Route path="/klasser" element={<Klasser />} />
          <Route path="/Update" element={<Update />} />
          <Route path="/Utstyr_modell" element={<Utstyr_modell />} />
          <Route path="/Insert" element={<Insert />} />
          <Route path="/Utstyromm" element={<Utstyromm />} />
          
       </Routes>
      </div>
    </div>
  );
}

export default App;

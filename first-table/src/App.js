import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from './select';
import Update from './update';
import Insert from './insert';
import Delete from './delete';
import Empty from './empty';
import F from './F';

function App() {

  let navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => navigate('./Select')}> Select </button>
        <button onClick={() => navigate('./Update')}> Update </button>
        <button onClick={() => navigate('./Insert')}> Insert </button>
        <button onClick={() => navigate('./Delete')}> Delete </button>
      </header>

      <div className='Info'>
      <Routes>
          <Route path="/" element={<Empty /> } />
          <Route path="/Select" element={<Select /> } />
          <Route path="/Update" element={<Update />} />
          <Route path="/Insert" element={<Insert />} />
          <Route path="/Delete" element={<Delete />} />
          <Route path="/F" element={<F /> } />
          
       </Routes>
      </div>
    </div>
  );
}

export default App;

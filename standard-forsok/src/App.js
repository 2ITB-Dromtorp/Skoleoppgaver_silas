import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Hurhur from './hurhur';
import Quiz from './quiz';

function App() {

  return (
    <div className="App">

          <Routes>
            <Route path="/" element={<Hurhur/>}/>
            <Route path="/quiz" element={<Quiz />}/>
          </Routes>

    </div>
  );
}

export default App;
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Hurhur from './hurhur';
import Quiz from './quiz';

function App() {

  return (
    <div className="App">
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Hurhur/>}/>
            <Route path="/quiz" element={<Quiz />}/>
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
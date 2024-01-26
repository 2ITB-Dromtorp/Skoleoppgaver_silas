import './App.css';
import freddyimg from './images/Freddy_fazbear_by_monsuirahab-d898wex.webp'
import { useState } from 'react';

function App() {

  const [HurHurHur, setHurHurHur] = useState("")

  function relative() {
    fetch("/api/get").then(async (res) => {
      return res.json()
    }).then((data) => {
      console.log(data.message)
      setHurHurHur(data.message)
    })
  }

  return (
    <div className="App">
      <button onClick={() => relative()}>Freddy fazbear</button>
      <p> {HurHurHur} </p>
      <img src={freddyimg} alt='freddy fazbear'/>
    </div>
  );
}

export default App;
import './App.css';
import freddyimg from './images/Freddy_fazbear_by_monsuirahab-d898wex.webp'
import { useState } from 'react';

export default function Hurhur() {

  const [HurHurHur, setHurHurHur] = useState("")
  const [isVisible, setIsVisible] = useState(false);

  function relative() {
    fetch("/api/get").then(async (res) => {
      return res.json()
    }).then((data) => {
      console.log(data.message)
      setHurHurHur(data.message)
      setIsVisible(true)
    })
  }

  return (
    <div className="App">
      <button onClick={() => relative()}>Freddy fazbear</button>
      <p> {HurHurHur} </p>
      {isVisible &&(
        <img src={freddyimg} alt='freddy fazbear'/>        
      )}

    </div>
  );
}
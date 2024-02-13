import './App.css';
import freddyimg from './images/Freddy_fazbear_by_monsuirahab-d898wex.webp'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Quiz from './quiz';

export default function Hurhur() {

  let navigate = useNavigate();

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

    <div className='toQuiz'>
      <button onClick={() => navigate('./Quiz')}> Quiz </button>
    </div>
    <div className='freddyFaz'>
      <button onClick={() => relative()}>Freddy fazbear</button>
      <p> {HurHurHur} </p>
      {isVisible &&(
        <img src={freddyimg} alt='freddy fazbear'/>        
      )}
    </div>


    </div>
  );
}
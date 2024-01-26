import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import catimg from './images/plomm-smaller.png'

export default function Youlikecats({Username, setIsLogedIn, Num, setNum, Person, setperson}) {

    const navigate = useNavigate();
/*
  const [Num, setNum] = useState(0);
  const [Person, setperson] = useState("");
*/
  const [isVisible, setIsVisible] = useState(true);

  
  function countUp() {
    setNum(Num+1)
    setperson(Username)
    setIsVisible(false);
  }

  function logOut() {
    setIsLogedIn(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={logOut}>logout</button>
      </header>
      <body className="App-body">
        <img src={catimg} className="App-logo" alt="cat" />
        <p>
            number of people who like cats: {Num}
            <br/>
            newest person who like cats: {Person}
        </p>
            {isVisible && (
                <button onClick={countUp}>
                    click me if you like cats!
                </button>
            )}  
      </body>
    </div>
  );
}
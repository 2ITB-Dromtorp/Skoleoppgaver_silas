import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import catimg from './images/Brown_spotted_tabby_bengal_cat_2.png'

function App() {

  const [Num, setNum] = useState(0);
  const [isVisible, setIsVisible] = useState(true);


  useEffect(() => {
    const storedVisibility = localStorage.getItem('buttonVisibility');
    if (storedVisibility) {
      setIsVisible(JSON.parse(storedVisibility));
    }
  }, []);

  function countUp() {
    setNum(Num+1)
    setIsVisible(false);
    localStorage.setItem('buttonVisibility', JSON.stringify(false));
  }

  function Fix() {
    setIsVisible(true);
    localStorage.setItem('buttonVisibility', JSON.stringify(true));
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={catimg} className="App-logo" alt="cat" />
        <p>
          number of people who like cats: {Num} 
        </p>
        {isVisible && (
        <button onClick={countUp}>
          click me if you like cats!
        </button>
      )}
      <button onClick={Fix}> fix </button>
      </header>
    </div>
  );
}

export default App;

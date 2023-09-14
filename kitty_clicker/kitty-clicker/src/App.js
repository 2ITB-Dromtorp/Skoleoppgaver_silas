import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Cat from './cat';
import Upgarde from './upgrade';

function App() {

  const [Num, setNum] = useState(0);
  const [UpNum, setUpNum] = useState(0);
  const [SpeedNum, setSpeedNum] = useState(1000);
  const [SpeedPriceMod, setSpeedPriceMod] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <div className='catland'>
          <Cat setNum={setNum} Num={Num} UpNum={UpNum} SpeedNum={SpeedNum} />
        </div> {/*slutt catland */}
        <div className='infoland'>
          
        </div> {/*slutt infoland */}
        <div className='upgradeland'>
          <Upgarde setUpNum={setUpNum} setNum={setNum} Num={Num} UpNum={UpNum} SpeedNum={SpeedNum} setSpeedNum={setSpeedNum} SpeedPriceMod={SpeedPriceMod} setSpeedPriceMod={setSpeedPriceMod} />
        </div> {/*slutt upgradeland */}
      </header>
    </div>



  );
}

export default App;

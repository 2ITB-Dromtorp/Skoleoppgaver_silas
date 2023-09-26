import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Cat from './cat';
import Upgarde from './upgrade';

function App() {

  const [Num, setNum] = useState(0);
  const [UpNum, setUpNum] = useState(0);
  const [Upgarde1priceMod, setUpgarde1priceMod] = useState(0);
  const [Upgarde2priceMod, setUpgarde2priceMod] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <div className='catland'>
          <Cat setNum={setNum} Num={Num} UpNum={UpNum} />
        </div> {/*slutt catland */}
        <div className='infoland'>
          
        </div> {/*slutt infoland */}
        <div className='upgradeland'>
          <Upgarde setUpNum={setUpNum} setNum={setNum} Num={Num} UpNum={UpNum} Upgarde1priceMod={Upgarde1priceMod} Upgarde2priceMod={Upgarde2priceMod} setUpgarde1priceMod={setUpgarde1priceMod} setUpgarde2priceMod={setUpgarde2priceMod} />
        </div> {/*slutt upgradeland */}
      </header>
    </div>



  );
}

export default App;

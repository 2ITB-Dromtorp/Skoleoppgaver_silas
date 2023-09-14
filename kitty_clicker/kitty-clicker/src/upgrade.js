import './cat.css';
import React, {ChangeEvent, useState, useEffect } from 'react'
import './App';

/*
function UpgradeA({setUpNum, Num, UpNum}) {
        
    
    
    const changeUp = () => {
        setUpNum(UpNum+1)
        console.log(UpNum)
        console.log(Num)
            
    }
    return(
        <div className ='oppgaveboks'>

        <button onClick={changeUp}> <img className='upgradePic' src='https://silsur1.github.io/images/space_cat(150.104).png'/> space cat </button>
        <br/>
        
        </div>
    );
}
*/


export default function Upgarde({setUpNum, setNum, setSpeedNum, setSpeedPriceMod, Num, UpNum, SpeedNum, SpeedPriceMod}) {

    /*const [SpeedNum, setSpeedNum] = useState(1000);
    const [SpeedPriceMod, setSpeedPriceMod] = useState(0);*/

    let spacePrice = 10 + (UpNum*13);
    let speedPrice = 100 + (SpeedPriceMod*170);

    const changeUp = () => {
        if (Num>=spacePrice) {
            setUpNum(UpNum+1)
            setNum(Num-spacePrice)
        }

            
    }

    const changeSpeed = () => {
        if (Num>=speedPrice) {
            setSpeedNum(SpeedNum-10)
            setSpeedPriceMod(SpeedPriceMod+1)
            setNum(Num-speedPrice)
        }

            
    }

    useEffect(() => {
    
        if (UpNum >= 1) {
            const myInterval = setInterval(() => {
        
                setNum(Num+(1*UpNum));
        
            }, SpeedNum);
            
            return () => clearInterval(myInterval);
        }
    
    
    });  


    return (
      <div>
        <h1>Upgardes</h1>
        <p>når du trykker på knappene så skal du få katter skjapere.</p>
        
        <button onClick={changeUp}> <img className='upgradePic' src='https://silsur1.github.io/images/space_cat(150.104).png'/> space cat {spacePrice} </button>
        <br/>
        <button onClick={changeSpeed}> cat speed {speedPrice} </button>
        <br/>
      </div>
    );
}
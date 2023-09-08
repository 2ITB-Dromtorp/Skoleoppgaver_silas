import './task.css'
import {ChangeEvent, useState, useEffect } from 'react'

function A() {

    const [Num, setNum] = useState(0);
    let svar = "";

    
    const changeUp = () => {
        setNum(Num+1)
    }

    const changeDown = () => {
        setNum(Num-1)
    }

    useEffect(() => {
    
        const myInterval = setInterval(() => {
    
            setNum(Num-1);
    
        }, 1000);
    
        return () => clearInterval(myInterval);
    
    
    });

    return(
        <div className ='oppgaveboks'>

            <button onClick={changeUp}> <img className='green' src='https://silsur1.github.io/images/green_arrow_up.png'/> </button>
            <br/>
            <p> {Num} </p> 
            <br/> 
            <button onClick={changeDown}> <img src='https://silsur1.github.io/images/red-arrow-down.png'/> </button>
            <br/> 

           
        </div>
    );
}

export default function Task6() {
    return (
      <div>
        <h1>bonus oppgave</h1>
        <p>når du trykker på pilen som peker opp så skal tallet gå opp.
            Og når du trykker på pilen som peker ned så skal talet gå ned.
        </p>
        <A />


      </div>
    );
}
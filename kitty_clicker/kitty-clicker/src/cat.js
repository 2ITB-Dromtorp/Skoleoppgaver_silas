import './cat.css';
import React, {ChangeEvent, useState, useEffect } from 'react'
import './App'


export default function Cat({setNum, Num, UpNum, SpeedNum}) {

    const changeUp = () => {
        setNum(Num+1)
    }


    useEffect(() => {
    
        if (UpNum >= 0.1) {
            const myInterval = setInterval(() => {
        
                setNum(Num+(1*UpNum));
        
            }, 1000);
            
           return () => clearInterval(myInterval);
        }
    
    
    });  


    return (
      <div>
        <h1>kitty clicker</h1>
        <p>når du trykker på katten så skal tallet gå opp.</p>

        <p> {Num.toFixed(0)} cats </p>
        <p> {UpNum.toFixed(1)} cats per second </p>


        <button onClick={changeUp}> <img className='green' src='https://silsur1.github.io/images/plomm_on_sofa.png'/> </button>
        <br/>


      </div>
    );
}
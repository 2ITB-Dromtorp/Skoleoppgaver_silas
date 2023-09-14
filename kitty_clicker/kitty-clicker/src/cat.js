import './cat.css';
import React, {ChangeEvent, useState, useEffect } from 'react'
import './App'

/*
function CatBox({setNum, Num, UpNum}) {

    
    const changeUp = () => {
        setNum(+1)
        console.log(UpNum)
    }

    

    useEffect(() => {
    
        if (UpNum >= 1) {
            const myInterval = setInterval(() => {
        
                setNum(Num+(1*UpNum));
        
            }, 1000);
            
            return () => clearInterval(myInterval);
        }
    
    
    });   



    return(
        <div className ='oppgaveboks'>

            <p> {Num} cats </p>

            <button onClick={changeUp}> <img className='green' src='https://silsur1.github.io/images/plomm_on_sofa.png'/> </button>
            <br/>

        
        </div>
    );
}
*/

export default function Cat({setNum, Num, UpNum, SpeedNum}) {

    const changeUp = () => {
        setNum(Num+1)
        console.log(UpNum)
    }

    
/*
    useEffect(() => {
    
        if (UpNum >= 1) {
            const myInterval = setInterval(() => {
        
                setNum(Num+(1*UpNum));
        
            }, 1000);
            
            return () => clearInterval(myInterval);
        }
    
    
    });   
*/


    return (
      <div>
        <h1>kitty clicker</h1>
        <p>når du trykker på katten så skal tallet gå opp.</p>

        <p> {Num} cats </p>
        <p> {UpNum} cats per {SpeedNum}ms </p>


        <button onClick={changeUp}> <img className='green' src='https://silsur1.github.io/images/plomm_on_sofa.png'/> </button>
        <br/>


      </div>
    );
}
import './cat.css';
import React, {ChangeEvent, useState, useEffect } from 'react'
import './App';

export default function Upgarde({setUpNum, setNum, setSpeedNum, setUpgarde1priceMod, setUpgarde2priceMod, Num, UpNum, Upgarde1priceMod, Upgarde2priceMod}) {

    //velge prisene på oppgraderingene
    let Upgarde1price = 10 + (Upgarde1priceMod*5);
    let Upgarde2price = 100 + (Upgarde2priceMod*10);
    let CoolUp1_1price = 100
    let CoolUp1_1 = false;


    //UpNum er auto klikker nummeret som bruker når auto klikkeren klikker for deg.
    //legge til 0.1 i UpNum
    const changeUp1 = () => {
        if (Num>=Upgarde1price) {
            setUpNum(UpNum+0.1)
            setUpgarde1priceMod(Upgarde1priceMod+1)
            setNum(Num-Upgarde1price)
        }

            
    }


    //legge til 1 i UpNum
    const changeUp2 = () => {
        if (Num>=Upgarde2price) {
            setUpNum(UpNum+1)
            setUpgarde2priceMod(Upgarde2priceMod+1)
            setNum(Num-Upgarde2price)
        }

            
    }

    const changeCoolUp1_1 = () => {
        if (Num>=Upgarde2price) {
            CoolUp1_1=true
            setNum(Num-CoolUp1_1price)
        }

            
    }

    if (CoolUp1_1 == true) {
        
    }

    //dette er auto klikkeren den har blitt flyttet over i cat.js det er en forklaring på hvordan den fungerer der
    /*
    useEffect(() => {
    
        if (UpNum >= 0.1) {
            const myInterval = setInterval(() => {
        
                setNum(Num+(1*UpNum));
        
            }, 1000);
            
           return () => clearInterval(myInterval);
        }
    
    
    });  
*/

    return (


    <div>

        <div>
            <h1>cooler Upgardes</h1>
            <button onClick={changeCoolUp1_1}> cool {Upgarde2price} </button>
            <br/>
        </div>

        <h1>Upgardes</h1>
        <p>når du trykker på knappene så skal du få katter skjapere.</p>
        
        <button onClick={changeUp1}> <img className='upgradePic' src='https://silsur1.github.io/images/space_cat(150.104).png'/> space cat {Upgarde1price} </button>
        <br/>
        <button onClick={changeUp2}> cat speed {Upgarde2price} </button>
        <br/>
    </div>
    );
}
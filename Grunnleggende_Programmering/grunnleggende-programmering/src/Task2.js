import './task.css'
import {ChangeEvent, useState } from 'react'


function A() {

    let num1 = 8;
    let num2 = 8;
    let areal = num1 * num2;
    console.log("2a) arealet er ", areal)

    return(
        <div className ='oppgaveboks'>
            <h1>a)</h1>
            <p>spørsmål: Lag et program som regner ut arealet av et rektangel. Lengden er 8 og bredden er 8. 
                Skriv dette som funksjon i javascript.</p>
            <p>svar: </p>            
        </div>
    );

}

function B() {

    let num1 = 12;
    let num2 = 8;
    let areal = (num1 * num2) / 2;
    console.log("2b) arealet av en trekant er ", areal)

    return(
        <div className ='oppgaveboks'>
            <h1>b)</h1>
            <p>Lag et program som regner ut arealet av en trekant. 
                Formelen for en trekant er A = L * B / 2 Returner arealet i funksjonen.</p>
            <p> se i console logen </p>             
        </div>
    );

}
/*
const getValues = () => {
        var oneValue = document.getElementById("aNum");
        var secondValue = document.getElementById("somenum");
        console.log(oneValue, secondValue);
    }
    */

function C() {
 
        const [inputNum, setInputNum] = useState("");
      
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          // 👇 Store the input value to local state
          setInputNum(e.target.value);
        };

        const [inputNum2, setInputNum2] = useState("");
      
        const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
          // 👇 Store the input value to local state
          setInputNum2(e.target.value);
        };

    

    function Trekant() {
        const num1 = inputNum;
        const num2 = inputNum2;
        let arealT = (num1 * num2) / 2;
        console.log("2c) arealet av trekanten er ", arealT)

        return(arealT)
    }
    function Rektangel() {
        const num1 = inputNum;
        const num2 = inputNum2;
        let arealR = (num1 * num2);
        console.log("2c) arealet av rektangelet er ", arealR)

        return(arealR)
    }
    

    return(
        <div className ='oppgaveboks'>
            <h1>c)</h1>
            <p>Lag et program som heter areal (lengde, bredde).
                Denne har to input-parametre; lengde og bredde. Funksjonen skal regne ut både arealet av et rektangel og en trekant.
                Men du skal ikke skrive utregningen på nytt.
                Returner arealet fra rektangel og en trekant. 
                Bruk valgfrie sider som lengde og bredde.</p>
                <>
                    <label>
                        skriv et tall: <input type="number" onChange={handleChange2} value={inputNum2} />
                    </label>
                    <br/>
                    <label>
                        skriv et tall til: <input type="number" onChange={handleChange} value={inputNum} />
                    </label>
                    <br/>
                        
                    <button onClick={Trekant} className='Button'>
                        trekant areal 
                    </button>

                    <button onClick={Rektangel} className='Button'>
                        rektangel areal 
                    </button>

                    <p>arealet av trekanten er: {Trekant('arealT')}</p>
                    <p>arealet av rektangelet er: {Rektangel('arealR')}</p>
                    
                    <hr />
                </>            
        </div>
    );

}

/*
function Trekant2({ lengde, bredde }) {
    console.log('Lengde',lengde, 'Bredde', bredde);
    let num1 = 3;
    let num2 = 7;
    let areal = (num1 * num2) / 2;
    console.log("2b) arealet av en trekant er ", areal)
}
*/

export default function Task2() {
    return (
      <div>
        <h1>oppgave 2</h1>
        <A />
        <B />
        <C />
      </div>
    );
}
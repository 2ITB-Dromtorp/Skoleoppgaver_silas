import './task.css'
import {ChangeEvent, useState } from 'react'

function A() {

    const [friendNum, setfriendNum] = useState(0);

    const [Num, setNum] = useState("");
    let svar = "";

    
    const test = () => {
        console.log("nåverende nummer er", friendNum)
    }

    const change = event => {
        setNum(event.target.value)
    }

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() 
                * (max - min + 1)) + min;
    };
  
    const friendChange = () => {
        setfriendNum(randomNumberInRange(0, 50));
        console.log("forrige nummer var", friendNum);
    };
        

    if (Num == friendNum) {
        svar = "du har riktig nummer :)"
    } 
    else if (Num < friendNum){
        svar = "nummeret ditt er for lavt"
    }
    else{
        svar = "nummeret ditt er for høyt"
    }


    return(
        <div className ='oppgaveboks'>

            <label>
                gjett på et tall mellom  0 og 50: <input type='number' value={Num} onChange={change}/> 
            </label>
            <button onClick={test}>test</button>
            <button onClick={friendChange}>velg et tall fra 0-50</button>

            <p> {svar} </p>             
        </div>
    );
}

export default function Task4() {
    return (
      <div>
        <h1>oppgave 4</h1>
        <p>Du ber vennen din tenke på et tall mellom 0 og 50.
            Så gjetter du på et tall, og vennen din sier om det var rett, eller om tallet du gjettet på var for høyt eller for lavt.
            Så gjetter du en gang til, og vennen din sier på nytt om tallet er rett, for høyt eller for lavt.</p>
        <A />


      </div>
    );
}
import './task.css'
import {ChangeEvent, useState } from 'react'

function A() {

    const [inputText, setInputText] = useState("");
    let text

    const test = () => {
        console.log(inputText)
    }

    const change = event => {
        setInputText(event.target.value)
    }
    
    if (inputText == "s") {
        
    }

    return(
        <div className ='oppgaveboks'>
            <h1>a)</h1>
            <p>Sjekk ut eksempler på input-funksjonen for python, ved å søke på nettet.
                Prøv å forklare hvordan det fungerer.</p>

            <label>
                skriv s viss du er svensk eller n viss du er norsk: <input type='text' value={inputText} onChange={change}/> 
            </label>
            <button onClick={test}>test</button>

            <p> se i console logen </p>             
        </div>
    );
}

export default function Task3() {
    return (
      <div>
        <h1>oppgave 3</h1>
        <p>Vi ønsker å lage et program der brukeren av programmet skal oppgi om man er norsk eller svensk (vi later nå som om det ikke er andre alternativer).
            Dette skal gjøres ved at brukeren skriver inn "n" dersom man er norsk eller "s" dersom man er svensk.
            Deretter skal programmet skrive enten "Du er norsk." eller "Du er svensk." ut ifra svaret til brukeren.
            Programmet må starte med å gi instruksjoner til brukeren.</p>
        <A />


      </div>
    );
}
import './task.css'

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


export default function Task2() {
    return (
      <div>
        <h1>oppgave 2</h1>
        <A />
        <B />
      </div>
    );
}
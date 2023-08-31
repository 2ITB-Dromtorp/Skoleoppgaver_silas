import './task.css'

function A() {
    let testN = 8;

    console.log(testN);

    return(
        <div className ='oppgaveboks'>
            <h1>a)</h1>
            <p>spørsmål: Hva skriver du i javascript dersom du vil gi variabelen test verdien 8? 
            Hvilken datatype er dette?</p>
            <p>svar: let test = 8; eller const test = 8; dette har datatype "Integer"</p>            
        </div>
    );

}

function B() {
    let testT = 'oppgave b tekst her';

    console.log(testT);

    return(
        <div className ='oppgaveboks'>
            <h1>b)</h1>
            <p>spørsmål: Hva skriver du dersom du vil gi variabelen test verdien "testverdi"? 
                Hvilken datatype er dette?</p>
            <p>svar: let test = 'testverdi'; eller const test = 'testverdi'; dette har datatype "text"</p>            
        </div>
    );

}

function C() {
    let num1 = 2;
    let num2 = 3;
    let produkt = num1 * num2;

    console.log("produktet er", produkt);

    return(
        <div className ='oppgaveboks'>
            <h1>c)</h1>
            <p>spørsmål: Hva skriver du dersom du vil regne ut 2 * 3 og sette resultatet inn i variabelen produkt?</p>
            <p>svar: let num1 = 2; let num = 3; let produkt = num1 * num2; </p>            
        </div>
        
    );

}

function D() {
    let num1 = 2;
    let num2 = 3;
    let broek = num1 / num2;

    console.log("verdien av brøken er", broek);

    return(
        <div className ='oppgaveboks'>
            <h1>d)</h1>
            <p>spørsmål: Hva skriver du dersom du vil regne ut verdien av brøken 2/3 og sette resultatet inn i variabelen broek?</p>
            <p>svar: let num1 = 2; let num = 3; let produkt = num1 / num2; </p>            
        </div>
        
    );

}

function E() {

    return(
        <div className ='oppgaveboks'>
            <h1>e)</h1>
            <p>spørsmål: Lag et program der du tester om alle kommandoene over fungerer ved å bruke console.log() til å skrive ut innholdet av variablene.</p>
            <p>svar: console.log(testN); console.log(testT); console.log(produkt); console.log(broek); </p> 
            <p>(se i console logen)</p>           
        </div>
        
    );

}

export default function Task1() {
    return (
      <div>
        <h1>oppgave 1</h1>
        <A />
        <B />
        <C />
        <D />
        <E />
      </div>
    );
}
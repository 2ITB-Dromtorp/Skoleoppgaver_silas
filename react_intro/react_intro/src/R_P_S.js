import { waitFor } from '@testing-library/react';
import { getValue, wait } from '@testing-library/user-event/dist/utils';
import { useState, useEffect, useCallback, } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

export default function Rock_paper_scissors() {

    const [PR_P_S, setPR_P_S] = useState(0);
    const [CR_P_S, setCR_P_S] = useState(0);
    const [Win, setWin] = useState(0);
    const [Loss, setloss] = useState(0);
    const [Tie, setTie] = useState(0);

    const [isExploding, setIsExploding] = useState(false);


    let player = "";
    let opponent = "";



    const Rock = () => {
        setPR_P_S(1)
        setCR_P_S(randomNumberInRange(1, 3))
        Fight();
    }
    const Paper = () => {
        setPR_P_S(2)
        console.log(PR_P_S);
        console.log("paper");   
        setIsExploding(true)      
    }
    const Scissors = () => {
        setPR_P_S(3)
        console.log(PR_P_S);
        console.log("scissors");      
        setIsExploding(true)   
    }

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() 
        * (max - min + 1)) + min;
    };

    const Fight = () => {

        
        
        if (PR_P_S==1 && CR_P_S==1) {
            setTie(Tie+1)
            console.log("you tied for the", Tie, "time")
        } else if (PR_P_S==1 && CR_P_S==2){
            setloss(Loss+1)
            console.log("you lost for the", Loss, "time")
        } else if (PR_P_S==1 && CR_P_S==3){
            setWin(Win+1)
            console.log("you won for the", Win, "time")
        }
    }

    useEffect(() => {


    
        const myInterval = setInterval(() => {
            setIsExploding(false)
    
        }, 1000);
    
        return () => clearInterval(myInterval);
    
    });

    //forteller hva du valgte 
    if (PR_P_S == 1) {
        player = "you chose rock"; 
    } else if (PR_P_S == 2){
        player = "you chose paper";
    } else if (PR_P_S == 3){
        player = "you chose scissors"
    } else{
        player = "you have not chosen anything yet"
    }
    //forteller hva PC-en valgte
    if (CR_P_S == 1) {
        opponent = "your opponent chose rock"; 
    } else if (CR_P_S == 2){
        opponent = "your opponent chose paper";
    } else if (CR_P_S == 3){
        opponent = "your opponent chose scissors"
    } else{
        opponent = "your opponent have not chosen anything yet or had an error"
    }
    
    
    return (
        <div>
            <header>
        
            <h1>rock paper scissors </h1>

            <div>
                <button onClick={Rock}> rock </button>
                <button onClick={Paper}> paper </button>
                <button onClick={Scissors}> scissors </button>

            </div>

            <p> {player} </p>

            <button onClick={Fight}> fight </button>

            <p> {opponent} </p>

            <p>wins {Win} </p>
            <p>losses {Loss} </p>
            <p>ties {Tie} </p>

            {isExploding && <ConfettiExplosion />}

            </header>
        </div>
    )
}
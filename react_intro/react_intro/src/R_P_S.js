import { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

export default function Rock_paper_scissors() {

    const [PR_P_S, setPR_P_S] = useState();
    const [CR_P_S, setCR_P_S] = useState();

    const [isExploding, setIsExploding] = useState(false);

    let player = "";
    let opponent = "";
    let resault = "";


    const Rock = () => {
        setPR_P_S(1)
        console.log(PR_P_S);
        console.log("rock");
        setIsExploding(true)       
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
        setCR_P_S(randomNumberInRange(1, 3))
        console.log(CR_P_S);
        
        if (PR_P_S==1 && CR_P_S==1) {
            resault = "its a tie"
        } else if (PR_P_S==1 && CR_P_S==2){
            resault = "its a loss"
        } else if (PR_P_S==1 && CR_P_S==3){
            resault = "its a win"
        }
    }

    useEffect(() => {
    
        const myInterval = setInterval(() => {
            setIsExploding(false)
    
        }, 1000);
    
        return () => clearInterval(myInterval);
    
    });

    if (PR_P_S == 1) {
        player = "you chose rock"; 
    } else if (PR_P_S == 2){
        player = "you chose paper";
    } else if (PR_P_S == 3){
        player = "you chose scissors"
    } else{
        player = "you have not chosen anything yet"
    }

    if (CR_P_S == 1) {
        opponent = "your opponent chose rock"; 
    } else if (CR_P_S == 2){
        opponent = "your opponent chose paper";
    } else if (CR_P_S == 3){
        opponent = "your opponent chose scissors"
    } else{
        opponent = "your opponent had an error"
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

            <p> {resault} </p>

            {isExploding && <ConfettiExplosion />}

            </header>
        </div>
    )
}
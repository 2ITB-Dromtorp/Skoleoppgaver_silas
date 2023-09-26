import { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

export default function DigitalClock() {

    /*
    let clock = new Date();
    let hh = clock.getHours();
    let mm = clock.getMinutes();
    let ss = clock.getSeconds();
    */

    const [currentTime, newTime] = useState(new Date);


//useEffect fires when state change. Fire when renders.
useEffect(() => {
    
    const myInterval = setInterval(() => {

        newTime(new Date);

    }, 1000);

    return () => clearInterval(myInterval);





});

    const [CountFrom, setCountFrom] = useState(10);
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
    
        const myInterval = setInterval(() => {
    
            setCountFrom(CountFrom-1);
            setIsExploding(false)
    
        }, 1000);
    
        return () => clearInterval(myInterval);
    
    });



    if (CountFrom <= 0) {
        setCountFrom(10);
        setIsExploding(true)
        
    }

    
    
    return (
        <div>
            <header>
        
            <h1> {currentTime.getHours()}:{currentTime.getMinutes()}:{currentTime.getSeconds()} {console.log(currentTime)} </h1>

            <p> {CountFrom} </p>

            {isExploding && <ConfettiExplosion />}

            </header>
        </div>
    )
}
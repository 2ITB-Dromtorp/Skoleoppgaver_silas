import './App.css';
import React, { useState, useEffect } from 'react';
import Questions from './questions';
import axios from 'axios';


export default function Quiz() {

    const [isVisible, setIsVisible] = useState(false);

    const [CurrentQuestions, setCurrentQuestions] = useState(0)
    const [ShowScore, setShowScore] = useState(false)
    const [Total, setTotal] = useState(0);
    const [LastTotal, setLastTotal] = useState(0); 

    const [seconds, setSeconds] = useState(10);
    const [isGameOver, setIsGameOver] = useState(false);
      
        useEffect(() => {
            const timer = setInterval(() => {
              if (seconds > 0 && !isGameOver) {
                setSeconds(prevSeconds => prevSeconds - 1);
              } else {
                // Timer has run out, trigger game over
                setIsGameOver(true);
                clearInterval(timer);
                const nextQuestion = CurrentQuestions + 1;
                if (nextQuestion < Questions.length) {
                   setCurrentQuestions(nextQuestion)
                   setSeconds(10);
                   setIsGameOver(false)
                } else {
                    setShowScore(true)
                }
              }
            }, 1000);
        
            // Cleanup the interval when the component is unmounted
            return () => clearInterval(timer);
        }, [seconds, isGameOver]);

        const handleBtnclick = (selectedOption) => {
            console.log(selectedOption)
            const selectedIndex = Questions[CurrentQuestions].answerOptions.indexOf(selectedOption);
            console.log(selectedIndex)
            
            axios
                .get(`/check/${selectedIndex}`)
                .then(response => {
                console.log(response.data);
                setCurrentQuestions(response.data.currentQuestion)
                setTotal(response.data.Total)
                setShowScore(response.data.ShowScore)
                setSeconds(10)
            })
                .catch(error => console.log(error));
            
        }

        const retry = () => {
            setSeconds(10);
            setShowScore(false)
            setCurrentQuestions(0)
            setIsGameOver(false)
            setLastTotal(Total)
            setTotal(0)
            setIsVisible(true)

            axios
            .get(`http://localhost:8080/retry`)
            .then(response => {
            console.log(response.data);
            setCurrentQuestions(response.data.currentQuestionR)
            setTotal(response.data.TotalR)
            setShowScore(response.data.ShowScoreR)
        })
            .catch(error => console.log(error));
        }



        return (
            <div className='App'>
                {ShowScore ? (
				    <div className='score-section'>
                        {isVisible &&(
                            <p>forrige gang fikk du {LastTotal} av 3</p>                            
                        )}

                        <p>Du svarte riktig på {Total} av 3</p>
                        <button className='retry' onClick={retry}>start på nytt</button>
                    </div>
			    ) : (
				<>
                    <div className='questionInfo'>
                        <h2>{seconds}s</h2>                
                        <span>spørsmål {CurrentQuestions+1}</span>/3            
                    </div>

                    <div className='questionBox'>
                        <h1>{Questions[CurrentQuestions].question}</h1>
                    </div>


                    <div className='answerBtn'>
                        {Questions[CurrentQuestions].answerOptions.map((answerOpptions) => (
                            <button onClick={() => handleBtnclick(answerOpptions)}>{answerOpptions.answerText}</button>
                        ))}
                    </div>
				</>
			)}

            
        </div>

    )
}
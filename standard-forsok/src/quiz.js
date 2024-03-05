import './App.css';
import React, { useState, useEffect } from 'react';
import Questions from './questions';


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
                setSeconds(seconds - 1);
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

        const handleBtnclick = async (selectedOption) => {
            const selectedIndex = Questions[CurrentQuestions].answerOptions.indexOf(selectedOption);

            /*
              selectedIndex finner ut hvilken rad svaret er på
              viss spilleren svarte html så finner selectedIndex at html er 0 med bruk av indexOf(html)

              question: "hvilket kode språk brukes få å endre på utsene til en nettside",
              answerOptions: [
              0  {answerText: "html"},
              1  {answerText: "c#"},
              2  {answerText: "css"},
              3  {answerText: "javascript"}
            */
            
            fetch(`/check/${selectedIndex}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              console.log(data);
              setCurrentQuestions(data.currentQuestion);
              setTotal(data.Total);
              setShowScore(data.ShowScore);
              setSeconds(10);
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
            
        }

        const retry = async () => {
            setSeconds(10);
            setShowScore(false)
            setCurrentQuestions(0)
            setIsGameOver(false)
            setLastTotal(Total)
            setTotal(0)
            setIsVisible(true)

            fetch('/retry')
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              console.log(data);
              setCurrentQuestions(data.currentQuestionR);
              setTotal(data.TotalR);
              setShowScore(data.ShowScoreR);
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
        }



        return (
            <div className='App'>
                {ShowScore ? (
				    <div className='score-section'>
                        {isVisible &&(
                            <p>forrige gang fikk du {LastTotal} av {Questions.length}</p>                            
                        )}

                        <p>Du svarte riktig på {Total} av {Questions.length}</p>
                        <button className='retry' onClick={retry}>start på nytt</button>
                    </div>
			    ) : (
				<>
                    <div className='questionInfo'>
                        <h2>{seconds}s</h2>                
                        <span>spørsmål {CurrentQuestions+1}</span>/{Questions.length}            
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
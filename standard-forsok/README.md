# IT-Quiz

* [Installation](#installation)
* [Usage](#usage)
  * [Questions](#Questions)
    * [Questions-JSON](#Question-JSON)
    * [Questions-frontend](#Questions-frontend)
    * [handleBtnclick](#handleBtnclick)
    * [Questions-backend](#Questions-backend)
  * [Timer](#Timer)
  * [Points-and-ShowScore](#Points-and-ShowScore)
    * [retry](#retry)
* [License](#license)
* [Author](#author)

## Installation
dette programet kerever at du instalerer cors, express, bodyParser og react-router-dom.

[![cors Download]][cors-url]
[![express Download]][express-url]
[![bodyParser Download]][bodyParser-url]
[![react-router-dom Download]][react-router-dom-url]

## usage

### Questions

#### Question-JSON

Alle quiz-er trenger spørsmål. her er malen jeg lagde for for spørsmålene

spørsmålet settes in i "question".
de forskjelige svar alternativene settes in i "answerText"
om et svar alternativ er riktig skal "isCorrect" være true ellers skal "isCorrect" være false

backend
```json
{
    "questions":[
        {
            "question": "Hvilken av følgende er et mål for IT-drift?",
            "answerOptions": [
                { "answerText": "Rask utvikling av ny funksjonalitet", "isCorrect": false },
                { "answerText": "Høy oppetid og pålitelighet for systemene", "isCorrect": true },
                { "answerText": "Å oppnå optimaliserte søkemotorresultater", "isCorrect": false },
                { "answerText": "Å skape et attraktivt brukergrensesnitt", "isCorrect": false }
            ]            
        }

    ]
}
```

oppgaven krevet at frontend ikke skulle vite om svar alternativene var riktig. den fikk en egen json slik at det fortsat er mulig å bruke dynamiske spørsmål.

frontend
```javascript
    let Questions = [
        {
            question: "Hvilken av følgende er et mål for IT-drift?",
            answerOptions: [
                { answerText: "Rask utvikling av ny funksjonalitet"},
                { answerText: "Høy oppetid og pålitelighet for systemene"},
                { answerText: "Å oppnå optimaliserte søkemotorresultater"},
                { answerText: "Å skape et attraktivt brukergrensesnitt"}
            ]
        }
    ];

    export default Questions;
```

#### Questions-frontend

Imports:

```javascript
    import Questions from './questions';
```

frontend versjonen av spørsmålene har blitt importet inn i dokumentet og heter Questions.
CurrentQuestions variabelen går fra 0 til 9 og bestemmer hvilket spårsmål som vises.

```JSX
	<>
        <div className='questionInfo'>
            <h2>{seconds}s</h2>
            {/*spilleren har 10 sekunder til å svare på hvert spørsmål seconds variabelen viser hvor mange spårsmål som er igjen.*/}            
            <span>spørsmål {CurrentQuestions+1}</span>/{Questions.length}     
            {/*viser hvilket spørsmål nummer spilleren er på*/}       
        </div>

        <div className='questionBox'>
            <h1>{Questions[CurrentQuestions].question}</h1>
            {/*visser spårsmålet*/}
        </div>


        <div className='answerBtn'>
            {Questions[CurrentQuestions].answerOptions.map((answerOpptions) => (
                <button onClick={() => handleBtnclick(answerOpptions)}>{answerOpptions.answerText}</button>
                {/*lager en knapp for hver svaralternativ*/}
                {/*knappen spilleren trykker på sender med seg svaralternativet den er knyttet til.*/}
            ))}
        </div>
	</>
```

#### handleBtnclick
selectedOption er svaralternativet som spilleren trykket på. (answerOpptions)

```javascript
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
            
        fetch(`http://localhost:8080/check/${selectedIndex}`)
        //sender en get request til backend med hvilken rad svaralternativet spilleren valgte var på.
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                //hvis responsen ikke er ok sender den error mellingen 'Network response was not ok' 
                return response.json();
                //hvis responsen er ok så setter den daten den får in i en variabel som heter data
            })
            .then(data => {
                setCurrentQuestions(data.currentQuestion);
                setTotal(data.Total);
                setShowScore(data.ShowScore);
                //setter in data fra backend in i variabler i frontend
                setSeconds(10);
                //setter seconds til 10 for neste spørsmål
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
            
        }
```

#### Questions-backend

serveren som prosjektet skjører på var en som andre elever i klassen min hadde satt opp. for at prosjektet skulle fungere på serveren måtte den bruke:
    const port = process.env.PORT || 8080,
    app.use(express.static("build")),
    og app.get("*", (req, res) => { res.sendFile("build") }) hvis man hvil bruke routing


imports and server:
```javascript
    const express = require("express");
    const cors = require("cors");
    const app = express();
    const Questions = require('../src/questions.json')
    const bodyParser = require("body-parser");
    const port = process.env.PORT || 8080

    app.use(express.json())
    app.use(cors())
    app.use(bodyParser.json())
    app.use(express.static("build"))

    app.listen(port, () => {

        app.get("*", (req, res) => {
            res.sendFile("build")
        })
        
        console.log("Server is running on port", port);
    })
```
dette er koden som håndterte om svare spilleren valgte er riktig eller feil.

```javascript
    let currentQuestion = 0;
    //hvilket spårsmål spilleren er på
    let Total = 0;
    //hvor mange riktige svar spilleren har
    let ShowScore = false;
    //om spilleren har svart på alle spørsmålene

    app.get('/check/:answer', (req, res) => {
    let Answer = req.params.answer;
    //gjør answer fra url-en til en variabel
    Answer = parseInt(Answer);
    //gjør Answer om til et tall

    //if the answer is true the player gets a point (Total)
    if (Questions.questions[currentQuestion].answerOptions[Answer].isCorrect === true) {

        Total = Total + 1

        //makes a variable to keep track of which question the player is on 
        const nextQuestion = currentQuestion + 1;
        //if the nextQuestion variable is less then the total amount of questions it will set currentQuestion to nextQuestion 
        if (nextQuestion < Questions.questions.length) {
            currentQuestion = nextQuestion 
        //otherwise it will set ShowScore to true
        } else {
            ShowScore = true
        }

    //if the answer is false the player does not get a point (Total)   
    } else if (Questions.questions[currentQuestion].answerOptions[Answer].isCorrect === false) {

        //makes a variable to keep track of which question the player is on
        const nextQuestion = currentQuestion + 1;
        //if the nextQuestion variable is less then the total amount of questions it will set currentQuestion to nextQuestion 
        if (nextQuestion < Questions.questions.length) {
            currentQuestion = nextQuestion 
        //otherwise it will set ShowScore to true
        } else {
            ShowScore = true
        }
    }

    //sending the variables to frontend
    res.status(200).json({"Total": Total, "currentQuestion": currentQuestion, "ShowScore": ShowScore })
    });
```

### Timer
quizen har en 10 sekunds timer på hvert spørsmål om spilleren ikke svarer innen tid så fortsetter quizen til neste spørsmål

```javascript
    const [seconds, setSeconds] = useState(10);
    //hvor mange sekunder som er igjen
    const [isGameOver, setIsGameOver] = useState(false);
    //om timeren har gådt ut

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0 && !isGameOver) {
            //hvis seconds er mer enn null og isGameOver ikke er true
            setSeconds(seconds - 1);
        } else {
            // Timer has run out, trigger game over
            setIsGameOver(true);
            clearInterval(timer);

            const nextQuestion = CurrentQuestions + 1;
            //lager en variabel som er en mer en CurrentQuestions
            if (nextQuestion < Questions.length) {
            //hvis nextQuestion er mindre en total mengden spørsmål gå til neste spørsmål.
               setCurrentQuestions(nextQuestion)
               setSeconds(10);
               setIsGameOver(false)
            } else {
            //hvis nextQuestion er større en total mengden spørsmål sett ShowScore til true.
                setShowScore(true)
            }
        }
        }, 1000);
        
            // Cleanup the interval when the component is unmounted
            return () => clearInterval(timer);
        }, [seconds, isGameOver]);
```

### Points-and-ShowScore

Poeng:
spilleren får poeng basert på om de svarer riktig.
om spilleren svarte riktig får de 1 poeng
om spilleren svarte feil får de ingen poeng

ShowScore:
når spilleren har svart på alle spørsmålene så settes show score variabelen til true.
da vil den endre hvordan frontend-en ser ut får å hvise hvor mange riktige svar spilleren fikk

```javascript
    const [Total, setTotal] = useState(0);
    //hvor mange riktige svar spilleren har
    const [LastTotal, setLastTotal] = useState(0);
    //hvor mange riktige svar spilleren hadde siste forskjøk
    const [isVisible, setIsVisible] = useState(false);
    //brukes for å gjemme LastTotal første gangen spilleren blir ferdig med quizen
```

```JSX
    return (
        <div className='App'>
            {ShowScore ? (
            //om ShowScore er true så visser den score skjærmen
			    <div className='score-section'>
                    {isVisible &&(
                    //hvis isVisible er true så vises denne delen
                        <p>forrige gang fikk du {LastTotal} av {Questions.length}</p>                            
                    )}

                    <p>Du svarte riktig på {Total} av {Questions.length}</p>
                    {/*viser hvor mange riktige svar spilleren fikk ut av hvor mange total spørsmål*/}
                    <button className='retry' onClick={retry}>start på nytt</button>
                    {/*knapp for å starte quizen på nytt*/}
                </div>
			    ) : (
                //hvis ShowScore er false så viser den spørsmålene
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

```

#### retry
når spilleren trykker på retry knappen så skall alle variabler settet stil start verdien dems.

frontend
```javascript
    const retry = async () => {
        setSeconds(10);
        setShowScore(false)
        setCurrentQuestions(0)
        setIsGameOver(false)
        setLastTotal(Total)
        //set LastTotal til å være hvor mange rikktige svar spilleren fikk på det forsøket 
        setTotal(0)
        setIsVisible(true)
        //set IsVisible til å vere true slik at spilleren kan se LastTotal neste gang de kommer til slutten
        //set variablene tilbake til det de skal være for å starte quizen

        fetch('http://localhost:8080/retry')
        //sender en get request til backend med hvilken rad svaralternativet spilleren valgte var på.
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //hvis responsen ikke er ok sender den error mellingen 'Network response was not ok' 
            return response.json();
            //hvis responsen er ok så setter den daten den får in i en variabel som heter data
        })
        .then(data => {
            setCurrentQuestions(data.currentQuestionR);
            setTotal(data.TotalR);
            setShowScore(data.ShowScoreR);
            //setter in data fra backend in i variabler i frontend
        })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
        }
```
variablene må også settes tilbake i backend

backend
```javascript
    //reset the variables 
    app.get('/retry', (req, res) => {
        currentQuestion = 0;
        Total = 0;
        ShowScore = false;
        
        res.status(200).json({"TotalR": Total, "currentQuestionR": currentQuestion, "ShowScoreR": ShowScore })
    })
```

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

Silas Surland-Fjær

[cors-url]: https://npmjs.org/package/cors
[express-url]: https://www.npmjs.com/package/express
[bodyParser-url]: https://www.npmjs.com/package/body-parser
[react-router-dom-url]: https://www.npmjs.com/package/react-router-dom
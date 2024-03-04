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

let currentQuestion = 0;
let Total = 0;
let ShowScore = false;

app.get('/check/:answer', (req, res) => {
  let Answer = req.params.answer;
  Answer = parseInt(Answer);

  console.log(Answer, Questions.questions[currentQuestion].answerOptions[Answer].answerText, Questions.questions[currentQuestion].answerOptions[Answer].isCorrect );


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


//reset the variables 
app.get('/retry', (req, res) => {
    currentQuestion = 0;
    Total = 0;
    ShowScore = false;

    console.log("reset")
    
    res.status(200).json({"TotalR": Total, "currentQuestionR": currentQuestion, "ShowScoreR": ShowScore })
})


app.listen(port, () => {

    app.get("/api/get", (req, res) => {
        res.status(200).json({"message": "hur hur hur hur"})
    })
    app.get("*", (req, res) => {
        res.sendFile("build")
      })

    console.log("i am alive")
    console.log("Server is running on port", port);
})
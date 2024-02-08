const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");
const Questions = require('../src/questions.json')
const bodyParser = require("body-parser");

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(express.static("build"))

const port = process.env.PORT || 8080
let currentQuestion = 0;
let Total = 0;
let ShowScore = false;

app.get('/check/:answer', (req, res) => {
  let Answer = req.params.answer;
  Answer = parseInt(Answer);

  console.log(Answer, Questions.questions[currentQuestion].answerOptions[Answer].answerText, Questions.questions[currentQuestion].answerOptions[Answer].isCorrect );

  if (Questions.questions[currentQuestion].answerOptions[Answer].isCorrect === true) {

    Total = Total + 1

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questions.questions.length) {
        currentQuestion = nextQuestion 
    } else {
        ShowScore = true
    }
  } else if (Questions.questions[currentQuestion].answerOptions[Answer].isCorrect === false) {

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questions.questions.length) {
        currentQuestion = nextQuestion 
    } else {
        ShowScore = true
    }
  }

  res.status(200).json({"Total": Total, "currentQuestion": currentQuestion, "ShowScore": ShowScore })
});

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
import {useState, useEffect} from "react"
import Question from "./Question"

export default function Quiz({ questionsData, selected ,reset}) {

  const [correctAnswers, setCorrectAnswers] = useState([])
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(()=>{
    const checkAllSelected = questionsData.every(ques => ques.isSelected === true)
    const correctOptions = [];
    if (checkAllSelected) {
      for (let question of questionsData) {
        question.selectedAns === question.correct_answer ?
          correctOptions.push(question.id) : ""
      }
    }
    setCorrectAnswers(correctOptions)
  },[showAnswer])

  function selectedOption(id, ans){
    return selected(id, ans)
  }

  const questionEl = questionsData.map(ques => (
    <Question
      key={ques.id}
      questionDetails = {ques}
      select={selectedOption}
      correctOptions = {correctAnswers}
      showAns = {showAnswer}
    />
  ))

  function checkAnswer() {
    setShowAnswer(true)
  }

  function playAgain() {
    setShowAnswer(false)
    reset(true)
    setCorrectAnswers([])
  }

  return (<div className="questions--container">
    {questionEl}
    <div className="show-answer">
      {(showAnswer)? <p className="answer">Your score {correctAnswers.length}/5 correct answers</p>:""}
      <button className="btn" onClick={showAnswer? playAgain:checkAnswer}>{showAnswer? "Play Again":"Check-answer"}</button>
    </div>
  </div>)
}
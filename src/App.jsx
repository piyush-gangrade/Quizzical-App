import { useState, useEffect } from "react"
import { createBrowserRouter,RouterProvider  } from "react-router-dom"
import Main from "./components/Main.jsx"
import Quiz from "./components/Quiz.jsx"
// import Question from "./components/Question.jsx"
import { nanoid } from 'nanoid'

export default function App() {

  const [start, setStart] = useState(false)
  const [questionsArr, setQuestionsArr] = useState([])

  useEffect(() => {
    if (start) {
      async function questionData() {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple");
        const data = await res.json();
        setQuestionsArr(data.results.map(result => (
          {
            ...result,
            id: nanoid(),
            options: [...result.incorrect_answers, result.correct_answer].sort(() => Math.random() - 0.5),
            isSelected: false,
            selectedAns: ""
          }
        )));
      }
      questionData()
    }
  }, [start])
  //Start Quiz
  function setQuiz() {
    setStart(!start);
  }
  

  function selectedOption(id, ans) {
    setQuestionsArr(prevQuesArr => prevQuesArr.map(prevQues =>
      (prevQues.id === id) ?
        prevQues.selectedAns !== ans ? { ...prevQues, isSelected: true, selectedAns: ans } :
          { ...prevQues, isSelected: false, selectedAns: "" }
          :
          prevQues
          )
          )
        }

  function restart(click){
    if(restart){
      setStart(false)
      setQuestionsArr([])
    }
  }

  return (
    <>
      {start  ?
        <Quiz 
          questionsData={ questionsArr }
          selected = {selectedOption}
          reset={restart}
        />
        :
        <Main startQuiz={setQuiz} />
      }
    </>
  )
}
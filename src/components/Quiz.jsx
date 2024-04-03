import {useState, useEffect} from "react"
import { useActionData, Navigate } from "react-router-dom"
import { nanoid } from "nanoid";
import Question from "./Question"


export default function Quiz(){
  const [loading, setLoading] = useState(true);
  const [questionsArr, setQuestionsArr] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showAnswer, setShowAnswer] = useState(false)

  
  const data = useActionData();
  console.log(data);
  // console.log(`https://opentdb.com/api.php?amount=5&type=multiple&category=${data.category}&difficulty=${data.difficulty}`)
  if(!data){
    return <Navigate to="/fields" />
  }
  // return <div>return</div>
  
  useEffect(()=>{
    if(data){
      const URL = `https://opentdb.com/api.php?amount=5&type=multiple&category=${data.category}&difficulty=${data.difficulty}`;
      async function fetchData(){
        const res = await fetch(URL);
        const data = await res.json();
        setLoading(false);
        const results = data.results ;
          setQuestionsArr(results.map(result => (
            {
              ...result,
              id: nanoid(),
              options: [...result.incorrect_answers, result.correct_answer].sort(() => Math.random() - 0.5),
              isSelected: false,
              selectedAns: ""
            }
          )));   
      }
      fetchData();
    }
  },[data])

  useEffect(()=>{
    const correctOptions = [];
    for (let question of questionsArr) {
      question.selectedAns === question.correct_answer ?
        correctOptions.push(question.id) : ""
    }
    setSelectedAnswers(correctOptions);
  },[showAnswer])


  function selectedOption(id, ans){
    setQuestionsArr(prevQuesArr => prevQuesArr.map(prevQues =>
      (prevQues.id === id) ?
        prevQues.selectedAns !== ans ? 
          { ...prevQues, isSelected: true, selectedAns: ans } 
          : { ...prevQues, isSelected: false, selectedAns: "" }
      : prevQues
      )
    )
  }
  
  function checkAnswer() {
    setShowAnswer(true)
  }

  function playAgain() {
    setShowAnswer(false)
    setCorrectAnswers([])
  }

  const questionEl = questionsArr.map(ques => (
    <Question
      key = {ques.id}
      questionDetails = {ques}
      select = {selectedOption}
      correctOptions = {selectedAnswers}
      showAns = {showAnswer}
    />
  ))
  
  
      
  return (
    <>
    {loading?
      <h1>Loading...</h1>:
      <div className="questions--container">
        {questionEl}
        <div className="show-answer">
          {(showAnswer)? <p className="answer">Your score {selectedAnswers.length}/5 correct answers</p>:""}
          <button className="btn" onClick={showAnswer? playAgain:checkAnswer}>{showAnswer? "Play Again":"Check-answer"}</button>
        </div>
      </div>
    }
    </>
  )
}

// export default function Quiz({ questionsData, selected ,reset}) {


  // useEffect(()=>{
  //   const checkAllSelected = questionsData.every(ques => ques.isSelected === true)
  //   const correctOptions = [];
  //   if (checkAllSelected) {
  //     for (let question of questionsData) {
  //       question.selectedAns === question.correct_answer ?
  //         correctOptions.push(question.id) : ""
  //     }
  //   }
  //   setCorrectAnswers(correctOptions)
  // },[showAnswer])

  // function selectedOption(id, ans){
  //   setQuestionsArr(prevQuesArr => prevQuesArr.map(prevQues =>
  //     (prevQues.id === id) ?
  //       prevQues.selectedAns !== ans ? 
  //         { ...prevQues, isSelected: true, selectedAns: ans } 
  //         : { ...prevQues, isSelected: false, selectedAns: "" }
  //     : prevQues
  //     )
  //   )
  // }

  // const questionEl = questionsData.map(ques => (
  //   <Question
  //     key={ques.id}
  //     questionDetails = {ques}
  //     select={selectedOption}
  //     correctOptions = {correctAnswers}
  //     showAns = {showAnswer}
  //   />
  // ))

  // function checkAnswer() {
  //   setShowAnswer(true)
  // }

  // function playAgain() {
  //   setShowAnswer(false)
  //   reset(true)
  //   setCorrectAnswers([])
  // }

  // return (<div className="questions--container">
  //   {questionEl}
  //   <div className="show-answer">
  //     {(showAnswer)? <p className="answer">Your score {correctAnswers.length}/5 correct answers</p>:""}
  //     <button className="btn" onClick={showAnswer? playAgain:checkAnswer}>{showAnswer? "Play Again":"Check-answer"}</button>
  //   </div>
  // </div>)
//
import {useState, useEffect} from "react"
import { useActionData, Navigate, NavLink } from "react-router-dom"
import { nanoid } from "nanoid";
import { Bars } from "react-loader-spinner";
import Question from "./Question"


export default function Quiz(){
  const [loading, setLoading] = useState(true);
  const [questionsArr, setQuestionsArr] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showAnswer, setShowAnswer] = useState(false)
  
  const data = useActionData();

  if(!data ){
    return <Navigate to="/fields" />
  }

  useEffect(()=>{
    if(data){
      const URL = `https://opentdb.com/api.php?amount=5&type=multiple&category=${data.category}&difficulty=${data.difficulty}`;
      async function fetchData(){
        const res = await fetch(URL);
        const data = await res.json();
        setLoading(false);
        const results = data.results || [];
        if(results.length > 0){
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
      <div className="loader">
        <Bars 
          height="80"
          width="80"
          color="#4D5B9E"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
      :
      <div className="questions--container">
        {questionEl}
        <div className="show-answer">
          {(showAnswer)? <p className="answer">Your score {selectedAnswers.length}/5 correct answers</p>:""}
          {
            showAnswer?
            <NavLink className="btn" to="/fields" >Play Again</NavLink>:
            <button className="btn" onClick={checkAnswer}>Check-answer</button>
          }
        </div>
      </div>
    }
    </>
  )
}
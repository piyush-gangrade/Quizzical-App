import React from "react"
import { decode } from "html-entities"

export default function Question({questionDetails, select, correctOptions, showAns}) {

    function changeStyle(option) {
        const newStyle = {
            backgroundColor: "",
            cursor: "not-allowed",
            PointerEvents : "none"
        }
        if(showAns){
            if(correctOptions.includes(questionDetails.id)){
                 {newStyle.backgroundColor = questionDetails.selectedAns === option? "#94D7A2" : "unset"}
            }
            else{
                if(questionDetails.selectedAns === option){
                     {newStyle.backgroundColor =  "#F8BCBC"}
                }
                else if(questionDetails.correct_answer == option){
                     {newStyle.backgroundColor =  "#94D7A2"}
                }
                else{
                     {newStyle.backgroundColor =  "unset"}
                }
            }
            return newStyle
        }
        else{
            return {backgroundColor: questionDetails.selectedAns === option? "#D6DBF5" : "unset"}
        }
    }

    function warning() {
        console.log("you will not change the selected answer")
    }

    const buttonEl = questionDetails.options.map((option) => 
        <button 
            className="option" 
            style={changeStyle(option)} 
            key={option} 
            onClick={showAns? warning() : (() => select(questionDetails.id,option))}
        >
            {decode(option)}
        </button>
    )
    return (
            <div className="question--section">
                <h1 className="question">{decode(questionDetails.question)}</h1>
                <div className="options--container">
                    {buttonEl}
                </div>
                <hr/>
            </div>
    )
}
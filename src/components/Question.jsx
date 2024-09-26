import React from "react"
import { decode } from "html-entities"

export default function Question({questionDetails, select, showAns}) {

    function changeStyle(option) {
        const newStyle = {
            backgroundColor: "",
            cursor: "not-allowed",
            PointerEvents : "none",
            color: "#FFFFFF"
        }
        if(showAns){
                if(questionDetails.correct_answer == option){
                    {newStyle.backgroundColor =  "#1cb63c"}
                }
                else if(questionDetails.selectedAns === option){
                     {newStyle.backgroundColor =  "#ed4343"}
                }
                else{
                     {newStyle.backgroundColor =  "unset"; newStyle.color = "unset"}
                }
            return newStyle
        }
        else{
            return {backgroundColor: questionDetails.selectedAns === option? "#D6DBF5" : "unset"}
        }
    }

    function warning() {
        console.error("you will not change the selected answer")
    }

    const buttonEl = questionDetails.options.map((option) => 
        <button 
            className="option" 
            style={changeStyle(option)} 
            key={option} 
            onClick={showAns? warning : (() => select(questionDetails.id,option))}
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
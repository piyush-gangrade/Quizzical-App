import React from "react"

export default function Main(props) {
    return (
        <main className="main">
            <h1 className="main--heading">Quizzical</h1>
            <h2 className="main--description">Test Your General Knowlegde Skills.</h2>
            <button className="btn" onClick={props.startQuiz}>Start quiz</button>
        </main>
    )
}

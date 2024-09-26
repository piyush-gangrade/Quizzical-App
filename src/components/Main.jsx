import React from "react"
import { NavLink } from "react-router-dom"

export default function Main() {
    return (
        <main className="main">
            <h1 className="main--heading">Quizzical</h1>
            <h2 className="main--description">Test your knowlegde in your favourite category</h2>
            <NavLink to="/fields" className="btn"> Start Quiz</NavLink>
        </main>
    )
}

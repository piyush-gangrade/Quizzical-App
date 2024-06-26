import React from "react"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider,  } from "react-router-dom"
import Main from "./components/Main.jsx"
import Quiz from "./components/Quiz.jsx"
import Fields from "./components/Fields.jsx"
import ErrorBoundary from "./components/ErrorBoundary.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" Component={Main} 
        errorElement={<ErrorBoundary />}
      />
      <Route 
        path="/fields" 
        Component={Fields}
        errorElement={<ErrorBoundary />}
      />
      <Route 
        path="/quiz"
        action={async ({request})=>{
          const data = await (request.formData());
          const sumbmission = {
            category: data.get("category"),
            difficulty: data.get("difficulty")
          }
          return sumbmission;
        }}
        errorElement={<ErrorBoundary />}
        Component={Quiz}
      />
    </>
  )
)

export default function App() {

  return (
    <RouterProvider 
      router={router}
    />
  )
}
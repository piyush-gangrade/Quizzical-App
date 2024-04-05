import React from "react";
import { useRouteError, NavLink } from "react-router-dom";
export default function ErrorBoundary(){
    const error = useRouteError();
    console.log(error);
    return(
        <div className="error">
            <h1>Error status: {error.status}</h1>
            <h3>Error : {error.error.message}</h3>
            <NavLink to="/">Go Back to home</NavLink>
        </div>
    )
}
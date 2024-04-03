import {useState} from "react";
import { catagories, difficulty } from "./fieldsData";
import { Form } from "react-router-dom";

export default function Fields(){
    const [formData, setFormData] = useState({
        catagory: "",
        difficulty: ""
    })

    const options = catagories.map(catagory => <option key={catagory.value} value={catagory.value}>{catagory.name}</option>)
    return(
        <div>
            <Form method="post" action="/quiz">
                <label htmlFor="category">Select Category: </label>
                <select id="category" name="category">
                    <option value="">Any Category</option>
                    {options}
                </select>
                <label htmlFor="difficulty">Select Difficulty: </label>
                <select id="difficulty" name="difficulty">
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button type="submit">Generate</button>
            </Form>
        </div>
    )
}
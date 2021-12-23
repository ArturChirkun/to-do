import React, { useState } from "react";

import './add-task.css';

import CustomButton from "../custom-buttom/custom-button";

const AddTask = ({ addNewTask }) => {

    const [inputTask, setInputTask] = useState('');
    const [taskCategory, setTaskCategory] = useState('');

    const handleInputChange = (e) => {
        setInputTask(e.target.value)
    }

    const handleRadioFocus = (e) => {
        setTaskCategory(e.target.value)
    }

    return (
        <div className="add-task">

            <input type='text' placeholder="enter your task" value={inputTask} onChange={handleInputChange} className="new-task"/>

             <div className="list-categories">

                <input type="radio" id="finance"
                name="category" value="finance" className="category" onChange={handleRadioFocus}/>
                <label htmlFor="finance">Finance</label>

                <input type="radio" id="school"
                name="category" value="school" className="category" onChange={handleRadioFocus}/>
                <label htmlFor="school">School</label>

                <input type="radio" id="home"
                name="category" value="home" className="category" onChange={handleRadioFocus}/>
                <label htmlFor="home">Home</label>

                <input type="radio" id="sport"
                name="category" value="sport" className="category" onChange={handleRadioFocus}/>
                <label htmlFor="sport">Sport</label>

                <input type="radio" id="work"
                name="category" value="work" className="category" onChange={handleRadioFocus}/>
                <label htmlFor="work">Work</label>

            </div>
                <CustomButton onClick={() => addNewTask(inputTask, taskCategory)}> Add </CustomButton>

        </div>
    );
}

export default AddTask;
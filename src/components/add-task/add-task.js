import React, { useState } from "react";

import "./add-task.css";

import CustomButton from "../custom-buttom/custom-button";
import RadioButton from "../radio-button/radio-button";

const AddTask = ({ addNewTask }) => {
  const [inputTask, setInputTask] = useState("");
  const [taskCategory, setTaskCategory] = useState("");

  const handleInputChange = (e) => {
    setInputTask(e.target.value);
  };

  const handleRadioFocus = (e) => {
    setTaskCategory(e.target.value);
  };

  const arrOfCategory = ["Finance", "School", "Home", "Work", "Sport"];
  return (
    <div className="add-task">
      <input
        type="text"
        placeholder="enter your task"
        value={inputTask}
        onChange={handleInputChange}
        className="new-task"
      />
      {/* map */}
      <div className="list-categories">
        {/* component */}
        {arrOfCategory.map((category) => (
          <RadioButton
            name={category}
            handleRadioFocus={handleRadioFocus}
            key={category}
          />
        ))}
      </div>
      {/* no anonymous function */}
      <CustomButton onClick={addNewTask.bind(this, inputTask, taskCategory)}>
        {" "}
        Add{" "}
      </CustomButton>
    </div>
  );
};

export default AddTask;

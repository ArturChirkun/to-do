import React, { useState } from "react";
import "./App.css";

import { v4 as uuidv } from "uuid";

import Header from "./components/header/header";
import ViewTasks from "./components/view-tasks/view-tasks";
import AddTask from "./components/add-task/add-task";
import CustomButton from "./components/custom-buttom/custom-button";

const App = () => {
  const storage = window.localStorage;
  const INITAIL_STATE = JSON.parse(storage.getItem("tasks"));
  const [tasks, setCompleteTasks] = useState(INITAIL_STATE);

  storage.setItem("tasks", JSON.stringify(tasks));

  const [visibality, setVisability] = useState(false);

  const handleVisabilityClick = () => {
    setVisability(!visibality);
  };

  const addNewTask = (name, category) => {
    const a = tasks.filter(
      (task) =>
        task?.name?.toLowerCase() === name.toLowerCase() &&
        task.category === category
    ).length;
    if (a === 0) {
      setCompleteTasks([
        ...tasks,
        {
          id: uuidv(),
          name: name,
          category: category,
          completed: false,
        },
      ]);
    } else {
      alert("this tasks has been already exist");
    }
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    setCompleteTasks(newTasks);
  };

  const addToCompleted = (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    completedTask.completed = true;
    setCompleteTasks([...tasks]);
  };

  return (
    <div className="App">
      <Header tasks={tasks} />
      <ViewTasks
        tasks={tasks}
        deleteTask={deleteTask}
        addToCompleted={addToCompleted}
        completed={false}
      />

      <CustomButton type="button" onClick={handleVisabilityClick}>
        {" "}
        {visibality ? "Close" : "Add new task"}{" "}
      </CustomButton>

      {visibality ? <AddTask addNewTask={addNewTask} /> : null}

      <ViewTasks tasks={tasks} deleteTask={deleteTask} completed={true} />
    </div>
  );
};

export default App;

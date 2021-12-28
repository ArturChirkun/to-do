import React, { useState } from "react";
import "./App.css";

import { v4 as uuidv } from "uuid";

import Header from "./components/header/header";
import ViewTasks from "./components/view-tasks/view-tasks";
import AddTask from "./components/add-task/add-task";
import CustomButton from "./components/custom-buttom/custom-button";
import ThemeButton from "./components/theme-button/theme-button";
import useLocalStorage from "use-local-storage";

const App = () => {
  const defaultDark = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "light" : "dark"
  );

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const storage = window.localStorage; // ????
  const INITAIL_STATE = JSON.parse(storage.getItem("tasks"));//typo
  const [tasks, setCompleteTasks] = useState(INITAIL_STATE);// tasks and complete tasks its not same

  storage.setItem("tasks", JSON.stringify(tasks)); /// ????

  const [visibality, setVisability] = useState(false);//typo

  const handleVisabilityClick = () => { // typo
    setVisability(!visibality); //  better use prev
  };

  const addNewTask = (name, category) => {
    if (name === "") {
      alert("Please, enter a task");
      return;
    }
    const checkOnMatching = tasks.filter(
      (task) =>
        task?.name?.toLowerCase() === name.toLowerCase() &&
        task.category === category
    ).length; // better to use find
    if (checkOnMatching === 0) {
      setCompleteTasks([
        ...tasks,
        {
          id: uuidv(),
          name: name,
          category: category,
          completed: false,
        },
      ]);
    } else { // use return instead else
      alert("this tasks has been already exist");
    }
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    setCompleteTasks(newTasks);
  };

  const addToCompleted = (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    completedTask.completed = true; // ????
    setCompleteTasks([...tasks]);
  };

  return (
    <div className="body" data-theme={theme}>
      <div className="App" >
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

        <ThemeButton onClick={switchTheme}>
          {" "}
          Switch to {theme === "dark" ? "Light" : "Dark"}{" "}
        </ThemeButton>
      </div>
    </div>
  );
};

export default App;

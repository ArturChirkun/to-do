import React, { useState, useEffect } from "react";
import "./App.css";

import { v4 as uuidv } from "uuid";

import Header from "./components/header/header";
import ViewTasks from "./components/view-tasks/view-tasks";
import AddTask from "./components/add-task/add-task";
import CustomButton from "./components/custom-buttom/custom-button";
import ThemeButton from "./components/theme-button/theme-button";
import {
  switchTheme,
  preTheme,
  getTasksFromLocalStorage,
  setTasksInLocalStorage,
} from "./components/services/local-storage";

const App = () => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    setTheme(preTheme());
  }, []);
  //const INITIAL_STATE = getTasksFromLocalStorage();
  const [tasks, setTasks] = useState(getTasksFromLocalStorage()); // tasks and complete tasks its not same --fix

  useEffect(() => {
    setTasksInLocalStorage(tasks);
  }, [tasks]);
  //setTasksinLocalStorage(tasks);

  const [visibility, setVisibility] = useState(false); //typo -fix

  const handleVisibilityClick = (prev) => {
    return () => {
      setVisibility(!prev);
    }
 //  better use prev --fix
  };

  const handleThemeSwitch = (theme) => {
    return () => {
      setTheme(theme)
    }
  }

  const addNewTask = (name, category) => {
    if (name === "") {
      alert("Please, enter a task");
      return;
    }
    const checkOnMatching = tasks.find(
      (task) =>
        task?.name?.toLowerCase() === name.toLowerCase() &&
        task.category === category
    ); // better to use find--fix

    // use return instead else
    return !checkOnMatching
      ? setTasks([
          ...tasks,
          {
            id: uuidv(),
            name: name,
            category: category,
            completed: false,
          },
        ])
      : alert("this tasks has been already exist");
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  };

  const addToCompleted = (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    const copyCompletedTask = { ...completedTask, completed: true };
    const newArrOfTasks = tasks.filter((task) => task.id !== id);
    newArrOfTasks.push(copyCompletedTask);
    setTasks(newArrOfTasks); // ????? --fix
  };
  return (
    <div className="body" data-theme={theme}>
      <div className="App">
        <Header tasks={tasks} />
        <ViewTasks
          tasks={tasks}
          deleteTask={deleteTask}
          addToCompleted={addToCompleted}
          completed={false}
        />

        <CustomButton
          type="button"
          onClick={handleVisibilityClick(visibility)}
        >
          {" "}
          {visibility ? "Close" : "Add new task"}{" "}
        </CustomButton>

        {visibility ? <AddTask addNewTask={addNewTask} /> : null}

        <ViewTasks tasks={tasks} deleteTask={deleteTask} completed={true} />

        <ThemeButton onClick={handleThemeSwitch(switchTheme)}>
          {" "}
          Switch to {theme === "dark" ? "Light" : "Dark"}{" "}
        </ThemeButton>
      </div>
    </div>
  );
};

export default App;

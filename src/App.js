import React, { useState, useEffect, useContext } from "react";
import "./App.css";

import { v4 as uuidv } from "uuid";

import Header from "./components/header/header";
import ViewTasks from "./components/view-tasks/view-tasks";
import AddTask from "./components/add-task/add-task";
import CustomButton from "./components/custom-buttom/custom-button";
import ThemeButton from "./components/theme-button/theme-button";
import {
  getTasksFromLocalStorage,
  setTasksInLocalStorage,
} from "./components/services/local-storage";
import { ThemeContext } from "./components/context/context";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [tasks, setTasks] = useState(getTasksFromLocalStorage()); // tasks and complete tasks its not same --fix

  useEffect(() => {
    setTasksInLocalStorage(tasks);
  }, [tasks]);
  //setTasksinLocalStorage(tasks);

  const [visibility, setVisibility] = useState(false); //typo -fix

  const handleVisibilityClick = (prev) => {
    return () => {
      setVisibility(!prev);
    };
    //  better use prev --fix
  };

  const handleThemeSwitch = () => {
    return () => {
      toggleTheme();
    };
  };

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

        <CustomButton type="button" onClick={handleVisibilityClick(visibility)}>
          {" "}
          {visibility ? "Close" : "Add new task"}{" "}
        </CustomButton>

        {visibility ? <AddTask addNewTask={addNewTask} /> : null}

        <ViewTasks tasks={tasks} deleteTask={deleteTask} completed={true} />

        <ThemeButton onClick={handleThemeSwitch()}>
          {" "}
          Switch to {theme === "dark" ? "Light" : "Dark"}{" "}
        </ThemeButton>
      </div>
    </div>
  );
};

export default App;

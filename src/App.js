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

  const storage = window.localStorage;
  const INITAIL_STATE = JSON.parse(storage.getItem("tasks"));
  const [tasks, setCompleteTasks] = useState(INITAIL_STATE);

  storage.setItem("tasks", JSON.stringify(tasks));

  const [visibality, setVisability] = useState(false);

  const handleVisabilityClick = () => {
    setVisability(!visibality);
  };

  const addNewTask = (name, category) => {

    if (name === '') {
      alert('Please, enter a task')
      return
    }
    const checkOnMatching = tasks.filter(
      (task) =>
        task?.name?.toLowerCase() === name.toLowerCase() &&
        task.category === category
    ).length;
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
    <div className="App" data-theme={theme}>
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
  );
};

export default App;

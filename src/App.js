import React, { useState, useEffect, useContext } from "react";
import "./App.css";

import { v4 as uuidv } from "uuid";

import Header from "./components/header/header";
import ViewTasks from "./components/view-tasks/view-tasks";
import CustomButton from "./components/custom-buttom/custom-button";
import ThemeButton from "./components/theme-button/theme-button";
import { AddTaskModal } from "./components/add-task-modal/add-task-modal";
import {
  getTasksFromLocalStorage,
  setTasksInLocalStorage,
} from "./services/local-storage";
import { ThemeContext } from "./context/context";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [tasks, setTasks] = useState(getTasksFromLocalStorage());

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    setTasksInLocalStorage(tasks);
  }, [tasks]);

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
    if (category === "") {
      alert("Please, choose category");
      return;
    }
    const checkOnMatching = tasks.find(
      (task) =>
        task?.name?.toLowerCase() === name.toLowerCase() &&
        task.category === category
    );

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
    setTasks(newArrOfTasks);
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
        <AddTaskModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          addNewTask={addNewTask}
        />
        <CustomButton type="button" onClick={openModal}>
          Add new task
        </CustomButton>

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

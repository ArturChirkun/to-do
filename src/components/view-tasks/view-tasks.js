import React from "react";

import "./view-tasks.css";

import Task from "../task/task";

const ViewTasks = ({ tasks, deleteTask, completed, addToCompleted }) => {
  const listOfTasks = completed
    ? tasks.filter((task) => task.completed === true)
    : tasks.filter((task) => task.completed === false);
  const header = completed ? "Completed" : "Incomplete";
  const noneTasks = listOfTasks.length ? null : "None tasks ";
  return (
    <div className="incomplete">
      <p className="head">
        {noneTasks}
        {noneTasks ? header.toLowerCase() : header}
      </p>
      <div className="incomplete-tasks">
        {listOfTasks.map((task) => (
          <Task
            name={task.name}
            category={task.category}
            id={task.id}
            key={task.id}
            deleteTask={deleteTask}
            addToCompleted={completed ? null : addToCompleted}
            checked={completed ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewTasks;

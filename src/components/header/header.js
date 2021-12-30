import React from "react";

import "./header.css";

import { currentDate } from "../../utils/utils";

const Header = ({ tasks }) => {
  const completedTasksCount = tasks.filter(
    (task) => task.completed === true
  ).length;
  const incompleteTasksCount = tasks.filter(
    (task) => task.completed === false
  ).length;

  // move to utils


  return (
    <div className="header">
      <div className="date">{currentDate}</div>
      <div className="number-of-tasks">
        {incompleteTasksCount} incomplete, {completedTasksCount} completed
      </div>
      <hr className="horizontal-line"></hr>
    </div>
  );
};

export default Header;

import moment from "moment";
import React from "react";

import "./header.css";

const Header = ({ tasks }) => {
  const completedTasksCount = tasks.filter(
    (task) => task.completed === true
  ).length;
  const incompleteTasksCount = tasks.filter(
    (task) => task.completed === false
  ).length;
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentDay = date.getDate();
  const currentMonth = moment().format("MMMM");
  const currentDate = `${currentMonth} ${currentDay}, ${currentYear}`;

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

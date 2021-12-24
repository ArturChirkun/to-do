import React, { useContext } from "react";
import { ThemeContext } from "../themes/themes";

import "./theme-button.css";

const ThemeButton = ({ onClick, ...props}) => {


  return (
    <div className="container">
      <input
        type="checkbox"
        name="toggle"
        id="toggle-button"
        className="toggle-button"
        onClick={() => onClick()}
      />
      <label forhtml="toggle-button" className="text">
        {props.children}
      </label>
    </div>
  );
};

export default ThemeButton;
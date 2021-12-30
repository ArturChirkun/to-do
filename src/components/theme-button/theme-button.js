import React from "react";


import "./theme-button.css";

const ThemeButton = ({ onClick, children}) => {
//no anon func
// change props.children to children

  return (
    <div className="container">
      <input
        type="checkbox"
        name="toggle"
        id="toggle-button"
        className="toggle-button"
        onClick={onClick}
      />
      <label forhtml="toggle-button" className="text">
        {children}
      </label>
    </div>
  );
};

export default ThemeButton;
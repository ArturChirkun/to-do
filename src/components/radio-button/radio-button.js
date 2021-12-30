import React from "react";

import "./radio-button.css";

const RadioButton = ({ handleRadioFocus, name }) => {
  return (
    <div className="radio-button-container">
      <input
        type="radio"
        id={name}
        name="category"
        value={name}
        className="category"
        onChange={handleRadioFocus}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

export default RadioButton;

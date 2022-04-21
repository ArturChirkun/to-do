import React from "react";

import "./radio-button.css";

const RadioButton = ({ handleRadioFocus, name }) => {
  return (
    <div className="radio-button-container">
      <div className="category">
        <input
          type="radio"
          id={name}
          name="category"
          value={name}
          onChange={handleRadioFocus}
        />
      </div>
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

export default RadioButton;

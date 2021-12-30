import React from "react";

import "./custom-button.css";

const CustomButton = ({ children, onClick }) => {
  // change props to { ...props}

  return (
    <button className="custom-button" onClick={onClick}>
      {" "}
      {children}{" "}
    </button>
  );
};

export default CustomButton;

import React from "react";

import "./custom-button.css";

const CustomButton = (props) => {
  // change props to { ...props}

  return <button onClick={props.onClick}>{props.children}</button>;
};

export default CustomButton;

import React from "react";

import { PacmanLoader } from "react-spinners";

export const SpinnerComponent = () => {
  const spinnerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div className="spinner" style={spinnerStyle}>
      <PacmanLoader color="#0250b3" />
    </div>
  );
};

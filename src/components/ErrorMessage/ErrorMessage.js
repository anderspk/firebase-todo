import React from "react";

const ErrorMessage = ({ children }) =>
  children ? (
    <p style={{ background: "#F44336", color: "white" }}>{children}</p>
  ) : null;

export default ErrorMessage;

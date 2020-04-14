import React from "react";

const ErrorMessage = ({ children }) => (children ? <p>{children}</p> : null);

export default ErrorMessage;

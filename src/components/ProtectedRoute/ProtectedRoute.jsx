import React from "react";
import { Navigate, Redirect } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
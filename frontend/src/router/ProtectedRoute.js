import React from "react";
import { Route, Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("usersssss", user)
  return user !== null;
};

const ProtectRoutes = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children;
};

export default ProtectRoutes;

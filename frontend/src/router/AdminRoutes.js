import React from "react";
import { Navigate } from "react-router-dom";

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role && user.role.toLowerCase() === "admin";
};

const AdminRoutes = ({ children }) => {
  if (!isAdmin()) {
    return <Navigate to="/home" />; // Redirect to home if not an admin
  }

  return children;  // Render the nested children (routes)
};

export default AdminRoutes;

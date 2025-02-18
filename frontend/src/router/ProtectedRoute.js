// // // import React, { useContext } from "react";
// // // import { Navigate, Outlet } from "react-router-dom";
// // // import { AuthContext } from "../context/AuthContext";

// // // const ProtectedRoute = ({ isAdmin }) => {
// // //   const { user } = useContext(AuthContext);

// // //   // Check if user is logged in and has admin role
// // //   if (!user) return <Navigate to="/login" />;
// // //   if (isAdmin && user.role !== "admin") return <Navigate to="/home" />; // Redirect non-admin users

// // //   return <Outlet />;
// // // };

// // // export default ProtectedRoute;

// import React, { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ isAdmin }) => {
//   // Get the current user from AuthContext
//   const { user } = useContext(AuthContext);
  
//   const isUserAdmin = user && user.role === "admin"; // Check if the user is an admin

//   // If the user is not an admin, redirect to login
//   return isUserAdmin ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

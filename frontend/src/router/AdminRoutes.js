// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import AdminLayout from "../components/Layout/AdminLayout";
// import Dashboard from "../pages/admin/Dashboard";
// import Users from "../pages/admin/Users";
// import Treks from "../pages/admin/Treks";
// import Bookings from "../pages/admin/Bookings";
// import ProtectedRoute from "./ProtectedRoute";  // Import protected route

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       {/* Protect all admin routes */}
//       <Route element={<ProtectedRoute isAdmin={true} />}>  
//         <Route element={<AdminLayout />}>
//           <Route path="/admin/dashboard" element={<Dashboard />} />
//           <Route path="/admin/users" element={<Users />} />
//           <Route path="/admin/treks" element={<Treks />} />
//           <Route path="/admin/bookings" element={<Bookings />} />
//           <Route path="*" element={<Navigate to="/admin" />} />
//         </Route>
//       </Route>
//     </Routes>
//   );
// };

// export default AdminRoutes;

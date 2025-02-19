import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/Layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Treks from "../pages/admin/Treks";
import Bookings from "../pages/admin/Bookings";
import ProtectedRoute from "./ProtectedRoute";  

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}> {/* Apply AdminLayout to all routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><Users /></ProtectedRoute>} />
        <Route path="/admin/treks" element={<ProtectedRoute isAdmin={true}><Treks /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute isAdmin={true}><Bookings /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

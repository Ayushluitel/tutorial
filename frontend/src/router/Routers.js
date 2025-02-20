// router/Routers.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./../pages/Home";
import Tours from "./../pages/Tours";
import TourDetails from "./../pages/TourDetails";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "./../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import ForgotPassword from "../pages/forgot-password";
import ResetPassword from "../pages/reset-password";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Treks from "../pages/admin/Treks";
import Bookings from "../pages/admin/Bookings";

import ProtectRoutes from "./ProtectedRoute";
import AdminRoutes from "./AdminRoutes";

const Router = () => {
  return (
    <Routes>
      {/* Public/User Routes */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />

      {/* Forgot and Reset Password Routes */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route element={<ProtectRoutes />}></Route>

      {/* Admin Routes */}
      <Route>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/treks" element={<Treks />} />
        <Route path="/admin/bookings" element={<Bookings />} />
      </Route>
    </Routes>
  );
};

export default Router;

import React from "react";
import { Outlet } from "react-router-dom";
import "../../styles/admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><a href="/admin/dashboard">Dashboard</a></li>
            <li><a href="/admin/users">Users</a></li>
            <li><a href="/admin/treks">Treks</a></li>
            <li><a href="/admin/bookings">Bookings</a></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

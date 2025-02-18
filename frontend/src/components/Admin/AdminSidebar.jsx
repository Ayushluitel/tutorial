import React from "react";
import { Link } from "react-router-dom";
import "../../styles/admin.css";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/treks">Treks</Link></li>
        <li><Link to="/admin/bookings">Bookings</Link></li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;

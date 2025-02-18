import React from "react";
import { Link } from "react-router-dom";
import "../../styles/admin.css";

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="logo">
        <h2>Path2Peaks Admin</h2>
      </div>
      <nav className="admin-nav">
        <Link to="/">Go to Website</Link>
        <Link to="/admin/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
};

export default AdminHeader;

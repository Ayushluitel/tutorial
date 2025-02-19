import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin.css"; // Ensure the path is correct for your styles

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // State to store dashboard statistics
  const [stats, setStats] = useState({ totalUsers: 0, totalTreks: 0, totalBookings: 0 });
  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats when component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Make GET request to backend to fetch dashboard stats
        const response = await axios.get("http://localhost:4000/api/v1/admin/dashboard", { withCredentials: true });
        
        console.log(response);
        // Set the fetched data into state
        setStats(response.data.data); // Ensure you're accessing `data.data` in the response
      } catch (error) {
        // Handle errors
        setError("Error fetching dashboard stats.");
      } finally {
        // Set loading to false after data is fetched or error occurs
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchStats();
  }, []);

  // Display loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Display error message if there was an error fetching stats
  if (error) {
    return <p>{error}</p>;
  }

  // Render the dashboard with fetched data
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        
        {/* Clickable Box - Navigate to Users Page */}
        <div className="stat-box" onClick={() => navigate("/admin/users")} style={{ cursor: "pointer" }}>
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>

        {/* Clickable Box - Navigate to Treks Page */}
        <div className="stat-box" onClick={() => navigate("/admin/treks")} style={{ cursor: "pointer" }}>
          <h3>{stats.totalTreks}</h3>
          <p>Total Treks</p>
        </div>

        {/* Clickable Box - Navigate to Bookings Page */}
        <div className="stat-box" onClick={() => navigate("/admin/bookings")} style={{ cursor: "pointer" }}>
          <h3>{stats.totalBookings}</h3>
          <p>Total Bookings</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

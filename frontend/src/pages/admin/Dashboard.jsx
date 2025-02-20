import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTreks: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/admin/dashboard",
          { withCredentials: true }
        );

        console.log("Dashboard Stats:", response.data.data);
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setError("Error fetching dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const pieChartData = {
    labels: ["Total Users", "Total Treks", "Total Bookings"],
    datasets: [
      {
        data: [stats.totalUsers, stats.totalTreks, stats.totalBookings],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EBCC", "#FF6384CC", "#FFCE56CC"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="admin-dashboard" style={styles.dashboard}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <div className="dashboard-stats" style={styles.statsContainer}>
        <div
          className="stat-box"
          onClick={() => navigate("/admin/users")}
          style={{ ...styles.statBox, cursor: "pointer" }}
        >
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>

        <div
          className="stat-box"
          onClick={() => navigate("/admin/treks")}
          style={{ ...styles.statBox, cursor: "pointer" }}
        >
          <h3>{stats.totalTreks}</h3>
          <p>Total Treks</p>
        </div>

        <div
          className="stat-box"
          onClick={() => navigate("/admin/bookings")}
          style={{ ...styles.statBox, cursor: "pointer" }}
        >
          <h3>{stats.totalBookings}</h3>
          <p>Total Bookings</p>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="chart-section" style={styles.chartSection}>
        <h2>Dashboard Overview</h2>
        <div style={styles.pieChartContainer}>
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const styles = {
  dashboard: {
    padding: "20px",
  },
  heading: {
    textAlign: "center",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  statBox: {
    backgroundColor: "#f4f4f9",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "200px",
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  chartSection: {
    marginTop: "20px",
    textAlign: "center",
  },
  pieChartContainer: {
    width: "300px",
    height: "300px",
    margin: "0 auto",
  },
};

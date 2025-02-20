import React, { useEffect, useState, useContext } from "react";
import { Table, Container } from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/booking/my-bookings",
          { withCredentials: true }
        );
        setBookings(res.data.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Trek Name</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.tourName || "N/A"}</td>
                <td>{booking.bookingDate || "N/A"}</td>
                <td>${booking.price || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      booking.status === "approved"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyBookings;

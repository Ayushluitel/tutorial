import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/admin/bookings",
          {
            withCredentials: true,
          }
        );
        console.log("res", response.data.data);
        setBookings(response.data.data);
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/admin/bookings/${bookingId}`,
        { status },
        {
          withCredentials: true,
        }
      );
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (err) {
      setError("Failed to update booking status");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manage Bookings</h1>
      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Trek</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.userId?.name}</td>
              <td>{booking.tourName}</td>
              <td>{booking.status}</td>
              <td>
                <Button
                  color="success"
                  onClick={() =>
                    handleUpdateBookingStatus(booking._id, "approved")
                  }
                >
                  Approve
                </Button>
                <Button
                  color="danger"
                  onClick={() =>
                    handleUpdateBookingStatus(booking._id, "rejected")
                  }
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Bookings;

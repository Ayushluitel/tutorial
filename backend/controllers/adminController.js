import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    console.log("kjkjkhjghfh");
    try {
        console.log(req.params._id);
        await User.findByIdAndDelete(req.params._id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete user" });
    }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
    console.log("booking");
    try {
        const bookings = await Booking.find().populate('user').populate('tour');
        console.log("bookings",bookings);
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
};

// Update booking status (approve/reject)
export const updateBookingStatus = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status }, // "approved" or "rejected"
            { new: true }
        );
        res.status(200).json({ success: true, message: "Booking status updated", data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update booking status" });
    }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalTreks = await Tour.countDocuments();
        const totalBookings = await Booking.countDocuments();

        res.status(200).json({
            success: true,
            data: { totalUsers, totalTreks, totalBookings }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch dashboard stats" });
    }
};

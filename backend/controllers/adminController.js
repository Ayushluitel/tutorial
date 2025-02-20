import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    console.log("Deleting User:", req.params.id);
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate({
      path: "userId",
      select: "name email",
    });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings" });
  }
};

// Update booking status (approve/reject)
export const updateBookingStatus = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Booking status updated",
      data: updatedBooking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update booking status" });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalTreks = await Tour.countDocuments();
    const totalBookings = await Booking.countDocuments();

    res.status(200).json({
      success: true,
      data: { totalUsers, totalTreks, totalBookings },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch dashboard stats" });
  }
};

export const createTrek = async (req, res) => {
  try {
    console.log(req.user);
    const newTour = new Tour({
      ...req.body,
      createdBy: req.user.id,
    });

    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create. Please try again.",
    });
  }
};

export const getAllTreks = async (req, res) => {
  try {
    const allTours = await Tour.find();
    res.status(200).json({ success: true, data: allTours });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch tours" });
  }
};

export const deleteTrek = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    if (!deletedTour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Tour deleted successfully" });
  } catch (error) {
    console.error("Error deleting tour:", error);
    res.status(500).json({ success: false, message: "Failed to delete tour" });
  }
};

export const updateTrek = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update tour" });
  }
};

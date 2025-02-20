import Booking from "../models/Booking.js";

//create new booking
export const createBooking = async (req, res) => {
  try {
    const { tourName, guestSize, phone, price, bookingDate } = req.body;

    const newBooking = new Booking({
      userId: req.user.id,
      tourName,
      guestSize,
      phone,
      price,
      bookingDate,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);
    res.status(200).json({
      success: true,
      message: "successful",
      data: book,
    });
  } catch (err) {
    res.status(404).json({
      success: true,
      message: "not found",
    });
  }
};

//get all booking
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json({
      success: true,
      message: "bookings fetched successfully",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });

    res.status(200).json({
      success: true,
      message: "User bookings fetched successfully",
      data: bookings.map((booking) => ({
        _id: booking._id,
        tourName: booking.tourName,
        guestSize: booking.guestSize,
        price: booking.price,
        phone: booking.phone,
        bookingDate: booking.bookingDate
          ? booking.bookingDate.toLocaleDateString()
          : "N/A",
        status: booking.status,
      })),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

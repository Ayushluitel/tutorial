import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'User',
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    bookAt: {
      type: Date,
      // required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

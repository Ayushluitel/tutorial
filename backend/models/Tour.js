import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    altitude: {
      type: Number,
      required: true,
    },
    photo: {
      type: [String], // Changed to an array to store multiple images
      required: true,
    },
    desc: {
      type: String,
      required: true,
      minlength: 20, // Ensures a meaningful description
    },
    price: {
      type: Number,
      required: true,
      default: 0, //  Prevents NaN issues
    },
    time: {
      type: Number, // Changed from String to Number (assuming it represents duration in days)
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "moderate", "difficult", "demanding"],
      required: true, //  Ensure difficulty level is always provided
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
        default: [], // Prevents errors if no reviews exist
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId, // Track which admin added this tour
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);

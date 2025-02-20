import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
      type: [String],
    },
    desc: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    time: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "moderate", "difficult", "demanding"],
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
        default: [],
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);

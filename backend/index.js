import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import reviewRoute from "./routes/reviews.js";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import bookingRoute from "./routes/bookings.js";
import adminRoute from "./routes/admin.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import { createAdminUser } from "./controllers/authController.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corOptions = {
  origin: true,
  credentials: true,
};

// Database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

// Middleware
app.use(express.json());
app.use(cors(corOptions));
app.use(cookieParser());

app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/newsletter", newsletterRoutes);

// Create Admin User if it doesn't exist
createAdminUser();

app.listen(port, () => {
  connect();
  console.log("Server listening on port", port);
});

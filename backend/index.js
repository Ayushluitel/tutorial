import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import reviewRoute from "./routes/reviews.js";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import bookingRoute from "./routes/bookings.js";
import adminRoute from "./routes/admin.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import { createAdminUser } from "./controllers/authController.js";
import recommendationsRoute from "./routes/recommendations.js";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors(corOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API check route
app.get("/api/v1", (req, res) => {
  res.status(200).send("API is working perfectly fine!");
});

app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/newsletter", newsletterRoutes);
app.use("/api/v1/recommendations", recommendationsRoute);


// Create Admin User if it doesn't exist
createAdminUser();

app.listen(port, () => {
  connect();
  console.log("Server listening on port", port);
});

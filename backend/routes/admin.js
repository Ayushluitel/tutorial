import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js"; // Use your existing function
import {
  getAllUsers,
  deleteUser,
  getAllBookings,
  updateBookingStatus,
  getDashboardStats,
  createTrek,
  updateTrek,
  deleteTrek,
  getAllTreks,
} from "../controllers/adminController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, deleteUser);
router.get("/bookings", verifyAdmin, getAllBookings);
router.put("/bookings/:id", verifyAdmin, updateBookingStatus);
router.get("/dashboard", verifyAdmin, getDashboardStats);
router.post("/treks", verifyAdmin, upload.array("photo", 5), createTrek);
router.get("/treks", verifyAdmin, getAllTreks);
router.put("/treks/:id", verifyAdmin, updateTrek);
router.delete("/treks/:id", verifyAdmin, deleteTrek);

export default router;

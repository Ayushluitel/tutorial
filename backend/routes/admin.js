import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';  // Use your existing function
import { getAllUsers, deleteUser, getAllBookings, updateBookingStatus, getDashboardStats } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', verifyAdmin, getAllUsers);
router.delete('/users/:id', verifyAdmin, deleteUser);
router.get('/bookings', verifyAdmin, getAllBookings);
router.put('/bookings/:id', verifyAdmin, updateBookingStatus);
router.get('/dashboard', verifyAdmin, getDashboardStats);
// router.get('/treks', verifyAdmin, create);

export default router;

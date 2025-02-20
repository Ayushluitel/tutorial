import express from 'express'
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js'
import { createBooking, getAllBookings, getBooking, getMyBookings } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/',verifyUser, createBooking );
router.get('/my-bookings', verifyUser, getMyBookings)
router.get('/:id',verifyUser, getBooking );
router.get('/',verifyAdmin, getAllBookings );

export default router;
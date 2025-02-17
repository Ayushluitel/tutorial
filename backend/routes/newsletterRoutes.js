import express from 'express';
import { sendNewsletter, subscribeToNewsletter } from '../controllers/newsletterController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//  Route for users to subscribe
router.post('/subscribe', subscribeToNewsletter);

//  Route for admins to send newsletters
router.post('/send-newsletter', verifyAdmin, sendNewsletter);

export default router;


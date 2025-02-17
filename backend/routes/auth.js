import express from 'express';
import { 
    register, 
    login, 
    verifyEmail, 
    forgotPassword, 
    resetPassword 
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email', verifyEmail); //  Added email verification route
router.post('/forgot-password', forgotPassword); //  Added forgot password route
router.post('/reset-password', resetPassword); //  Added reset password route

export default router;

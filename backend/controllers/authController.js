import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/emailService.js';

// User Registration (Send Verification Email)
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, isVerified: false });

        await newUser.save();

        //  Generate verification token (valid for 1 hour)
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        console.log("to", token)

        //  Send verification email with a button
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
        console.log("link", verificationLink)   
        const htmlContent = `
            <h2>Welcome to Path2Peaks!</h2>
            <p>Click the button below to verify your email:</p>
            <a href="${verificationLink}" 
               style="display:inline-block;padding:10px 20px;background-color:#28a745;color:#fff;text-decoration:none;border-radius:5px;">
                Verify Email
            </a>
            <p>If you didn’t request this, ignore this email.</p>
        `;

        await sendEmail(email, "Verify Your Email", `Click here to verify: ${verificationLink}`, htmlContent);
        console.log("sent")

        res.status(201).json({ message: "User registered. Check email for verification link!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

// Email Verification Route
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) return res.status(400).json({ message: "Invalid token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        console.log("user", user)
        // Mark user as verified
        user.isVerified = true;
        await user.save();

        console.log("hello")

        // Redirect to frontend login page after verification
        res.redirect(`${process.env.FRONTEND_URL}/login`);
        console.log("world")
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};

//  User Login (Check Email Verification)
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // If user doesn't exist
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        //  Check if email is verified
        if (!user.isVerified) {
            return res.status(401).json({ success: false, message: 'Please verify your email first' });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }

        // Create JWT token
        const { password: _, role, ...rest } = user._doc;
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
        );

        // Set token in cookies
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({
            token,
            data: { ...rest, role },  // Add role to the data object
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to login' });
    }
};

// Forgot Password - Send Reset Email
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        //  Generate reset token
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        //  Send email with reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await sendEmail(email, "Password Reset", `Click here to reset: ${resetLink}`, `<a href="${resetLink}">Reset Password</a>`);

        res.status(200).json({ message: "Password reset email sent!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending reset email", error });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token) return res.status(400).json({ message: "Invalid token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password reset successful!" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};

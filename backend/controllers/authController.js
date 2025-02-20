import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/emailService.js";

// User Registration (Send Verification Email)
export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // Save the user to the database
    await newUser.save();

    // Generate verification token (valid for 1 hour)
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send verification email with a button
    const verificationLink = `${process.env.BACKEND_URL}/api/v1/auth/verify-email?token=${token}`;

    const htmlContent = `
            <h2>Welcome to Path2Peaks!</h2>
            <p>Click the button below to verify your email:</p>
            <a href="${verificationLink}" 
               style="display:inline-block;padding:10px 20px;background-color:#28a745;color:#fff;text-decoration:none;border-radius:5px;">
                Verify Email
            </a>
            <p>If you didn’t request this, ignore this email.</p>
        `;

    await sendEmail(
      email,
      "Verify Your Email",
      `Click here to verify: ${verificationLink}`,
      htmlContent
    );
    res
      .status(201)
      .json({ message: "User registered. Check email for verification link!" });
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

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    // Redirect to frontend login page
    res.redirect(`${process.env.FRONTEND_URL}/login`);
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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //  Check if email is verified
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ success: false, message: "Please verify your email first" });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    // Create JWT token
    const { password: _, role, ...rest } = user._doc;
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // Set token in cookies
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        data: { ...rest, role }, // Add role to the data object
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
};

// Forgot Password - Send Reset Email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    //  Generate reset token
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    //  Send email with reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendEmail(
      email,
      "Password Reset",
      `Click here to reset: ${resetLink}`,
      `<a href="${resetLink}">Reset Password</a>`
    );

    res.status(200).json({ message: "Password reset email sent!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending reset email", error });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log("token", token);
    console.log("newPassword", newPassword);
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

// Create Admin User
export const createAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      // console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = new User({
      username: "admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    await newAdmin.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

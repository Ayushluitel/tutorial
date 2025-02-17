import User from '../models/User.js';
import sendEmail from '../utils/emailService.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

// Newsletter Send (Admin send)
export const sendNewsletter = async (req, res) => {
    try {
        const { subject, message, selectedUsers } = req.body;

        // Validation: Check if subject and message are provided
        if (!subject || !message) {
            return res.status(400).json({ message: "Subject and message are required." });
        }

        let users;

        // If selected users are provided, send email to selected users, otherwise to all users
        if (selectedUsers && selectedUsers.length > 0) {
            // Fetch users by selected IDs
            users = await User.find({ _id: { $in: selectedUsers } });
        } else {
            // Fetch all users
            users = await User.find({}, 'email');
        }

        if (!users.length) {
            return res.status(404).json({ message: "No users found to send the newsletter." });
        }

        // Extract emails from user list
        const emailList = users.map(user => user.email);

        // Send email to multiple recipients
        await sendEmail(
            emailList,        // Array of emails
            subject,          // Subject from the request body
            message,          // Plain-text message
            `<p>${message}</p>` // HTML version of the message
        );
        console.log("Sent subscription email:", email);
        res.status(200).json({ message: "Newsletter sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send newsletter", error: error.message });
    }
};

// Newsletter Subscription (Users subscribe)
export const subscribeToNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        // Check if user already exists in DB (optional, if you're saving emails)
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.isSubscribed) {
            return res.status(400).json({ message: "You are already subscribed!" });
        }

        // Update user record or save new subscription info
        if (existingUser) {
            existingUser.isSubscribed = true;
            await existingUser.save();
        } else {
            // Optionally, you can create a `NewsletterSubscriber` model to store non-registered user emails.
            await NewsletterSubscriber.create({ email });
        }

        console.log("Received subscription request for email:", email);

        res.status(200).json({ message: "Subscribed successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Subscription failed", error });
    }
};
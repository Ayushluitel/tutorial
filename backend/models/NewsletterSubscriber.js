import mongoose from "mongoose";

const NewsletterSubscriberSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true
     },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("NewsletterSubscriber", NewsletterSubscriberSchema);

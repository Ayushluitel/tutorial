import React, { useState } from "react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";
import axios from "axios";

const Newsletter = () => {
    const [email, setEmail] = useState(""); // State to store user email
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Handle form submission
    const handleSubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(`http://localhost:4000/api/v1/newsletter/subscribe`, { email });
            setMessage(response.data.message);
            setEmail(""); // Clear input field after successful subscription
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to subscribe. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="newsletter">
            <Container>
                <Row>
                    <Col lg="6">
                        <div className="newsletter__content">
                            <h2>Subscribe now to get useful traveling information.</h2>
                            <form className="newsletter__input" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button className="btn newsletter__btn" type="submit" disabled={loading}>
                                    {loading ? "Subscribing..." : "Subscribe"}
                                </button>
                            </form>
                            {message && <p className="newsletter__message">{message}</p>}
                            <p>
                                Get the latest trekking updates, tips, and exclusive offers right in your inbox.
                            </p>
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="newsletter__img">
                            <img src={maleTourist} alt="Traveler" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Newsletter;

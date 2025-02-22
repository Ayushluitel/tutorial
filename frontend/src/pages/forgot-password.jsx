import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import '../styles/forgot-password.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const result = await res.json();
            if (!res.ok) {
                setError(result.message);
            } else {
                setMessage(result.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <section className="forgot-password">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="6" md="8" sm="10">
                        <div className="forgot-password__container">
                            <h2 className="forgot-password__title">Forgot Password</h2>
                            <Form onSubmit={handleSubmit} className="forgot-password__form">
                                <FormGroup>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        value={email}
                                        onChange={handleChange}
                                        className="forgot-password__input"
                                    />
                                </FormGroup>
                                <Button className="btn forgot-password__btn" type="submit">
                                    Send Reset Link
                                </Button>
                            </Form>
                            {message && <p className="success-text">{message}</p>}
                            {error && <p className="error-text">{error}</p>}
                            <p className="forgot-password__login-link">
                                Remembered your password? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ForgotPassword;

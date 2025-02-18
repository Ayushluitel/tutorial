import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import '../styles/forgot-password.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await res.json();
            if (!res.ok) {
                setError(result.message);
            } else {
                setMessage(result.message); // Success message
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="8" className="m-auto">
                        <div className="forgot-password__container">
                            <h2>Forgot Password</h2>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        value={email}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <Button className="btn secondary__btn auth__btn" type="submit">
                                    Send Reset Link
                                </Button>
                            </Form>
                            {message && <p className="success-text">{message}</p>}
                            {error && <p className="error-text">{error}</p>}
                            <p>
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

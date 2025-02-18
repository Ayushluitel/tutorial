import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import '../styles/reset-password.css';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState(new URLSearchParams(location.search).get('token'));

    const handlePasswordChange = (e) => {
        e.target.id === 'newPassword' ? setNewPassword(e.target.value) : setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const result = await res.json();
            if (!res.ok) {
                setError(result.message);
            } else {
                setMessage(result.message); // Success message
                setTimeout(() => navigate('/login'), 3000); // Redirect after success
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
                        <div className="reset-password__container">
                            <h2>Reset Password</h2>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        required
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        required
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </FormGroup>
                                <Button className="btn secondary__btn auth__btn" type="submit">
                                    Reset Password
                                </Button>
                            </Form>
                            {message && <p className="success-text">{message}</p>}
                            {error && <p className="error-text">{error}</p>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ResetPassword;

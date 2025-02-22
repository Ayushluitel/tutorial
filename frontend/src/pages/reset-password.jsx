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
    const [token] = useState(new URLSearchParams(location.search).get('token'));

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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
            });

            const result = await res.json();
            if (!res.ok) {
                setError(result.message);
            } else {
                setMessage(result.message);
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <section className="reset-password">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="6" md="8" sm="10">
                        <div className="reset-password__container">
                            <h2 className="reset-password__title">Reset Password</h2>
                            <Form onSubmit={handleSubmit} className="reset-password__form">
                                <FormGroup>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        required
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                        className="reset-password__input"
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
                                        className="reset-password__input"
                                    />
                                </FormGroup>
                                <Button className="btn reset-password__btn" type="submit">
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

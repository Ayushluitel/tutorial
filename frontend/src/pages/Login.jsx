import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined
    });

    const [error, setError] = useState(null);  // State to hold error message
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        dispatch({ type: 'LOGIN_START' });

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(credentials),
            });
            console.log(res);

            const result = await res.json();
            if (!res.ok) {
                setError(result.message);  // Set error if login fails
                console.log(result);
            } else {
                console.log("eta aaye ")
                dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
                navigate('/');
            }
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
            setError('An error occurred during login. Please try again.'); // Set error message for unexpected issues
            console.log(err);
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="8" className="m-auto">
                        <div className="login__container d-flex justify-content-between">
                            <div className="login__img">
                                <img src={loginImg} alt="" />
                            </div>
                            <div className="login__form">
                                <div className="user">
                                    <img src={userIcon} alt="" />
                                </div>
                                <h2>Login</h2>
                                <Form onSubmit={handleClick}>
                                    <FormGroup>
                                        <input type="email" placeholder="Email" required id="email"
                                            onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <input type="password" placeholder="Password" required
                                            id="password" onChange={handleChange} />
                                    </FormGroup>
                                    <Button className="btn secondary__btn auth__btn" type="submit">Login</Button>
                                </Form>
                                {error && <p className="error-text">{error}</p>}  {/* Display error message */}
                                <p>Don't have an account? <Link to='/register'>Create</Link></p>
                                <p><Link to='/forgot-password'>Forgot Password?</Link></p> {/* Forgot Password Link */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
};

export default Login;

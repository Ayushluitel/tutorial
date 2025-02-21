import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const [error, setError] = useState(null); 
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error("Invalid Credentials");
      } else {
        toast.success("Login Successful!");
        // Save the token to localStorage (or to cookies, if needed)
        localStorage.setItem("token", result.token);
        dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  // Check token expiry when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      const expiryTime = decoded.exp * 1000; // Convert to milliseconds
      if (expiryTime < Date.now()) {
        localStorage.removeItem("token"); // Clear the expired token
        dispatch({ type: "LOGOUT" }); // Dispatch logout action if you use context
        navigate("/login"); // Redirect to login page
      }
    }
  }, [dispatch, navigate]);

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
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
                {error && <p className="error-text">{error}</p>}
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
                <p>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick theme="light" />
    </section>
  );
};

export default Login;

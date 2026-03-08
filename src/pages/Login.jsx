/*
========================================================
LOGIN COMPONENT
========================================================

Purpose:
Allows a user to login using email and password.

This component:
• Collects user credentials
• Calls the login() function from AuthContext
• Redirects to /home if login succeeds
• Shows an error message if login fails

Authentication logic itself is handled inside AuthContext.
This component only triggers it.

========================================================
*/

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  /*
  ------------------------------------------------------
  ACCESS AUTH FUNCTIONS FROM CONTEXT
  ------------------------------------------------------
  login() validates the credentials stored in localStorage
  */
  const { login } = useAuth();

  /*
  ------------------------------------------------------
  NAVIGATION HOOK
  ------------------------------------------------------
  Used to redirect user after successful login
  */
  const navigate = useNavigate();

  /*
  ------------------------------------------------------
  LOCAL STATE
  ------------------------------------------------------
  email → user email input
  password → user password input
  error → error message if login fails
  */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /*
  ------------------------------------------------------
  HANDLE FORM SUBMIT
  ------------------------------------------------------
  1. Prevent default page reload
  2. Call login() from AuthContext
  3. If login succeeds → redirect to /home
  4. If login fails → show error message
  */
  const handleSubmit = (e) => {

    e.preventDefault();

    // clear previous error
    setError("");

    // call login function from context
    const success = login(email, password);

    if (success) {

      // redirect user to homepage
      navigate("/home");

    } else {

      // show error if credentials don't match
      setError("Invalid email or password");

    }
  };

  return (

    /*
    ------------------------------------------------------
    AUTH PAGE CONTAINER
    ------------------------------------------------------
    This wraps the login card
    */
    <div className="auth-page">

      {/* Login card UI */}
      <div className="auth-card">

        <h2>Login</h2>

        {/* Error message if login fails */}
        {error && (
          <div
            style={{
              color: "#b91c1c",
              background: "#fef2f2",
              padding: "10px",
              borderRadius: "var(--radius-sm)",
              marginBottom: "1rem",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit}>

          {/* Email input */}
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 500
            }}
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />

          {/* Password input */}
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 500
            }}
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />

          {/* Login button */}
          <button
            type="submit"
            className="auth-btn"
            style={{ marginTop: "0.5rem" }}
          >
            Login
          </button>

        </form>

        {/* Signup redirect */}
        <p
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            fontSize: "0.95rem"
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "var(--color-primary)",
              fontWeight: 600
            }}
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
/*
========================================================
SIGNUP PAGE
========================================================

Purpose:
Allows a new user to create an account.

What happens here:
1. User enters name, email, and password.
2. signup() from AuthContext stores the user in localStorage.
3. A success message is displayed.
4. User is asked to login afterwards.

NOTE:
This project uses frontend-only authentication,
so user data is stored in the browser's localStorage.

========================================================
*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {

  /*
  ------------------------------------------------------
  ACCESS SIGNUP FUNCTION FROM AUTH CONTEXT
  ------------------------------------------------------
  signup() saves user credentials to localStorage.
  */
  const { signup } = useAuth();

  /*
  ------------------------------------------------------
  LOCAL STATE
  ------------------------------------------------------
  name → user's name
  email → user's email
  password → user's password
  success → message shown after successful signup
  */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  /*
  ------------------------------------------------------
  HANDLE FORM SUBMIT
  ------------------------------------------------------
  1. Prevent page reload
  2. Call signup() to store user
  3. Show success message
  4. Clear password field
  */
  const handleSubmit = (e) => {

    e.preventDefault();

    // store user using AuthContext
    signup(name, email, password);

    // show confirmation message
    setSuccess("Signup successful! Please login with your credentials.");

    // clear password field
    setPassword("");
  };

  return (

    /*
    ------------------------------------------------------
    AUTH PAGE LAYOUT
    ------------------------------------------------------
    Same layout used for login page for consistency
    */
    <div className="auth-page">

      {/* Signup card UI */}
      <div className="auth-card">

        <h1>Sign Up</h1>

        {/* Success message shown after signup */}
        {success && (
          <div
            style={{
              color: "#166534",
              background: "#dcfce7",
              padding: "10px",
              borderRadius: "var(--radius-sm)",
              marginBottom: "1rem",
              fontSize: "0.9rem",
            }}
          >
            {success}
          </div>
        )}

        {/* Signup form */}
        <form onSubmit={handleSubmit}>

          {/* Name input */}
          <label
            htmlFor="name"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 500
            }}
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
            required
            autoComplete="name"
          />

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
            autoComplete="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
            autoComplete="new-password"
          />

          {/* Signup button */}
          <button
            type="submit"
            className="auth-btn"
            style={{ marginTop: "0.5rem" }}
          >
            Sign Up
          </button>

        </form>

        {/* Login redirect link */}
        <p
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            fontSize: "0.95rem"
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "var(--color-primary)",
              fontWeight: 600
            }}
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
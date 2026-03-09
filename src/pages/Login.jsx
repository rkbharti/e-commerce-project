/*
========================================================
UPDATED LOGIN COMPONENT (MERN STACK VERSION)
========================================================

Explain that this component is now "Asynchronous." 
Instead of checking a local string, it waits for a 
response from the Express Server (Port 5000).
========================================================
*/

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  /*
  ------------------------------------------------------
  1. CONSUMING THE AUTH CONTEXT
  ------------------------------------------------------
  The login function here is now an 'async' function 
  that returns a Promise (success or failure).
  */
  const { login } = useAuth();
  const navigate = useNavigate();

  /*
  ------------------------------------------------------
  2. STATE MANAGEMENT
  ------------------------------------------------------
  - email/password: Controlled inputs
  - error: To display "User not found" or "Invalid Password"
  - loading: (New) To disable button during API call
  */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /*
  ------------------------------------------------------
  3. HANDLE FORM SUBMIT (The Logic)
  ------------------------------------------------------
  WHY ASYNC? Because fetching data from a database 
  takes time. We must use 'await' to wait for the result.
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");      // Clear previous errors
    setLoading(true);  // UI feedback: start loading

    // The 'login' function now sends a POST request to the backend
    const result = await login(email, password);

    if (result.success) {
      // If backend says 200 OK, move to the homepage
      navigate("/home");
    } else {
      // If backend says 400/500, show the specific error message
      setError(result.message || "Invalid email or password");
    }

    setLoading(false); // UI feedback: stop loading
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        {/* Dynamic Error Message Block */}
        {error && (
          <div
            style={{
              color: "#b91c1c",
              background: "#fef2f2",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              border: "1px solid #fee2e2"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            disabled={loading} // Prevent typing during request
            required
          />

          <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            disabled={loading} // Prevent typing during request
            required
          />

          <button
            type="submit"
            className="auth-btn"
            style={{ 
                marginTop: "0.5rem",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer"
            }}
            disabled={loading} // Prevent double-clicking
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.95rem" }}>
          Don&apos;t have an account?{" "}
          <Link to="/signup" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
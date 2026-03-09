import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result && result.success) {
        // ✅ PRIORITIZE REDIRECTION:
        // 1. Pehle check karo React Router ki state mein 'from' hai? (Fastest)
        // 2. Phir check karo LocalStorage mein kuch bacha hai? (Fallback)
        // 3. Kuch nahi toh Home '/' par bhej do.
        
        const routerStatePath = location.state?.from;
        const storagePath = localStorage.getItem("redirectAfterLogin");
        
        const finalRedirect = routerStatePath || storagePath || "/";

        console.log("Login Success! Redirecting to:", finalRedirect);

        // Safai: Kaam hone ke baad storage mita do
        localStorage.removeItem("redirectAfterLogin");

        navigate(finalRedirect, { replace: true });
      } else {
        setError(result?.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ padding: '20px' }}>
      <div className="auth-card" style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2>Login</h2>
        {error && (
          <div className="error-box" style={{ 
            color: '#b91c1c', 
            background: '#fef2f2', 
            padding: '10px', 
            borderRadius: '4px', 
            marginBottom: '15px',
            fontSize: '0.9rem',
            border: '1px solid #fee2e2'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: 'white' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="auth-input"
              placeholder="Enter your email"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: 'white' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="auth-input"
              placeholder="Enter your password"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button 
            type="submit" 
            className="auth-btn" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
        
        <p className="auth-footer" style={{ marginTop: '20px', textAlign: 'center', color: 'white' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#007bff', fontWeight: 'bold' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
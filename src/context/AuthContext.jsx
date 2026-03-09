import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// 💡 Senior Tip: URL ko ek jagah define karein. 
// Jab ngrok restart ho, toh bas yahan URL badal dein.
const BASE_URL = " https://amalia-stolid-chelsey.ngrok-free.dev"; 

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Common Headers for Ngrok
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true' // ✅ This fixes the mobile "Server Error"
  });

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      return response.ok ? { success: true } : { success: false, message: data.message || "Signup failed" };
    } catch (error) {
      return { success: false, message: "Server connection error." };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Network error. Is ngrok running?" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
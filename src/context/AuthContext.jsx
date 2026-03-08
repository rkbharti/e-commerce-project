import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check if there is an ACTIVE session in storage on load
    const savedSession = localStorage.getItem("active_user");
    return savedSession ? JSON.parse(savedSession) : null;
  });

  const login = (email, password) => {
    // We check against the "registered_user" we created during signup
    const registeredUserRaw = localStorage.getItem("registered_user");

    if (!registeredUserRaw) return false;

    const registeredUser = JSON.parse(registeredUserRaw);

    if (registeredUser.email === email && registeredUser.password === password) {
      // SUCCESS: Save to state
      setUser(registeredUser);
      // SUCCESS: Save to localStorage so it survives REFRESH
      localStorage.setItem("active_user", JSON.stringify(registeredUser));
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    const newUser = { name, email, password };
    // This acts as our "Database"
    localStorage.setItem("registered_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    // Remove only the active session, keep the "registered_user" database
    localStorage.removeItem("active_user");
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
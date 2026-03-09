import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation(); // 👈 1. Current location pakdo

  if (!user) {
    // 👈 2. Login pe bhejte waqt 'state' mein current rasta pass karo
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
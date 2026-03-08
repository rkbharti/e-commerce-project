import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Import your custom hook

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  const { pathname } = useLocation();
  const { user } = useAuth(); // Get the persistent user state from Context

  /*
  ------------------------------------------------------
  DYNAMIC NAVBAR LOGIC
  ------------------------------------------------------
  Hide navbar on Login/Signup/Root ONLY if the user is 
  not logged in. If they are logged in, we show it everywhere.
  */
  const hideNavbar = (pathname === "/" || pathname === "/login" || pathname === "/signup") && !user;

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* AUTO-REDIRECT LOGIC:
          If a user is already logged in (persisted in localStorage), 
          don't show them the Login/Signup pages; send them straight to /home.
        */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/home" replace /> : <Login />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/home" replace /> : <Login />} 
        />
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/home" replace /> : <Signup />} 
        />

        {/* PROTECTED ROUTES:
          These check the AuthContext. If no user is found in memory,
          ProtectedRoute will kick them back to /login.
        */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        {/* Public or semi-public routes */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* CATCH-ALL: Redirect any unknown URL to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    /* Note: Ensure AuthProvider wraps your entire App 
       (usually done in main.jsx or index.jsx) 
    */
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
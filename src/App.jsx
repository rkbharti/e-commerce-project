import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; 
import { useCart } from "./context/CartContext"; 

// Component Imports
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import OrderSuccess from "./pages/OrderSuccess";
import Checkout from "./pages/Checkout";  
import MyOrders from "./pages/MyOrders";  
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth(); 
  const { cart, setCart } = useCart(); 

  // Safely calculate total
  const total = cart?.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0) || 0;
  const clearCart = () => setCart([]);

  const hideNavbar = (location.pathname === "/login" || location.pathname === "/signup") && !user;

  return (
    <>
      {!hideNavbar && <Navbar cartCount={cart.length} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* ✅ Logic: Agar user login ho gaya aur piche se koi rasta (from) aaya hai, toh wahi bhejo */}
        <Route 
          path="/login" 
          element={user ? <Navigate to={location.state?.from || "/"} replace /> : <Login />} 
        />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />

        <Route path="/cart" element={<Cart />} />
        
        <Route 
          path="/checkout" 
          element={
            user ? (
              <Checkout cart={cart} totalAmount={total} clearCart={clearCart} />
            ) : (
              /* ✅ Yahan se hum pakka rasta bhej rahe hain login page ko */
              <Navigate to="/login" state={{ from: "/checkout" }} replace />
            )
          } 
        />

        <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

// ✅ Main App Component jo BrowserRouter provide karta hai
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Analytics />
    </BrowserRouter>
  );
}

export default App; // 👈 Ye raha tera export default!
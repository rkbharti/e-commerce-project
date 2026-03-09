import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; 
import { useCart } from "./context/CartContext"; // Importing the global cart hook


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
  const { pathname } = useLocation();
  const { user } = useAuth(); // Retrieves logged-in user status
  
  // Consuming global cart state instead of local useState to ensure data consistency across pages
  const { cart, setCart } = useCart(); 

  // Dynamically calculates total price by iterating through the current cart items
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Resets the cart to an empty array after a transaction is successfully completed
  const clearCart = () => setCart([]);

  // Determines whether to show or hide the Navbar based on the current URL path and auth status
  const hideNavbar = (pathname === "/" || pathname === "/login" || pathname === "/signup") && !user;

  return (
    <>
      {!hideNavbar && <Navbar cartCount={cart.length} />}
      <Routes>
        {/* Redirects users to Home if already logged in, otherwise shows Login */}
        <Route path="/" element={user ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/home" replace /> : <Signup />} />

        {/* Home dashboard accessible only to authenticated users */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        
        {/* Displays all available products fetched from the database */}
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        
        {/* Shows detailed information for a single product using its unique ID from the URL */}
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />

        {/* View and edit items currently added to the shopping session */}
        <Route path="/cart" element={<ProtectedRoute><Cart cart={cart} setCart={setCart} /></ProtectedRoute>} />

        {/* Handles final shipping details and order submission to the backend API */}
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout cart={cart} totalAmount={total} clearCart={clearCart} />
            </ProtectedRoute>
          } 
        />

        {/* Displays a list of all successful past orders linked to the user's ID */}
        <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />

        {/* Feedback page to confirm the order has been received by the server */}
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Redirects any undefined or broken URL paths back to the home page */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

function App() {
  // Main provider that enables client-side routing and history management for the application
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
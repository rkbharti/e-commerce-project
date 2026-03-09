import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, totalAmount, clearCart }) => {
  const { user } = useAuth(); // AuthContext se current user ki info nikalna
  const navigate = useNavigate(); // Order ke baad doosre page par bhejne ke liye navigate function

  // User ka address store karne ke liye state object
  const [address, setAddress] = useState({ street: "", city: "", zipCode: "", phone: "" });
  const [loading, setLoading] = useState(false); // API call ke waqt button ko disable karne ke liye state

  // Input fields mein typing ke waqt address state ko update karne wala function
  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Order submit karne ka main function
  const handlePlaceOrder = async (e) => {
    e.preventDefault(); // Page reload hone se rokna
    
    // Empty cart check: Bina products ke order nahi hona chahiye
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    setLoading(true); // Loading spinner ya processing text dikhana shuru karein

    // Backend API ke liye data structure taiyar karna
    const orderData = {
      userId: user.id, // User ki unique ID identification ke liye
      items: cart.map(item => ({
        name: item.name || item.title, // 'name' ya 'title' mein se jo available ho wo lena
        price: item.price,
        quantity: item.quantity || 1, // Default quantity 1 rakhna
        image: item.image,     
      })),
      amount: totalAmount, // Order ka total bill
      address: address, // Shipping destination details
    };

    try {
      // Backend ko POST request bhejna order save karne ke liye
      const response = await fetch("http://localhost:5000/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      // Agar backend se success message mile toh cart khali karke success page par bhejna
      if (data.success) {
        clearCart(); 
        navigate("/order-success"); 
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Request khatam hone par loading state band karna
    }
  };

  return (
    <div className="checkout-page" style={{ 
      padding: "2rem", maxWidth: "600px", margin: "40px auto", 
      color: "var(--color-text)", background: "var(--color-bg-elevated)", 
      borderRadius: "12px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-lg)"
    }}>
      {/* Title section with theme primary color border */}
      <h2 style={{ borderBottom: "3px solid var(--color-primary)", display: "inline-block", marginBottom: "1.5rem", paddingBottom: "5px" }}>
        Shipping Details
      </h2>
      
      <form onSubmit={handlePlaceOrder}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Street Address Input Area */}
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Street Address</label>
            <input name="street" placeholder="123 Apple St." onChange={handleInputChange} required className="auth-input" />
          </div>
          
          {/* City Input Area */}
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>City</label>
            <input name="city" placeholder="New York" onChange={handleInputChange} required className="auth-input" />
          </div>

          {/* Zip Code and Phone displayed side-by-side using CSS Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Zip Code</label>
              <input name="zipCode" placeholder="10001" onChange={handleInputChange} required className="auth-input" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Phone</label>
              <input name="phone" placeholder="+1 234..." onChange={handleInputChange} required className="auth-input" />
            </div>
          </div>
        </div>
        
        {/* Order Summary and Payment Section */}
        <div style={{ marginTop: "2rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>Order Total:</span>
            {/* Displaying final calculated amount with currency symbol */}
            <span style={{ fontSize: "1.8rem", fontWeight: "bold", color: "var(--color-primary)" }}>
              ${totalAmount}
            </span>
          </div>

          {/* Final Submit Button with dynamic loading text */}
          <button type="submit" className="auth-btn" disabled={loading} style={{ fontSize: '1.1rem' }}>
            {loading ? "Processing Order..." : "Confirm & Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
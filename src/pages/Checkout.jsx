import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// 💡 Senior Tip: Backend ka wahi URL use karein jo ngrok terminal (Port 5000) mein hai
const BASE_URL = "https://e-commerce-project-k8h6.onrender.com";

const Checkout = ({ cart, totalAmount, clearCart }) => {
  const { user } = useAuth(); 
  const navigate = useNavigate(); 

  const [address, setAddress] = useState({ street: "", city: "", zipCode: "", phone: "" });
  const [loading, setLoading] = useState(false); 

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault(); 
    
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    setLoading(true); 

    const orderData = {
      userId: user?.id, // ✅ Safety check added
      items: cart.map(item => ({
        name: item.name || item.title, 
        price: item.price,
        quantity: item.quantity || 1, 
        image: item.image,     
      })),
      amount: totalAmount, 
      address: address, 
    };

    try {
      const response = await fetch(`${BASE_URL}/api/orders/place`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true" 
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        clearCart(); 
        navigate("/order-success"); 
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Network Error. Check if your backend ngrok is running!");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="checkout-page" style={{ 
      padding: "2rem", maxWidth: "600px", margin: "40px auto", 
      color: "var(--color-text)", background: "var(--color-bg-elevated)", 
      borderRadius: "12px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-lg)"
    }}>
      <h2 style={{ borderBottom: "3px solid var(--color-primary)", display: "inline-block", marginBottom: "1.5rem", paddingBottom: "5px" }}>
        Shipping Details
      </h2>
      
      <form onSubmit={handlePlaceOrder}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Street Address</label>
            <input name="street" placeholder="123 Apple St." onChange={handleInputChange} required className="auth-input" />
          </div>
          
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>City</label>
            <input name="city" placeholder="New York" onChange={handleInputChange} required className="auth-input" />
          </div>

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
        
        <div style={{ marginTop: "2rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>Order Total:</span>
            <span style={{ fontSize: "1.8rem", fontWeight: "bold", color: "var(--color-primary)" }}>
              ${totalAmount ? Number(totalAmount).toFixed(2) : "0.00"}
            </span>
          </div>

          <button type="submit" className="auth-btn" disabled={loading} style={{ fontSize: '1.1rem' }}>
            {loading ? "Processing Order..." : "Confirm & Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
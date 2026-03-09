import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";

function OrderSuccess() {
  // Generates a temporary display ID; note that the real ID is stored in MongoDB
  const generateOrderId = () => "ORD-" + Date.now().toString().slice(-6);

  // Synchronized with MyOrders.jsx logic: Adding 4 days for the delivery estimate
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const [orderId] = useState(generateOrderId());
  const [deliveryDate] = useState(getDeliveryDate());

  // Triggers a visual celebration effect once the component mounts successfully
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff9900', '#ffffff', '#4caf50'] // Themed colors
    });
  }, []);

  return (
    <div className="order-success-page" style={pageStyle}>
      <div className="order-success-card" style={cardStyle}>
        <div className="order-success-icon" style={iconStyle}>✓</div>
        <h1 className="order-success-title" style={{ color: "white", marginBottom: "10px" }}>
          Order Placed Successfully!
        </h1>
        <p className="order-success-text" style={{ color: "#aaa", marginBottom: "20px" }}>
          Thank you for your purchase. Your payment was processed in USD ($).
        </p>
        
        <div style={metaBoxStyle}>
          <p className="order-success-meta">
            <strong>Order Tracking ID:</strong> <span style={{color: '#ff9900'}}>{orderId}</span>
          </p>
          <p className="order-success-meta">
            <strong>Estimated Delivery:</strong> {deliveryDate}
          </p>
        </div>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "30px" }}>
          <Link to="/products" className="order-success-btn" style={primaryBtnStyle}>
            Continue Shopping
          </Link>
          
          {/* New Link to navigate to the order history page */}
          <Link to="/orders" style={secondaryBtnStyle}>
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

// STYLES OBJECTS (For quick implementation)
const pageStyle = { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" };
const cardStyle = { background: "#1a1a1a", padding: "40px", borderRadius: "12px", textAlign: "center", border: "1px solid #333", maxWidth: "500px" };
const iconStyle = { width: "80px", height: "80px", background: "#4caf50", color: "white", fontSize: "2.5rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" };
const metaBoxStyle = { background: "#252525", padding: "15px", borderRadius: "8px", color: "white", fontSize: "0.9rem" };
const primaryBtnStyle = { background: "#ff9900", color: "black", padding: "12px 20px", borderRadius: "5px", textDecoration: "none", fontWeight: "bold" };
const secondaryBtnStyle = { border: "1px solid #ff9900", color: "#ff9900", padding: "12px 20px", borderRadius: "5px", textDecoration: "none" };

export default OrderSuccess;
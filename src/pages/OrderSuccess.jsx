import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";


function OrderSuccess() {
  const generateOrderId = () => "ORD-" + Date.now().toString().slice(-6);
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toDateString();
  };

  const [orderId] = useState(generateOrderId());
  const [deliveryDate] = useState(getDeliveryDate());

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <div className="order-success-icon">✓</div>
        <h1 className="order-success-title">Order Placed Successfully!</h1>
        <p className="order-success-text">Thank you for your purchase.</p>
        
        <p className="order-success-meta">
          <strong>Order ID:</strong> {orderId}
        </p>
        <p className="order-success-meta">
          <strong>Estimated Delivery:</strong> {deliveryDate}
        </p>

        <Link to="/products" className="order-success-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
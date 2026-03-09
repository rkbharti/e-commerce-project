import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/userorders/${user.id}`);
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchOrders();
    else setLoading(false); // Safety check for logout
  }, [user]);

  const calculateDelivery = (orderDate) => {
    const d = new Date(orderDate);
    d.setDate(d.getDate() + 4);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // 1. Better Loading State (using theme variables)
  if (loading) return (
    <div style={{ color: 'var(--color-text)', textAlign: 'center', marginTop: '100px', minHeight: '80vh' }}>
      <div className="loader"></div> {/* If you have a loader CSS */}
      <p>Loading your history...</p>
    </div>
  );

  return (
    <div className="orders-page" style={{ 
      padding: "20px", 
      maxWidth: "800px", 
      margin: "auto", 
      color: "var(--color-text)", // FIX: Uses theme text color
      minHeight: '80vh' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ 
          marginBottom: "30px", 
          borderBottom: "2px solid var(--color-primary)", 
          display: "inline-block", 
          paddingBottom: "5px" 
        }}>
          My Order History
        </h2>
      </div>
      
      {/* 2. FIX: Better Empty State */}
      {orders.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1.2rem" }}>No orders found.</p>
          <Link to="/products" style={{ 
            color: "var(--color-primary)", 
            textDecoration: "none", 
            fontWeight: "bold",
            display: 'block',
            marginTop: '10px'
          }}>
            Start Shopping →
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{ 
            background: "var(--color-bg-elevated)", // FIX: Light in Light mode, Dark in Dark mode
            border: "1px solid var(--color-border)", 
            borderRadius: "12px", 
            padding: "20px", 
            marginBottom: "20px",
            boxShadow: "var(--shadow-md)"
          }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
              <span>Order ID: <b style={{color: 'var(--color-primary)'}}>#{order._id.slice(-6).toUpperCase()}</b></span>
              <span style={{color: "var(--color-text-muted)"}}>{new Date(order.date).toLocaleDateString()}</span>
            </div>

            <div style={{ marginTop: "15px" }}>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div key={idx} style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "15px", 
                    marginBottom: "10px", 
                    background: "var(--color-bg)", // FIX: Secondary background
                    padding: "12px", 
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)"
                  }}>
                    <img 
                      src={item.image || "https://via.placeholder.com/60?text=No+Image"} 
                      alt={item.name} 
                      style={{ width: "60px", height: "60px", borderRadius: "5px", objectFit: "cover", background: "#fff" }} 
                    />
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", color: "var(--color-text)" }}>{item.name}</div>
                      <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                        Qty: {item.quantity} | Price: ${item.price}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.7rem", color: "#4caf50", fontWeight: 'bold' }}>EXPECTED BY:</div>
                      <div style={{ fontWeight: "bold" }}>{calculateDelivery(order.date)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center" }}>
                  ⚠️ Item data missing.
                </p>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid var(--color-border)" }}>
              <span>Status: <span style={{color: 'var(--color-primary)', fontWeight: 'bold'}}>{order.status}</span></span>
              <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Total Paid: ${order.amount}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
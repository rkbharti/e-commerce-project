import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";


const Cart = () => {
  // ✅ Note: Using _id instead of id to match your Context/MongoDB
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Price Calculation Logic
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const mrp = subtotal * 1.15; // 15% extra for MRP
  const discount = mrp - subtotal;
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 10;
  const total = subtotal + shipping;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => { 
    navigate("/checkout"); 
  };

  // Empty Cart View
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your cart is empty!</h2>
        <p>Add items to it now to see them here.</p>
        <Link to="/products" className="btn-continue-shopping">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-left-section">
        {/* Delivery Header */}
        <div className="cart-delivery-bar">
          <span>Deliver to: <strong>Your Location</strong></span>
          <button className="cart-delivery-change">Change</button>
        </div>

        {/* Cart Items List */}
        <div className="cart-card">
          {cart.map((item) => (
            // ✅ FIX: Using item._id instead of item.id
            <div key={item._id} className="cart-item">
              <Link to={`/product/${item._id}`}>
                <img src={item.image} alt={item.title} className="cart-item__image" />
              </Link>

              <div className="cart-item__info">
                <p className="cart-item__title">{item.title}</p>
                <p className="cart-item__price">${item.price.toFixed(2)}</p>
                
                {/* Quantity Controls */}
                <div className="cart-item__qty">
                  {/* ✅ FIX: Calling decreaseQuantity with item._id */}
                  <button className="qty-btn" onClick={() => decreaseQuantity(item._id)}>−</button>
                  <span className="cart-item__qty-num">{item.quantity}</span>
                  {/* ✅ FIX: Calling increaseQuantity with item._id */}
                  <button className="qty-btn" onClick={() => increaseQuantity(item._id)}>+</button>
                </div>

                <div className="cart-item__actions">
                  <button className="cart-item__save">SAVE FOR LATER</button>
                  <span className="cart-item__divider">|</span>
                  {/* ✅ FIX: Calling removeFromCart with item._id */}
                  <button className="cart-item__remove" onClick={() => removeFromCart(item._id)}>REMOVE</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Bottom Bar */}
        <div className="cart-bottom-bar">
          <span className="cart-bottom-total">${total.toFixed(2)}</span>
          <button className="btn-place-order" onClick={handlePlaceOrder}>PLACE ORDER</button>
        </div>
      </div>

      {/* Right Side: Summary Section */}
      <div className="cart-summary">
        <h3 className="cart-summary__heading">PRICE DETAILS</h3>
        <hr className="cart-summary__divider" />
        
        <div className="cart-summary__row">
          <span>Price ({itemCount} items)</span>
          <span>${mrp.toFixed(2)}</span>
        </div>
        
        <div className="cart-summary__row">
          <span>Discount on MRP</span>
          <span className="cart-summary__discount">− ${discount.toFixed(2)}</span>
        </div>
        
        <div className="cart-summary__row">
          <span>Delivery Charges</span>
          <span className={shipping === 0 ? "cart-summary__free" : ""}>
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <hr className="cart-summary__divider" />
        
        <div className="cart-summary__total">
          <span>Total Amount</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <div className="cart-summary__savings">
          You will save ${discount.toFixed(2)} on this order
        </div>
        
        <button className="btn-checkout" onClick={handlePlaceOrder}>PLACE ORDER</button>
        
        <div className="cart-trust">
          🔒 Safe and Secure Payments. 100% Authentic.
        </div>
      </div>
    </div>
  );
};

export default Cart;
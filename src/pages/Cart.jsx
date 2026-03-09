import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const mrp        = cart.reduce((sum, item) => sum + item.price * item.quantity * 1.15, 0);
  const discount   = cart.reduce((sum, item) => sum + item.price * item.quantity * 0.15, 0);
  const subtotal   = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping   = subtotal > 500 ? 0 : 10;
  const total      = subtotal + shipping;
  const itemCount  = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => { 
    navigate("/checkout"); 
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your cart is empty!</h2>
        <p>Add items to it now.</p>
        <Link to="/" className="btn-continue-shopping">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div>
        <div className="cart-delivery-bar">
          <span>Deliver to: <strong>Your Location</strong></span>
          <button className="cart-delivery-change">Change</button>
        </div>

        <div className="cart-card">
          {cart.map((item, index) => (
            /* ✅ Key fix: item.id ke saath index fallback */
            <div key={item.id || index} className="cart-item">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.title} className="cart-item__image" />
              </Link>

              <div className="cart-item__info">
                <p className="cart-item__title">{item.title}</p>
                <p className="cart-item__price">${item.price.toFixed(2)}</p>
                <p className="cart-item__subtotal">
                  Subtotal: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </p>

                <div className="cart-item__qty">
                  <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>−</button>
                  <span className="cart-item__qty-num">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <div className="cart-item__actions">
                  <button className="cart-item__save">SAVE FOR LATER</button>
                  <span className="cart-item__divider">|</span>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>REMOVE</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-bottom-bar">
          <span className="cart-bottom-total">${total.toFixed(2)}</span>
          <button className="btn-place-order" onClick={handlePlaceOrder}>PLACE ORDER</button>
        </div>
      </div>

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
        <div className="cart-summary__savings">You will save ${discount.toFixed(2)} on this order</div>
        <button className="btn-checkout" onClick={handlePlaceOrder}>PLACE ORDER</button>
        <div className="cart-trust">🔒 Safe and Secure Payments. 100% Authentic.</div>
      </div>
    </div>
  );
};

export default Cart;
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
    cart.forEach((item) => removeFromCart(item.id));
    navigate("/order-success");
  };

  /* ── EMPTY STATE ── */
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your cart is empty!</h2>
        <p>Add items to it now.</p>
        <Link to="/" className="btn-continue-shopping">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ── MAIN LAYOUT ── */}
      <div className="cart-page">

        {/* ══════════════════════════════
            LEFT COLUMN — Cart Items
        ══════════════════════════════ */}
        <div>

          {/* Delivery address bar */}
          <div className="cart-delivery-bar">
            <span>Deliver to: <strong>Your Location</strong></span>
            <button className="cart-delivery-change">Change</button>
          </div>

          {/* Item cards */}
          <div className="cart-card">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">

                {/* Product image */}
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item__image"
                  />
                </Link>

                {/* Product info */}
                <div className="cart-item__info">
                  <p className="cart-item__title">{item.title}</p>
                  <p className="cart-item__price">${item.price.toFixed(2)}</p>
                  <p className="cart-item__subtotal">
                    Subtotal: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </p>

                  {/* Qty controls */}
                  <div className="cart-item__qty">
                    <button
                      className="qty-btn"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="cart-item__qty-num">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="cart-item__actions">
                    <button className="cart-item__save">SAVE FOR LATER</button>
                    <span className="cart-item__divider">|</span>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Place Order bar (bottom of items — desktop hidden, mobile visible) */}
          <div className="cart-bottom-bar">
            <span className="cart-bottom-total">${total.toFixed(2)}</span>
            <button className="btn-place-order" onClick={handlePlaceOrder}>
              PLACE ORDER
            </button>
          </div>
        </div>

        {/* ══════════════════════════════
            RIGHT COLUMN — Price Details
        ══════════════════════════════ */}
        <div className="cart-summary">

          <h3 className="cart-summary__heading">PRICE DETAILS</h3>
          <hr className="cart-summary__divider" />

          <div className="cart-summary__row">
            <span>Price ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
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

          {/* Total */}
          <div className="cart-summary__total">
            <span>Total Amount</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Savings highlight */}
          <div className="cart-summary__savings">
            You will save ${discount.toFixed(2)} on this order
          </div>

          {/* Place Order CTA */}
          <button className="btn-checkout" onClick={handlePlaceOrder}>
            PLACE ORDER
          </button>

          {/* Trust badge */}
          <div className="cart-trust">
            🔒 Safe and Secure Payments. Easy returns. 100% Authentic products.
          </div>

        </div>
      </div>
    </>
  );
};

export default Cart;

import React from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate add kiya
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // AuthContext add kiya check karne ke liye

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth(); // Check user login status
  const navigate = useNavigate();

  if (!product) return null;

  // MongoDB ID handle karne ke liye variable
  const productId = product._id || product.id;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Link click trigger na ho jaye
    if (!user) {
      alert("Please login to add items to cart!");
      navigate("/login");
    } else {
      addToCart(product);
    }
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating || 0);
    const empty = 5 - full;
    return (
      <>
        {"★".repeat(full)}
        {"☆".repeat(empty)}
      </>
    );
  };

  return (
    <article className="product-card">
      {product.trending && (
        <span className="product-card__badge">🔥 Trending</span>
      )}

      {/* 💡 Yahan humne productId (_id) use kiya hai */}
      <Link to={`/product/${productId}`} style={{ display: "block" }}>
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
        />
      </Link>

      <div className="product-card__body">
        <Link
          to={`/product/${productId}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3 className="product-card__title">{product.title}</h3>
        </Link>

        <div className="product-card__rating">
          {renderStars(product.rating)}
          <span>({product.reviews || 0})</span>
        </div>

        <p className="product-card__price">
          ${product.price != null ? product.price.toFixed(2) : "N/A"}
        </p>

        <p className="product-card__sales">
          {product.lastMonthSales || 0}+ bought this month
        </p>

        {/* Updated Button with Auth Logic */}
        <button
          type="button"
          className="product-card__btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
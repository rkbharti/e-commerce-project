import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {

  const { addToCart } = useCart();

  if (!product) return null;

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

      {/* Trending badge */}
      {product.trending && (
        <span className="product-card__badge">
          🔥 Trending
        </span>
      )}

      <Link to={`/product/${product.id}`} style={{ display: "block" }}>
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
        />
      </Link>

      <div className="product-card__body">

        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3 className="product-card__title">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="product-card__rating">
          {renderStars(product.rating)}
          <span>({product.reviews})</span>
        </div>

        <p className="product-card__price">
          ${product.price != null ? product.price.toFixed(2) : "N/A"}
        </p>

        {/* Sales indicator */}
        <p className="product-card__sales">
          {product.lastMonthSales}+ bought this month
        </p>

        <button
          type="button"
          className="product-card__btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

      </div>
    </article>
  );
}

export default ProductCard;
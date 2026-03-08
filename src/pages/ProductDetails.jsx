import React, { useState } from "react"; 
// useState import kiya because main image change karna hai dynamically

import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products";

function ProductDetails() {

  const { id } = useParams(); // URL se product id le raha hai
  const { addToCart } = useCart(); // cart context function
  const navigate = useNavigate();

  // products array se correct product find karte hain
  const product = products.find((p) => String(p.id) === id);

  // state jo currently selected image store karega
  const [selectedImage, setSelectedImage] = useState(product?.image);

  if (!product) {
    return <h2 style={{ padding: "100px" }}>Product not found</h2>;
  }

  /* ⭐ function to generate star rating dynamically */

  const renderStars = (rating) => {

    // full star calculate
    const fullStars = Math.floor(rating);

    // remaining empty stars
    const emptyStars = 5 - fullStars;

    return (
      <>
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (

    <div className="product-page">

      <div className="product-container">

        {/* ---------------- THUMBNAIL IMAGES ---------------- */}

        <div className="product-thumbs">

          {/* when thumbnail clicked → set main image */}

          <img
            src={product.image}
            alt=""
            onClick={() => setSelectedImage(product.image)}
          />

          <img
            src={product.image_1}
            alt=""
            onClick={() => setSelectedImage(product.image_1)}
          />

          <img
            src={product.image_2}
            alt=""
            onClick={() => setSelectedImage(product.image_2)}
          />

        </div>

        {/* ---------------- MAIN PRODUCT IMAGE ---------------- */}

        <div className="product-main-image">

          {/* selectedImage state main image control karega */}

          <img
            src={selectedImage}
            alt={product.title}
          />

        </div>

        {/* ---------------- PRODUCT INFO ---------------- */}

        <div className="product-info">

          {/* trending badge only show if product.trending true */}

          {product.trending && (
            <span className="trending-badge">
              🔥 Trending
            </span>
          )}

          <h1 className="product-title">
            {product.title}
          </h1>

          {/* rating section */}

          <div className="product-rating">

            <span className="stars">
              {renderStars(product.rating)}
            </span>

            <span className="review-count">
              ({product.reviews} reviews)
            </span>

          </div>

          {/* price display */}

          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>

          {/* sales count */}

          <div className="product-sales">
            {product.lastMonthSales} people bought this month
          </div>

          {/* description */}

          <p className="product-description">
            {product.description}
          </p>

        </div>

        {/* ---------------- BUY BOX ---------------- */}

        <div className="buy-box">

          <div className="buy-price">
            ${product.price.toFixed(2)}
          </div>

          <p className="stock-text">
            In Stock
          </p>

          {/* add product to cart */}

          <button
            className="buy-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          {/* add product and navigate to cart page */}

          <button
            className="cart-btn"
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>

  );
}

export default ProductDetails;
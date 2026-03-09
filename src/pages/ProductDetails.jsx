import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Backend URL (Ngrok)
const BASE_URL = "https://amalia-stolid-chelsey.ngrok-free.dev";

function ProductDetails() {
  const { id } = useParams(); // URL se MongoDB _id le raha hai
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // States
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Database se single product fetch karne ka logic
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        });

        if (!response.ok) throw new Error("Product dhoondne mein dikkat hui!");

        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.image); // Initial main image set kar rahe hain
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Product not found or Server is offline.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Loading State
  if (loading) return <h2 style={{ padding: "100px", color: "white", textAlign: "center" }}>Loading Product Details...</h2>;

  // Error State
  if (error || !product) {
    return <h2 style={{ padding: "100px", color: "white", textAlign: "center" }}>{error || "Product not found"}</h2>;
  }

  // ⭐ Star rating function
  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating);
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
          {/* Main Image Thumbnail */}
          <img
            src={product.image}
            alt="thumb"
            className={selectedImage === product.image ? "active-thumb" : ""}
            onClick={() => setSelectedImage(product.image)}
          />
          {/* Extra Images (Agar database mein hain) */}
          {product.image_1 && (
            <img
              src={product.image_1}
              alt="thumb"
              className={selectedImage === product.image_1 ? "active-thumb" : ""}
              onClick={() => setSelectedImage(product.image_1)}
            />
          )}
          {product.image_2 && (
            <img
              src={product.image_2}
              alt="thumb"
              className={selectedImage === product.image_2 ? "active-thumb" : ""}
              onClick={() => setSelectedImage(product.image_2)}
            />
          )}
        </div>

        {/* ---------------- MAIN PRODUCT IMAGE ---------------- */}
        <div className="product-main-image">
          <img src={selectedImage} alt={product.title} />
        </div>

        {/* ---------------- PRODUCT INFO ---------------- */}
        <div className="product-info">
          {product.trending && <span className="trending-badge">🔥 Trending</span>}

          <h1 className="product-title">{product.title}</h1>

          <div className="product-rating">
            <span className="stars">{renderStars(product.rating)}</span>
            <span className="review-count">({product.reviews || 0} reviews)</span>
          </div>

          <div className="product-price">
            ${product.price?.toFixed(2)}
          </div>

          <div className="product-sales">
            {product.lastMonthSales || 0} people bought this month
          </div>

          <p className="product-description">{product.description}</p>
        </div>

        {/* ---------------- BUY BOX ---------------- */}
        <div className="buy-box">
          <div className="buy-price">${product.price?.toFixed(2)}</div>
          <p className="stock-text" style={{ color: "#00c853" }}>In Stock</p>

          <button className="buy-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>

          <button className="cart-btn" onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}>
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
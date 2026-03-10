import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate, useLocation } from "react-router-dom"; 
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://e-commerce-project-k8h6.onrender.com";
const PLACEHOLDER_IMG = "https://via.placeholder.com/400?text=No+Image+Available";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        });
        if (!response.ok) throw new Error("Product fetch failed!");
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.image); 
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

  // ✅ Fix: Redirection Logic with dual safety
  const handleProceedToCheckout = () => {
    if (product) {
      addToCart(product);
      
      if (!user) {
        // 1. Storage mein save karo (Backup)
        localStorage.setItem("redirectAfterLogin", "/checkout");
        
        // 2. React Router State mein bhejo (Primary)
        navigate("/login", { state: { from: "/checkout" } });
      } else {
        navigate("/checkout");
      }
    }
  };

  if (loading) return <h2 className="loading-text" style={{color:'white', textAlign:'center', marginTop:'50px'}}>Loading Product Details...</h2>;
  if (error || !product) return <h2 className="error-text" style={{color:'white', textAlign:'center', marginTop:'50px'}}>{error || "Product not found"}</h2>;

  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating);
    return (
      <span style={{ color: "#f1c40f" }}>
        {"★".repeat(fullStars)}{"☆".repeat(5 - fullStars)}
      </span>
    );
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-thumbs">
          {[product.image, product.image_1, product.image_2].filter(Boolean).map((img, idx) => (
            <img
              key={idx}
              src={img || PLACEHOLDER_IMG}
              alt={`thumb-${idx}`}
              className={selectedImage === img ? "active-thumb" : ""}
              onClick={() => setSelectedImage(img)}
              onError={(e) => { e.target.src = PLACEHOLDER_IMG }}
            />
          ))}
        </div>

        <div className="product-main-image">
          <img 
            src={selectedImage || PLACEHOLDER_IMG} 
            alt={product.title} 
            onError={(e) => { e.target.src = PLACEHOLDER_IMG }}
          />
        </div>

        <div className="product-info">
          {product.trending && <span className="trending-badge">🔥 Trending</span>}
          <h1 className="product-title">{product.title}</h1>
          <div className="product-rating">
            <span className="stars">{renderStars(product.rating)}</span>
            <span className="review-count">({product.reviews || 0} reviews)</span>
          </div>
          <div className="product-price">${product.price?.toFixed(2)}</div>
          <p className="product-description">
            {product.description || "No description available for this product."}
          </p>
        </div>

        <div className="buy-box">
          <div className="buy-price">${product.price?.toFixed(2)}</div>
          <p className="stock-text" style={{ color: "#00c853" }}>In Stock</p>
          <button className="buy-btn" onClick={handleProceedToCheckout}>Add to Cart</button>
          <button className="cart-btn" onClick={handleProceedToCheckout}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
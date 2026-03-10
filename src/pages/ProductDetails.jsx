import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


// Backend URL for Render
const BASE_URL = "https://e-commerce-project-k8h6.onrender.com";
// Placeholder for missing images
const PLACEHOLDER_IMG = "https://via.placeholder.com/400?text=No+Image+Available";

function ProductDetails() {
  const { id } = useParams(); // URL se product ki ID uthata hai
  const { addToCart } = useCart(); // Cart mein add karne ka function
  const { user } = useAuth(); // User login status check karne ke liye
  const navigate = useNavigate(); // Page change karne ke liye

  const [product, setProduct] = useState(null); // Current product data
  const [suggestedProducts, setSuggestedProducts] = useState([]); // Recommendation list
  const [selectedImage, setSelectedImage] = useState(null); // Gallery ka active image
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling state

  // Jab bhi ID change hogi, naya data fetch hoga
  useEffect(() => {
    window.scrollTo(0, 0); // Naye page par hamesha top par le jata hai
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // 1. Current Product fetch karna
        const response = await fetch(`${BASE_URL}/api/products/${id}`);
        if (!response.ok) throw new Error("Product fetch failed!");
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.image); 

        // 2. Recommendations fetch karna (Saare products mangwa kar filter karna)
        const allRes = await fetch(`${BASE_URL}/api/products`);
        if (allRes.ok) {
          const allData = await allRes.json();
          // Current product ko hata kar 4 random products pick karna
          const filtered = allData
            .filter(p => p._id !== id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setSuggestedProducts(filtered);
        }
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [id]);

  // Cart mein add karne ka logic (e.stopPropagation zaroori hai recommendations ke liye)
  const handleAddToCart = (e, itemToCart) => {
    if (e) e.stopPropagation(); // Card par click karke navigate hone se rokta hai
    if (itemToCart) {
      addToCart(itemToCart);
      alert("Added to Cart! ✅");
    }
  };

  // Buy Now: Cart mein add karke seedha checkout par bhejta hai
  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      if (!user) {
        // Agar login nahi hai toh login bhej kar wapas yahi mangwayega
        localStorage.setItem("redirectAfterLogin", "/checkout");
        navigate("/login", { state: { from: "/checkout" } });
      } else {
        navigate("/checkout");
      }
    }
  };

  // Loading Screen
  if (loading) return <h2 className="loading-text" style={{color:'var(--color-text)', textAlign:'center', marginTop:'150px'}}>Loading Product...</h2>;
  
  // Error Screen
  if (error || !product) return <h2 className="error-text" style={{color:'var(--color-text)', textAlign:'center', marginTop:'150px'}}>{error || "Product not found"}</h2>;

  // Star Rating Helper
  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating);
    return <span style={{ color: "#f1c40f" }}>{"★".repeat(fullStars)}{"☆".repeat(5 - fullStars)}</span>;
  };

  return (
    <div className="product-page">
      <div className="product-container">
        
        {/* Left: Thumbnail Sidebar */}
        <div className="product-thumbs">
          {[product.image, product.image_1, product.image_2].filter(Boolean).map((img, idx) => (
            <img 
              key={idx} 
              src={img || PLACEHOLDER_IMG} 
              alt="thumb" 
              className={selectedImage === img ? "active-thumb" : ""} 
              onClick={() => setSelectedImage(img)} 
            />
          ))}
        </div>

        {/* Middle: Hero Image Box */}
        <div className="product-main-image">
          <img src={selectedImage || PLACEHOLDER_IMG} alt={product.title} />
        </div>

        {/* Right Section: Info aur Buy Box ko wrap kiya hai vertical alignment ke liye */}
        <div className="product-right-section">
          
          <div className="product-info">
            {product.trending && <span className="trending-badge">🔥 Trending Item</span>}
            <h1 className="product-title">{product.title}</h1>
            <div className="product-rating">
              {renderStars(product.rating)} 
              <span style={{marginLeft: '10px'}}>({product.reviews || 0} reviews)</span>
            </div>
            <div className="product-price">${product.price?.toFixed(2)}</div>
            <p className="product-description">
              {product.description || "Premium quality product with excellent durability and design."}
            </p>
          </div>

          {/* Action Card (Price, Stock & Buttons) */}
          <div className="buy-box">
            <div className="buy-price">${product.price?.toFixed(2)}</div>
            <p className="stock-text" style={{ color: "#00c853" }}>● In Stock & Ready to Ship</p>
            <button className="buy-btn" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
            <button className="cart-btn" onClick={handleBuyNow}>Buy Now</button>
          </div>

        </div>
      </div>

      {/* Recommendations Section */}
      <div className="suggestions-section">
        <h2 className="suggestions-title">
          {user ? `Recommended for you, ${user.name.split(' ')[0]}` : "Customers also viewed"}
        </h2>
        
        <div className="suggestions-grid">
          {suggestedProducts.map((item) => (
            <div 
              key={item._id} 
              className="suggestion-card" 
              onClick={() => navigate(`/product/${item._id}`)} // Navigate on card click
            >
              <div className="suggestion-img-wrapper">
                <img src={item.image} alt={item.title} />
              </div>
              <h4>{item.title}</h4>
              <p className="suggestion-price">${item.price?.toFixed(2)}</p>
              
              <button 
                className="quick-add-btn"
                onClick={(e) => handleAddToCart(e, item)} 
              >
                + Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
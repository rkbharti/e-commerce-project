import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// Backend URL for Render
const BASE_URL = "https://e-commerce-project-k8h6.onrender.com";
// Placeholder for missing images
const PLACEHOLDER_IMG = "https://via.placeholder.com/400?text=No+Image+Available";

function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const { addToCart } = useCart(); // Get cart function from context
  const { user } = useAuth(); // Get user info
  const navigate = useNavigate(); // For navigation

  const [product, setProduct] = useState(null); // Main product state
  const [suggestedProducts, setSuggestedProducts] = useState([]); // Recommended list state
  const [selectedImage, setSelectedImage] = useState(null); // Image gallery state
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null); // Error state

  // Fetch product and recommendations on ID change
  useEffect(() => {
    window.scrollTo(0, 0); // Always start at the top
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch current product details using _id
        const response = await fetch(`${BASE_URL}/api/products/${id}`);
        if (!response.ok) throw new Error("Product fetch failed!");
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.image); 

        // Fetch all products to create recommendations
        const allRes = await fetch(`${BASE_URL}/api/products`);
        if (allRes.ok) {
          const allData = await allRes.json();
          // Filter current product out and pick 4 random ones
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

  // Handle direct Add to Cart click
  const handleAddToCart = (e, itemToCart) => {
    if (e) e.stopPropagation(); // Stop navigation when clicking button inside card
    if (itemToCart) {
      addToCart(itemToCart);
      alert("Added to Cart! ✅");
    }
  };

  // Handle Buy Now logic (Add + Navigate)
  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      if (!user) {
        localStorage.setItem("redirectAfterLogin", "/checkout");
        navigate("/login", { state: { from: "/checkout" } });
      } else {
        navigate("/checkout");
      }
    }
  };

  if (loading) return <h2 className="loading-text" style={{color:'white', textAlign:'center', marginTop:'50px'}}>Loading...</h2>;
  if (error || !product) return <h2 className="error-text" style={{color:'white', textAlign:'center', marginTop:'50px'}}>{error || "Product not found"}</h2>;

  // Star rating helper
  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating);
    return <span style={{ color: "#f1c40f" }}>{"★".repeat(fullStars)}{"☆".repeat(5 - fullStars)}</span>;
  };

  return (
    <div className="product-page">
      {/* Main Product Container */}
      <div className="product-container">
        {/* Gallery Thumbnails */}
        <div className="product-thumbs">
          {[product.image, product.image_1, product.image_2].filter(Boolean).map((img, idx) => (
            <img key={idx} src={img || PLACEHOLDER_IMG} alt="thumb" className={selectedImage === img ? "active-thumb" : ""} onClick={() => setSelectedImage(img)} />
          ))}
        </div>

        {/* Hero Image */}
        <div className="product-main-image">
          <img src={selectedImage || PLACEHOLDER_IMG} alt={product.title} />
        </div>

        {/* Content Info */}
        <div className="product-info">
          {product.trending && <span className="trending-badge">🔥 Trending</span>}
          <h1 className="product-title">{product.title}</h1>
          <div className="product-rating">
            {renderStars(product.rating)} <span>({product.reviews || 0} reviews)</span>
          </div>
          <div className="product-price">${product.price?.toFixed(2)}</div>
          <p className="product-description">{product.description || "No description available."}</p>
        </div>

        {/* Action Box */}
        <div className="buy-box">
          <div className="buy-price">${product.price?.toFixed(2)}</div>
          <p className="stock-text" style={{ color: "#00c853" }}>In Stock</p>
          <button className="buy-btn" onClick={() => handleAddToCart(null, product)}>Add to Cart</button>
          <button className="cart-btn" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>

      {/* Suggested Products Section */}
      <div className="suggestions-section" style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ color: 'white', marginBottom: '25px', fontSize: '1.8rem', borderLeft: '5px solid var(--color-primary)', paddingLeft: '15px' }}>
          {user ? `Recommended for you, ${user.name.split(' ')[0]}` : "More to Explore"}
        </h2>
        
        <div className="suggestions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
          {suggestedProducts.map((item) => (
            <div 
              key={item._id} 
              className="suggestion-card" 
              onClick={() => navigate(`/products/${item._id}`)} // Navigate to details on card click
              style={{ cursor: 'pointer', background: 'var(--color-bg-elevated)', padding: '15px', borderRadius: '12px', textAlign: 'center', transition: 'transform 0.2s', position: 'relative' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'contain', borderRadius: '8px' }} />
              <h4 style={{ color: 'white', fontSize: '1rem', marginTop: '12px', height: '40px', overflow: 'hidden' }}>{item.title}</h4>
              <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.2rem', margin: '8px 0' }}>${item.price?.toFixed(2)}</p>
              
              {/* Quick Add to Cart Button */}
              <button 
                onClick={(e) => handleAddToCart(e, item)} 
                style={{ width: '100%', padding: '8px', background: 'var(--color-primary)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
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
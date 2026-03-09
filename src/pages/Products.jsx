import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";

// Ngrok URL (Backend URL)
const BASE_URL = "https://amalia-stolid-chelsey.ngrok-free.dev"; 

const categories = [
  { label: "All Products", value: "all" },
  { label: "Electronics", value: "electronics" },
  { label: "Fashion", value: "fashion" },
  { label: "Home & Living", value: "home" },
  { label: "Books", value: "books" },
  { label: "Sports", value: "sports" }
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [allProducts, setAllProducts] = useState([]); 
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // 1. Fetching data from MongoDB Atlas via Ngrok
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/products`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true" // 💡 Ngrok warning screen ko bypass karne ke liye
          }
        });

        if (!response.ok) throw new Error("Database se connection nahi ho paya!");

        const dbData = await response.json();
        
        // Ab hum sirf database data use karenge, local data delete ho chuka hai
        setAllProducts(dbData);
        setDisplayProducts(dbData);
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Products load karne mein dikkat ho rahi hai. Check karein ki Backend Server chalu hai?");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. Filtering Logic (Category aur Search ke liye)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search")?.toLowerCase() || "";

    const filtered = allProducts.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesSearch = p.title?.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    setDisplayProducts(filtered);
  }, [location.search, activeCategory, allProducts]);

  // Loading State
  if (loading) return (
    <div style={{ padding: "50px", textAlign: "center", color: "white" }}>
      <p>Fetching Products from Database...</p>
    </div>
  );

  // Error State
  if (error) return (
    <div style={{ padding: "50px", textAlign: "center", color: "red" }}>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} style={{padding: '10px', marginTop: '10px'}}>Retry</button>
    </div>
  );

  return (
    <div>
      {/* Category Navigation */}
      <div className="category-navbar">
        {categories.map(cat => (
          <button
            key={cat.value}
            className={activeCategory === cat.value ? "category-btn active" : "category-btn"}
            onClick={() => setActiveCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Display Section */}
      <div className="products-wrapper">
        {displayProducts.length > 0 ? (
          <ProductGrid products={displayProducts} />
        ) : (
          <p style={{ textAlign: 'center', color: 'white', marginTop: '50px' }}>
            No products found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
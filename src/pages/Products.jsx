import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";

// 💡 SENIOR TIP: Backend ka wahi URL use karein jo ngrok (Port 5000) mein hai
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

  // 1. Fetch Products from MongoDB via Backend API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/products`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true" // ✅ Crucial for mobile bypass
          }
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setAllProducts(data);
        setDisplayProducts(data);
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Could not load products. Please check if your backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. Filter Logic (Search + Category)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search")?.toLowerCase() || "";

    const filtered = allProducts.filter((p) => {
      // 💡 Senior Tip: Optional chaining (?.) use karein taaki data missing hone par error na aaye
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesSearch = p.title?.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    setDisplayProducts(filtered);
  }, [location.search, activeCategory, allProducts]);

  if (loading) return (
    <div style={{ padding: "50px", textAlign: "center", color: "white" }}>
      <p>Fetching Products from Database...</p>
    </div>
  );

  if (error) return (
    <div style={{ padding: "50px", textAlign: "center", color: "#ff4d4d" }}>
      <p>{error}</p>
    </div>
  );

  return (
    <div>
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
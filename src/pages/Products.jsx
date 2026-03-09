import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
// 💡 SAABSE ZAROORI: Apni local file import karein
import localProducts from "../data/product"; 

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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/products`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true" 
          }
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const dbData = await response.json();
        
        // 💡 SENIOR TIP: Local data aur Database data ko merge kar rahe hain
        // Taaki aapke wo 25 products bhi dikhein aur MongoDB wale bhi.
        const combinedData = [...localProducts, ...dbData];
        
        // Duplicate products se bachne ke liye (agar ID same ho)
        const uniqueProducts = Array.from(new Map(combinedData.map(item => [item.id || item._id, item])).values());

        setAllProducts(uniqueProducts);
        setDisplayProducts(uniqueProducts);
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        // Agar backend offline bhi ho, toh kam se kam local products toh dikhen!
        setAllProducts(localProducts);
        setDisplayProducts(localProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  if (loading) return (
    <div style={{ padding: "50px", textAlign: "center", color: "white" }}>
      <p>Fetching Products...</p>
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
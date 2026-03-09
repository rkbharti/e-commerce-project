import React, { useState, useEffect, useMemo } from "react";
import HeroSlider from "../components/HeroSlider";
import PromoBanner from "../components/PromoBanner";
import ProductCarousel from "../components/ProductCarousel";
import ProductGrid from "../components/ProductGrid";
import { useAuth } from "../context/AuthContext";

// Backend URL
const BASE_URL = "https://amalia-stolid-chelsey.ngrok-free.dev";

const Home = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]); // Database se aane wale products
  const [loading, setLoading] = useState(true);

  // 1. Database se products fetch karna
  useEffect(() => {
    const fetchHomeProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/products`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        });
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Home Data Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeProducts();
  }, []);

  // Products ko mix karne ka simple tarika
  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  // 2. Logic to filter and shuffle products from the database list
  const { suggested, deals, explore } = useMemo(() => {
    const base = category === "all" 
      ? products 
      : products.filter(p => p.category === category);

    if (base.length === 0) return { suggested: [], deals: [], explore: [] };

    return {
      suggested: shuffle(base).slice(0, 10), 
      deals: shuffle(base).slice(0, 8),     
      explore: shuffle(base)                
    };
  }, [category, products]); // Products ya category badalne par hi recalculate hoga

  const suggestedTitle = user ? `Suggested For You, ${user.name}` : "Suggested For You";

  if (loading) return <div style={{padding: "100px", textAlign: "center", color: "white"}}>Loading Store...</div>;

  return (
    <main>
      <HeroSlider />

      <nav className="category-navbar">
        {["all", "electronics", "fashion", "home", "books", "sports"].map((cat) => (
          <button 
            key={cat}
            className={`category-btn ${category === cat ? "active" : ""}`} 
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </nav>

      {/* Suggested Section */}
      {suggested.length > 0 && <ProductCarousel title={suggestedTitle} products={suggested} />}

      <PromoBanner />

      {/* Best Deals Section */}
      {deals.length > 0 && <ProductCarousel title="Best Deals" products={deals} />}

      {/* Explore Section */}
      <section id="products">
        <h2 style={{ padding: "20px 30px" }}>Explore Products</h2>
        {explore.length > 0 ? (
          <ProductGrid products={explore} />
        ) : (
          <p style={{textAlign: 'center', color: 'white'}}>No products found in this category.</p>
        )}
      </section>
    </main>
  );
};

export default Home;
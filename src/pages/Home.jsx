import React, { useState, useMemo } from "react";
import products from "../data/products";
import HeroSlider from "../components/HeroSlider";
import PromoBanner from "../components/PromoBanner";
import ProductCarousel from "../components/ProductCarousel";
import ProductGrid from "../components/ProductGrid";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState("all");

  // Products ko mix karne ka simple tarika taki shop boring na lage
  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  // useMemo ka use karke hum teeno sections ke liye alag random list bana rahe hain
  const { suggested, deals, explore } = useMemo(() => {
    const base = category === "all" 
      ? products 
      : products.filter(p => p.category === category);

    return {
      // Teeno ko alag-alag shuffle kiya hai taki images repeat na ho
      suggested: shuffle(base).slice(0, 10), 
      deals: shuffle(base).slice(0, 8),     
      explore: shuffle(base)                
    };
  }, [category]); // Jab category badlegi tabhi list update hogi

  const suggestedTitle = user ? `Suggested For You, ${user.name}` : "Suggested For You";

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

      {/* Suggested: Alag random items */}
      <ProductCarousel title={suggestedTitle} products={suggested} />

      <PromoBanner />

      {/* Best Deals: Bilkul alag random items */}
      <ProductCarousel title="Best Deals" products={deals} />

      {/* Explore: Puri jumbled list */}
      <section id="products">
        <h2 style={{ padding: "20px 30px" }}>Explore Products</h2>
        <ProductGrid products={explore} />
      </section>
    </main>
  );
};

export default Home;
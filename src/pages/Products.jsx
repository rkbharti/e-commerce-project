import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // URL se search query nikalne ke liye
import products from "../data/products";
import ProductGrid from "../components/ProductGrid";

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
  const [displayProducts, setDisplayProducts] = useState(products);
  const location = useLocation(); // Current URL ki details leta hai

  // useEffect har baar chalta hai jab URL change hota hai ya category badalti hai
  useEffect(() => {
    // 1. URL se 'search' parameter ki value nikalna
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search")?.toLowerCase() || "";

    // 2. Filter logic: Category aur Search dono ko check karta hai
    const filtered = products.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    setDisplayProducts(filtered);
  }, [location.search, activeCategory]); // Dependency array: inke badalne par code dobara chalega

  return (
    <div>
      {/* CATEGORY NAVBAR: Users categories ko select kar sakte hain */}
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

      {/* PRODUCTS AREA: Agar search results empty hain toh message dikhayega */}
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
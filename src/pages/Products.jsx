import React, { useState } from "react";
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

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(p => p.category === activeCategory);

  return (
    <div>

      {/* CATEGORY NAVBAR */}
      <div className="category-navbar">

        {categories.map(cat => (
          <button
            key={cat.value}
            className={
              activeCategory === cat.value
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() => setActiveCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}

      </div>

      {/* PRODUCTS */}
      <div className="products-wrapper">
        <ProductGrid products={filteredProducts} />
      </div>

    </div>
  );
};

export default Products;
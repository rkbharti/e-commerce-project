/*
========================================================
HOME PAGE COMPONENT
========================================================

Purpose:
Ye component ecommerce homepage render karta hai.

Features added:
✔ Category filter working
✔ Active category highlight
✔ Personalized "Suggested For You, Ravi"
✔ Products filtered by category

Example:

Click Electronics → electronics products show
Click Books → books products show
Click All Products → sab products

========================================================
*/

import React, { useState } from "react";

/* product dataset */
import products from "../data/products";

/* page components */
import HeroSlider from "../components/HeroSlider";
import PromoBanner from "../components/PromoBanner";
import ProductCarousel from "../components/ProductCarousel";
import ProductGrid from "../components/ProductGrid";

/* user context */
import { useAuth } from "../context/AuthContext";

const Home = () => {

  /* logged in user */
  const { user } = useAuth();

  /*
  ======================================================
  CATEGORY STATE
  ======================================================
  store karega current selected category
  */

  const [category, setCategory] = useState("all");

  /*
  ======================================================
  CATEGORY FILTER LOGIC
  ======================================================
  */

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(p => p.category === category);

  /*
  ======================================================
  PERSONALIZED TITLE
  ======================================================
  */

  const suggestedTitle =
    user ? `Suggested For You, ${user.name}` : "Suggested For You";

  return (

    <main>

      {/* HERO SLIDER */}
      <HeroSlider />

      {/* =================================================
          CATEGORY NAVBAR
         ================================================= */}

      <nav className="category-navbar">

        <button
          className={`category-btn ${category === "all" ? "active" : ""}`}
          onClick={() => setCategory("all")}
        >
          All Products
        </button>

        <button
          className={`category-btn ${category === "electronics" ? "active" : ""}`}
          onClick={() => setCategory("electronics")}
        >
          Electronics
        </button>

        <button
          className={`category-btn ${category === "fashion" ? "active" : ""}`}
          onClick={() => setCategory("fashion")}
        >
          Fashion
        </button>

        <button
          className={`category-btn ${category === "home" ? "active" : ""}`}
          onClick={() => setCategory("home")}
        >
          Home & Living
        </button>

        <button
          className={`category-btn ${category === "books" ? "active" : ""}`}
          onClick={() => setCategory("books")}
        >
          Books
        </button>

        <button
          className={`category-btn ${category === "sports" ? "active" : ""}`}
          onClick={() => setCategory("sports")}
        >
          Sports
        </button>

      </nav>

      {/* =================================================
          SUGGESTED PRODUCTS
         ================================================= */}

      <ProductCarousel
        title={suggestedTitle}
        products={filteredProducts}
      />

      {/* PROMO BANNER */}
      <PromoBanner />

      {/* =================================================
          BEST DEALS
         ================================================= */}

      <ProductCarousel
        title="Best Deals"
        products={filteredProducts.slice(0, 8)}
      />

      {/* =================================================
          FULL PRODUCT GRID
         ================================================= */}

      <section id="products">

        <h2 style={{ padding: "20px 30px" }}>
          Explore Products
        </h2>

        <ProductGrid products={filteredProducts} />

      </section>

    </main>
  );
};

export default Home;
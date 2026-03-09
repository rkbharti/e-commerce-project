import React, { useRef } from "react";
import ProductCard from "./ProductCard";

const ProductCarousel = ({ title, products }) => {
  // ✅ FIX 1: useRef instead of querySelector
  // Each carousel now scrolls its OWN row independently
  const rowRef = useRef(null);

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    // ✅ FIX 2: position:relative so absolute arrows anchor to THIS carousel
    <section className="product-carousel" style={{ position: "relative" }}>

      <div className="carousel-header">
        <h2>{title}</h2>
      </div>

      {/* ✅ FIX 3: Arrows inside the relative wrapper, AFTER header */}
      <div style={{ position: "relative" }}>

        {/* LEFT ARROW */}
        <button
          className="carousel-arrow left"
          onClick={scrollLeft}
          style={{
            position: "absolute",
            left: "0px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10
          }}
        >
          ‹
        </button>

        {/* CAROUSEL ROW - attached to ref */}
        <div className="carousel-row" ref={rowRef}>
          {products.slice(0, 8).map(product => (
            <ProductCard key={product._id || product.id} product = {product} />
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          className="carousel-arrow right"
          onClick={scrollRight}
          style={{
            position: "absolute",
            right: "0px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10
          }}
        >
          ›
        </button>

      </div>
    </section>
  );
};

export default ProductCarousel;

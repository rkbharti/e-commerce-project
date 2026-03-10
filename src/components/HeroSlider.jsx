import { useState, useEffect } from "react";


const slides = [
  {
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1600",
    title: "Big Shopping Deals",
    subtitle: "Save up to 50% on gadgets and accessories"
  },
  {
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1600",
    title: "New Arrivals",
    subtitle: "Discover the latest tech products"
  },
  {
    image: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1600",
    title: "Work From Home Essentials",
    subtitle: "Upgrade your productivity setup"
  }
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Smooth scroll logic
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Auto-advance logic
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-slider">
      {/* Left Arrow */}
      <button 
        className="hero-arrow left" 
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        ❮
      </button>

      {/* Main Slide Container */}
      <div className="hero-slide">
        <img 
          src={slides[current].image} 
          alt={slides[current].title}
          className="hero-slide__img"
        />
        
        {/* Overlay adds contrast for text visibility */}
        <div className="hero-overlay" />
        
        <div className="hero-content">
          <h1 className="hero-title">{slides[current].title}</h1>
          <p className="hero-subtitle">{slides[current].subtitle}</p>
          <button 
            className="hero-btn"
            onClick={scrollToProducts}
          >
            Shop Now →
          </button>
        </div>
      </div>

      {/* Right Arrow */}
      <button 
        className="hero-arrow right" 
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        ❯
      </button>
    </div>
  );
}

export default HeroSlider;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="app-nav">
      {/* Mobile Hamburger */}
      <button
        type="button"
        className={`app-nav__hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span /><span />
      </button>

      {/* Logo */}
      <Link to="/home" className="app-nav__logo" onClick={closeMenu}>
        ShopEasy
      </Link>

      {/* User Greeting - Added a CSS class for better theme support */}
      {user && (
        <div className="app-nav__user" style={{ color: "var(--nav-text)", marginLeft: "10px" }}>
          Hi {user.name.split(' ')[0]} 👋
        </div>
      )}

      {/* Theme Toggle: Optimized with variables */}
      <div className="app-nav__theme-toggle">
        <span className="app-nav__theme-label">{isDark ? "Dark" : "Light"}</span>
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            width: 48, height: 26, borderRadius: 13, border: "none",
            /* FIX: Background now uses the primary theme color or a neutral muted one */
            background: isDark ? "var(--color-primary)" : "var(--color-text-muted)", 
            cursor: "pointer",
            position: "relative", padding: 0,
            transition: "background 0.3s ease" // Smooth color fade
          }}
        >
          <span style={{
            position: "absolute", top: 2, left: isDark ? 24 : 2,
            width: 22, height: 22, borderRadius: "50%", background: "#fff",
            transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)", // Smoother sliding effect
          }} />
        </button>
      </div>

      {/* Search Form */}
      <form className="app-nav__search-form" onSubmit={handleSearchSubmit}>
        <input
          type="search"
          className="app-nav__search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
        />
        <button type="submit" className="app-nav__search-btn">Search</button>
      </form>

      {/* Nav Links */}
      <ul className={`app-nav__links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/home" className="app-nav__link" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/products" className="app-nav__link" onClick={closeMenu}>Products</Link></li>
        <li><Link to="/orders" className="app-nav__link" onClick={closeMenu}>My Orders</Link></li>
        <li>
          <Link to="/cart" className="app-nav__link" onClick={closeMenu}>
            Cart ({cart.length})
          </Link>
        </li>
        <li>
          <button type="button" className="app-nav__logout" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
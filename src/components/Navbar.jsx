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

  // ✅ Total items count calculation (including quantities)
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
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
      <Link to="/" className="app-nav__logo" onClick={closeMenu}>
        ShopEasy
      </Link>

      {/* 👤 User Greeting Logic */}
      <div className="app-nav__user" style={{ color: "var(--nav-text)", marginLeft: "10px" }}>
        {user ? `Hi ${user.name.split(' ')[0]} 👋` : "Hi Buyer 👋"}
      </div>

      {/* Theme Toggle */}
      <div className="app-nav__theme-toggle">
        <span className="app-nav__theme-label">{isDark ? "Dark" : "Light"}</span>
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-switch-btn"
          style={{
            width: 48, height: 26, borderRadius: 13, border: "none",
            background: isDark ? "var(--color-primary)" : "var(--color-text-muted)", 
            cursor: "pointer", position: "relative", padding: 0, transition: "background 0.3s ease"
          }}
        >
          <span style={{
            position: "absolute", top: 2, left: isDark ? 24 : 2,
            width: 22, height: 22, borderRadius: "50%", background: "#fff",
            transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
        <li><Link to="/" className="app-nav__link" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/products" className="app-nav__link" onClick={closeMenu}>Products</Link></li>
        
        {/* 🛒 Cart Link (Ab hamesha dikhega, chahe login ho ya na ho) */}
        <li>
          <Link to="/cart" className="app-nav__link" onClick={closeMenu}>
            Cart <span className="cart-badge-count">({cartCount})</span>
          </Link>
        </li>

        {/* 🔒 Conditional Links */}
        {user ? (
          <>
            <li><Link to="/orders" className="app-nav__link" onClick={closeMenu}>My Orders</Link></li>
            <li>
              <button type="button" className="app-nav__logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="app-nav__link" onClick={closeMenu}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
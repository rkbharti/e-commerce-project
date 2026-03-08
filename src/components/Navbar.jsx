/*
========================================================
NAVBAR COMPONENT
========================================================

Ye component app ka top navigation bar render karta hai.
Yahan se user navigation, search, theme change aur logout
sab control kar sakta hai.

Features:
• Logo navigation
• Search functionality
• Cart item counter
• Theme toggle (Dark / Light)
• Responsive hamburger menu
• Logout functionality
• Logged-in user greeting (Hi Ravi 👋)

Contexts used:
CartContext → cart items count
AuthContext → user info + logout
ThemeContext → dark/light theme

========================================================
*/

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Context hooks import */
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {

  /*
  ======================================================
  LOCAL STATE
  ======================================================

  searchQuery → jo user search bar me type karega
  menuOpen → mobile hamburger menu open/close state
  */

  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  /*
  ======================================================
  CONTEXT DATA
  ======================================================

  cart → cart me items ka array
  user → currently logged-in user
  logout → logout function
  isDark → theme dark hai ya nahi
  toggleTheme → theme change karne ka function
  */

  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const navigate = useNavigate();

  /*
  ======================================================
  HANDLE LOGOUT
  ======================================================

  Jab user logout button click kare:
  1. AuthContext ka logout() call hota hai
  2. user session clear ho jata hai
  3. user login page par redirect ho jata hai
  */

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /*
  ======================================================
  HANDLE SEARCH
  ======================================================

  Search form submit hone par:
  • products page par navigate karte hain
  • search query URL me bhejte hain
  */

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }

    setMenuOpen(false);
  };

  /*
  Mobile menu close helper
  */
  const closeMenu = () => setMenuOpen(false);

  return (

    /*
    ======================================================
    NAVBAR CONTAINER
    ======================================================
    */

    <nav className="app-nav">

      {/* Hamburger menu (mobile view ke liye) */}
      <button
        type="button"
        className={`app-nav__hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Logo */}
      <Link to="/home" className="app-nav__logo" onClick={closeMenu}>
        ShopEasy
      </Link>

      {/* Logged-in user greeting */}
      {user && (
        <div className="app-nav__user">
          Hi {user.name} 👋
        </div>
      )}

      {/* ==================================================
          THEME SWITCH
         ================================================== */}

      <div className="app-nav__theme-toggle">

        <span className="app-nav__theme-label">
          {isDark ? "Dark" : "Light"}
        </span>

        <button
          type="button"
          onClick={toggleTheme}
          role="switch"
          aria-checked={isDark}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            width: 48,
            height: 26,
            borderRadius: 13,
            border: "none",
            background: isDark ? "#ff9900" : "#555",
            cursor: "pointer",
            position: "relative",
            padding: 0,
          }}
        >

          {/* Toggle circle */}
          <span
            style={{
              position: "absolute",
              top: 2,
              left: isDark ? 24 : 2,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "#fff",
              transition: "left 0.2s ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }}
          />

        </button>

      </div>

      {/* ==================================================
          SEARCH FORM
         ================================================== */}

      <form className="app-nav__search-form" onSubmit={handleSearchSubmit}>

        <input
          type="search"
          className="app-nav__search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
        />

        <button type="submit" className="app-nav__search-btn">
          Search
        </button>

      </form>

      {/* ==================================================
          NAVIGATION LINKS
         ================================================== */}

      <ul className={`app-nav__links ${menuOpen ? "open" : ""}`}>

        <li>
          <Link to="/home" className="app-nav__link" onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/products" className="app-nav__link" onClick={closeMenu}>
            Products
          </Link>
        </li>

        {/* Cart counter */}
        <li>
          <Link to="/cart" className="app-nav__link" onClick={closeMenu}>
            Cart ({cart.length})
          </Link>
        </li>

        {/* Logout button */}
        <li>

          <button
            type="button"
            className="app-nav__logout"
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
          >
            Logout
          </button>

        </li>

      </ul>

    </nav>
  );
};

export default Navbar;
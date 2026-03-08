import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import "./styles/theme.css";
import "./styles/global.css";
import "./styles/hero.css";
import "./styles/category.css";
import "./styles/productGrid.css";
import "./styles/productCard.css";
import "./styles/productDetails.css";
import "./styles/cart.css";
import "./styles/carousel.css";
import "./styles/auth.css";
import "./styles/orderSuccess.css"

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
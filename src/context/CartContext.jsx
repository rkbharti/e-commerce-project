import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext"; // AuthContext import karna zaroori hai

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth(); // Logged-in user ki details nikalna

  // Dynamic key banana taaki har user ka cart alag rahe
  const getCartKey = useCallback(() => {
    return user ? `cart_${user.email}` : "cart_guest";
  }, [user]);

  const [cart, setCart] = useState([]);

  // 1. Jab user change ho (Login/Logout), naya cart load karein
  useEffect(() => {
    const key = getCartKey();
    const storedCart = localStorage.getItem(key);
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [user, getCartKey]);

  // 2. Cart state change hote hi use correct key mein save karein
  useEffect(() => {
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, getCartKey]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
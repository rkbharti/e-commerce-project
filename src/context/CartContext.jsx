import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const isFirstRender = useRef(true);

  const getCartKey = useCallback(() => {
    return user ? `cart_${user.email}` : "cart_guest";
  }, [user]);

  // 1. Load and Merge Logic
  useEffect(() => {
    const guestKey = "cart_guest";
    const userKey = user ? `cart_${user.email}` : null;
    
    const storedGuestCart = JSON.parse(localStorage.getItem(guestKey) || "[]");

    if (user) {
      const storedUserCart = JSON.parse(localStorage.getItem(userKey) || "[]");
      
      if (storedGuestCart.length > 0) {
        // ✅ GUEST CART KO USER CART MEIN MERGE KARO (Using _id)
        const mergedCart = [...storedUserCart];
        storedGuestCart.forEach(gItem => {
          const exists = mergedCart.find(uItem => uItem._id === gItem._id);
          if (exists) {
            exists.quantity += gItem.quantity;
          } else {
            mergedCart.push(gItem);
          }
        });

        setCart(mergedCart);
        localStorage.removeItem(guestKey);
      } else {
        setCart(storedUserCart);
      }
    } else {
      setCart(storedGuestCart);
    }
  }, [user]);

  // 2. Save Logic
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, getCartKey]);

  // ✅ Add to Cart (Only using _id)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item._id === product._id);
      if (exists) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ✅ Remove from Cart (Only using _id)
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // ✅ Increase Quantity (Only using _id)
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ✅ Decrease Quantity (Only using _id)
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
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
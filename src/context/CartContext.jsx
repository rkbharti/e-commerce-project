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
        // ✅ GUEST CART KO USER CART MEIN MERGE KARO
        // Hum guest cart ke items ko user cart mein add kar rahe hain (duplicates handle karke)
        const mergedCart = [...storedUserCart];
        storedGuestCart.forEach(gItem => {
          const exists = mergedCart.find(uItem => uItem.id === gItem.id);
          if (exists) {
            exists.quantity += gItem.quantity;
          } else {
            mergedCart.push(gItem);
          }
        });

        setCart(mergedCart);
        // Guest cart saaf kar do kyunki ab wo user mein merge ho gaya hai
        localStorage.removeItem(guestKey);
      } else {
        setCart(storedUserCart);
      }
    } else {
      // Agar logout hai toh guest cart load karo
      setCart(storedGuestCart);
    }
  }, [user]); // Sirf login/logout par trigger hoga

  // 2. Save Logic
  useEffect(() => {
    // Pehli baar render par save na karein varna initial state [] save ho jayegi
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
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
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCartList } from "@/services/user";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

interface CartContextType {
  cartItems: any[];
  summary: { total_cart_price: number; total_items: number };
  fetchCartData: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [summary, setSummary] = useState({ total_cart_price: 0, total_items: 0 });

  const fetchCartData = async () => {
    if (!user?.token) return;
    try {
      const data = await getCartList(user.token);
      if (data?.success) {
        setCartItems(data.cartItems || []);
        setSummary({
          total_cart_price: data.summary?.total_cart_price || 0,
          total_items: data.summary?.total_items || 0,
        });
      } else {
        // toast.error(data?.message || "Failed to load cart items");
      }
    } catch (err) {
      toast.error("Failed to load cart items");
    }
  };
  useEffect(() => {
    fetchCartData();
  }, [user?.token]);

  return (
    <CartContext.Provider value={{ cartItems, summary, fetchCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

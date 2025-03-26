import { useContext } from "react";
import { CartContext, type CartItem } from "@/context/cart-context";

/**
 * Custom hook to access the cart context safely.
 * If used outside of a CartProvider, it will return a fallback implementation
 * that logs a warning message instead of throwing an error.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    console.warn("useCart hook used outside of CartProvider. Using fallback implementation.");
    
    // Return a fallback implementation that won't break the app
    return {
      cartItems: [],
      addToCart: (item: CartItem) => console.warn("Cart action ignored: addToCart", item),
      removeFromCart: (productId: number) => console.warn("Cart action ignored: removeFromCart", productId),
      updateQuantity: (productId: number, quantity: number) => 
        console.warn("Cart action ignored: updateQuantity", { productId, quantity }),
      clearCart: () => console.warn("Cart action ignored: clearCart"),
      isCartOpen: false,
      setIsCartOpen: (isOpen: boolean) => console.warn("Cart action ignored: setIsCartOpen", isOpen),
      getTotalItems: () => 0,
      getTotalPrice: () => 0
    };
  }
  
  return context;
};

import { Button } from "@/components/ui/button";
import { formatPrice, Product } from "@/lib/utils";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { FaMinus, FaPlus, FaShoppingCart, FaTimes, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

// Simplified cart item type
type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};

export default function CartPanel() {
  // Local cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart-items");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Cart operations
  const removeFromCart = (productId: number) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      )
    );
  };
  
  // Helper functions
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    );
  };

  const cartVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 }
  };

  return (
    <>
      {/* Cart Button */}
      <div className="fixed top-16 right-4 z-50">
        <Button 
          onClick={() => setIsCartOpen(true)}
          className="p-2 bg-secondary/90 backdrop-blur-sm hover:bg-secondary rounded-full text-secondary-foreground shadow-lg transition-all duration-200"
          aria-label="Open shopping cart"
        >
          <FaShoppingCart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {getTotalItems()}
          </span>
        </Button>
      </div>

      {/* Cart Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-background border-l border-border/40 z-50 shadow-xl"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cartVariants}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-muted/20 flex justify-between items-center">
                <h3 className="font-heading text-xl">Your Cart ({getTotalItems()})</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <FaTimes className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <FaShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">Your cart is empty</p>
                    <Button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 bg-accent/40 rounded-lg p-3">
                        <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={item.product.image} 
                            alt={item.product.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-heading font-medium">{item.product.title}</h4>
                          <p className="text-muted-foreground text-sm">
                            {item.size && `Size: ${item.size}`}
                            {item.size && item.color && " | "}
                            {item.color && `Color: ${item.color}`}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center rounded text-foreground/80 hover:text-primary transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <FaMinus className="h-3 w-3" />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center rounded text-foreground/80 hover:text-primary transition-colors"
                              >
                                <FaPlus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="font-heading font-medium">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors self-start"
                        >
                          <FaTrashAlt className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                <div className="border-t border-border/40 p-4">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{getTotalPrice() > 100 ? "Free" : formatPrice(10)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>{formatPrice(getTotalPrice() > 100 ? getTotalPrice() : getTotalPrice() + 10)}</span>
                    </div>
                  </div>
                  
                  <Link href="/checkout">
                    <Button 
                      className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors mb-3"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="w-full py-3 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



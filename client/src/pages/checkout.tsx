import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import CheckoutFormWrapper from "@/components/checkout/checkout-form";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cartItems.length === 0) {
      setIsLoading(false);
      return;
    }

    // Create PaymentIntent as soon as the page loads
    const fetchPaymentIntent = async () => {
      try {
        const res = await apiRequest("POST", "/api/create-payment-intent", { 
          amount: getTotalPrice() 
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [cartItems, getTotalPrice]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-brand-dark">
        <div className="animate-spin w-8 h-8 border-4 border-brand-lt-cyan border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4">
        <motion.div 
          className="max-w-md w-full bg-brand-dark/60 backdrop-blur-sm p-8 rounded-lg border border-muted/20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl mb-4">Your cart is empty</h2>
          <p className="text-brand-light/70 mb-6">Add some products to your cart before proceeding to checkout.</p>
          <Link href="/products">
            <Button className="bg-brand-lt-cyan text-brand-dark hover:bg-brand-lt-cyan/90">
              Browse Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="h-screen flex items-center justify-center bg-brand-dark">
        <div className="animate-spin w-8 h-8 border-4 border-brand-lt-cyan border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4 py-20">
      <div className="max-w-2xl w-full bg-brand-dark/60 backdrop-blur-sm p-8 rounded-lg border border-muted/20">
        <h1 className="font-heading text-3xl mb-6">Checkout</h1>
        <CheckoutFormWrapper clientSecret={clientSecret} />
      </div>
    </div>
  );
}

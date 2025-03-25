import { useState } from "react";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required"
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsProcessing(false);
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase!",
      });
      clearCart();
      setLocation("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 mb-6">
        <h3 className="font-heading text-xl">Order Summary</h3>
        <div className="bg-dark/30 p-4 rounded-lg space-y-2">
          {cartItems.map((item) => (
            <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex justify-between">
              <span>
                {item.product.title} x {item.quantity}
                {item.size && ` (${item.size})`}
              </span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-muted/20 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-heading text-xl">Payment Details</h3>
        <PaymentElement />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/products" className="flex-1">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
          >
            Continue Shopping
          </Button>
        </Link>
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing} 
          className="flex-1 bg-primary text-dark hover:bg-primary/90"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </form>
  );
};

export default function CheckoutFormWrapper({ clientSecret }: { clientSecret: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </motion.div>
  );
}

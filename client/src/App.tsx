import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import NewArrivals from "@/pages/new-arrivals";
import Products from "@/pages/products";
import Contact from "@/pages/contact";
import Checkout from "@/pages/checkout";
import Sidebar from "@/components/layout/sidebar";
import ThemeToggle from "@/components/layout/theme-toggle";
import Footer from "@/components/layout/footer";
import NotFound from "@/pages/not-found";
// CartProvider is already in main.tsx
import CartPanel from "@/components/layout/cart-panel";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/new-arrivals" component={NewArrivals} />
      <Route path="/products" component={Products} />
      <Route path="/contact" component={Contact} />
      <Route path="/checkout" component={Checkout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <ThemeToggle />
      <Sidebar />
      <CartPanel />
      <main className="w-full">
        <Router />
        <Footer />
      </main>
      <Toaster />
    </div>
  );
}

export default App;

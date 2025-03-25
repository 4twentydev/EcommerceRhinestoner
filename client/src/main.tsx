import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { CartProvider } from "./context/cart-context";

// Mount the app with all necessary providers
// Order matters: Theme Provider (outer) > Query Client > Cart Provider > App
createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="ecommerce-theme">
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <App />
      </CartProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

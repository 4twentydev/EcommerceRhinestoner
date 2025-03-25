import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { CartProvider } from "./context/cart-context";

// Apply initial theme class to avoid flash of incorrect theme
const setInitialTheme = () => {
  const storageTheme = localStorage.getItem("ecommerce-theme");
  const theme = storageTheme || "dark"; // Default to dark
  
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (theme === "light") {
    document.documentElement.classList.add("light");
  } else if (theme === "system") {
    // Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.add(prefersDark ? "dark" : "light");
  }
};

// Execute before render
setInitialTheme();

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

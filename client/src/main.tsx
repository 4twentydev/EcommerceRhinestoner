import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/cart-context";
import { ThemeProvider } from "./components/ui/theme-provider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="shadowvault-theme">
    <CartProvider>
      <App />
    </CartProvider>
  </ThemeProvider>
);

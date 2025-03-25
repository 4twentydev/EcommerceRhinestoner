import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed top-4 right-20 z-50 flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="p-2 rounded-full bg-dark/30 backdrop-blur-sm text-light hover:bg-dark/50 transition-colors duration-200"
      >
        {theme === "dark" ? <FaMoon className="h-5 w-5" /> : <FaSun className="h-5 w-5" />}
      </Button>
    </div>
  );
}

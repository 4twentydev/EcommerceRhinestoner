
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    console.log("Current theme:", theme);
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log("Switching to:", newTheme);
    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 z-[60] h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-200 shadow-md border-2 border-primary"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 text-yellow-400" />
      ) : (
        <Moon className="h-6 w-6 text-blue-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

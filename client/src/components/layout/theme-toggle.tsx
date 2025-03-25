
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        console.log(`Switching theme from ${theme} to ${newTheme}`);
        setTheme(newTheme);
      }}
      className="fixed top-4 right-20 z-[60] h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-200"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-500" />
      ) : (
        <Moon className="h-4 w-4 text-blue-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

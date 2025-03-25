
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
        setTheme(newTheme);
      }}
      className="fixed bottom-4 right-4 z-[60] h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-200 shadow-md border"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-blue-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

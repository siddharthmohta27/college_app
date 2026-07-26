import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative grid h-8 w-8 place-items-center rounded-lg border border-border/80 bg-surface/60 text-muted-foreground transition-all duration-200 hover:bg-surface-elevated hover:text-foreground active:scale-95 ${className}`}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle light and dark theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-cyan-600 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}

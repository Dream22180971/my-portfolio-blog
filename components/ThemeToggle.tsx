"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 rounded-lg border border-space-border px-3 py-2 text-sm text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
      aria-label={`切换到${theme === "dark" ? "亮色" : "暗色"}主题`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="font-mono text-xs">
        {theme === "dark" ? "亮色模式" : "暗色模式"}
      </span>
    </button>
  );
}

"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      data-theme-toggle
      aria-label={`切换到${theme === "dark" ? "亮色" : "暗色"}主题`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span>
        {theme === "dark" ? "亮色模式" : "暗色模式"}
      </span>
    </button>
  );
}

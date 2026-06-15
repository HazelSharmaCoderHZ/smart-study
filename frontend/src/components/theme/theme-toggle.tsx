"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="btn"
      style={{
        width: 42,
        height: 42,
        padding: 0,
        borderRadius: "999px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          transition: "transform 0.4s var(--ease), opacity 0.4s var(--ease)",
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(180deg) scale(1)",
        }}
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </span>
    </button>
  );
}
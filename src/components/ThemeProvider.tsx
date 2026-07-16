"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("saiko-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("saiko-theme-change", callback);
  };
}

function getThemeSnapshot(): Theme {
  return window.localStorage.getItem("saiko-theme") === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        window.localStorage.setItem("saiko-theme", nextTheme);
        window.dispatchEvent(new Event("saiko-theme-change"));
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className="site-root" data-theme={theme} suppressHydrationWarning>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

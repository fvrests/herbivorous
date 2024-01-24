"use client";

interface Props {
  children?: any;
}

import { createContext } from "react";
import { useState, useEffect } from "react";
import { getLocalStorage, updateLocalOnlyData } from "@/utils/localStorage";

interface ThemeContext {
  theme: Theme | null;
  mode: Mode | null;
  updateMode: ((newMode: Mode) => void) | null;
  updateTheme: ((newTheme: Theme) => void) | null;
  toggleMode: (() => void) | null;
  isLoading: boolean;
}

export const ThemeContext = createContext<ThemeContext>({
  theme: null,
  mode: null,
  updateMode: null,
  updateTheme: null,
  toggleMode: null,
  isLoading: true,
});

export default function ThemeProvider({ children }: Props) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLocalStorage("localOnly").then((localData) => {
      setMode(localData?.mode ?? null);
      document.documentElement.dataset.mode = localData?.mode ?? "dark";

      setTheme(localData?.theme ?? null);
      document.documentElement.dataset.theme = localData?.theme ?? "modern";

      setIsLoading(false);
    });
  });

  function updateMode(newMode: Mode) {
    setMode(newMode);
    updateLocalOnlyData({
      mode: newMode,
    });
    document.documentElement.dataset.mode = newMode;
  }

  function toggleMode() {
    updateMode(mode === "dark" ? "light" : mode === null ? "light" : "dark");
  }

  function updateTheme(newTheme: Theme) {
    setTheme(newTheme);
    updateLocalOnlyData({
      theme: newTheme,
    });
    document.documentElement.dataset.theme = newTheme ?? "modern";
  }

  return (
    <ThemeContext.Provider
      value={{ theme, mode, updateMode, toggleMode, updateTheme, isLoading }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

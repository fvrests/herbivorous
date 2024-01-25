"use client";

interface Props {
  children?: any;
}

import { createContext } from "react";
import { useState, useEffect } from "react";
import { getLocalStorage, updateLocalOnlyData } from "@/utils/localStorage";

interface ThemeContext {
  theme?: Theme;
  mode?: Mode;
  updateMode: (newMode: Mode) => void;
  updateTheme: (newTheme: Theme) => void;
  toggleMode: () => void;
  isLoading: boolean;
}

export const ThemeContext = createContext<ThemeContext>({
  theme: undefined,
  mode: undefined,
  updateMode: () => undefined,
  updateTheme: () => undefined,
  toggleMode: () => undefined,
  isLoading: true,
});

export default function ThemeProvider({ children }: Props) {
  const [mode, setMode] = useState<Mode>();
  const [theme, setTheme] = useState<Theme>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLocalStorage("localOnly").then((localData) => {
      setMode(localData?.mode ?? null);
      document.documentElement.dataset.mode = localData?.mode ?? "dark";

      setTheme(localData?.theme ?? null);
      document.documentElement.dataset.theme = localData?.theme ?? "modern";

      setIsLoading(false);
    });
  }, []);

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

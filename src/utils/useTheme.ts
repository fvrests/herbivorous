"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserProvider";
import { useUserData, updateUserData } from "@/utils/firebase-firestore";
import { getLocalStorage, updateLocalSettings } from "@/utils/localStorage";

export function useTheme(config: {
  theme?: Theme;
  themeVariant?: ThemeVariant;
}) {
  const { userData, isLoading: isUserDataLoading } = useUserData();
  const { user, isLoading: isUserLoading } = useContext(UserContext);
  const [theme, setTheme] = useState("dark");
  const [themeVariant, setThemeVariant] = useState("modern");
  const localData = getLocalStorage();

  // update theme variables
  useEffect(() => {
    getLocalStorage().then((localData) => {
      if (!isUserLoading && !isUserDataLoading) {
        setTheme(
          config.theme ??
            userData?.settings?.theme ??
            localData?.settings?.theme ??
            "dark",
        );
        setThemeVariant(
          config.themeVariant ??
            userData?.settings?.themeVariant ??
            localData?.settings?.themeVariant ??
            "modern",
        );
        document.documentElement.className = `${theme + " " + themeVariant}`;
      }
    });
  }, [userData, localData]);

  function updateTheme({
    newTheme,
    newThemeVariant,
  }: {
    newTheme?: Theme;
    newThemeVariant?: ThemeVariant;
  }) {
    if (user && (newTheme || newThemeVariant)) {
      updateUserData(user.uid, {
        settings: {
          theme: newTheme ?? theme,
          themeVariant: newThemeVariant ?? themeVariant,
        },
      });
    } else {
      updateLocalSettings({
        theme: newTheme ?? theme,
        themeVariant: newThemeVariant ?? themeVariant,
      });
      setTheme(newTheme ?? theme);
      setThemeVariant(newThemeVariant ?? theme);
    }
  }
  function toggleMode() {
    const newTheme = theme === "dark" ? "light" : "dark";
    updateTheme({ newTheme: newTheme });
  }
  return { theme, themeVariant, updateTheme, toggleMode };
}

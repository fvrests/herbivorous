"use client";
import { useContext } from "react";
import { UserContext } from "../components/UserProvider";

import Link from "./Link";
import Listbox from "@/components/Listbox";
import { useTheme } from "@/utils/useTheme";

export default function Nav() {
  const { user, isLoading } = useContext(UserContext);
  const { theme, themeVariant, updateTheme } = useTheme({});
  const themes = ["dark", "light"];
  const themeVariants = ["modern", "natural"];
  return (
    <>
      <nav className="flex items-center justify-between mb-16">
        <Link href="/">
          <h1 className="font-bold text-xl">Herbivorous</h1>
        </Link>
        {!isLoading && (
          <Link href={user ? "/user" : "/signin"}>
            {user?.displayName ? user?.displayName : "Not signed in"}
          </Link>
        )}
      </nav>
      <div className="flex flex-row gap-4">
        <Listbox
          title="theme"
          value={theme}
          onChange={(e) => updateTheme({ newTheme: e })}
          options={themes}
        ></Listbox>
        <Listbox
          title="variant"
          value={themeVariant}
          onChange={(e) => updateTheme({ newThemeVariant: e })}
          options={themeVariants}
        ></Listbox>
      </div>
    </>
  );
}

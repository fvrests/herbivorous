"use client";
import { useContext } from "react";
import { UserContext } from "../components/UserProvider";
import { ThemeContext } from "../components/ThemeProvider";
import { Moon, Sun } from "react-feather";

import Link from "./Link";

export default function Nav() {
  const { user, isLoading } = useContext(UserContext);

  const { mode, toggleMode } = useContext(ThemeContext);

  return (
    <>
      <nav className="flex items-center justify-between mb-16">
        <Link href="/">
          <h1 className="font-bold text-xl">Herbivorous</h1>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <button
            aria-label={`set mode to ${mode === "light" ? "dark" : "light"}`}
            onClick={toggleMode}
          >
            {mode === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {!isLoading && (
            <Link href={user ? "/user" : "/signin"}>
              {user?.displayName ? user?.displayName : "Not signed in"}
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

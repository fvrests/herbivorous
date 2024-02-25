"use client";
import { useContext } from "react";
import { UserContext } from "../components/UserProvider";
import { ThemeContext } from "../components/ThemeProvider";
import { Moon, Sun } from "react-feather";
import Image from "next/image";

import Link from "./Link";

// fix: needs to show 'signed in' or similar if signed in but no display name set

export default function Nav() {
  const { user, isLoading } = useContext(UserContext);

  const { theme, mode, toggleMode } = useContext(ThemeContext);

  return (
    <>
      <nav className="flex items-center justify-between mb-16">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div
              className={mode === "light" ? "brightness-75" : "brightness-125"}
            >
              <Image
                src={`/icon-${theme ? theme : "earthy"}.png`}
                alt="app logo"
                height="28"
                width="28"
              />
            </div>
            <h1 className="font-semibold tracking-tighter text-xl">
              Herbivorous
            </h1>
          </div>
        </Link>
        <div className="flex flex-row items-center gap-4">
          {!isLoading && (
            <Link href={user ? "/user" : "/signin"}>
              {user?.displayName ? user?.displayName : "Not signed in"}
            </Link>
          )}
          <button
            aria-label={`set mode to ${mode === "light" ? "dark" : "light"}`}
            onClick={toggleMode}
          >
            {mode === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </nav>
    </>
  );
}

"use client";

import { useContext } from "react";
import { ThemeContext } from "@/components/ThemeProvider";
import Link from "./Link";

export default function Footer() {
  const themeNames: Theme[] = ["modern", "natural"];
  const { theme, updateTheme } = useContext(ThemeContext);
  return (
    <>
      <nav>
        <ul className="w-full flex items-start justify-between text-sm">
          <div>
            <h2 className="font-bold mb-2">Herbivorous</h2>
            <li>
              <Link href="/about">About</Link>
            </li>
          </div>
          <div>
            <h2 className="font-bold mb-2">Theme</h2>
            <li className="flex items-center gap-2">
              {themeNames.map((themeName: Theme, i) => (
                <span key={themeName}>
                  <button
                    onClick={() => updateTheme(themeName)}
                    className={`${
                      theme === themeName ? "underline" : ""
                    } first-letter:uppercase`}
                  >
                    {themeName}
                  </button>
                  {i < themeNames.length - 1 && (
                    <span className="ml-2">{"//"}</span>
                  )}
                </span>
              ))}
            </li>
          </div>
          <div className="max-w-32">
            <li>
              <h2 className="font-bold mb-2">Site</h2>
              <p>
                Built by <Link href="https://fvrests.dev">fvrests</Link> in 2024
                with <Link href="https://nextjs.org">NextJS</Link>
              </p>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}

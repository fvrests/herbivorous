"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/components/ThemeProvider";
import Link from "./Link";
import { RadioGroup } from "@headlessui/react";

export default function Footer() {
  const themeNames: Theme[] = ["modern", "natural"];
  const { theme, updateTheme, isLoading } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(theme ?? "modern");

  useEffect(() => {
    if (theme) setSelectedTheme(theme);
  }, [isLoading]);

  useEffect(() => {
    updateTheme(selectedTheme);
  }, [selectedTheme]);

  return (
    <>
      <nav>
        <ul className="w-full flex items-start justify-between text-sm">
          <div className="mx-4">
            <h2 className="font-semibold tracking-tighter mb-2">Herbivorous</h2>
            <li>
              <Link href="/about">About</Link>
            </li>
          </div>
          <div className="mx-4">
            <RadioGroup
              value={selectedTheme}
              onChange={setSelectedTheme}
              className="flex flex-col gap-2"
            >
              <RadioGroup.Label className="font-semibold tracking-tighter">
                Theme
              </RadioGroup.Label>
              {themeNames.map((themeName: Theme, i) => (
                <RadioGroup.Option key={themeName} value={themeName}>
                  {({ checked }) => (
                    <div className="relative cursor-pointer">
                      {checked && <span className="absolute -left-4">•</span>}
                      <li
                        className={`${
                          checked ? "underline" : ""
                        } first-letter:uppercase`}
                      >
                        {themeName}
                      </li>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </div>
          <div className="mx-4 max-w-32">
            <li>
              <h2 className="font-semibold tracking-tighter mb-2">Site</h2>
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

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
	theme: "earthy",
	mode: undefined,
	updateMode: () => undefined,
	updateTheme: () => undefined,
	toggleMode: () => undefined,
	isLoading: true,
});

export default function ThemeProvider({ children }: Props) {
	let localData = getLocalStorage("localOnly");
	const [mode, setMode] = useState<Mode>();
	const [theme, setTheme] = useState<Theme>("earthy");
	const [isLoading, setIsLoading] = useState(true);

	// todo: implement next-themes or similar to prevent flicker on reload
	// todo: fix issue with not following prefers-color-scheme
	useEffect(() => {
		setMode(localData?.mode ?? null);
		document.documentElement.dataset.mode = localData?.mode ?? "dark";

		setTheme(localData?.theme ?? "earthy");
		document.documentElement.dataset.theme = localData?.theme ?? "earthy";

		setIsLoading(false);
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
		document.documentElement.dataset.theme = newTheme ?? "earthy";
	}

	return (
		<ThemeContext.Provider
			value={{ theme, mode, updateMode, toggleMode, updateTheme, isLoading }}
		>
			{children}
		</ThemeContext.Provider>
	);
}

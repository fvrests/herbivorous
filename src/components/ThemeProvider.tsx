"use client";

interface Props {
	children?: any;
}

import { createContext } from "react";
import { useState, useEffect } from "react";
import { getLocalStorage, updateLocalOnlyData } from "@/utils/localStorage";

interface ThemeContext {
	mode?: Mode;
	updateMode: (newMode: Mode) => void;
	toggleMode: () => void;
	isLoading: boolean;
}

export const ThemeContext = createContext<ThemeContext>({
	mode: undefined,
	updateMode: () => undefined,
	toggleMode: () => undefined,
	isLoading: true,
});

export default function ThemeProvider({ children }: Props) {
	let localData = getLocalStorage("localOnly");
	const [mode, setMode] = useState<Mode>();
	const [isLoading, setIsLoading] = useState(true);

	// todo: implement next-themes or similar to prevent flicker on reload
	useEffect(() => {
		setMode(localData?.mode ?? "system");
		document.documentElement.dataset.mode = localData?.mode ?? "system";

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
		updateMode(
			mode === "dark" ? "light" : mode === "light" ? "system" : "dark",
		);
	}

	return (
		<ThemeContext.Provider value={{ mode, updateMode, toggleMode, isLoading }}>
			{children}
		</ThemeContext.Provider>
	);
}

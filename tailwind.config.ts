import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"f-low": "var(--f-low)",
				"f-med": "var(--f-med)",
				"f-high": "var(--f-high)",
				"f-warn": "var(--f-warn)",
				"f-warn-low": "var(--f-warn-low)",
				"b-warn": "var(--b-warn)",
				"b-low": "var(--b-low)",
				"b-med": "var(--b-med)",
				"b-high": "var(--b-high)",
				border: "var(--border)",
				"border-low": "var(--border-low)",
				"border-med": "var(--border-med)",
				capsule: "var(--capsule)",
				theme: "var(--theme)",
			},
			fontFamily: {
				sans: ["var(--font-WorkSans)"],
			},
		},
	},
	plugins: [],
};
export default config;

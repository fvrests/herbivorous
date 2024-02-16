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
        "b-low": "var(--b-low)",
        "b-med": "var(--b-med)",
        "b-high": "var(--b-high)",
        border: "var(--border)",
        "border-low": "var(--border-low)",
        capsule: "var(--capsule)",
        theme: "var(--theme)",
        "gradient-from": "var(--gradient-from)",
        "gradient-via": "var(--gradient-via)",
        "gradient-to": "var(--gradient-to)",
      },
      fontFamily: {
        serif: ["var(--font-PT)"],
      },
    },
  },
  plugins: [],
};
export default config;

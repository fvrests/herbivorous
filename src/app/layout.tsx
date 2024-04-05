import type { Metadata } from "next";
import "@/app/styles/global.css";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import UserProvider from "@/components/UserProvider";
import ThemeProvider from "@/components/ThemeProvider";

const WorkSans = localFont({
	src: [
		{
			path: "./WorkSans-VariableFont_wght.ttf",
			style: "normal",
		},
		{ path: "./WorkSans-Italic-VariableFont_wght.ttf", style: "italic" },
	],
	display: "swap",
	variable: "--font-WorkSans",
});

export const metadata: Metadata = {
	title: "Herbivorous",
	description: "Daily dozen nutrition tracker",
	icons: [
		{
			rel: "icon",
			url: "/icon.png",
		},
		{ rel: "apple", url: "/apple-icon.png" },
		{ rel: "mask-icon", url: "/icon.svg" },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${WorkSans.variable} font-sans font-medium`}>
			<ThemeProvider>
				<UserProvider>
					<body className="mx-auto flex min-h-screen max-w-4xl flex-col justify-between p-6 sm:p-12">
						<Nav />
						<main className="mb-20 flex-1">{children}</main>
						<Footer />
					</body>
				</UserProvider>
			</ThemeProvider>
		</html>
	);
}

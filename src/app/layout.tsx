import type { Metadata } from "next";
import "./globals.css";
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
          <body className="flex min-h-screen flex-col p-6 sm:p-12 max-w-4xl mx-auto justify-between">
            <Nav />
            <main className="flex-1 mb-20">{children}</main>
            <Footer />
          </body>
        </UserProvider>
      </ThemeProvider>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";

const displayFont = localFont({
  src: "./fonts/newsreader-latin-variable.woff2",
  variable: "--font-kit-display",
  weight: "200 800",
  display: "swap",
});

const bodyFont = localFont({
  src: "./fonts/dm-sans-latin-variable.woff2",
  variable: "--font-kit-sans",
  weight: "100 1000",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kit — Less to remember. More living.",
  description:
    "AI household assistant that reduces the invisible labor of managing family life.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}

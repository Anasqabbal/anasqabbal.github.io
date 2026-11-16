import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const mono = localFont({
  src: [
    { path: "../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2", weight: "700" },
  ],
  display: "swap",
  variable: "--font-mono",
});

const slogan = localFont({
  src: "../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2",
  display: "swap",
  variable: "--font-slogan",
});

export const metadata: Metadata = {
  title: "Anas QABBAL | Systems that do not break",
  description: "Anas QABBAL is a software engineer building fast, clear, reliable systems.",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mono.variable} ${slogan.variable}`}>
      <body>{children}</body>
    </html>
  );
}

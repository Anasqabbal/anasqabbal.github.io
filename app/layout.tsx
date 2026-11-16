import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anas QABBAL | Systems that do not break",
  description: "Anas Qabbal — software engineer building fast, clear and reliable systems.",
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

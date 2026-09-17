import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SolarNova | Clean Solar Energy",
  description:
    "Smart solar solutions designed to reduce energy costs and build a cleaner future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
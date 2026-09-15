import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solara — Clean energy, clearly designed",
  description: "A new standard for solar energy at home.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

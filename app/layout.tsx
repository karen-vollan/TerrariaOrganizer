import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Terraria Organizer",
  description: "Simplify the organization of your Terraria world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.className}
          bg-neutral-50
          text-neutral-900
          dark:bg-neutral-950
          dark:text-neutral-50
        `}
      >{ children }</body>
    </html>
  );
}

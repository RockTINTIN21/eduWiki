import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduMap",
  description: "О учёбе за границей",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      {/* добавлено: min-h-screen flex flex-col */}
      <body className={`${inter.variable} antialiased bg-black min-h-screen flex flex-col`}>
        <Header isLanding={true} />

        {/* main растягивается и отталкивает футер вниз */}
        <main className="flex-1">
          {children}
        </main>

        <Footer isLanding={true} />
      </body>
    </html>
  );
}

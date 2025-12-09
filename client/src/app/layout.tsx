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
      <body className={`${inter.variable} antialiased bg-white min-h-screen flex flex-col`}>
        <Header/>
        <main className="flex-1">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}

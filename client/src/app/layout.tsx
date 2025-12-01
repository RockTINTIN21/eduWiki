import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import Header from "@/components/Header/Header";

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
      <body
        className={`${inter.variable} pe-80 ps-80 antialiased bg-black`}
      >
        <Header isLanding={true}/>
        {children}
      </body>
    </html>
  );
}

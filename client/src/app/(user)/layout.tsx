import React, {ReactNode} from 'react';
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import {Toaster} from "@/components/ui/sonner";
import {Inter} from "next/font/google";
import {Metadata} from "next";
import StoreProvider from "@/app/StoreProvider";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduWiki",
  description: "О учёбе за границей",
};


const UserLayout = ({children}: {children: ReactNode}) => {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} antialiased bg-white min-h-screen flex flex-col`}
      >
        <StoreProvider>
          <Toaster />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
};

export default UserLayout;
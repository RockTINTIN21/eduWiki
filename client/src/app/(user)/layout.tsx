import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import StoreProvider from "@/app/providers/StoreProvider";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
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

const UserLayout = ({ children }: { children: ReactNode }) => {
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

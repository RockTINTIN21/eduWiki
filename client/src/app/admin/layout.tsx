import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/layout/admin/sidebar/app-sidebar";
import StoreProvider from "@/app/providers/StoreProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "../globals.css";
import {Separator} from "@/components/ui/separator";

const inter = Inter({
	subsets: ["latin", "cyrillic"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "EduWiki",
	description: "О учёбе за границей",
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="ru">
			<body
				className={`${inter.variable} antialiased bg-[#FAFAFAFF] min-h-screen flex flex-col`}
			>
				<StoreProvider>
					<SidebarProvider>
						<AppSidebar/>
						<main className="bg-white w-full rounded-2xl m-4 p-4 shadow-sm space-y-2">
              <Toaster />
              <div className='flex items-center h-5 gap-3'>
                <SidebarTrigger />
                <Separator orientation="vertical" />
                Пользователи
              </div>
							{children}
						</main>
					</SidebarProvider>
				</StoreProvider>
			</body>
		</html>
	);
};

export default AdminLayout;

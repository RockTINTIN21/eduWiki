import {ReactNode} from "react";
import StoreProvider from "@/app/StoreProvider";
import {Toaster} from "sonner";
import {Metadata} from "next";
import {Inter} from "next/font/google";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/app/(admin)/components/app-sidebar";
import '../globals.css'

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduWiki",
  description: "О учёбе за границей",
};

const AdminLayout = ({children}: {children: ReactNode}) => {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} antialiased bg-white min-h-screen flex flex-col`}
      >
        <StoreProvider>
          <SidebarProvider>
            <AppSidebar />
            <main>
              <SidebarTrigger />
              <Toaster />
              {children}
            </main>
          </SidebarProvider>
        </StoreProvider>
      </body>
    </html>

  );
};

export default AdminLayout;
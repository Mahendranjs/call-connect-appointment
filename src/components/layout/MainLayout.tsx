
import React from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { ThemeProvider } from 'next-themes';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <AppHeader />
            <main className="flex-1 overflow-auto">
              <div className="animate-in fade-in-50 duration-300">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

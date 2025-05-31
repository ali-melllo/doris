import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import { SiteHeader } from "@/components/header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Doris AI - Your Trusted Migration Companion",
  description:
    "Smart, friendly AI assistant for newcomers, migrants, and those seeking help with life in a new place. Housing, jobs, government help, and social connections.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased  mx-auto",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            <SiteHeader/>
            {children}
            {/* <Navbar /> */}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

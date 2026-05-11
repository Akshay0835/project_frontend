import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TSC Web Development Agency | Premium Digital Experiences",
  description: "High-end, responsive websites built with Next.js, Framer Motion, and Three.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased dark overflow-x-hidden`}
    >
      <body className="min-h-screen bg-[#050505] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-50 overflow-x-hidden w-full max-w-[100vw]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

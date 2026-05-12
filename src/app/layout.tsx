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
      className={`${inter.variable} antialiased dark overflow-x-clip`}
    >
      <body className="min-h-screen bg-[#020202] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-50 overflow-x-clip w-full max-w-[100vw]">
        
        {/* Global Simple Background for entire site */}
        <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
          {/* Faint, elegant layout grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]" />
          
          {/* Deep, subtle ambient glows in the corners */}
          <div className="absolute top-[-10%] left-[-10%] w-[120vw] h-[120vw] sm:w-[50vw] sm:h-[50vw] bg-cyan-900/20 sm:bg-cyan-900/10 rounded-full blur-[80px] sm:blur-[150px] mix-blend-screen opacity-80 sm:opacity-60 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[120vw] h-[120vw] sm:w-[50vw] sm:h-[50vw] bg-emerald-900/20 sm:bg-emerald-900/10 rounded-full blur-[80px] sm:blur-[150px] mix-blend-screen opacity-70 sm:opacity-50 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        </div>

        <Navbar />
        <div className="relative z-10 w-full flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}

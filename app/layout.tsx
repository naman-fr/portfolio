import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { DisplayModeProvider } from "../contexts/DisplayModeContext";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Naman Gautam | Systems Engineer | AI Researcher | Full Stack Developer",
  description: "Final year B.Tech student at IIIT Vadodara. Bridging the gap between kernel security and deep learning architectures.",
  keywords: ["Systems Engineer", "AI Researcher", "Full Stack Developer", "Naman Gautam", "Kernel Security", "Deep Learning"],
  openGraph: {
    title: "Naman Gautam | Systems Engineer | AI Researcher",
    description: "Building from the Kernel to the Cloud",
    type: "website",
  },
};

import SidebarNav from "../components/SidebarNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.variable} ${inter.variable} font-sans bg-obsidian text-white antialiased overflow-x-hidden`}>
        <DisplayModeProvider>
          <SidebarNav />
          {children}
        </DisplayModeProvider>
      </body>
    </html>
  );
}

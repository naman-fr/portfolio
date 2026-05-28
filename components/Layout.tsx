"use client";

import { motion } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import EarthBackground from "./EarthBackground";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ErrorBoundary>
      <Preloader />
      <div className="relative min-h-screen bg-transparent selection:bg-primary selection:text-black">
        <EarthBackground />
        <div className="noise-overlay" />
        <CustomCursor />
        
        <main className="relative z-10">
          {children}
        </main>

        {/* Minimal Floating Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]"
        >
          <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-md text-[9px] font-sans tracking-[0.25em] uppercase text-[#dfc7b3]">
            <a href="#hero" className="hover:text-primary transition-colors duration-300">HOME</a>
            <a href="#projects" className="hover:text-primary transition-colors duration-300">WORK</a>
            <a href="#experience" className="hover:text-primary transition-colors duration-300">HISTORY</a>
            <div className="relative w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]" />
            <a href="#skills" className="hover:text-primary transition-colors duration-300">TECH</a>
            <a href="#certifications" className="hover:text-primary transition-colors duration-300">CREDENTIALS</a>
            <a href="#contact" className="hover:text-primary transition-colors duration-300">CONNECT</a>
          </div>
        </motion.nav>
      </div>
    </ErrorBoundary>
  );
}

"use client";

import { motion } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import NeuralBackground from "./NeuralBackground";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ErrorBoundary>
      <Preloader />
      <div className="relative min-h-screen bg-transparent selection:bg-primary selection:text-black">
        <NeuralBackground />
        <div className="noise-overlay" />
        <CustomCursor />
        
        <main className="relative z-10">
          {children}
        </main>

        {/* Minimal Floating Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] mix-blend-difference"
        >
          <div className="flex items-center gap-8 text-[10px] font-mono tracking-[0.4em] uppercase text-white/50">
            <a href="#hero" className="hover:text-primary transition-colors">HOME</a>
            <a href="#projects" className="hover:text-primary transition-colors">WORK</a>
            <a href="#experience" className="hover:text-primary transition-colors">HISTORY</a>
            <div className="w-2 h-2 bg-primary rounded-full" />
            <a href="#skills" className="hover:text-primary transition-colors">TECH</a>
            <a href="#certifications" className="hover:text-primary transition-colors">CREDENTIALS</a>
            <a href="#contact" className="hover:text-primary transition-colors">CONNECT</a>
          </div>
        </motion.nav>
      </div>
    </ErrorBoundary>
  );
}

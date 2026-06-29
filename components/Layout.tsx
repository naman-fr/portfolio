"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import EarthBackground from "./EarthBackground";
import PikachuCompanion from "./PikachuCompanion";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { id: "hero", label: "HOME" },
  { id: "projects", label: "WORK" },
  { id: "experience", label: "HISTORY" },
  { id: "skills", label: "TECH" },
  { id: "certifications", label: "CREDENTIALS" },
  { id: "contact", label: "CONNECT" },
];

export default function Layout({ children }: LayoutProps) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ErrorBoundary>
      <Preloader />
      {/* GLOBAL P5 COMIC BORDER */}
      <div className="fixed inset-0 z-50 pointer-events-none border-[12px] sm:border-[20px] border-[#1a1a1a]" />

      <div className="relative min-h-screen bg-transparent selection:bg-primary selection:text-white">
        <EarthBackground />
        <div className="noise-overlay" />
        <CustomCursor />
        <PikachuCompanion />
        
        <main className="relative z-10">
          {children}
        </main>

        {/* Minimal Floating Nav Dock - Pokemon/P5 Fusion */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 md:bottom-auto md:top-8 left-1/2 -translate-x-1/2 z-[100] w-[92vw] md:w-auto max-w-[440px] md:max-w-none"
        >
          <div className="relative flex items-center justify-around md:justify-start gap-1 md:gap-4 px-3 md:px-6 py-2.5 rounded-full bg-white/90 border-2 border-black/10 shadow-[4px_4px_0_0_rgba(0,0,0,0.05)] backdrop-blur-md text-[9px] md:text-[10px] font-sans tracking-[0.1em] md:tracking-[0.15em] uppercase text-[#1a1a1a] w-full md:w-auto font-bold">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`relative px-2 md:px-4 py-2 rounded-full transition-colors duration-300 hover:text-primary ${isActive ? "text-primary font-black" : "text-[#1a1a1a]/70"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full -z-10 shadow-inner"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>
        </motion.nav>
      </div>
    </ErrorBoundary>
  );
}

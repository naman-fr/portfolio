"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import EarthBackground from "./EarthBackground";
import CornerHUD from "./CornerHUD";

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
      <div className="relative min-h-screen bg-transparent selection:bg-primary selection:text-black">
        <EarthBackground />
        <CornerHUD />
        <div className="noise-overlay" />
        <CustomCursor />
        
        <main className="relative z-10">
          {children}
        </main>

        {/* Minimal Floating Nav Dock */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]"
        >
          <div className="relative flex items-center gap-4 px-6 py-2.5 rounded-full bg-[#0a0908]/40 border border-white/5 backdrop-blur-md text-[9px] font-sans tracking-[0.2em] uppercase text-[#dfc7b3]">
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
                  className={`relative px-3 py-1.5 rounded-full transition-colors duration-300 hover:text-white ${isActive ? "text-primary font-bold" : "text-[#dfc7b3]/70"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full -z-10"
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

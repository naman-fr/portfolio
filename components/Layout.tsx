"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, FolderKanban, Award, Mail } from "lucide-react";
import NeuralBackground from "./NeuralBackground";
import ErrorBoundary from "./ErrorBoundary";
import RecruiterModeToggle from "./RecruiterModeToggle";
import CommandPalette from "./CommandPalette";
import { useDisplayMode } from "../contexts/DisplayModeContext";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "projects", icon: FolderKanban, label: "Projects" },
  { id: "skills", icon: User, label: "Skills" },
  { id: "achievements", icon: Award, label: "Achievements" },
  { id: "contact", icon: Mail, label: "Contact" },
];

// #region agent log
const logDebug = (location: string, message: string, data: any, hypothesisId: string) => {
  const payload = {location,message,data,timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId};
  console.log('[DEBUG]', payload);
  fetch('http://127.0.0.1:7242/ingest/4c46af64-f425-4826-8dc9-6d583fd34651',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
};
// #endregion
export default function Layout({ children }: LayoutProps) {
  // #region agent log
  logDebug('components/Layout.tsx:28','Layout component initialized',{childrenType:typeof children},'B');
  // #endregion
  const [activeSection, setActiveSection] = useState("hero");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { isRecruiterMode } = useDisplayMode();

  useEffect(() => {
    // #region agent log
    logDebug('components/Layout.tsx:33','Layout useEffect hook executing',{windowExists:typeof window!=='undefined'},'C');
    // #endregion
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // #region agent log
    logDebug('components/Layout.tsx:47','Scroll listener attached',{sectionsCount:navItems.length},'C');
    // #endregion
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen">
        {!isRecruiterMode && <NeuralBackground />}
        
        <RecruiterModeToggle />
        <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
        
        <main className={`relative z-10 ${isRecruiterMode ? 'max-w-4xl mx-auto' : ''}`}>
          {children}
        </main>

      {/* Floating Dock Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="glass rounded-full px-6 py-4 flex items-center gap-4 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative p-3 rounded-full transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={false}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-terminal" : "text-gray-400"
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full border-2 border-terminal neon-glow"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.nav>
      </div>
    </ErrorBoundary>
  );
}

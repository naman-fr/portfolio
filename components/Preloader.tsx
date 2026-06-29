"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLogs = [
  "SYS_INIT: SETUP STACK BUFFER...",
  "SYS_INIT: ALLOCATING REGISTER POOL...",
  "SYS_SECURE: GATEWAY VERIFICATION [PASS]",
  "NET_CONN: ESTABLISHING ENCRYPTED TUNNEL...",
  "DATA_LOAD: RESOLVE PORTFOLIO RESUME SCHEMAS...",
  "DATA_LOAD: LOAD DRDO RADAR LOGS (OK)",
  "WEBGL_INIT: PRE-COMPILING VERTEX SHADERS...",
  "WEBGL_INIT: SPINNING UP GLOBE PARTICLE NETWORK...",
  "UI_INIT: REGISTERING CUSTOM CURSOR MAPPED SPRINGS...",
  "CORE_LAUNCH: SYS_ACTIVE. READY."
];

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += Math.random() * 3.5 + 2.0;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 1000);
        return;
      }
      setProgress(currentProgress);
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-[#0c0b0a] overflow-hidden select-none"
        >
          {/* Halftone / Comic Dot Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px)",
              backgroundSize: "16px 16px"
            }}
          />

          {/* Dynamic rotating stars in the background (Persona 5 style) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <svg className="absolute w-24 h-24 text-white animate-spin top-10 left-10" viewBox="0 0 24 24" style={{ animationDuration: "12s" }}>
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="none" stroke="white" strokeWidth="1" />
            </svg>
            <svg className="absolute w-36 h-36 text-[#e02424] animate-spin bottom-10 right-1/3" viewBox="0 0 24 24" style={{ animationDuration: "18s", animationDirection: "reverse" }}>
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="none" stroke="#e02424" strokeWidth="1.5" />
            </svg>
            <svg className="absolute w-16 h-16 text-white animate-spin top-1/3 right-12" viewBox="0 0 24 24" style={{ animationDuration: "8s" }}>
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="none" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          {/* Left Side: Staggered Tilted Menu Items */}
          <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 transform -skew-x-12 select-none z-10 scale-90 sm:scale-100 origin-left">
            <div className="bg-[#e02424] text-white font-display font-black text-2xl sm:text-3xl px-8 py-2.5 border-4 border-black shadow-[6px_6px_0_0_#000] flex justify-between items-center w-64 sm:w-72 transform rotate-[-2deg] transition-transform">
              <span className="skew-x-12 tracking-tighter">LOADING...</span>
              <span className="text-xs skew-x-12 bg-black text-white px-2 py-0.5 font-mono">01</span>
            </div>
            <div className="bg-white text-black font-display font-black text-lg sm:text-xl px-6 py-2 border-3 border-black w-56 sm:w-64 transform rotate-[1deg] shadow-[4px_4px_0_0_#000]">
              <span className="skew-x-12 tracking-tight">COMPILING</span>
            </div>
            <div className="bg-white text-black font-display font-black text-lg sm:text-xl px-6 py-2 border-3 border-black w-52 sm:w-60 transform rotate-[-1deg] shadow-[4px_4px_0_0_#000]">
              <span className="skew-x-12 tracking-tight">ESTABLISHING</span>
            </div>
            <div className="bg-white text-black font-display font-black text-lg sm:text-xl px-6 py-2 border-3 border-black w-48 sm:w-56 transform rotate-[2deg] shadow-[4px_4px_0_0_#000]">
              <span className="skew-x-12 tracking-tight">PORTFOLIO</span>
            </div>
          </div>

          {/* Center: Giant Tilted Title Banner (PARTY Style) */}
          <div className="absolute left-[20%] md:left-[35%] top-[25%] md:top-[38%] transform -skew-x-12 -rotate-12 pointer-events-none select-none z-20 flex flex-col items-start scale-90 md:scale-100">
            <span className="text-7xl md:text-9xl font-display font-black text-white leading-none tracking-tighter drop-shadow-[8px_8px_0px_#e02424]">
              LOADING
            </span>
            <span className="text-[10px] md:text-xs bg-white text-black font-mono font-black px-4 py-1 mt-3 transform skew-x-12 border-2 border-black shadow-[4px_4px_0_0_#e02424] uppercase tracking-widest">
              [ ESTABLISHING HANDSHAKE ]
            </span>
          </div>

          {/* Right Side: Circular Masked Avatar (Joker Style) */}
          <div className="absolute right-6 sm:right-16 md:right-24 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full border-[8px] border-[#e02424] shadow-[10px_10px_0_0_#000] bg-[#fcfbf9] overflow-hidden flex items-center justify-center scale-90 sm:scale-100 origin-right">
            {/* Mask Icon & Decorative Background Slits */}
            <div className="absolute inset-0 bg-[#e02424]/5 pointer-events-none" />
            <svg className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 text-[#1a1a1a]" viewBox="0 0 100 100">
              <polygon points="10,40 50,5 90,40 50,95" fill="#e02424" opacity="0.12" />
              {/* Star details inside circle */}
              <polygon points="15,20 18,30 28,30 20,36 23,46 15,40 7,46 10,36 2,30 12,30" fill="#e02424" opacity="0.4" transform="translate(10, 10) scale(0.4)" />
              {/* Persona thief mask SVG */}
              <path d="M 12,48 C 22,35 38,32 50,47 C 62,32 78,35 88,48 C 93,65 50,82 50,82 C 50,82 7,65 12,48 Z" fill="#1a1a1a" stroke="black" strokeWidth="2" />
              <path d="M 12,48 C 22,35 38,32 50,47 C 62,32 78,35 88,48 C 93,65 50,82 50,82 C 50,82 7,65 12,48 Z" fill="none" stroke="white" strokeWidth="2" transform="translate(-1, -1)" />
              {/* Mask Eye cutouts */}
              <path d="M 24,50 Q 32,44 40,49 Q 32,56 24,50 Z" fill="white" />
              <path d="M 60,49 Q 68,44 76,50 Q 68,56 60,49 Z" fill="white" />
              {/* Dynamic decorative red slashes */}
              <line x1="10" y1="90" x2="90" y2="10" stroke="#e02424" strokeWidth="2" opacity="0.3" />
            </svg>
          </div>

          {/* Bottom: Money Counter style Loading progress */}
          <div className="absolute bottom-10 sm:bottom-16 right-10 sm:right-24 font-display font-black text-white text-3xl sm:text-4xl flex items-center gap-2 transform -rotate-6 select-none z-20">
            <span className="text-[#e02424] animate-pulse">¥</span>
            <span className="tracking-tighter">{Math.floor(progress * 1000).toLocaleString()}</span>
          </div>

          {/* Bottom diagonal red progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-3 bg-[#1a1a1a]">
            <motion.div 
              className="h-full bg-[#e02424]" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

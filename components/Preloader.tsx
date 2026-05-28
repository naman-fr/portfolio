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
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += Math.random() * 2.5 + 1.5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 800);
        return;
      }
      setProgress(currentProgress);
      
      // Selectively reveal boot logs based on progress percentage
      const logCountToShow = Math.floor((currentProgress / 100) * bootLogs.length);
      setActiveLogs(bootLogs.slice(0, Math.max(1, logCountToShow)));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-[#0c0b0a] flex flex-col items-center justify-center font-mono select-none"
        >
          {/* Cyber Blueprint background grid */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />

          {/* Central Rotating Radar Indicator */}
          <div className="relative mb-10 w-24 h-24 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full text-primary animate-spin" viewBox="0 0 100 100" style={{ animationDuration: "4s" }}>
              <circle cx="50" cy="50" r="46" className="stroke-white/5 fill-none" strokeWidth="1" />
              <circle cx="50" cy="50" r="46" className="stroke-primary/30 fill-none" strokeWidth="1.5" strokeDasharray="140 180" />
              <circle cx="50" cy="50" r="30" className="stroke-white/5 fill-none" strokeWidth="0.8" strokeDashoffset="40" />
              <line x1="50" y1="50" x2="50" y2="4" className="stroke-primary" strokeWidth="1.5" style={{ opacity: 0.8 }} />
            </svg>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
          </div>

          <div className="w-72 max-w-sm flex flex-col items-center gap-6">
            {/* Progress Readout */}
            <div className="text-center space-y-1">
              <span className="text-[9px] tracking-[0.4em] text-[#dfc7b3]/40 uppercase block">SYSTEM_BOOT</span>
              <h2 className="text-5xl font-display font-extrabold text-white tracking-tighter tabular-nums select-none">
                {Math.floor(progress)}%
              </h2>
            </div>

            {/* Glowing Progress bar */}
            <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                style={{ width: `${progress}%`, boxShadow: "0 0 8px #f27b50" }}
              />
            </div>

            {/* Terminal logs list */}
            <div className="w-full h-24 bg-black/45 p-4 rounded-2xl border border-white/5 font-mono text-[8px] overflow-hidden flex flex-col gap-1.5 justify-end">
              {activeLogs.slice(-4).map((log, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white/40 truncate">
                  <span className="text-primary/45 font-bold">{">>"}</span>
                  <span className="truncate">{log}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(242,123,80,0.02),_transparent_70%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

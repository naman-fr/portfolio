"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex flex-col items-center justify-center font-mono"
        >
          <div className="relative w-64 h-1 bg-white/5 rounded-full overflow-hidden mb-8">
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="space-y-2 text-center">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[10px] tracking-[0.5em] text-primary uppercase"
            >
              INITIALIZING_SYSTEM_CORES
            </motion.div>
            <div className="text-huge font-bold text-white tracking-tighter">
              {Math.floor(progress)}%
            </div>
          </div>

          {/* Glitch Overlay Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0) 0%, transparent 100%)",
                "radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 100%)",
                "radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0) 0%, transparent 100%)",
              ],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

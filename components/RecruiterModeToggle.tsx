"use client";

import { useDisplayMode } from "../contexts/DisplayModeContext";
import { Monitor, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function RecruiterModeToggle() {
  const { mode, toggleMode, isRecruiterMode } = useDisplayMode();

  return (
    <motion.button
      onClick={toggleMode}
      className="fixed top-4 right-4 z-50 glass rounded-lg p-3 flex items-center gap-2 font-mono text-sm group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isRecruiterMode ? "Enable Full Experience" : "Enable Recruiter Mode (Reduced Motion)"}
    >
      {/* BIOS-style toggle switch */}
      <div className="relative w-12 h-6 bg-gray-800 rounded-full border border-terminal/50">
        <motion.div
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-terminal rounded-full"
          animate={{
            x: isRecruiterMode ? 24 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      
      {isRecruiterMode ? (
        <>
          <Monitor className="w-4 h-4 text-terminal" />
          <span className="text-terminal hidden md:inline">RECRUITER MODE</span>
        </>
      ) : (
        <>
          <Zap className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 hidden md:inline">FULL MODE</span>
        </>
      )}
      
      {/* Status indicator */}
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-terminal rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}


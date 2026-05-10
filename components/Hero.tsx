"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileDown, Play } from "lucide-react";
// #region agent log
const logDebug = (location: string, message: string, data: any, hypothesisId: string) => {
  const payload = {location,message,data,timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId};
  console.log('[DEBUG]', payload);
  fetch('http://127.0.0.1:7242/ingest/4c46af64-f425-4826-8dc9-6d583fd34651',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
};
// #endregion
import { resumeData } from "../data/resume";
import dynamic from "next/dynamic";
import MetricsBar from "./MetricsBar";
import { useDisplayMode } from "../contexts/DisplayModeContext";

const Kernel3D = dynamic(() => import("./Kernel3D"), { ssr: false });

const TextReveal = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);

  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      if (frame < 20) {
        setDisplayText(
          text
            .split("")
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("")
        );
      } else {
        setDisplayText(text);
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 50 + delay * 10);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <motion.h1
      className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold text-terminal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.5 }}
    >
      {displayText}
    </motion.h1>
  );
};

const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <motion.p
      className="text-xl md:text-2xl text-gray-300 font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayText}
      <span className="animate-pulse">|</span>
    </motion.p>
  );
};

export default function Hero() {
  // #region agent log
  logDebug('components/Hero.tsx:86','Hero component render',{profileName:resumeData?.profile?.name||'missing'},'B');
  // #endregion
  const { isRecruiterMode } = useDisplayMode();
  const scrollToAbout = () => {
    const element = document.getElementById("experience");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* System Status Bar */}
          <div className="glass rounded-lg p-4 font-mono text-xs space-y-2 border-l-4 border-terminal">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-terminal rounded-full animate-pulse"></span>
                <span className="text-terminal">SYSTEM STATUS: OPTIMAL</span>
              </div>
              <span className="text-white/40">v6.11.0-NG</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-400">
                <span className="text-terminal/60 mr-2">INST:</span>
                {resumeData.education.institution.toUpperCase()}
              </div>
              <div className="text-gray-400">
                <span className="text-terminal/60 mr-2">LOC:</span>
                {resumeData.profile.contact.location.toUpperCase()}
              </div>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-2">
              <motion.div 
                className="bg-terminal h-full"
                initial={{ width: 0 }}
                animate={{ width: "83%" }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>
          </div>

          <TextReveal text={resumeData.profile.name.toUpperCase()} />
          
          <Typewriter text={resumeData.profile.titles.join(" | ")} />

          <MetricsBar />

          <motion.p
            className="text-gray-400 text-lg max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {resumeData.profile.about}
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <motion.button
              onClick={scrollToAbout}
              className="px-8 py-4 bg-terminal text-obsidian font-mono font-bold rounded-lg flex items-center gap-2 hover:neon-glow transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              Initialize Portfolio
            </motion.button>
            <motion.a
              href="https://www.linkedin.com/in/namangautam-691158299"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass-hover font-mono font-bold rounded-lg flex items-center gap-2 border-2 border-terminal text-terminal"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileDown className="w-5 h-5" />
              Access LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>

        {!isRecruiterMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden md:block relative"
          >
            <Kernel3D />
            
            {/* Floating Metrics Widget */}
            <motion.div 
              className="absolute -right-8 top-1/4 glass p-4 rounded-lg border-neural/30 font-mono text-[10px] space-y-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-neural border-b border-neural/20 pb-1 mb-1 font-bold">{"// LIVE TELEMETRY"}</div>
              <div className="flex justify-between gap-8 text-gray-400">
                <span>CPU_LOAD:</span>
                <span className="text-white">12.4%</span>
              </div>
              <div className="flex justify-between gap-8 text-gray-400">
                <span>MEM_ALLOC:</span>
                <span className="text-white">2.1GB</span>
              </div>
              <div className="flex justify-between gap-8 text-gray-400">
                <span>ACTIVE_THREADS:</span>
                <span className="text-white">42</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
      {/* Root Signature */}
      <motion.div 
        className="absolute bottom-10 left-8 hidden lg:flex items-center gap-4 opacity-30 font-mono text-[10px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3 }}
      >
        <div className="w-12 h-[1px] bg-white/20" />
        <span>SIGNED: NAMAN_GAUTAM_ROOT</span>
        <span>ID: 0x7E3F7F1</span>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-20" onClick={scrollToAbout}>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-terminal rounded-full" />
        </div>
      </div>
    </section>
  );
}

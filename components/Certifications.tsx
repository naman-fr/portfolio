"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "../data/resume";
import { ExternalLink, Award, ShieldCheck, Zap, Cloud, Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollRevealHeading from "./ScrollRevealHeading";

const iconMap: Record<string, any> = {
  cloud: Cloud,
  zap: Zap,
  award: ShieldCheck,
  trophy: Trophy,
};

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const items = resumeData.certifications;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section id="certifications" className="py-32 bg-transparent overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollRevealHeading label="[ CREDENTIALS ]" title="CERTIFICATIONS" />
      </div>

      {/* 3D Coverflow Container */}
      <div className="relative w-full flex flex-col items-center justify-center min-h-[460px] overflow-visible select-none">
        <div className="relative w-full max-w-4xl h-[340px] flex items-center justify-center overflow-visible" style={{ perspective: 1200 }}>
          <AnimatePresence initial={false}>
            {items.map((cert, i) => {
              const Icon = iconMap[cert.icon as string] || Award;
              
              // Calculate wrap-around index offsets
              let offset = i - activeIndex;
              
              // Ensure we display shortest path wrap-around in carousel
              const half = Math.floor(items.length / 2);
              if (offset > half) {
                offset -= items.length;
              } else if (offset < -half) {
                offset += items.length;
              }

              const absOffset = Math.abs(offset);
              const isActive = absOffset === 0;

              // Hide cards that are too far away
              if (absOffset > 2) return null;

              // Compute translations
              const xTranslation = isMobile ? offset * 90 : offset * 260; // Spread distance
              const zTranslation = isMobile ? -absOffset * 80 : -absOffset * 150; // Push back on Z axis (reduced on mobile)
              const rotateYAngle = offset * -25; // Tilt inwards
              const scaleValue = isMobile ? (1 - absOffset * 0.15) : (1 - absOffset * 0.12);

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: 1 - absOffset * 0.35,
                    scale: scaleValue,
                    x: xTranslation,
                    z: zTranslation,
                    rotateY: rotateYAngle,
                    zIndex: 10 - absOffset,
                  }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ type: "spring", stiffness: 140, damping: 18 }}
                  onClick={() => setActiveIndex(i)}
                  className={`absolute w-[290px] min-[375px]:w-[330px] sm:w-[440px] md:w-[480px] h-full cursor-pointer rounded-[1.5rem] p-4 sm:p-5 flex flex-col gap-3 border-[3px] transition-all duration-500 overflow-hidden bg-[#e02424] ${
                    isActive 
                      ? "border-[#1a1a1a] shadow-[8px_8px_0_0_rgba(0,0,0,0.2)]" 
                      : "border-[#1a1a1a]/50 opacity-70 hover:opacity-100 hover:border-[#1a1a1a]"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* Pokedex Top Lights */}
                  <div className="flex items-center gap-3 w-full pb-2 border-b-[3px] border-[#1a1a1a]/20 mb-2 z-10 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#1b9fe5] border-2 border-white shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4)]" />
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#e02424] border border-[#1a1a1a]" />
                      <div className="w-3 h-3 rounded-full bg-[#f9db34] border border-[#1a1a1a]" />
                      <div className="w-3 h-3 rounded-full bg-[#42a859] border border-[#1a1a1a]" />
                    </div>
                  </div>

                  {/* Inner Screen Area */}
                  <div className="flex-1 bg-[#fcfbf9] rounded-xl border-[3px] border-[#1a1a1a] overflow-hidden flex flex-row relative shadow-inner p-4 sm:p-5 gap-4 sm:gap-6">
                    {/* Holographic Shimmer Effect - Coral themed */}
                    {isActive && (
                      <div className="absolute inset-0 opacity-100 transition-opacity duration-1000 bg-[linear-gradient(45deg,transparent_25%,rgba(224,36,36,0.04)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
                    )}

                    {/* Side Tag */}
                    <div className="absolute top-0 right-0 h-full w-8 border-l-2 border-[#1a1a1a]/10 flex items-center justify-center bg-[#1a1a1a]/[0.02]">
                      <span className="rotate-90 font-mono text-[7px] tracking-[0.5em] text-[#1a1a1a]/40 whitespace-nowrap font-bold">
                        SECURED_LEVEL_04
                      </span>
                    </div>

                    {/* Left Side: Icon & Verification */}
                    <div className="flex flex-col items-center justify-between py-2 border-r-2 border-[#1a1a1a]/10 pr-4 sm:pr-6" style={{ transform: "translateZ(30px)" }}>
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/5 flex items-center justify-center border-2 border-[#1a1a1a]/10 shadow-[2px_2px_0_0_rgba(0,0,0,0.05)]">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-[7px] font-mono text-primary tracking-widest font-bold">VERIFIED</span>
                      </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="flex-1 space-y-4 sm:space-y-6" style={{ transform: "translateZ(40px)" }}>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono font-bold text-[#1a1a1a]/50 uppercase tracking-widest block">
                          {cert.date}
                        </span>
                        <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-[#1a1a1a] tracking-tight leading-tight group-hover:text-primary transition-colors whitespace-normal">
                          {cert.title.toUpperCase()}
                        </h3>
                        <p className="text-secondary font-mono text-xs uppercase tracking-widest font-bold">
                          {cert.org}
                        </p>
                      </div>

                      {cert.id_code && (
                        <div className="bg-[#1a1a1a]/5 p-2 sm:p-3 rounded-xl border-2 border-[#1a1a1a]/10 font-mono">
                          <div className="text-[7px] font-bold text-[#1a1a1a]/40 uppercase mb-0.5">CERT_ID_HASH</div>
                          <div className="text-[9px] font-bold text-[#1a1a1a]/60 truncate break-all">{cert.id_code}</div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((skill) => (
                          <span key={skill} className="px-2 py-0.5 bg-primary/5 text-[9px] font-mono text-primary/60 border border-primary/10 rounded uppercase">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <a 
                          href={resumeData.profile.contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] font-mono font-bold text-[#1a1a1a]/50 flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          VALIDATE_LINK
                        </a>
                        <div className="flex gap-1">
                          <div className="w-1 h-4 bg-primary/20 rounded-full" />
                          <div className="w-1 h-4 bg-primary/40 rounded-full" />
                          <div className="w-1 h-4 bg-primary/60 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 3D Carousel Navigation Controls */}
        <div className="flex items-center gap-6 mt-12 z-20">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border-2 border-[#1a1a1a]/20 bg-[#1a1a1a]/5 flex items-center justify-center text-[#1a1a1a]/50 hover:text-primary hover:border-primary/50 transition-all duration-300 active:scale-95 shadow-[2px_2px_0_0_rgba(0,0,0,0.1)]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Tracking dots */}
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="h-1 bg-[#1a1a1a]/20 rounded-full transition-all duration-300"
                style={{
                  width: idx === activeIndex ? "24px" : "6px",
                  backgroundColor: idx === activeIndex ? "var(--color-primary)" : undefined
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border-2 border-[#1a1a1a]/20 bg-[#1a1a1a]/5 flex items-center justify-center text-[#1a1a1a]/50 hover:text-primary hover:border-primary/50 transition-all duration-300 active:scale-95 shadow-[2px_2px_0_0_rgba(0,0,0,0.1)]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

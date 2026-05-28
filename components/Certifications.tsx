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
        <ScrollRevealHeading label="[ 06:_LICENSES_&_CERTIFICATIONS ]" title="CREDENTIALS" />
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
                  className={`absolute w-[290px] min-[375px]:w-[330px] sm:w-[440px] md:w-[480px] h-full cursor-pointer rounded-[2.2rem] p-6 sm:p-8 md:p-10 flex gap-4 sm:gap-6 border transition-all duration-500 overflow-hidden bg-[#0c0b0a]/95 glass-premium ${
                    isActive 
                      ? "border-primary/30 shadow-[0_20px_50px_rgba(242,123,80,0.15)]" 
                      : "border-white/5 opacity-55 hover:opacity-80"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* Holographic Shimmer Effect - Coral themed */}
                  {isActive && (
                    <div className="absolute inset-0 opacity-100 transition-opacity duration-1000 bg-[linear-gradient(45deg,transparent_25%,rgba(242,123,80,0.04)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
                  )}

                  {/* Side Tag */}
                  <div className="absolute top-0 right-0 h-full w-8 border-l border-white/5 flex items-center justify-center bg-white/[0.01]">
                    <span className="rotate-90 font-mono text-[7px] tracking-[0.5em] text-[#dfc7b3]/30 whitespace-nowrap">
                      SECURED_LEVEL_04
                    </span>
                  </div>

                  {/* Left Side: Icon & Verification */}
                  <div className="flex flex-col items-center justify-between py-2 border-r border-white/5 pr-4 sm:pr-6" style={{ transform: "translateZ(30px)" }}>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/5 flex items-center justify-center border border-white/5 shadow-lg">
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
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">
                        {cert.date}
                      </span>
                      <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors whitespace-normal">
                        {cert.title.toUpperCase()}
                      </h3>
                      <p className="text-secondary font-mono text-xs uppercase tracking-widest font-bold">
                        {cert.org}
                      </p>
                    </div>

                    {cert.id_code && (
                      <div className="bg-black/30 p-2 sm:p-3 rounded-xl border border-white/5 font-mono">
                        <div className="text-[7px] text-white/20 uppercase mb-0.5">CERT_ID_HASH</div>
                        <div className="text-[9px] text-white/40 truncate break-all">{cert.id_code}</div>
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
                        className="text-[9px] font-mono text-white/40 flex items-center gap-2 hover:text-primary transition-colors"
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 3D Carousel Navigation Controls */}
        <div className="flex items-center gap-6 mt-12 z-20">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Tracking dots */}
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="h-1 bg-white/20 rounded-full transition-all duration-300"
                style={{
                  width: idx === activeIndex ? "24px" : "6px",
                  backgroundColor: idx === activeIndex ? "var(--color-primary)" : undefined
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

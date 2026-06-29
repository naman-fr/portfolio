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
                  className={`absolute w-[290px] min-[375px]:w-[330px] sm:w-[440px] md:w-[480px] h-full cursor-pointer p-0 flex flex-col border-[4px] transition-all duration-500 overflow-hidden bg-[#fcfbf9] ${
                    isActive 
                      ? "border-[#1a1a1a] shadow-[12px_12px_0_0_#e02424]" 
                      : "border-[#1a1a1a]/50 opacity-70 hover:opacity-100 hover:border-[#1a1a1a]"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* Persona 5 Header Block */}
                  <div className="bg-[#e02424] text-white p-5 font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter border-b-[4px] border-[#1a1a1a] flex justify-between items-center relative overflow-hidden shrink-0">
                    {/* Angled background strip */}
                    <div className="absolute top-0 right-10 w-48 h-48 bg-[#1a1a1a] -rotate-45 transform origin-center shadow-lg" />
                    <span className="relative z-10 leading-none" style={{ transform: "rotate(-2deg)" }}>{cert.title.toUpperCase()}</span>
                    <Icon className="w-10 h-10 relative z-10 text-white transform rotate-12" />
                  </div>

                  {/* Persona Inner Content */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col relative z-10 gap-4">
                    {/* Giant background text motif */}
                    <div className="absolute bottom-4 right-2 text-7xl font-display font-black text-[#1a1a1a]/5 -z-10 -rotate-12 pointer-events-none">
                      CONFIDANT
                    </div>

                    <div className="flex justify-between items-start">
                      <div className="bg-[#1a1a1a] text-white px-3 py-1.5 inline-block self-start font-mono font-bold text-xs uppercase transform -rotate-2 shadow-[4px_4px_0_0_#e02424]">
                        {cert.date}
                      </div>
                      
                      {isActive && (
                        <div className="flex items-center gap-1 bg-white border-2 border-[#1a1a1a] px-2 py-1 transform rotate-2 shadow-[2px_2px_0_0_#1a1a1a]">
                          <ShieldCheck className="w-3 h-3 text-[#e02424] animate-pulse" />
                          <span className="text-[8px] font-black text-[#1a1a1a] tracking-widest">VERIFIED</span>
                        </div>
                      )}
                    </div>

                    <div className="font-mono text-sm uppercase font-black text-[#1a1a1a] bg-white p-3 border-l-8 border-[#e02424] shadow-[4px_4px_0_0_rgba(0,0,0,0.05)]">
                      {cert.org}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-white text-[10px] font-mono font-black text-[#1a1a1a] border-2 border-[#1a1a1a] uppercase transform rotate-1 hover:-rotate-1 transition-transform">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto space-y-4">
                      {cert.id_code && (
                        <div className="bg-[#f9db34] p-3 border-[3px] border-[#1a1a1a] font-mono transform rotate-1 shadow-[4px_4px_0_0_#1a1a1a]">
                          <div className="text-[9px] font-black text-[#1a1a1a] uppercase mb-1">CERT_ID_HASH</div>
                          <div className="text-xs font-bold text-[#1a1a1a] truncate break-all">{cert.id_code}</div>
                        </div>
                      )}

                      <a 
                        href={resumeData.profile.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 font-mono font-black text-[10px] uppercase tracking-widest border-2 border-transparent hover:border-[#e02424] hover:bg-white hover:text-[#e02424] transition-colors transform -rotate-1 shadow-[4px_4px_0_0_#e02424]"
                      >
                        VALIDATE_LINK <ExternalLink className="w-4 h-4" />
                      </a>
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

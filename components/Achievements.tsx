"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import { Trophy, Medal, Zap, Cloud, Award, ArrowUpRight } from "lucide-react";
import ScrollRevealHeading from "./ScrollRevealHeading";

const iconMap: Record<string, any> = {
  trophy: Trophy,
  knight: Zap,
  hackathon: Medal,
  cloud: Cloud,
  award: Award,
};

function AchievementCard({ achievement, index, isFeatured, isInView, isMobile }: { achievement: any; index: number; isFeatured: boolean; isInView: boolean; isMobile: boolean }) {
  const Icon = iconMap[achievement.icon] || Trophy;
  const [isHovered, setIsHovered] = useState(false);

  // Multi-tone color configurations per card index to avoid single-color look
  const themeGradients = [
    {
      glow: "rgba(231,111,81,0.06)", // Coral
      border: "hover:border-[#e76f51]/30",
      accent: "text-[#e76f51]",
      stackGlow: "bg-[#e76f51]/5",
    },
    {
      glow: "rgba(90,140,118,0.06)", // Emerald
      border: "hover:border-[#5a8c76]/30",
      accent: "text-[#5a8c76]",
      stackGlow: "bg-[#5a8c76]/5",
    },
    {
      glow: "rgba(195,142,112,0.06)", // Copper
      border: "hover:border-[#c38e70]/30",
      accent: "text-[#c38e70]",
      stackGlow: "bg-[#c38e70]/5",
    },
    {
      glow: "rgba(217,78,52,0.06)", // Terracotta
      border: "hover:border-[#d94e34]/30",
      accent: "text-[#d94e34]",
      stackGlow: "bg-[#d94e34]/5",
    },
  ];

  const currentTheme = themeGradients[index % themeGradients.length];

  // Rotate directions for fanning out
  const rot1 = isMobile ? 0 : (index % 2 === 0 ? -4 : 4);
  const rot2 = isMobile ? 0 : (index % 2 === 0 ? 2 : -2);
  const shift1 = isMobile ? -14 : -26;
  const shift2 = isMobile ? -7 : -13;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full w-full select-none"
    >
      {/* BACKGROUND DECK STACK CARDS (Reveal upwards on hover at randomized fan angles) */}
      
      {/* Deepest card layer */}
      <motion.div
        animate={isHovered ? { y: shift1, scale: 0.94, opacity: 0.5, rotate: rot1 } : { y: 0, scale: 0.98, opacity: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
        className="absolute inset-0 w-full h-full rounded-[1.5rem] border-2 border-black bg-white pointer-events-none z-0 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]"
      >
        <div className="absolute bottom-4 left-8 font-mono text-[7px] font-bold text-[#1a1a1a]/40">
          STACK_LEVEL_02
        </div>
      </motion.div>

      {/* Middle card layer */}
      <motion.div
        animate={isHovered ? { y: shift2, scale: 0.97, opacity: 0.8, rotate: rot2 } : { y: 0, scale: 0.99, opacity: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
        className="absolute inset-0 w-full h-full rounded-[1.5rem] border-2 border-black bg-white pointer-events-none z-10 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]"
      >
        <div className="absolute top-4 right-8 font-mono font-bold text-[7px] text-[#1a1a1a]/40">
          ACH_0{index + 10}
        </div>
      </motion.div>

      {/* FOREGROUND MAIN CARD */}
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={isHovered ? { scale: 1.015, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className={`relative h-full w-full bg-white rounded-[1.5rem] p-8 lg:p-10 border-2 border-[#1a1a1a] flex flex-col justify-between transition-all duration-500 z-20 shadow-[6px_6px_0_0_rgba(0,0,0,0.1)]`}
      >
        {/* Dynamic ambient hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: `radial-gradient(300px circle at 50% 50%, ${currentTheme.glow}, transparent 80%)`,
          }}
        />

        {/* Top bar */}
        <div className="flex items-start justify-between z-10">
          <div className="relative">
            <div className={`w-14 h-14 rounded-2xl border-2 border-[#1a1a1a]/10 flex items-center justify-center bg-[#1a1a1a]/5 transition-all duration-500`}>
              <Icon className={`w-7 h-7 ${currentTheme.accent}`} />
            </div>
            <div className={`absolute inset-[-4px] rounded-2xl border-2 ${currentTheme.accent}/10 group-hover:border-2 animate-pulse opacity-40`} />
          </div>

          <div className="font-mono text-[8px] font-bold text-[#1a1a1a]/30 select-none">
            ACHIEVEMENT_0{index + 1}
          </div>
        </div>

        {/* Body content */}
        <div className={`space-y-3 z-10 ${isFeatured ? 'max-w-2xl' : 'max-w-xs'}`}>
          <h3 className="text-xl lg:text-2xl font-display font-extrabold text-[#1a1a1a] tracking-tight uppercase transition-colors flex items-center gap-2 group-hover:text-primary">
            {achievement.title}
            {isFeatured && <ArrowUpRight className="w-4 h-4 text-[#1a1a1a]/30 group-hover:text-primary transition-colors" />}
          </h3>
          <p className="text-[#1a1a1a]/70 text-sm font-sans leading-relaxed font-medium line-clamp-3">
            {achievement.description}
          </p>
        </div>

        {/* Stat counter section */}
        {achievement.stat && (
          <div className="w-full flex items-center justify-between gap-8 z-10 pt-4 border-t border-[#1a1a1a]/10">
            <div className="h-1 flex-1 bg-[#1a1a1a]/10 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1.8, delay: 0.3 }}
                className={`h-full bg-gradient-to-r from-primary/30 to-primary`}
              />
              {/* Shimmer sweep effect */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
              />
            </div>
            <motion.div 
              animate={isHovered ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 12 }}
              className="flex-shrink-0"
            >
              <Counter
                value={achievement.stat}
                suffix={achievement.stat.includes("+") ? "" : "+"}
                isInView={isInView}
              />
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px", once: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="min-h-screen py-32 px-4 bg-transparent relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollRevealHeading label="[ HIGHLIGHTS ]" title="ACHIEVEMENTS" />

        {/* Bento Grid Deck Stack Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[340px] pt-8">
          {resumeData.achievements.map((achievement, index) => {
            const isFeatured = index === 0 || index === 3;
            const gridClass = isFeatured 
              ? "md:col-span-2 lg:col-span-2 row-span-1" 
              : "md:col-span-1 lg:col-span-1 row-span-1";

            return (
              <motion.div
                key={achievement.title}
                className={`group relative h-full w-full ${gridClass}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.8, ease: "easeOut" }}
              >
                <AchievementCard
                  achievement={achievement}
                  index={index}
                  isFeatured={isFeatured}
                  isInView={isInView}
                  isMobile={isMobile}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix, isInView }: { value: string; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ""));

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div className="text-3xl font-display font-extrabold text-[#1a1a1a] tracking-tighter">
      {count}<span className="text-primary font-sans">{suffix}</span>
    </div>
  );
}

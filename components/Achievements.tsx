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

  const cardThemes = [
    {
      bgCard: "bg-[#f9db34]", // Yellow / Electric
      stripeBg: "bg-[#e6a100]",
      typeText: "⚡ ELECTRIC",
      typeColor: "text-[#e6a100]",
      progressColor: "from-[#e02424] to-[#f9db34]",
      badgeIcon: "⚡",
    },
    {
      bgCard: "bg-[#63b3ed]", // Blue / Water
      stripeBg: "bg-[#2b6cb0]",
      typeText: "💧 WATER",
      typeColor: "text-[#2b6cb0]",
      progressColor: "from-[#2b6cb0] to-[#00f5d4]",
      badgeIcon: "💧",
    },
    {
      bgCard: "bg-[#fc8181]", // Red / Fire
      stripeBg: "bg-[#c53030]",
      typeText: "🔥 FIRE",
      typeColor: "text-[#c53030]",
      progressColor: "from-[#c53030] to-[#ff7300]",
      badgeIcon: "🔥",
    },
    {
      bgCard: "bg-[#68d391]", // Green / Grass
      stripeBg: "bg-[#2f855a]",
      typeText: "🍃 GRASS",
      typeColor: "text-[#2f855a]",
      progressColor: "from-[#2f855a] to-[#8bac0f]",
      badgeIcon: "🍃",
    },
  ];

  const cardTheme = cardThemes[index % cardThemes.length];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full w-full select-none"
    >
      {/* BACKGROUND DECK STACK CARDS (Classic TCG stacked card look) */}
      
      {/* Deepest card layer */}
      <motion.div
        animate={isHovered ? { y: shift1, scale: 0.94, opacity: 0.5, rotate: rot1 } : { y: 0, scale: 0.98, opacity: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
        className="absolute inset-0 w-full h-full rounded-2xl border-[3px] border-[#1a1a1a] bg-[#e02424] pointer-events-none z-0 shadow-[4px_4px_0_0_rgba(0,0,0,0.15)]"
      />

      {/* Middle card layer */}
      <motion.div
        animate={isHovered ? { y: shift2, scale: 0.97, opacity: 0.8, rotate: rot2 } : { y: 0, scale: 0.99, opacity: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
        className="absolute inset-0 w-full h-full rounded-2xl border-[3px] border-[#1a1a1a] bg-[#2b6cb0] pointer-events-none z-10 shadow-[4px_4px_0_0_rgba(0,0,0,0.15)]"
      />

      {/* FOREGROUND MAIN CARD (Pokemon TCG Style) */}
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={isHovered ? { scale: 1.015, y: -4 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className={`relative h-full w-full ${cardTheme.bgCard} rounded-2xl p-3.5 border-[4px] border-[#1a1a1a] flex flex-col justify-between transition-all duration-500 z-20 shadow-[8px_8px_0_0_#1a1a1a]`}
      >
        {/* Holographic foil overlay (Pokemon touch) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-[rgba(255,255,255,0.4)] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 rounded-xl" />

        {/* Inner Card Frame */}
        <div className="bg-[#fcfbf9] border-[3px] border-[#1a1a1a] p-3 sm:p-4 rounded-xl flex-1 flex flex-col justify-between overflow-hidden relative">
          
          {/* Top Row: Name and Type Icon */}
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#1a1a1a] mb-2 shrink-0">
            <h3 className="text-sm sm:text-base font-display font-black text-[#1a1a1a] tracking-tight uppercase truncate max-w-[70%]">
              {achievement.title}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono font-black text-[#1a1a1a]/60">LV.99</span>
              <div className={`w-5 h-5 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center shadow-sm bg-white`}>
                <span className="text-[8px] font-mono font-black">{cardTheme.badgeIcon}</span>
              </div>
            </div>
          </div>

          {/* Illustration Window / Icon Frame */}
          <div className="h-[100px] bg-gradient-to-br from-[#1a1a1a]/5 to-[#1a1a1a]/15 rounded-lg border-[3px] border-[#1a1a1a] flex items-center justify-center relative overflow-hidden shrink-0 shadow-inner">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(249,219,52,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
            <Icon className={`w-10 h-10 ${cardTheme.typeColor} drop-shadow-[2px_2px_0px_#1a1a1a]`} />
          </div>

          {/* Card Info Stripe */}
          <div className={`${cardTheme.stripeBg} text-white text-[7px] font-mono font-black tracking-widest text-center uppercase py-0.5 border-y-2 border-[#1a1a1a] my-2 -mx-4 shrink-0`}>
            NO. {index + 1} ACHIEVEMENT POKÉDEX METER
          </div>

          {/* Description / Attack details */}
          <div className="flex-1 flex flex-col justify-center space-y-1.5 min-h-[60px] overflow-hidden">
            <div className="flex items-center justify-between">
              <span className={`text-[9px] font-mono font-black ${cardTheme.typeColor}`}>⚔ ACHIEVED</span>
              <span className="text-[8px] font-mono font-black text-[#1a1a1a]/50">{cardTheme.typeText} / 120HP</span>
            </div>
            <p className="text-[#1a1a1a]/80 text-[11px] font-sans leading-snug font-medium line-clamp-3">
              {achievement.description}
            </p>
          </div>

          {/* Stat progress bar */}
          {achievement.stat && (
            <div className="w-full flex items-center justify-between gap-4 shrink-0 pt-2 border-t-2 border-[#1a1a1a]/10">
              <div className="h-2 flex-1 bg-[#1a1a1a]/10 rounded-full overflow-hidden relative border border-[#1a1a1a]/20">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 1.8, delay: 0.3 }}
                  className={`h-full bg-gradient-to-r ${cardTheme.progressColor}`}
                />
              </div>
              <motion.div 
                animate={isHovered ? { scale: 1.1, y: -1 } : { scale: 1, y: 0 }}
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
        </div>
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

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import { Trophy, Medal, Zap, Cloud, Award, ArrowUpRight } from "lucide-react";

const iconMap: Record<string, any> = {
  trophy: Trophy,
  knight: Zap,
  hackathon: Medal,
  cloud: Cloud,
  award: Award,
};

function AchievementCard({ achievement, index, isFeatured, isInView }: { achievement: any; index: number; isFeatured: boolean; isInView: boolean }) {
  const Icon = iconMap[achievement.icon] || Trophy;
  const [sheenStyle, setSheenStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    
    // Calculate reflection angle relative to center of the card
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    setSheenStyle({
      background: `linear-gradient(${angle}deg, rgba(255, 255, 255, 0.05) 0%, rgba(242, 123, 80, 0.03) 30%, transparent 60%)`,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setSheenStyle({ opacity: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full w-full"
    >
      {/* Bento Card Wrapper */}
      <div className="glass-premium rounded-[2.2rem] p-8 lg:p-10 h-full border border-white/5 flex flex-col justify-between hover:border-primary/20 hover:shadow-[0_0_30px_rgba(242,123,80,0.05)] transition-all duration-500 overflow-hidden relative">
        
        {/* Dynamic Holographic Sheen Reflection Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none z-0"
          style={sheenStyle}
        />

        {/* Blueprint background grid */}
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[size:10px_10px] bg-[linear-gradient(to_right,rgba(242,123,80,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(242,123,80,0.015)_1px,transparent_1px)]" />

        {/* Top line of Bento Card */}
        <div className="flex items-start justify-between z-10">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl border border-primary/10 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <div className="absolute inset-[-4px] rounded-2xl border border-primary/5 group-hover:border-primary/20 animate-pulse opacity-40" />
          </div>

          <div className="font-mono text-[8px] text-white/20 select-none">
            ACH_UID_0{index + 1}
          </div>
        </div>

        {/* Body Content */}
        <div className={`space-y-3 z-10 ${isFeatured ? 'max-w-xl' : 'max-w-xs'}`}>
          <h3 className="text-xl lg:text-2xl font-display font-bold text-white tracking-tight uppercase group-hover:text-primary transition-colors flex items-center gap-2">
            {achievement.title}
            {isFeatured && <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />}
          </h3>
          <p className="text-gray-400 text-sm font-sans leading-relaxed font-light line-clamp-3">
            {achievement.description}
          </p>
        </div>

        {/* Stats Counter */}
        {achievement.stat && (
          <div className="w-full flex items-center justify-between gap-8 z-10 pt-4 border-t border-white/5">
            <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1.8, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-primary/20 to-primary shadow-[0_0_8px_var(--color-primary)]"
              />
            </div>
            <div className="flex-shrink-0">
              <Counter
                value={achievement.stat}
                suffix={achievement.stat.includes("+") ? "" : "+"}
                isInView={isInView}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px", once: false });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="min-h-screen py-32 px-4 bg-transparent relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 space-y-4 text-center md:text-left">
          <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 05:_HONOR_LOGS ]</span>
          <h2 className="text-large font-bold text-white tracking-tighter uppercase">ACHIEVEMENTS</h2>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[340px]">
          {resumeData.achievements.map((achievement, index) => {
            // Bento sizing rules: index 0 and 3 are double-width on desktop
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
    <div className="text-3xl font-display font-bold text-white tracking-tighter">
      {count}<span className="text-primary font-sans">{suffix}</span>
    </div>
  );
}

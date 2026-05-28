"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import { Trophy, Medal, Zap, Cloud, Award } from "lucide-react";

const iconMap: Record<string, any> = {
  trophy: Trophy,
  knight: Zap,
  hackathon: Medal,
  cloud: Cloud,
  award: Award,
};

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {resumeData.achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon] || Trophy;
            
            return (
              <motion.div
                key={achievement.title}
                className="group relative h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "backOut" }}
              >
                {/* Node Structure */}
                <div className="glass-premium rounded-[2rem] p-10 h-full border border-white/5 flex flex-col items-center text-center group-hover:border-primary/20 hover:shadow-[0_0_20px_rgba(242,123,80,0.04)] transition-all duration-500 overflow-hidden">
                  
                  {/* Icon Node */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-full border border-primary/10 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500">
                      <Icon className="w-9 h-9 text-primary" />
                    </div>
                    {/* Pulsing Outer Ring */}
                    <div className="absolute inset-[-8px] rounded-full border border-primary/5 group-hover:border-primary/20 animate-ping opacity-25" />
                  </div>

                  <div className="space-y-4 flex-1">
                    <h3 className="text-xl font-display font-bold text-white tracking-tight uppercase group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-sans leading-relaxed max-w-[280px] font-light">
                      {achievement.description}
                    </p>
                  </div>

                  {achievement.stat && (
                    <div className="mt-10 w-full space-y-4">
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={isInView ? { width: "100%" } : {}}
                          transition={{ duration: 2, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary/30 to-primary shadow-[0_0_8px_var(--color-primary)]"
                        />
                      </div>
                      <Counter
                        value={achievement.stat}
                        suffix={achievement.stat.includes("+") ? "" : "+"}
                        isInView={isInView}
                      />
                    </div>
                  )}
                </div>

                {/* Index Decoration */}
                <div className="absolute top-4 right-6 font-mono text-[9px] text-white/10 select-none">
                  ACH_LOG_{index}
                </div>
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
    <div className="text-4xl font-display font-bold text-white tracking-tighter">
      {count}<span className="text-primary font-sans">{suffix}</span>
    </div>
  );
}

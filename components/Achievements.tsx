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
      className="min-h-screen py-32 px-4 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 space-y-4">
          <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 05:_HONOR_LOGS ]</span>
          <h2 className="text-huge font-bold leading-none tracking-tighter uppercase">ACHIEVEMENTS</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumeData.achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon] || Trophy;
            
            return (
              <motion.div
                key={achievement.title}
                className="glass-premium rounded-2xl p-10 relative overflow-hidden group border border-white/5 hover:border-primary/30 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight uppercase group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-mono leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  {achievement.stat && (
                    <div className="pt-6 border-t border-white/5">
                      <Counter
                        value={achievement.stat}
                        suffix={achievement.stat.includes("+") ? "" : "+"}
                        isInView={isInView}
                      />
                    </div>
                  )}
                </div>

                {/* Animated Background Element */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 blur-[60px] group-hover:bg-primary/10 transition-colors" />
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
    <div className="text-4xl font-bold text-white tracking-tighter">
      {count}<span className="text-primary">{suffix}</span>
    </div>
  );
}

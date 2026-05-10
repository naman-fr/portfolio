"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import { Trophy, Medal, Award, Zap, Cloud, Award as AwardIcon } from "lucide-react";

const iconMap: Record<string, any> = {
  diamond: Award,
  trophy: Trophy,
  knight: Zap,
  hackathon: Medal,
  cloud: Cloud,
  award: AwardIcon,
};

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-mono font-bold text-terminal mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          &gt; ACHIEVEMENTS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resumeData.achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon] || Trophy;
            
            return (
              <motion.div
                key={achievement.title}
                className="glass rounded-lg p-6 text-center relative overflow-hidden group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, borderColor: "#00FF41" }}
              >
                {/* Shimmer effect for diamond badge */}
                {achievement.icon === "diamond" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}

                {/* Knight animation */}
                {achievement.icon === "knight" && (
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="w-16 h-16 mx-auto mb-4 text-terminal" />
                  </motion.div>
                )}

                {achievement.icon !== "knight" && (
                  <Icon className="w-16 h-16 mx-auto mb-4 text-terminal" />
                )}

                <h3 className="text-xl font-mono font-bold text-white mb-2">
                  {achievement.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {achievement.description}
                </p>

                {achievement.stat && (
                  <Counter
                    value={achievement.stat}
                    suffix={achievement.stat.includes("+") ? "" : "+"}
                    isInView={isInView}
                  />
                )}
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
    <div className="text-4xl font-mono font-bold text-terminal">
      {count}{suffix}
    </div>
  );
}

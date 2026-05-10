"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Trophy, FileText } from "lucide-react";
import { useDisplayMode } from "../contexts/DisplayModeContext";

interface Metric {
  icon: any;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

export default function MetricsBar() {
  const { isRecruiterMode } = useDisplayMode();

  const metrics: Metric[] = useMemo(() => [
    { icon: TrendingUp, label: "Uptime", value: 3.0, suffix: " Years", color: "text-terminal" },
    { icon: Trophy, label: "Hackathons Won", value: 2, suffix: "+", color: "text-neural" },
    { icon: Users, label: "Students Mentored", value: 150, suffix: "+", color: "text-terminal" },
    { icon: FileText, label: "AI Platforms Built", value: 4, suffix: "", color: "text-amber" },
  ], []);

  const [counters, setCounters] = useState<number[]>(metrics.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    // Delay ensures DOM paint before animation
    const timeout = setTimeout(() => {
      const duration = 1500;
      const start = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);

        setCounters(
          metrics.map((m) => {
            const val = m.value * progress;
            return m.value % 1 !== 0
              ? Math.round(val * 10) / 10
              : Math.floor(val);
          })
        );

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      setHasAnimated(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, [hasAnimated, metrics]);

  return (
    <motion.div
      className={`${isRecruiterMode
        ? "bg-obsidian/95 border-2 border-terminal/40 shadow-xl"
        : "glass border border-terminal/20"
      } rounded-lg p-5 mt-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-terminal/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-terminal rounded-full animate-pulse" />
          <span className="text-xs font-mono text-terminal uppercase tracking-wider font-semibold">
            Live Status
          </span>
        </div>
        <span className="text-xs font-mono text-gray-500">
          Last ACK: {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <div className={`grid ${isRecruiterMode ? "grid-cols-4" : "grid-cols-2 md:grid-cols-4"} gap-6`}>
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              className={`flex ${isRecruiterMode ? "flex-col items-center text-center" : "items-start gap-3"}`}
              whileHover={!isRecruiterMode ? { scale: 1.05 } : {}}
            >
              <Icon className={`w-6 h-6 ${metric.color}`} />
              <div>
                <div className={`text-3xl font-bold ${metric.color} font-mono tabular-nums`}>
                  {counters[index]}{metric.suffix}
                </div>
                <div className="text-xs text-gray-400 font-mono uppercase tracking-wide mt-1">
                  {metric.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

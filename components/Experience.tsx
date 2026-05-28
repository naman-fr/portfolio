"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import { Briefcase, Calendar, ChevronRight, Layers, ArrowUpRight } from "lucide-react";
import ScrollRevealHeading from "./ScrollRevealHeading";

function TimelineItem({ exp, index }: { exp: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  // Determine a color gradient based on the visualTheme to avoid single-color look
  const themeColors: Record<string, { accent: string; gradient: string; text: string; bg: string }> = {
    backend: { accent: "#e76f51", gradient: "from-[#e76f51] to-[#c38e70]", text: "text-[#e76f51]", bg: "rgba(231,111,81,0.02)" },
    robotics: { accent: "#c38e70", gradient: "from-[#c38e70] to-[#e5d3c0]", text: "text-[#c38e70]", bg: "rgba(195,142,112,0.02)" },
    radar: { accent: "#d94e34", gradient: "from-[#d94e34] to-[#c38e70]", text: "text-[#d94e34]", bg: "rgba(217,78,52,0.02)" },
    circuit: { accent: "#5a8c76", gradient: "from-[#5a8c76] to-[#e5d3c0]", text: "text-[#5a8c76]", bg: "rgba(90,140,118,0.02)" },
    network: { accent: "#e76f51", gradient: "from-[#e76f51] to-[#5a8c76]", text: "text-[#e76f51]", bg: "rgba(231,111,81,0.02)" },
  };

  const theme = themeColors[exp.visualTheme] || themeColors.backend;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 w-full min-h-[220px] select-none ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node Marker in Center Line */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-10 md:top-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
        {/* Pulsating Ring */}
        <motion.div
          animate={isInView ? { scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-8 h-8 rounded-full border opacity-30"
          style={{ borderColor: theme.accent }}
        />
        {/* Core Dot */}
        <motion.div
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
          className="w-4 h-4 rounded-full border-2 bg-[#0e0d0b]"
          style={{ borderColor: theme.accent }}
        />
      </div>

      {/* Experience Detail Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.15 }}
        className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}
      >
        <motion.div
          animate={isHovered ? { scale: 1.025, y: -2 } : { scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className={`group relative p-8 rounded-[2.2rem] glass-premium border border-white/5 transition-all duration-500 overflow-hidden bg-[#0c0b0a]/90 hover:border-primary/20`}
        >
          {/* Card Hover Spotlight glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(280px circle at 50% 50%, ${theme.accent}0d, transparent 80%)`,
            }}
          />

          <div className={`space-y-4 flex flex-col ${isEven ? "md:items-end" : "md:items-start"}`}>
            <div className="flex items-center gap-1.5 text-primary font-mono text-[9px] tracking-widest font-bold bg-primary/5 border border-primary/10 px-3 py-1 rounded-full w-fit">
              <Calendar className="w-3.5 h-3.5" />
              <span>{exp.timeline}</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-display font-extrabold text-white tracking-tight uppercase leading-tight group-hover:text-primary transition-colors flex items-center gap-2">
                {exp.company}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity" />
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-[#dfc7b3]/70 justify-start">
                <Briefcase className="w-3.5 h-3.5 text-primary/70" style={{ color: theme.accent }} />
                <span className="uppercase tracking-widest">{exp.role}</span>
              </div>
            </div>

            {/* Achievements Bullet outcomes */}
            <ul className={`space-y-2.5 w-full ${isEven ? "md:text-right" : "md:text-left"}`}>
              {exp.achievements.map((achievement: string, i: number) => (
                <li key={i} className={`flex items-start gap-2.5 ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" style={{ color: theme.accent }} />
                  <p className="text-gray-300 leading-relaxed text-xs font-light">
                    {achievement}
                  </p>
                </li>
              ))}
            </ul>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 w-full">
              {exp.tech.map((tech: string) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-white/[0.02] text-[#dfc7b3]/60 text-[9px] font-mono rounded tracking-tighter uppercase border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Date Marker Floating on opposite side (Desktop Only) */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        className={`hidden md:block w-[45%] text-[#dfc7b3]/50 font-mono text-[10px] uppercase tracking-widest ${
          isEven ? "pl-16 text-left" : "pr-16 text-right"
        }`}
      >
        <span>SECURE_SESSION_LOG: [EXP_0{index + 1}]</span>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px", once: false });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-32 px-4 relative bg-transparent z-10"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollRevealHeading label="[ 03:_CAREER_LOGS ]" title="HISTORY" />

        {/* Scroll Timeline Container */}
        <div className="relative w-full space-y-16 md:space-y-24 mt-16 overflow-visible">
          {/* Vertical Timeline Track Line */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[1px] pointer-events-none bg-gradient-to-b from-[#e76f51] via-[#c38e70]/30 to-transparent" />

          {resumeData.experience.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import { Briefcase, Calendar, ChevronRight, RefreshCw, Layers } from "lucide-react";
import ScrollRevealHeading from "./ScrollRevealHeading";

function ExperienceCard({ exp, index }: { exp: any; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Determine a color gradient based on the visualTheme to avoid single-color look
  const themeColors: Record<string, string> = {
    backend: "from-[#e76f51] to-[#c38e70]", // Coral to Copper
    robotics: "from-[#c38e70] to-[#e5d3c0]", // Copper to Beige
    radar: "from-[#d94e34] to-[#c38e70]", // Terracotta to Copper
    circuit: "from-[#5a8c76] to-[#e5d3c0]", // Sage to Beige
    network: "from-[#e76f51] to-[#5a8c76]", // Coral to Sage
  };

  const currentGradient = themeColors[exp.visualTheme] || "from-primary to-accent";

  return (
    <div
      className="h-[320px] w-full cursor-pointer relative"
      style={{ perspective: 1500 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full relative"
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full p-8 rounded-[2.2rem] glass-premium border border-white/5 flex flex-col justify-between overflow-hidden bg-[#0c0b0a]/80"
          style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
        >
          {/* Subtle colored spotlight in the corner */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${currentGradient} opacity-[0.04] blur-xl pointer-events-none`} />

          <div className="space-y-4" style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
            <div className="flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-center gap-1.5 text-primary font-mono text-[9px] tracking-widest font-bold bg-primary/5 border border-primary/10 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                <span>{exp.timeline}</span>
              </div>
              <RefreshCw className="w-3.5 h-3.5 text-white/20 animate-spin-slow" />
            </div>

            <h3 className="text-2xl font-display font-extrabold text-white tracking-tight uppercase leading-tight mt-2" style={{ transform: "translateZ(30px)" }}>
              {exp.company}
            </h3>

            <div className="flex items-center gap-2 text-xs font-mono text-[#dfc7b3]/70" style={{ transform: "translateZ(25px)" }}>
              <Briefcase className="w-3.5 h-3.5 text-primary/70" style={{ color: exp.visualTheme === 'backend' ? '#e76f51' : undefined }} />
              <span className="uppercase tracking-widest">{exp.role}</span>
            </div>
          </div>

          <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
            {/* Tech Badges Footer - color matched to experience type */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5" style={{ transform: "translateZ(10px)" }}>
              {exp.tech.map((tech: string) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-white/[0.02] text-[#dfc7b3]/60 text-[9px] font-mono rounded tracking-tighter uppercase border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Tap/Hover instruction */}
            <span className="text-[8px] font-mono text-white/20 tracking-wider block mt-4 uppercase animate-pulse" style={{ transform: "translateZ(15px)" }}>
              Hover / tap to inspect outcomes ➜
            </span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full p-8 rounded-[2.2rem] glass-premium border border-primary/20 overflow-hidden bg-[#0c0b0a]/90 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Infinite marquee overlay in the background */}
          <div className="absolute top-1/2 left-0 w-full overflow-hidden opacity-[0.02] select-none pointer-events-none">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
              className="flex whitespace-nowrap gap-8 text-[40px] font-display font-extrabold tracking-widest uppercase text-primary"
            >
              <span>OUTCOMES_DELIVERED // SECURE_LEVEL_CHECK_OK // </span>
              <span>OUTCOMES_DELIVERED // SECURE_LEVEL_CHECK_OK // </span>
            </motion.div>
          </div>

          <div className="z-10 flex-1 flex flex-col justify-center" style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>
            <div className="flex items-center gap-2 mb-4" style={{ transform: "translateZ(15px)" }}>
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span className="text-[9px] font-mono text-primary tracking-widest uppercase block">
                Achievements log
              </span>
            </div>
            
            <ul className="space-y-3 overflow-y-auto max-h-[170px] pr-2 scrollbar-thin" style={{ transform: "translateZ(25px)" }}>
              {exp.achievements.map((achievement: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
                  <p className="text-gray-300 leading-relaxed text-xs font-light">
                    {achievement}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between z-10" style={{ transform: "translateZ(30px)" }}>
            <span className="font-mono text-[7px] text-white/20 select-none">
              SYS_TELEMETRY: [EXP_0{index + 1}]
            </span>
            <span className="text-[8px] font-mono text-primary uppercase tracking-widest animate-pulse">
              Return ➜
            </span>
          </div>
        </div>
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

        {/* Dynamic Card Flip Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumeData.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <ExperienceCard exp={exp} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

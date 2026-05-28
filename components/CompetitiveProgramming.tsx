"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import { Code, Terminal, Cpu, Globe, Trophy, Zap, Cloud, ExternalLink } from "lucide-react";

const iconMap: Record<string, any> = {
  hackerrank: Terminal,
  gfg: Cpu,
  atcoder: Globe,
  codeforces: Trophy,
  leetcode: Zap,
  google: Cloud,
};

function ProfileCard({ profile, index, isInView }: { profile: any; index: number; isInView: boolean }) {
  const Icon = iconMap[profile.icon] || Code;
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.a
      href={profile.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-[260px] w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node Structure - Hex/Modular Cyber Badge Card */}
      <div className="glass-premium rounded-[2.2rem] p-8 h-full border border-white/5 flex flex-row items-center justify-between gap-6 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(242,123,80,0.06)] transition-all duration-500 overflow-hidden relative">
        
        {/* Animated Background Mesh Grid on Hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[size:10px_10px] bg-[linear-gradient(to_right,rgba(242,123,80,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(242,123,80,0.015)_1px,transparent_1px)]`} />

        {/* Diagonal Light Sweep Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 bg-[linear-gradient(135deg,transparent_45%,rgba(255,255,255,0.02)_50%,transparent_55%)] bg-[length:250%_250%] group-hover:bg-[position:100%_100%] bg-[position:0%_0%] pointer-events-none" />

        {/* Left Side: Description Content */}
        <div className="space-y-4 flex-1 z-10">
          <span className="text-[9px] font-mono text-primary tracking-widest uppercase block">
            {profile.title}
          </span>
          <h3 className="text-2xl font-display font-bold text-white tracking-tight uppercase group-hover:text-primary transition-colors">
            {profile.platform}
          </h3>
          <div className="pt-2">
            <span className="text-3xl font-display font-extrabold text-white tracking-tighter block group-hover:scale-105 origin-left transition-transform duration-300">
              {profile.rating}
            </span>
          </div>
        </div>

        {/* Right Side: Circular Gauge Visualizer */}
        <div className="relative w-28 h-28 flex items-center justify-center z-10 flex-shrink-0">
          {/* Animated SVG Border Meter */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            {/* Background tracking circle */}
            <circle
              cx="56"
              cy="56"
              r="46"
              className="stroke-white/5 fill-none"
              strokeWidth="4"
            />
            {/* Animated foreground circle progress */}
            <motion.circle
              cx="56"
              cy="56"
              r="46"
              className="stroke-primary fill-none"
              strokeWidth="4"
              strokeDasharray="290"
              initial={{ strokeDashoffset: 290 }}
              animate={isInView ? { strokeDashoffset: 80 + (index * 20) } : { strokeDashoffset: 290 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              style={{ strokeLinecap: "round" }}
            />
          </svg>

          {/* Central Platform Icon Container */}
          <div className="w-18 h-18 rounded-full border border-white/5 bg-[#0e0d0b] flex items-center justify-center group-hover:border-primary/20 group-hover:shadow-[0_0_15px_rgba(242,123,80,0.1)] transition-all duration-500">
            <Icon className="w-7 h-7 text-[#dfc7b3] group-hover:text-primary transition-colors duration-500" />
          </div>
        </div>

        {/* Corner Link Identifier */}
        <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
          <ExternalLink className="w-3.5 h-3.5 text-white" />
        </div>

        {/* Bottom Identifier */}
        <div className="absolute bottom-4 left-8 font-mono text-[8px] text-white/10 select-none">
          SYS_LOG_CP_0{index + 1}
        </div>
      </div>
    </motion.a>
  );
}

export default function CompetitiveProgramming() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px", once: false });

  if (!resumeData.competitiveProgramming) return null;

  return (
    <section
      id="competitive"
      ref={sectionRef}
      className="py-32 px-4 bg-transparent relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 space-y-4 text-center md:text-left">
          <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 06:_COMPETITIVE_PROFILES ]</span>
          <h2 className="text-large font-bold text-white tracking-tighter uppercase">CODING</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumeData.competitiveProgramming.map((profile, index) => (
            <ProfileCard
              key={profile.platform}
              profile={profile}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

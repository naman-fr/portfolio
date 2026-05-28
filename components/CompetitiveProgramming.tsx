"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import { Code, Terminal, Cpu, Globe, Trophy, Zap, Cloud, ExternalLink } from "lucide-react";
import ScrollRevealHeading from "./ScrollRevealHeading";

const iconMap: Record<string, any> = {
  hackerrank: Terminal,
  gfg: Cpu,
  atcoder: Globe,
  codeforces: Trophy,
  leetcode: Zap,
  google: Cloud,
};

const platformThemes: Record<string, { accent: string; glow: string; bg: string; badge: string; desc: string }> = {
  leetcode: { 
    accent: "#e76f51", // Coral
    glow: "rgba(231,111,81,0.08)",
    bg: "rgba(231,111,81,0.02)",
    badge: "bg-[#e76f51]/10 text-[#e76f51] border-[#e76f51]/20",
    desc: "Knight rating tier. Top 5% globally in weekly contest challenges."
  },
  codeforces: { 
    accent: "#d94e34", // Terracotta
    glow: "rgba(217,78,52,0.08)",
    bg: "rgba(217,78,52,0.02)",
    badge: "bg-[#d94e34]/10 text-[#d94e34] border-[#d94e34]/20",
    desc: "Max Specialist rank. Solved complex combinatorics and advanced dynamic programming."
  },
  gfg: { 
    accent: "#5a8c76", // Emerald/Sage
    glow: "rgba(90,140,118,0.08)",
    bg: "rgba(90,140,118,0.02)",
    badge: "bg-[#5a8c76]/10 text-[#5a8c76] border-[#5a8c76]/20",
    desc: "1000+ coding score. Extensive catalog of solved data structures and algorithmic puzzles."
  },
  hackerrank: { 
    accent: "#c38e70", // Copper
    glow: "rgba(195,142,112,0.08)",
    bg: "rgba(195,142,112,0.02)",
    badge: "bg-[#c38e70]/10 text-[#c38e70] border-[#c38e70]/20",
    desc: "5 Star Gold Badge in Problem Solving. Advanced skills verified in core structures."
  },
  atcoder: { 
    accent: "#e5d3c0", // Beige
    glow: "rgba(229,211,192,0.08)",
    bg: "rgba(229,211,192,0.02)",
    badge: "bg-[#e5d3c0]/10 text-[#e5d3c0] border-[#e5d3c0]/20",
    desc: "4 kyu advanced level rating. Participated in regular competitive programming sprints."
  },
  google: { 
    accent: "#e76f51", // Coral
    glow: "rgba(231,111,81,0.08)",
    bg: "rgba(231,111,81,0.02)",
    badge: "bg-[#e76f51]/10 text-[#e76f51] border-[#e76f51]/20",
    desc: "Diamond League verified profile with 49,665 points in Cloud Skills Challenges."
  },
};

function ProfileCard({ profile, index, isInView }: { profile: any; index: number; isInView: boolean }) {
  const Icon = iconMap[profile.icon] || Code;
  const [isHovered, setIsHovered] = useState(false);
  const theme = platformThemes[profile.icon] || platformThemes.leetcode;

  return (
    <motion.a
      href={profile.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? { height: 290, y: -4 } : { height: 210, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="glass-premium rounded-[2.2rem] p-8 border border-white/5 flex flex-col justify-between hover:border-primary/20 transition-all duration-500 overflow-hidden relative"
      >
        {/* Animated Background Mesh Grid on Hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme.accent}0a 1px, transparent 1px), linear-gradient(to bottom, ${theme.accent}0a 1px, transparent 1px)`,
            backgroundSize: "12px 12px"
          }}
        />

        {/* Diagonal Light Sweep Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 bg-[linear-gradient(135deg,transparent_45%,rgba(255,255,255,0.02)_50%,transparent_55%)] bg-[length:250%_250%] group-hover:bg-[position:100%_100%] bg-[position:0%_0%] pointer-events-none" />

        {/* Hover Radial Spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(220px circle at 50% 50%, ${theme.glow}, transparent 85%)`
          }}
        />

        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4 w-full z-10">
          <div className="space-y-1">
            <span className="text-[9px] font-mono tracking-widest uppercase block opacity-40">
              {profile.title}
            </span>
            <h3 className="text-xl font-display font-extrabold text-white tracking-tight uppercase group-hover:text-primary transition-colors">
              {profile.platform}
            </h3>
          </div>

          <div 
            className="w-12 h-12 rounded-2xl border border-white/5 bg-[#0e0d0b] flex items-center justify-center transition-all duration-500"
            style={{ 
              borderColor: isHovered ? theme.accent + "40" : undefined,
              boxShadow: isHovered ? `0 0 15px ${theme.accent}15` : undefined 
            }}
          >
            <Icon 
              className="w-6 h-6 text-[#dfc7b3] transition-colors" 
              style={{ color: isHovered ? theme.accent : undefined }} 
            />
          </div>
        </div>

        {/* Rating Row (Fixed) */}
        <div className="z-10 mt-2">
          <span className="text-3xl font-display font-extrabold text-white tracking-tighter block">
            {profile.rating}
          </span>
        </div>

        {/* Expandable Drawer Content */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={isHovered ? { opacity: 1, height: "auto", marginTop: 16 } : { opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="z-10 w-full space-y-4 overflow-hidden"
        >
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            {theme.desc}
          </p>
          
          {/* Custom Horizontal Progress Bar with Glowing Accent */}
          <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={isHovered ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full"
              style={{
                background: `linear-gradient(to right, ${theme.accent}40, ${theme.accent})`,
                boxShadow: `0 0 8px ${theme.accent}`,
              }}
            />
          </div>
        </motion.div>

        {/* Corner Link Identifier */}
        <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10">
          <ExternalLink className="w-3.5 h-3.5 text-white" />
        </div>

        {/* Bottom Identifier */}
        <div className="absolute bottom-4 left-8 font-mono text-[8px] text-white/10 select-none z-10">
          SYS_LOG_CP_0{index + 1}
        </div>
      </motion.div>
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
        <ScrollRevealHeading label="[ 06:_COMPETITIVE_PROFILES ]" title="CODING" />

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

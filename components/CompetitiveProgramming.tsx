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
      className="group relative block w-full cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? { height: 320, y: -4 } : { height: 230, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="bg-[#c2c2c2] rounded-2xl p-4 border-[4px] border-[#1a1a1a] flex flex-col justify-between hover:shadow-[12px_12px_0_0_#e02424] transition-all duration-500 overflow-hidden relative shadow-[8px_8px_0_0_#1a1a1a]"
      >
        {/* Game Boy Top Logo */}
        <div className="flex justify-between items-center pb-2 mb-2 border-b-[3px] border-[#1a1a1a] shrink-0 font-mono text-[9px] font-black text-[#1a1a1a]">
          <span>🎮 DOT_MATRIX_SCREEN</span>
          <span>BATTERY 🔴</span>
        </div>

        {/* Retro Game Boy Green Screen */}
        <div className="flex-1 bg-[#8bac0f] border-[3px] border-[#1a1a1a] p-4 rounded-lg flex flex-col justify-between relative overflow-hidden font-mono text-[#0f380f] shadow-inner select-none">
          {/* Glitch Overlay Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,56,15,0.05)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none" />

          {/* Top Header Row */}
          <div className="flex items-center justify-between gap-4 w-full z-10">
            <div className="space-y-1">
              <span className="text-[9px] font-black tracking-widest uppercase opacity-80 block">
                {profile.title}
              </span>
              <h3 className="text-lg font-black tracking-tight uppercase leading-none">
                {profile.platform}
              </h3>
            </div>

            <div 
              className="w-10 h-10 rounded-lg border-2 border-[#0f380f] bg-[#9bbc0f] flex items-center justify-center transition-colors"
            >
              <Icon className="w-5 h-5 text-[#0f380f]" />
            </div>
          </div>

          {/* Rating Row (Fixed) */}
          <div className="z-10 mt-2 flex justify-between items-baseline">
            <span className="text-2xl font-black tracking-tighter">
              {profile.rating}
            </span>
            <span className="text-[9px] font-black border-2 border-[#0f380f] px-1 rounded">RATING</span>
          </div>

          {/* Expandable Drawer Content */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={isHovered ? { opacity: 1, height: "auto", marginTop: 12 } : { opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="z-10 w-full space-y-3 overflow-hidden text-[#0f380f]"
          >
            <p className="text-[10px] font-bold leading-relaxed border-t border-[#0f380f]/20 pt-2">
              {theme.desc}
            </p>
            
            {/* Custom Horizontal Progress Bar with Retro Accent */}
            <div className="h-2 bg-[#9bbc0f] rounded overflow-hidden relative border-2 border-[#0f380f]">
              <motion.div
                initial={{ width: 0 }}
                animate={isHovered ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-[#0f380f]"
              />
            </div>
          </motion.div>
        </div>

        {/* Game Boy Buttons Area (Desktop/Hover Only) */}
        <div className="flex justify-between items-center mt-3 z-10 shrink-0 font-mono text-[8px] font-black text-[#1a1a1a] select-none">
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-[#1a1a1a]" />
            <div className="w-4 h-4 rounded-full bg-[#1a1a1a]" />
          </div>
          <div className="flex gap-3">
            <span className="border border-[#1a1a1a] px-1.5 py-0.5 rounded rotate-12">SELECT</span>
            <span className="border border-[#1a1a1a] px-1.5 py-0.5 rounded rotate-12">START</span>
          </div>
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

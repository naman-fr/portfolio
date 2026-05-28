"use client";

import { useRef } from "react";
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {resumeData.competitiveProgramming.map((profile, index) => {
            const Icon = iconMap[profile.icon] || Code;
            
            return (
              <motion.a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={profile.platform}
                className="group relative h-full block"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "backOut" }}
              >
                {/* Node Structure */}
                <div className="glass-premium rounded-[2.2rem] p-10 h-full border border-white/5 flex flex-col items-center text-center group-hover:border-primary/20 hover:shadow-[0_0_20px_rgba(242,123,80,0.04)] transition-all duration-500 overflow-hidden cursor-pointer relative">
                  
                  {/* External Link Icon */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </div>

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
                      {profile.platform}
                    </h3>
                    <p className="text-gray-400 text-sm font-sans leading-relaxed max-w-[280px] font-light">
                      {profile.title}
                    </p>
                  </div>

                  <div className="mt-8 w-full">
                    <div className="text-3xl font-display font-bold text-white tracking-tighter">
                      <span className="text-primary">{profile.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Index Decoration */}
                <div className="absolute top-4 left-6 font-mono text-[9px] text-white/10 select-none">
                  CP_LOG_{index}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

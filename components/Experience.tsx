"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import { MapPin, Briefcase, Calendar, ChevronRight } from "lucide-react";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px", once: false });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-32 px-4 relative bg-transparent z-10"
    >
      {/* Subtle background warm radial highlight */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-[radial-gradient(circle_at_center,_rgba(242,123,80,0.03),_transparent_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <header className="mb-24 space-y-4">
          <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 03:_CAREER_LOGS ]</span>
          <h2 className="text-large font-bold text-white tracking-tighter uppercase">HISTORY</h2>
        </header>

        <div className="relative space-y-20">
          {/* Asymmetric timeline guide line */}
          <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#dfc7b3]/20 via-[#dfc7b3]/5 to-transparent" />

          {resumeData.experience.map((exp, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col lg:flex-row ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-10 items-stretch justify-between`}
              >
                {/* Timeline connector dot */}
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-8 w-3 h-3 rounded-full bg-[#0e0d0b] border-2 border-primary shadow-[0_0_8px_var(--color-primary)] z-20 group-hover:scale-125 transition-transform duration-300" />

                {/* Left Pane: Meta description block */}
                <div className="pl-14 lg:pl-0 lg:w-[45%] flex flex-col justify-center space-y-3">
                  <div className={`flex items-center gap-3 flex-wrap ${
                    isEven ? "lg:justify-end" : "lg:justify-start"
                  }`}>
                    <div className="flex items-center gap-1.5 text-primary font-mono text-xs tracking-widest font-bold bg-primary/5 border border-primary/10 px-3 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{exp.timeline}</span>
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl lg:text-3xl font-display font-extrabold text-white tracking-tight uppercase ${
                    isEven ? "lg:text-right" : "lg:text-left"
                  }`}>
                    {exp.company}
                  </h3>
                  
                  <div className={`flex items-center gap-2 text-xs font-mono text-[#dfc7b3]/75 ${
                    isEven ? "lg:justify-end" : "lg:justify-start"
                  }`}>
                    <Briefcase className="w-3.5 h-3.5 text-primary/70" />
                    <span className="uppercase tracking-widest">{exp.role}</span>
                  </div>
                </div>

                {/* Spacer (desktop timeline alignment) */}
                <div className="w-10 hidden lg:block" />

                {/* Right Pane: Magazine Content Bento Card */}
                <div className="pl-14 lg:pl-0 lg:w-[45%] flex">
                  <div className="w-full bg-white/[0.015] border border-white/5 rounded-[2.2rem] p-8 hover:border-primary/25 hover:bg-white/[0.025] hover:shadow-[0_0_20px_rgba(242,123,80,0.03)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden">
                    
                    {/* Corner Telemetry details */}
                    <div className="absolute top-4 right-6 font-mono text-[7px] text-white/20 select-none">
                      SYS_TELEMETRY: [EXP_0{index + 1}]
                    </div>

                    {/* Staggered Achievements List */}
                    <ul className="space-y-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 group/item">
                          <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary/40 group-hover/item:text-primary transition-colors flex-shrink-0" />
                          <p className="text-gray-400 group-hover/item:text-white transition-colors leading-relaxed text-sm font-light">
                            {achievement}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {/* Technology tags footer */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-1.5">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-white/[0.03] text-[#dfc7b3]/60 text-[9px] font-mono rounded tracking-tighter uppercase border border-white/5 hover:border-primary/30 hover:text-primary transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

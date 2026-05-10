"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";

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
        <header className="mb-24 space-y-4">
          <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 03:_CAREER_LOGS ]</span>
          <h2 className="text-huge font-bold leading-none tracking-tighter uppercase text-white">HISTORY</h2>
        </header>

        <div className="relative space-y-24">
          {resumeData.experience.map((exp, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Connector Node */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block" />
                
                <div className={`lg:w-1/2 ${isEven ? 'lg:text-right' : 'lg:text-left'} space-y-4`}>
                  <div className={`flex items-center gap-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                    <span className="text-primary font-mono text-sm tracking-[0.3em] font-bold">
                      {exp.timeline}
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold text-white tracking-tighter uppercase leading-none">
                    {exp.company}
                  </h3>
                  <p className="text-primary/80 font-mono text-sm uppercase tracking-widest bg-primary/10 px-4 py-1 rounded-full inline-block border border-primary/20">
                    {exp.role}
                  </p>
                </div>

                <div className="lg:w-1/2 w-full">
                  <div className="glass-premium p-10 rounded-3xl border border-white/10 hover:border-primary/40 transition-all duration-500 group-hover:translate-y-[-8px] relative overflow-hidden">
                    {/* Industrial Texture */}
                    <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10 select-none">
                      UNIT_ID: EXP_{index + 100}
                    </div>
                    
                    <ul className="space-y-6">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-4 group/item">
                          <div className="mt-2 w-1.5 h-1.5 rotate-45 border border-primary/50 bg-primary/10 group-hover/item:bg-primary transition-colors duration-300" />
                          <p className="text-gray-400 group-hover/item:text-white transition-colors leading-relaxed text-sm">
                            {achievement}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 text-white/40 text-[9px] font-mono rounded-md tracking-tighter uppercase border border-white/10 hover:border-primary/30 hover:text-primary transition-all cursor-default"
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

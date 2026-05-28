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
      {/* Subtle top section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-64 bg-[radial-gradient(circle_at_center,_rgba(242,123,80,0.03),_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <header className="mb-24 space-y-4">
          <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 03:_CAREER_LOGS ]</span>
          <h2 className="text-large font-bold text-white tracking-tighter uppercase">HISTORY</h2>
        </header>

        <div className="relative space-y-24">
          {/* Central timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#dfc7b3]/20 via-[#dfc7b3]/5 to-transparent hidden lg:block" />

          {resumeData.experience.map((exp, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Timeline timeline connector dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-10 w-2 h-2 rounded-full bg-primary border-4 border-[#0e0d0b] shadow-[0_0_8px_var(--color-primary)] z-10 hidden lg:block" />

                <div className={`lg:w-1/2 ${isEven ? 'lg:text-right' : 'lg:text-left'} space-y-3`}>
                  <div className={`flex items-center gap-3 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                    <span className="text-primary font-mono text-sm tracking-[0.25em] font-bold">
                      {exp.timeline}
                    </span>
                    <div className="flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse opacity-70" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold text-white tracking-tight uppercase">
                    {exp.company}
                  </h3>
                  
                  <p className="text-primary/90 font-mono text-[10px] uppercase tracking-widest bg-primary/5 px-4 py-1.5 rounded-full inline-block border border-primary/10">
                    {exp.role}
                  </p>
                </div>

                <div className="lg:w-1/2 w-full">
                  <div className="glass-premium p-10 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all duration-500 group-hover:translate-y-[-6px] relative overflow-hidden">
                    
                    {/* Identification detail */}
                    <div className="absolute top-4 right-6 font-mono text-[8px] text-white/10 select-none">
                      EXP_UID_{index + 100}
                    </div>
                    
                    <ul className="space-y-5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-4 group/item">
                          <div className="mt-2 w-1.5 h-1.5 rotate-45 border border-primary/30 bg-primary/5 group-hover/item:bg-primary transition-colors duration-300 flex-shrink-0" />
                          <p className="text-gray-400 group-hover/item:text-white transition-colors leading-relaxed text-sm font-light">
                            {achievement}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/[0.02] text-[#dfc7b3]/60 text-[9px] font-mono rounded-md tracking-tighter uppercase border border-white/5 hover:border-primary/30 hover:text-primary transition-all cursor-default"
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

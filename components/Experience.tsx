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
      className="min-h-screen py-32 px-4 relative bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 space-y-4">
          <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 03:_CAREER_LOGS ]</span>
          <h2 className="text-huge font-bold leading-none tracking-tighter uppercase">HISTORY</h2>
        </header>

        <div className="relative space-y-32">
          {resumeData.experience.map((exp, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group relative"
              >
                {/* Horizontal Connector Line (Desktop) */}
                <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-white/5 group-hover:bg-primary/20 transition-colors" />

                <div className="flex flex-col lg:flex-row gap-12 lg:items-start relative z-10">
                  {/* Timeline Metadata */}
                  <div className="lg:w-1/3 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-[1px] bg-primary/50" />
                      <span className="text-primary font-mono text-xs tracking-widest uppercase">
                        {exp.timeline}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                      {exp.company.toUpperCase()}
                    </h3>
                    <p className="text-primary/60 font-mono text-xs uppercase tracking-widest">
                      {exp.role}
                    </p>
                  </div>

                  {/* Achievements & Tech */}
                  <div className="lg:w-2/3 glass-premium p-8 lg:p-12 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors">
                    <div className="space-y-8">
                      <ul className="space-y-6">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-6 group/item">
                            <span className="text-primary/40 font-mono text-xs mt-1">[{i.toString().padStart(2, '0')}]</span>
                            <p className="text-gray-400 group-hover/item:text-white transition-colors leading-relaxed">
                              {achievement}
                            </p>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-8 border-t border-white/5 flex flex-wrap gap-3">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/5 text-white/50 text-[10px] font-mono rounded tracking-widest uppercase border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Index Indicator */}
                <div className="hidden lg:block absolute -left-16 top-0 text-huge font-bold text-white/[0.02] pointer-events-none">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

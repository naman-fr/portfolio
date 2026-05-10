"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const categories = ["ALL", "SYSTEMS", "AI/ML", "AGENTIC", "EMBEDDED", "WEBDEV"];

export default function ProjectGridV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("ALL");

  const filteredProjects = resumeData.projects.filter(project => {
    if (filter === "ALL") return true;
    return project.category?.toUpperCase() === filter || project.type?.toUpperCase() === filter;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-header", {
        scrollTrigger: {
          trigger: ".project-header",
          start: "top bottom-=100",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="projects" className="py-32 px-4 bg-transparent min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto">
        <header className="project-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 02:_PROJECT_LOGS ]</span>
            <h2 className="text-huge font-bold leading-none tracking-tighter uppercase text-white">SYSTEMS</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 font-mono text-[10px] tracking-widest border transition-all duration-300 ${
                  filter === cat 
                  ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(0,255,136,0.3)]" 
                  : "bg-white/5 text-white/40 border-white/10 hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isAI = project.category?.includes("AI") || project.type?.includes("AI");
              const accentColor = isAI ? "border-primary/40" : "border-secondary/40";
              const glowColor = isAI ? "group-hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]" : "group-hover:shadow-[0_0_30px_rgba(0,200,255,0.15)]";
              
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`group relative glass-premium rounded-2xl overflow-hidden border border-white/10 ${accentColor} transition-all duration-500 ${glowColor} flex flex-col h-full`}
                >
                  {/* Blueprint Grid Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  {/* Corner Coordinates */}
                  <div className="absolute top-4 left-4 font-mono text-[8px] text-white/20 tracking-tighter">
                    [ X:{(index * 42).toString().padStart(3, '0')} Y:{(index * 13).toString().padStart(3, '0')} ]
                  </div>
                  <div className="absolute top-4 right-4 font-mono text-[8px] text-white/20">
                    SCT_V{index + 10}
                  </div>

                  <div className="p-10 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-10 h-1 h-0.5 rounded-full ${isAI ? 'bg-primary' : 'bg-secondary'} opacity-50`} />
                      <span className={`text-[10px] font-mono tracking-widest uppercase ${isAI ? 'text-primary' : 'text-secondary'}`}>
                        {project.type || "CORE"}
                      </span>
                    </div>

                    <div className="space-y-4 mb-8">
                      <h3 className="text-2xl font-bold text-white tracking-tight leading-none group-hover:text-primary transition-colors">
                        {project.title.toUpperCase()}
                      </h3>
                      <p className="text-gray-400 text-sm font-sans leading-relaxed line-clamp-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map(t => (
                          <span key={t} className="text-[9px] font-mono bg-white/5 text-white/50 border border-white/5 px-2 py-0.5 rounded uppercase tracking-tighter">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono text-primary hover:text-white transition-colors flex items-center gap-3 group/link"
                        >
                          <div className="relative">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <div className="absolute inset-0 w-2 h-2 bg-primary rounded-full animate-ping opacity-50" />
                          </div>
                          <span className="tracking-widest">ACCESS_CODE</span>
                        </a>
                        <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest">
                          {project.domain || "NAMAN_FR"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent Decoration */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                    <div className={`absolute bottom-0 right-0 w-[1px] h-4 ${isAI ? 'bg-primary' : 'bg-secondary'} opacity-30`} />
                    <div className={`absolute bottom-0 right-0 h-[1px] w-4 ${isAI ? 'bg-primary' : 'bg-secondary'} opacity-30`} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

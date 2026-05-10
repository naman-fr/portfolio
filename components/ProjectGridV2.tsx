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
    <section ref={containerRef} id="projects" className="py-32 px-4 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="project-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 02:_PROJECT_LOGS ]</span>
            <h2 className="text-huge font-bold leading-none tracking-tighter uppercase">SYSTEMS</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 font-mono text-[10px] tracking-widest border transition-all duration-300 ${
                  filter === cat 
                  ? "bg-primary text-black border-primary" 
                  : "bg-transparent text-white/40 border-white/10 hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative glass-premium rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-primary/60 tracking-[0.2em] uppercase">
                      ID: {index.toString().padStart(3, '0')}
                    </span>
                    <span className="text-[10px] font-mono text-white/30 tracking-[0.2em]">
                      {project.type || "CORE"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                      {project.title.toUpperCase()}
                    </h3>
                    <p className="text-gray-400 text-sm font-sans line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map(t => (
                      <span key={t} className="text-[9px] font-mono bg-white/5 text-white/60 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-primary hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      VIEW_SOURCE_CODE
                    </a>
                    <span className="text-[10px] font-mono text-white/20 uppercase">
                      {project.domain}
                    </span>
                  </div>
                </div>

                {/* Cyber Scanline Effect on Hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/20 shadow-[0_0_15px_rgba(0,255,136,0.5)] animate-scan" />
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

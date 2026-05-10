"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const placeholders = [
  { id: 1, title: "PROJECT_ALPHA", category: "AI_SYSTEMS", span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "PROJECT_BETA", category: "EMBEDDED", span: "md:col-span-1 md:row-span-1" },
  { id: 3, title: "PROJECT_GAMMA", category: "WEB_GL", span: "md:col-span-1 md:row-span-2" },
  { id: 4, title: "PROJECT_DELTA", category: "ROBOTICS", span: "md:col-span-1 md:row-span-1" },
  { id: 5, title: "PROJECT_EPSILON", category: "KINETIC", span: "md:col-span-2 md:row-span-1" },
];

export default function ProjectGridV2() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="projects" className="py-32 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 03:_SELECTED_WORKS ]</span>
            <h2 className="text-huge font-bold leading-none tracking-tighter uppercase">ARCHIVE</h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-400 font-mono text-sm leading-relaxed">
              EXPLORING THE INTERSECTION OF HIGH-PERFORMANCE COMPUTING AND GEN_AI ARCHITECTURES. 
              EACH LOG REPRESENTS A DEPLOYED SYSTEM ARCHITECTURE.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {placeholders.map((project) => (
            <motion.div
              key={project.id}
              className={`project-card group relative glass-premium rounded-2xl overflow-hidden cursor-none ${project.span}`}
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
              
              {/* Animated BG Placeholder */}
              <div className="absolute inset-0 bg-[#111] group-hover:scale-110 transition-transform duration-700 ease-out">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] group-hover:opacity-40 transition-opacity" />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 z-20 space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-primary tracking-widest bg-primary/10 px-2 py-1 rounded">
                    {project.category}
                  </span>
                  <div className="flex-1 h-[1px] bg-white/10" />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tighter group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-xs font-mono group-hover:text-gray-300 transition-colors">
                  [ VIEW_DEPLOYMENT_SCHEMATICS ]
                </p>
              </div>

              {/* Hover Distortion Element (Mock Shader Effect) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-[60px] animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resume";
import { ArrowRight, Github, Cpu, Layers, BarChart2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = ["ALL", "SYSTEMS", "AI/ML", "AGENTIC", "EMBEDDED", "WEBDEV"];

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isAI = project.categories?.some((c: string) => c.includes("AI")) || project.type?.includes("AI");

  // Hover carousel effect: auto-advance slides when hovering
  useEffect(() => {
    if (!isHovered) {
      setActiveSlide(0);
      return;
    }
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Slide content configuration
  const slides = [
    // Slide 0: General Overview
    {
      id: "overview",
      icon: Layers,
      subtitle: project.domain || "SYSTEMS ENGINEERING",
      title: project.title,
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 text-sm font-sans leading-relaxed line-clamp-4 min-h-[80px]">
            {project.description}
          </p>
          <div className="flex items-center gap-2 text-primary font-mono text-[9px] uppercase tracking-widest mt-4">
            <span>Hover to scan details</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-3 h-3 inline" />
            </motion.span>
          </div>
        </div>
      ),
    },
    // Slide 1: Tech Stack & Key Highlight
    {
      id: "tech",
      icon: Cpu,
      subtitle: "DEVELOPMENT ARCHITECTURE",
      title: "TECH SPECIFICATION",
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-hidden">
            {project.tech.map((t: string) => (
              <span
                key={t}
                className="text-[9px] font-mono bg-white/[0.03] text-[#dfc7b3] border border-white/5 px-2 py-0.5 rounded uppercase tracking-tighter"
              >
                {t}
              </span>
            ))}
          </div>
          {project.highlight && (
            <div className="mt-4 border-l-2 border-primary/40 pl-3 py-1 bg-primary/5 rounded-r">
              <span className="text-[9px] font-mono text-primary uppercase block tracking-wider font-bold">KEY RESULTS</span>
              <span className="text-xs text-white/80 line-clamp-2">{project.highlight}</span>
            </div>
          )}
        </div>
      ),
    },
    // Slide 2: Performance Specs & Source Access
    {
      id: "specs",
      icon: BarChart2,
      subtitle: "OPERATIONAL GATEWAY",
      title: "SPEC & ARTIFACTS",
      content: (
        <div className="space-y-4 flex flex-col justify-between h-full">
          <div className="space-y-2">
            <span className="text-[9px] font-mono text-white/30 uppercase block tracking-widest">
              DEPLOYMENT ENVIRONMENT
            </span>
            <p className="text-xs text-gray-300 line-clamp-2 font-mono">
              {project.industrySpecs || "Compiled architecture for standard runtime."}
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-primary hover:text-white transition-colors flex items-center gap-2 group/link"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <div className="absolute inset-0 w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-50" />
              </div>
              <span className="tracking-widest flex items-center gap-1">
                ACCESS_CODE <Github className="w-3 h-3 inline" />
              </span>
            </a>
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
              SCT_V{index + 10}
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative glass-premium rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-primary/20 hover:shadow-[0_0_30px_rgba(242,123,80,0.06)] flex flex-col h-[380px] p-8`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveSlide(0);
      }}
    >
      {/* Subtle organic background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:15px_15px]" />

      {/* Header bar of the card */}
      <div className="flex items-center justify-between mb-6 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-primary group-hover:bg-primary/10 transition-colors duration-500">
            {(() => {
              const Icon = slides[activeSlide].icon;
              return <Icon className="w-4 h-4" />;
            })()}
          </div>
          <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">
            [ PAGE_0{activeSlide + 1} ]
          </span>
        </div>
        <span className="text-[9px] font-mono tracking-widest uppercase text-white/30 px-2 py-0.5 rounded bg-white/[0.02]">
          {project.type || "CORE"}
        </span>
      </div>

      {/* Slide Content Area with AnimatePresence */}
      <div className="flex-1 flex flex-col justify-between relative overflow-hidden z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex-1 flex flex-col"
          >
            <div className="space-y-3 mb-6">
              <span className="text-[9px] font-mono text-primary tracking-widest uppercase block">
                {slides[activeSlide].subtitle}
              </span>
              <h3 className="text-xl font-display font-bold text-white tracking-tight leading-tight uppercase group-hover:text-primary transition-colors">
                {slides[activeSlide].title}
              </h3>
            </div>
            <div className="flex-1">
              {slides[activeSlide].content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Slide Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === i
                  ? "w-6 bg-primary shadow-[0_0_6px_var(--color-primary)]"
                  : "w-1.5 bg-white/10 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Aesthetic corner decorations */}
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none opacity-30">
        <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-primary" />
        <div className="absolute bottom-0 right-0 h-[1px] w-3 bg-primary" />
      </div>
    </motion.div>
  );
}

export default function ProjectGridV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("ALL");

  const filteredProjects = resumeData.projects.filter(project => {
    if (filter === "ALL") return true;
    const projectCats = project.categories || [];
    return projectCats.some(c => c.toUpperCase() === filter) || project.type?.toUpperCase() === filter;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-header", {
        scrollTrigger: {
          trigger: ".project-header",
          start: "top bottom-=100",
        },
        y: 40,
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
        <header className="project-header mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 02:_ARCHIVE_SHELF ]</span>
            <h2 className="text-large font-bold text-white tracking-tighter uppercase">PORTFOLIO</h2>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 font-mono text-[9px] tracking-widest border transition-all duration-300 rounded-full ${
                  filter === cat 
                  ? "bg-primary text-black border-primary shadow-[0_0_12px_rgba(242,123,80,0.3)]" 
                  : "bg-white/[0.02] text-white/50 border-white/5 hover:border-primary/50"
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
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

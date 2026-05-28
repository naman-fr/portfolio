"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resume";
import { ArrowRight, Github, Cpu, Layers, BarChart2 } from "lucide-react";
import ScrollRevealHeading from "./ScrollRevealHeading";

gsap.registerPlugin(ScrollTrigger);

const categories = ["ALL", "SYSTEMS", "AI/ML", "AGENTIC", "EMBEDDED", "WEBDEV"];

function getProjectTheme(project: any) {
  const categories = project.categories || [];
  const primaryCat = categories[0]?.toUpperCase() || project.type?.toUpperCase() || "WEBDEV";
  
  if (primaryCat === "AI/ML" || primaryCat === "AGENTIC") {
    return {
      accent: "#e76f51",
      glowColor: "rgba(231,111,81,0.09)",
      hoverBorder: "hover:border-[#e76f51]/40 hover:shadow-[0_0_20px_rgba(231,111,81,0.15)]",
      textClass: "text-[#e76f51]",
      bgGlow: "bg-[#e76f51]/5",
      badgeClass: "bg-[#e76f51]/10 text-[#e76f51] border-[#e76f51]/20",
    };
  } else if (primaryCat === "SYSTEMS" || primaryCat === "EMBEDDED") {
    return {
      accent: "#c38e70",
      glowColor: "rgba(195,142,112,0.09)",
      hoverBorder: "hover:border-[#c38e70]/40 hover:shadow-[0_0_20px_rgba(195,142,112,0.15)]",
      textClass: "text-[#c38e70]",
      bgGlow: "bg-[#c38e70]/5",
      badgeClass: "bg-[#c38e70]/10 text-[#c38e70] border-[#c38e70]/20",
    };
  } else if (primaryCat === "WEBDEV" || primaryCat === "PRODUCT") {
    return {
      accent: "#5a8c76",
      glowColor: "rgba(90,140,118,0.09)",
      hoverBorder: "hover:border-[#5a8c76]/40 hover:shadow-[0_0_20px_rgba(90,140,118,0.15)]",
      textClass: "text-[#5a8c76]",
      bgGlow: "bg-[#5a8c76]/5",
      badgeClass: "bg-[#5a8c76]/10 text-[#5a8c76] border-[#5a8c76]/20",
    };
  } else {
    return {
      accent: "#d94e34",
      glowColor: "rgba(217,78,52,0.09)",
      hoverBorder: "hover:border-[#d94e34]/40 hover:shadow-[0_0_20px_rgba(217,78,52,0.15)]",
      textClass: "text-[#d94e34]",
      bgGlow: "bg-[#d94e34]/5",
      badgeClass: "bg-[#d94e34]/10 text-[#d94e34] border-[#d94e34]/20",
    };
  }
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const theme = getProjectTheme(project);

  return (
    <div
      className="h-[380px] w-full cursor-pointer relative"
      style={{ perspective: 1500 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full relative"
      >
        {/* FRONT SIDE */}
        <div
          className={`absolute inset-0 w-full h-full p-8 rounded-[2.2rem] glass-premium border border-white/5 flex flex-col justify-between overflow-hidden bg-[#0c0b0a]/80 transition-all duration-500 ${theme.hoverBorder}`}
          style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
        >
          {/* Subtle colored spotlight in the corner */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 opacity-[0.06] blur-xl pointer-events-none rounded-full" 
            style={{ background: `radial-gradient(circle, ${theme.accent}, transparent 70%)` }} 
          />

          {/* Top Row */}
          <div className="flex items-center justify-between mb-4 z-10" style={{ transform: "translateZ(30px)" }}>
            <span className={`text-[9px] font-mono ${theme.textClass} tracking-widest uppercase block`}>
              {project.domain || "SYSTEMS ENGINEERING"}
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-white/30 px-2 py-0.5 rounded bg-white/[0.02] border border-white/5">
              {project.type || "CORE"}
            </span>
          </div>

          {/* Main Title & Description */}
          <div className="flex-1 flex flex-col justify-center space-y-3 z-10" style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}>
            <h3 className="text-2xl font-display font-bold text-white tracking-tight leading-tight uppercase group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm font-sans leading-relaxed line-clamp-4 min-h-[90px] font-light">
              {project.description}
            </p>
          </div>

          {/* Bottom Row: Tech Tags */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5 z-10" style={{ transform: "translateZ(35px)" }}>
            {project.tech.slice(0, 4).map((t: string) => (
              <span
                key={t}
                className="text-[9px] font-mono bg-white/[0.03] text-[#dfc7b3]/70 border border-white/5 px-2 py-0.5 rounded uppercase tracking-tighter"
              >
                {t}
              </span>
            ))}
          </div>

          <span className="text-[8px] font-mono text-white/20 tracking-wider block mt-4 uppercase animate-pulse" style={{ transform: "translateZ(20px)" }}>
            Hover / tap to inspect specs ➜
          </span>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full p-8 rounded-[2.2rem] glass-premium border overflow-hidden bg-[#0c0b0a]/95 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d",
            borderColor: `${theme.accent}30`,
          }}
        >
          {/* Top Title */}
          <div className="z-10 flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
              SYSTEM SPECIFICATIONS
            </span>
            <span className="text-[8px] font-mono text-white/20 uppercase">
              SCT_V{index + 10}
            </span>
          </div>

          {/* Highlights & Specs */}
          <div className="z-10 flex-1 flex flex-col justify-center space-y-4" style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
            {project.highlight && (
              <div className="border-l-2 pl-3 py-1 bg-white/[0.01]" style={{ borderLeftColor: theme.accent, transform: "translateZ(10px)" }}>
                <span className={`text-[9px] font-mono ${theme.textClass} uppercase block tracking-wider font-bold mb-1`}>KEY OUTCOMES</span>
                <span className="text-xs text-white/80 line-clamp-2 leading-relaxed">{project.highlight}</span>
              </div>
            )}

            <div className="space-y-1" style={{ transform: "translateZ(15px)" }}>
              <span className="text-[9px] font-mono text-white/30 uppercase block tracking-widest">
                DEPLOYMENT SPEC
              </span>
              <p className="text-xs text-gray-300 font-mono line-clamp-2 leading-relaxed">
                {project.industrySpecs || "Compiled architecture for standard runtime."}
              </p>
            </div>

            <div className="space-y-1.5" style={{ transform: "translateZ(20px)" }}>
              <span className="text-[9px] font-mono text-white/30 uppercase block tracking-widest">
                FULL ENGINE STACK
              </span>
              <div className="flex flex-wrap gap-1 max-h-[80px] overflow-hidden">
                {project.tech.map((t: string) => (
                  <span
                    key={t}
                    className="text-[8px] font-mono bg-white/[0.02] text-[#dfc7b3]/50 px-1.5 py-0.5 rounded border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action links */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between z-10" style={{ transform: "translateZ(40px)" }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[10px] font-mono ${theme.textClass} hover:text-white transition-colors flex items-center gap-2 group/link`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full animate-ping opacity-50" style={{ backgroundColor: theme.accent }} />
              </div>
              <span className="tracking-widest flex items-center gap-1 font-bold">
                ACCESS_CODE <Github className="w-3.5 h-3.5 inline" />
              </span>
            </a>
            <span className="text-[8px] font-mono text-primary uppercase tracking-widest animate-pulse">
              Return ➜
            </span>
          </div>
        </div>
      </motion.div>
    </div>
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
          <ScrollRevealHeading label="[ 02:_ARCHIVE_SHELF ]" title="PORTFOLIO" />
          
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

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
          className={`absolute inset-0 w-full h-full p-8 rounded-[1.5rem] bg-white border-2 border-[#1a1a1a] shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] flex flex-col justify-between overflow-hidden transition-all duration-500 group ${theme.hoverBorder}`}
          style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
        >
          {/* Holographic foil overlay (Pokemon touch) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-[rgba(255,255,255,0.6)] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" style={{ transform: "translateZ(1px)" }} />
          {/* Subtle colored spotlight in the corner */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 opacity-[0.06] blur-xl pointer-events-none rounded-full" 
            style={{ background: `radial-gradient(circle, ${theme.accent}, transparent 70%)` }} 
          />

          {/* Top Row */}
          <div className="flex items-center justify-between mb-4 z-10" style={{ transform: "translateZ(30px)" }}>
            <span className={`text-[9px] font-mono ${theme.textClass} tracking-widest uppercase block font-bold`}>
              {project.domain || "ENGINEERING"}
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-[#1a1a1a]/60 px-2 py-0.5 rounded-full bg-[#1a1a1a]/5 border border-[#1a1a1a]/10 font-bold">
              {project.type || "CORE"}
            </span>
          </div>

          {/* Main Title & Description */}
          <div className="flex-1 flex flex-col justify-center space-y-3 z-10" style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}>
            <h3 className="text-2xl font-display font-bold text-[#1a1a1a] tracking-tight leading-tight uppercase group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-[#1a1a1a]/70 text-sm font-sans leading-relaxed line-clamp-4 min-h-[90px] font-medium">
              {project.description}
            </p>
          </div>

          {/* Bottom Row: Tech Tags */}
          <div className="pt-4 border-t border-[#1a1a1a]/10 flex flex-wrap gap-1.5 z-10" style={{ transform: "translateZ(35px)" }}>
            {project.tech.slice(0, 4).map((t: string) => (
              <span
                key={t}
                className="text-[9px] font-mono bg-[#1a1a1a]/5 text-[#1a1a1a] border border-[#1a1a1a]/10 px-2 py-0.5 rounded-full uppercase tracking-tighter font-bold"
              >
                {t}
              </span>
            ))}
          </div>

          <span className="text-[8px] font-mono text-[#1a1a1a]/40 tracking-wider block mt-4 uppercase font-bold animate-bounce" style={{ transform: "translateZ(20px)" }}>
            Tap to flip ➜
          </span>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full p-8 rounded-[1.5rem] bg-white border-2 overflow-hidden flex flex-col justify-between shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] group"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d",
            borderColor: `${theme.accent}`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-white/0 via-[rgba(255,255,255,0.6)] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" style={{ transform: "translateZ(1px)" }} />
          {/* Top Title */}
          <div className="z-10 flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
            <span className="text-[9px] font-mono text-[#1a1a1a]/60 uppercase tracking-widest font-bold">
              PROJECT DETAILS
            </span>
          </div>

          {/* Highlights & Specs */}
          <div className="z-10 flex-1 flex flex-col justify-center space-y-4" style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
            {project.highlight && (
              <div className="border-l-4 pl-3 py-1 bg-[#1a1a1a]/5 rounded-r" style={{ borderLeftColor: theme.accent, transform: "translateZ(10px)" }}>
                <span className={`text-[9px] font-mono ${theme.textClass} uppercase block tracking-wider font-extrabold mb-1`}>HIGHLIGHT</span>
                <span className="text-xs text-[#1a1a1a]/80 line-clamp-2 leading-relaxed font-medium">{project.highlight}</span>
              </div>
            )}

            <div className="space-y-1" style={{ transform: "translateZ(15px)" }}>
              <span className="text-[9px] font-mono text-[#1a1a1a]/60 uppercase block tracking-widest font-bold">
                OVERVIEW
              </span>
              <p className="text-xs text-[#1a1a1a]/70 font-mono line-clamp-2 leading-relaxed">
                {project.industrySpecs || "General project overview and description."}
              </p>
            </div>

            <div className="space-y-1.5" style={{ transform: "translateZ(20px)" }}>
              <span className="text-[9px] font-mono text-[#1a1a1a]/60 uppercase block tracking-widest font-bold">
                TECH STACK
              </span>
              <div className="flex flex-wrap gap-1 max-h-[80px] overflow-hidden">
                {project.tech.map((t: string) => (
                  <span
                    key={t}
                    className="text-[8px] font-mono bg-[#1a1a1a]/5 text-[#1a1a1a] px-1.5 py-0.5 rounded-md border border-[#1a1a1a]/10 font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action links */}
          <div className="pt-4 border-t border-[#1a1a1a]/10 flex items-center justify-between z-10" style={{ transform: "translateZ(40px)" }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[10px] font-mono ${theme.textClass} hover:opacity-70 transition-opacity flex items-center gap-2 group/link`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                <div className="absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-50" style={{ backgroundColor: theme.accent }} />
              </div>
              <span className="tracking-widest flex items-center gap-1 font-bold">
                VIEW SOURCE <Github className="w-3.5 h-3.5 inline" />
              </span>
            </a>
            <span className="text-[8px] font-mono text-[#1a1a1a] uppercase tracking-widest font-bold">
              FLIP BACK ➜
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
          <ScrollRevealHeading label="[ PROJECTS ]" title="PORTFOLIO" />
          
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 font-mono text-[10px] font-bold tracking-widest border-2 transition-all duration-300 rounded-full ${
                  filter === cat 
                  ? "bg-primary text-white border-primary shadow-[4px_4px_0_0_rgba(0,0,0,1)]" 
                  : "bg-white text-[#1a1a1a] border-black/20 hover:border-primary/50"
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

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resume";
import { ArrowRight, Github, Cpu, Layers, BarChart2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = ["ALL", "SYSTEMS", "AI/ML", "AGENTIC", "EMBEDDED", "WEBDEV"];

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  // Mouse tracking position for radial border glow
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize coordinates to [-0.5, 0.5]
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);

    // Track actual pixel coords for radial gradient glow
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setActiveSlide(0);
  };

  // Hover carousel auto-advance
  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 3800);
    return () => clearInterval(interval);
  }, [isHovered]);

  const slides = [
    {
      id: "overview",
      icon: Layers,
      subtitle: project.domain || "SYSTEMS ENGINEERING",
      title: project.title,
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 text-sm font-sans leading-relaxed line-clamp-4 min-h-[90px] font-light">
            {project.description}
          </p>
          <div className="flex items-center gap-2 text-primary font-mono text-[9px] uppercase tracking-widest mt-4">
            <span>Scan project parameters</span>
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
    <div
      ref={cardRef}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="h-[380px] w-full"
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={`group relative h-full w-full glass-premium rounded-[2rem] border border-white/5 overflow-hidden p-8 flex flex-col justify-between transition-all duration-500 hover:border-primary/20`}
      >
        {/* Dynamic mouse-tracking border radial glow (Vercel Style) */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(350px circle at ${glowPos.x}px ${glowPos.y}px, rgba(242,123,80,0.06), transparent 80%)`,
          }}
        />

        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* Card Top Action Row */}
        <div className="flex items-center justify-between mb-4 z-10" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 text-primary group-hover:bg-primary/10 transition-colors duration-500">
              {(() => {
                const Icon = slides[activeSlide].icon;
                return <Icon className="w-4 h-4" />;
              })()}
            </div>
            <span className="text-[8px] font-mono text-white/30 tracking-[0.25em] uppercase">
              PAGE_0{activeSlide + 1}
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-widest uppercase text-white/30 px-2 py-0.5 rounded bg-white/[0.02] border border-white/5">
            {project.type || "CORE"}
          </span>
        </div>

        {/* Dynamic Carousel Slide Display */}
        <div className="flex-1 flex flex-col justify-between relative overflow-hidden z-10" style={{ transform: "translateZ(40px)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 12, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1 flex flex-col justify-start"
            >
              <div className="space-y-3 mb-5">
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

          {/* Dynamic dot trackers */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === i
                    ? "w-6 bg-primary shadow-[0_0_8px_var(--color-primary)]"
                    : "w-1.5 bg-white/10 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Structural highlights */}
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none opacity-20">
          <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-primary" />
          <div className="absolute bottom-0 right-0 h-[1px] w-3 bg-primary" />
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

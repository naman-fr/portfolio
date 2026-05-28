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

const slideVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction * 40,
    rotateY: direction * 12,
    scale: 0.96,
  }),
  animate: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -40,
    rotateY: direction * -12,
    scale: 0.96,
  }),
};

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = getProjectTheme(project);

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
    setDirection(1);
  };

  const handleSlideChange = (newSlide: number) => {
    setDirection(newSlide > activeSlide ? 1 : -1);
    setActiveSlide(newSlide);
  };

  // Hover carousel auto-advance
  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 4200);
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
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 80 }}
            className="text-gray-400 text-sm font-sans leading-relaxed line-clamp-4 min-h-[90px] font-light"
          >
            {project.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className={`flex items-center gap-2 ${theme.textClass} font-mono text-[9px] uppercase tracking-widest mt-4`}
          >
            <span>Scan project parameters</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-3 h-3 inline" />
            </motion.span>
          </motion.div>
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
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, type: "spring", stiffness: 100 }}
            className="flex flex-wrap gap-1.5 max-h-[85px] overflow-hidden"
          >
            {project.tech.map((t: string) => (
              <span
                key={t}
                className="text-[9px] font-mono bg-white/[0.03] text-[#dfc7b3] border border-white/5 px-2 py-0.5 rounded uppercase tracking-tighter"
              >
                {t}
              </span>
            ))}
          </motion.div>
          {project.highlight && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 90 }}
              className={`mt-4 border-l-2 pl-3 py-1 ${theme.bgGlow} rounded-r`}
              style={{ borderLeftColor: theme.accent }}
            >
              <span className={`text-[9px] font-mono ${theme.textClass} uppercase block tracking-wider font-bold`}>KEY RESULTS</span>
              <span className="text-xs text-white/80 line-clamp-2">{project.highlight}</span>
            </motion.div>
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
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="space-y-2"
          >
            <span className="text-[9px] font-mono text-white/30 uppercase block tracking-widest">
              DEPLOYMENT ENVIRONMENT
            </span>
            <p className="text-xs text-gray-300 line-clamp-2 font-mono">
              {project.industrySpecs || "Compiled architecture for standard runtime."}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
            className="pt-4 border-t border-white/5 flex items-center justify-between"
          >
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
              <span className="tracking-widest flex items-center gap-1">
                ACCESS_CODE <Github className="w-3 h-3 inline" />
              </span>
            </a>
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
              SCT_V{index + 10}
            </span>
          </motion.div>
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
        className={`group relative h-full w-full glass-premium rounded-[2.2rem] border border-white/5 overflow-hidden p-8 flex flex-col justify-between transition-all duration-500 ${theme.hoverBorder}`}
      >
        {/* Dynamic mouse-tracking border radial glow (Vercel Style) */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(350px circle at ${glowPos.x}px ${glowPos.y}px, ${theme.glowColor}, transparent 80%)`,
          }}
        />

        {/* Elite Glare effect overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 mix-blend-overlay"
          style={{
            background: `radial-gradient(180px circle at ${glowPos.x}px ${glowPos.y}px, rgba(250,245,239,0.12), transparent 60%)`,
          }}
        />

        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* Card Top Action Row */}
        <div className="flex items-center justify-between mb-4 z-10" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 ${theme.textClass} group-hover:bg-white/[0.04] transition-colors duration-500`}>
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

        {/* Dynamic Carousel Slide Display with Depth Parallax */}
        <div className="flex-1 flex flex-col justify-between relative overflow-hidden z-10 animate-fade-in" style={{ transform: "translateZ(40px)", perspective: 1000 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-start"
            >
              <div className="space-y-3 mb-5">
                <motion.span 
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, type: "spring", stiffness: 100 }}
                  className={`text-[9px] font-mono ${theme.textClass} tracking-widest uppercase block`}
                >
                  {slides[activeSlide].subtitle}
                </motion.span>
                <motion.h3 
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                  className="text-xl font-display font-bold text-white tracking-tight leading-tight uppercase group-hover:text-[#dfc7b3] transition-colors"
                >
                  {slides[activeSlide].title}
                </motion.h3>
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
                  handleSlideChange(i);
                }}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: activeSlide === i ? "24px" : "6px",
                  backgroundColor: activeSlide === i ? theme.accent : "rgba(255,255,255,0.15)",
                  boxShadow: activeSlide === i ? `0 0 8px ${theme.accent}` : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Structural highlights */}
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none opacity-20">
          <div className="absolute bottom-0 right-0 w-[1px] h-3" style={{ backgroundColor: theme.accent }} />
          <div className="absolute bottom-0 right-0 h-[1px] w-3" style={{ backgroundColor: theme.accent }} />
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

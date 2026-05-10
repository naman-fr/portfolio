"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { resumeData } from "../data/resume";
import { 
  Terminal, Cpu, Atom, Gamepad2, Database, 
  FlaskConical, Code, Layers, FileCode, 
  BrainCircuit, Bot, Globe, ShieldCheck,
  ChevronRight, ExternalLink, Github
} from "lucide-react";
import ArchitectureDiagram from "./ArchitectureDiagram";
import CodePeekDrawer from "./CodePeekDrawer";

const iconMap: Record<string, any> = {
  Agentic: Bot,
  "AI/ML": BrainCircuit,
  Embedded: Cpu,
  Systems: Terminal,
  WebDev: Globe,
};

const categoryColors: Record<string, string> = {
  Agentic: "text-terminal border-terminal/30 bg-terminal/5",
  "AI/ML": "text-neural border-neural/30 bg-neural/5",
  Embedded: "text-amber border-amber/30 bg-amber/5",
  Systems: "text-terminal border-terminal/30 bg-terminal/5",
  WebDev: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5",
};

const techColors: Record<string, string> = {
  Python: "text-blue-300 border-blue-500/30",
  React: "text-cyan-300 border-cyan-500/30",
  "C++": "text-purple-300 border-purple-500/30",
  C: "text-blue-400 border-blue-600/30",
  PyTorch: "text-orange-300 border-orange-500/30",
  LangGraph: "text-emerald-300 border-emerald-500/30",
  FAISS: "text-yellow-300 border-yellow-500/30",
  Docker: "text-blue-200 border-blue-400/30",
  Kubernetes: "text-blue-100 border-blue-300/30",
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [codePeekOpen, setCodePeekOpen] = useState(false);
  const [codePeekData, setCodePeekData] = useState<{
    code: string;
    language: string;
    explanation: string;
    title: string;
  } | null>(null);

  const categories = ["All", "Agentic", "AI/ML", "Embedded", "Systems", "WebDev"];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return resumeData.projects;
    return resumeData.projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-3 py-1 rounded-full border border-terminal/30 bg-terminal/5 text-terminal text-xs font-mono mb-4"
          >
            MODULE_03: DEPLOYED_ASSETS
          </motion.div>
          <motion.h2
            className="text-5xl md:text-7xl font-mono font-bold text-white mb-6 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            ENGINEERING_LOGS
          </motion.h2>

          {/* Project Stats Summary */}
          <motion.div 
            className="flex justify-center gap-8 mb-12 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col gap-1">
              <span className="text-terminal text-lg">{resumeData.projects.length}</span>
              <span>Total_Assets</span>
            </div>
            <div className="w-[1px] bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-neural text-lg">
                {resumeData.projects.filter(p => p.category === "Agentic" || p.category === "AI/ML").length}
              </span>
              <span>Intelligence_Nodes</span>
            </div>
            <div className="w-[1px] bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-amber text-lg">
                {resumeData.projects.filter(p => p.category === "Embedded" || p.category === "Systems").length}
              </span>
              <span>Low_Level_Cores</span>
            </div>
          </motion.div>
          
          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full font-mono text-sm border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-terminal text-obsidian border-terminal shadow-[0_0_15px_rgba(0,255,159,0.4)]"
                    : "bg-transparent text-gray-500 border-white/10 hover:border-terminal/50 hover:text-terminal"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const Icon = iconMap[project.category || "WebDev"] || Code;
              const catStyle = categoryColors[project.category || "WebDev"];
              
              return (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative flex flex-col h-full"
                >
                  <div className="flex-1 glass rounded-xl p-8 border border-white/5 group-hover:border-terminal/40 transition-all duration-500 bg-obsidian/40 backdrop-blur-xl relative overflow-hidden">
                    {/* Background ID / Tech Grid */}
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                      <Icon className="w-32 h-32" />
                    </div>

                    {/* Category Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-md border text-[10px] font-mono tracking-widest ${catStyle}`}>
                        <Icon className="w-3 h-3" />
                        {project.category?.toUpperCase()}
                      </div>
                      <div className="flex gap-3">
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-gray-500 hover:text-white transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-mono font-bold text-white mb-3 group-hover:text-terminal transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>

                    {/* Metrics / Highlights */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-4 h-4 text-terminal shrink-0 mt-0.5" />
                        <span className="text-xs font-mono text-gray-300">
                          {project.highlight}
                        </span>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-0.5 text-[10px] font-mono rounded border border-white/10 text-gray-500 bg-white/5 ${
                            techColors[tech] || ""
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Industry Specs Label */}
                    {project.industrySpecs && (
                      <div className="text-[10px] font-mono text-terminal/60 flex items-center gap-2 mt-auto pt-4 border-t border-white/5">
                        <ChevronRight className="w-3 h-3" />
                        {project.industrySpecs}
                      </div>
                    )}

                    {/* Expansion Trigger */}
                    {(project.title.toLowerCase().includes("embedded") || 
                      project.title.toLowerCase().includes("sawl") ||
                      project.title.toLowerCase().includes("rag") ||
                      project.title.toLowerCase().includes("vbs")) && (
                      <button
                        onClick={() => setSelectedProject(selectedProject === project.title ? null : project.title)}
                        className="absolute bottom-4 right-8 text-[10px] font-mono text-gray-600 hover:text-terminal transition-colors flex items-center gap-1"
                      >
                        [ VIEW_SCHEMATIC ]
                      </button>
                    )}
                  </div>

                  {/* Architecture Schematic Overlay */}
                  <AnimatePresence>
                    {selectedProject === project.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-obsidian/80 backdrop-blur-2xl rounded-b-xl border-x border-b border-terminal/30 mt-[-1px] z-10"
                      >
                        <div className="p-6">
                           {project.title.toLowerCase().includes("vbs") ? (
                            <ArchitectureDiagram type="vbs" />
                          ) : project.title.toLowerCase().includes("sawl") ? (
                            <ArchitectureDiagram type="sawl" />
                          ) : project.title.toLowerCase().includes("drone") ? (
                            <ArchitectureDiagram type="amfd" />
                          ) : project.title.toLowerCase().includes("rag") ? (
                            <ArchitectureDiagram type="chigma" />
                          ) : null}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

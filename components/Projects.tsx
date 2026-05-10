"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import { Terminal, Cpu, Atom, Gamepad2, Database, FlaskConical, Code, Layers, FileCode } from "lucide-react";
import ArchitectureDiagram from "./ArchitectureDiagram";
import CodePeekDrawer from "./CodePeekDrawer";

const iconMap: Record<string, any> = {
  Systems: Terminal,
  Research: FlaskConical,
  Industrial: Cpu,
  Simulation: Gamepad2,
  Conversational: Code,
  Blockchain: Database,
};

const colorMap: Record<string, string> = {
  Systems: "terminal",
  Research: "neural",
  Industrial: "neural",
  Simulation: "amber",
  Conversational: "terminal",
  Blockchain: "neural",
};

const techColors: Record<string, string> = {
  Python: "bg-blue-500/20 text-blue-300 border-blue-500/50",
  React: "bg-cyan-500/20 text-cyan-300 border-cyan-500/50",
  "C++": "bg-purple-500/20 text-purple-300 border-purple-500/50",
  C: "bg-blue-600/20 text-blue-400 border-blue-600/50",
  PyTorch: "bg-orange-500/20 text-orange-300 border-orange-500/50",
  Docker: "bg-blue-400/20 text-blue-200 border-blue-400/50",
  Kubernetes: "bg-blue-300/20 text-blue-100 border-blue-300/50",
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [codePeekOpen, setCodePeekOpen] = useState(false);
  const [codePeekData, setCodePeekData] = useState<{
    code: string;
    language: string;
    explanation: string;
    title: string;
  } | null>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-mono font-bold text-terminal mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          &gt; PROJECTS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {resumeData.projects.map((project, index) => {
            const Icon = iconMap[project.type] || Code;
            const colorClass = colorMap[project.type] || "terminal";
            
            return (
              <motion.div
                key={project.title}
                className={`glass rounded-lg p-6 relative overflow-hidden group ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, borderColor: `var(--color-${colorClass})` }}
              >
                {/* Special terminal effect for Linux Terminal project */}
                {project.title.includes("Terminal") && (
                  <div className="absolute inset-0 bg-obsidian/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="font-mono text-terminal text-sm">
                      <div className="flex items-center gap-2">
                        <span>naman@linux:~$</span>
                        <span className="animate-pulse">_</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quantum animation for Quantum project */}
                {project.title.includes("Quantum") && (
                  <motion.div
                    className="absolute top-4 right-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Atom className="w-8 h-8 text-neural" />
                  </motion.div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`p-3 rounded-lg border ${
                      colorClass === "terminal"
                        ? "bg-terminal/20 border-terminal/50"
                        : colorClass === "neural"
                        ? "bg-neural/20 border-neural/50"
                        : "bg-amber/20 border-amber/50"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        colorClass === "terminal"
                           ? "text-terminal"
                           : colorClass === "neural"
                           ? "text-neural"
                           : "text-amber"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-mono font-bold text-white mb-1">
                        {project.title}
                      </h3>
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-terminal transition-colors"
                          whileHover={{ scale: 1.2, rotate: 12 }}
                        >
                          <Code className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 font-mono">
                      {project.domain}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="mb-4">
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded ${
                      colorClass === "terminal"
                        ? "text-terminal bg-terminal/20"
                        : colorClass === "neural"
                        ? "text-neural bg-neural/20"
                        : "text-amber bg-amber/20"
                    }`}
                  >
                    {project.highlight}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      className={`px-2 py-1 text-xs font-mono rounded border ${
                        techColors[tech] || "bg-white/10 text-gray-300 border-white/20"
                      }`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                  {(project.title.toLowerCase().includes("vbs") || 
                    project.title.toLowerCase().includes("sawl-net") ||
                    project.title.toLowerCase().includes("chigma") ||
                    project.title.toLowerCase().includes("amfd")) && (
                    <motion.button
                      onClick={() => setSelectedProject(
                        selectedProject === project.title ? null : project.title
                      )}
                      className="flex-1 px-3 py-2 text-xs font-mono glass rounded-lg hover:bg-terminal/20 text-terminal border border-terminal/50 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Layers className="w-3 h-3" />
                      Architecture
                    </motion.button>
                  )}
                  {(project as any).codeSnippet && (
                    <motion.button
                      onClick={() => {
                        setCodePeekData({
                          code: (project as any).codeSnippet.code,
                          language: (project as any).codeSnippet.language,
                          explanation: (project as any).codeSnippet.explanation,
                          title: project.title,
                        });
                        setCodePeekOpen(true);
                      }}
                      className="flex-1 px-3 py-2 text-xs font-mono glass rounded-lg hover:bg-neural/20 text-neural border border-neural/50 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileCode className="w-3 h-3" />
                      Code
                    </motion.button>
                  )}
                </div>

                {/* Architecture Diagram */}
                {selectedProject === project.title && (
                  project.title.toLowerCase().includes("vbs") ? (
                    <ArchitectureDiagram type="vbs" />
                  ) : project.title.toLowerCase().includes("sawl-net") ? (
                    <ArchitectureDiagram type="sawl" />
                  ) : project.title.toLowerCase().includes("chigma") ? (
                    <ArchitectureDiagram type="chigma" />
                  ) : project.title.toLowerCase().includes("amfd") ? (
                    <ArchitectureDiagram type="amfd" />
                  ) : null
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Code Peek Drawer */}
      {codePeekData && (
        <CodePeekDrawer
          isOpen={codePeekOpen}
          onClose={() => {
            setCodePeekOpen(false);
            setCodePeekData(null);
          }}
          code={codePeekData.code}
          language={codePeekData.language}
          explanation={codePeekData.explanation}
          projectTitle={codePeekData.title}
        />
      )}
    </section>
  );
}

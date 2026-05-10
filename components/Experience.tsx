"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import RadarBackground from "./RadarBackground";
import CodeRain from "./CodeRain";

import NeuralBackground from "./NeuralBackground";

const visualThemes: Record<string, React.ReactNode> = {
  radar: <RadarBackground />,
  script: <CodeRain />,
  circuit: <CodeRain />,
  robotics: <NeuralBackground />,
  network: <NeuralBackground />,
  code: <CodeRain />,
};

export default function Experience() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative"
    >
      {activeTheme && (
        <div className="fixed inset-0 -z-10 opacity-20">
          {visualThemes[activeTheme]}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-mono font-bold text-terminal mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          &gt; EXPERIENCE
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-terminal via-neural to-terminal opacity-30" />

          {resumeData.experience.map((exp, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={exp.id}
                className="relative mb-16"
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                onMouseEnter={() => setActiveTheme(exp.visualTheme)}
                onMouseLeave={() => setActiveTheme(null)}
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isLeft ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-terminal rounded-full border-4 border-obsidian z-10 neon-glow" />

                  {/* Content Card */}
                  <motion.div
                    className={`flex-1 glass rounded-lg p-6 ${
                      isLeft ? "md:text-right md:mr-auto md:max-w-[45%]" : "md:text-left md:ml-auto md:max-w-[45%]"
                    }`}
                    whileHover={{ scale: 1.02, borderColor: "#00FF41" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-terminal font-mono text-sm">
                        {exp.timeline}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-neural font-mono">{exp.company}</span>
                    </div>
                    
                    <h3 className="text-2xl font-mono font-bold text-white mb-3">
                      {exp.role}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-terminal/20 text-terminal text-xs font-mono rounded-full border border-terminal/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-2 text-gray-300">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-terminal mt-1">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

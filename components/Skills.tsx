"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    {
      name: "Languages",
      skills: resumeData.skills.languages,
      color: "terminal",
      icon: "⟨",
    },
    {
      name: "Frameworks",
      skills: resumeData.skills.frameworks,
      color: "neural",
      icon: "⚛",
    },
    {
      name: "Infrastructure",
      skills: resumeData.skills.infrastructure,
      color: "terminal",
      icon: "⚙",
    },
    {
      name: "Concepts",
      skills: resumeData.skills.concepts,
      color: "neural",
      icon: "🧠",
    },
  ];

  return (
    <section
      id="skills"
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
          &gt; SKILLS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIndex) => {
            const isTerminal = category.color === "terminal";
            
            return (
              <motion.div
                key={category.name}
                className="glass rounded-lg p-6"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIndex * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{category.icon}</span>
                  <h3
                    className={`text-2xl font-mono font-bold ${
                      isTerminal ? "text-terminal" : "text-neural"
                    }`}
                  >
                    {category.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className={`px-4 py-2 rounded-full border-2 font-mono text-sm backdrop-blur-sm ${
                        isTerminal
                          ? "bg-terminal/10 border-terminal/50 text-terminal"
                          : "bg-neural/10 border-neural/50 text-neural"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        hoveredCategory === category.name || !hoveredCategory
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0.3, scale: 0.9 }
                      }
                      transition={{ delay: skillIndex * 0.02, duration: 0.2 }}
                      whileHover={{
                        scale: 1.15,
                        y: -5,
                        boxShadow: isTerminal
                          ? "0 0 20px rgba(0, 255, 65, 0.5)"
                          : "0 0 20px rgba(124, 58, 237, 0.5)",
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="text-center text-gray-400 font-mono mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Hover over categories to explore skills
        </motion.p>
      </div>
    </section>
  );
}
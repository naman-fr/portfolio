"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "../data/resume";
import { BookOpen, ExternalLink, Calendar, Award } from "lucide-react";

export default function Publications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  return (
    <section id="publications" ref={sectionRef} className="min-h-screen py-20 px-4 relative flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-mono font-bold text-neural mb-4 tracking-tighter">
            &gt; RESEARCH_LOGS
          </h2>
          <p className="text-gray-400 font-mono">Academic publications and technical reports.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.publications.map((pub, i) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-lg border-neural/20 relative group hover:border-neural/50 transition-all"
            >
              <div className="absolute top-4 right-4">
                <BookOpen className="w-5 h-5 text-neural/40 group-hover:text-neural transition-colors" />
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-3 h-3 text-neural" />
                <span className="text-[10px] font-mono text-neural/60">{pub.year}</span>
              </div>

              <h3 className="text-lg font-mono font-bold text-white mb-3 group-hover:text-neural transition-colors leading-tight">
                {pub.title}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <Award className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-mono text-gray-400">{pub.venue}</span>
              </div>

              <p className="text-sm text-gray-500 font-mono mb-6 line-clamp-3">
                {pub.impact}
              </p>

              <motion.button
                className="flex items-center gap-2 text-[10px] font-mono text-neural/60 group-hover:text-neural"
                whileHover={{ x: 5 }}
              >
                ACCESS_FULL_PKT <ExternalLink className="w-3 h-3" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

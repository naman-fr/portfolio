"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealHeadingProps {
  label: string;
  title: string;
}

export default function ScrollRevealHeading({ label, title }: ScrollRevealHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const letters = Array.from(title);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.025, delayChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 35, rotateX: -45, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { type: "spring", damping: 13, stiffness: 110 },
    },
  };

  return (
    <div ref={ref} className="space-y-4 mb-20 text-left">
      <motion.span
        initial={{ opacity: 0, x: -15 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="text-primary font-mono text-sm tracking-[0.4em] uppercase block"
      >
        {label}
      </motion.span>
      <motion.h2
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-large font-bold text-white tracking-tighter uppercase flex flex-wrap"
        style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            style={{ 
              display: "inline-block", 
              whiteSpace: char === " " ? "pre" : "normal",
              transformOrigin: "bottom center"
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h2>
    </div>
  );
}

"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, TorusKnot, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import MagneticButton from "./MagneticButton";

function HeroVisual() {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.08) * 0.1;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.6} floatIntensity={1.0}>
      <TorusKnot ref={meshRef} args={[1.1, 0.35, 120, 16]} scale={1.25}>
        <meshStandardMaterial
          color="#f27b50" // Coral
          roughness={0.15}
          metalness={0.9}
          emissive="#f27b50"
          emissiveIntensity={0.15}
        />
      </TorusKnot>
    </Float>
  );
}

// Letter-by-letter animated text component
function StaggeredText({ text, className, isOutline = false }: { text: string; className: string; isOutline?: boolean }) {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 120 },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: "inline-block" }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
          className={isOutline ? "text-transparent stroke-text" : ""}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function HeroV2() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const taglineWords = resumeData.profile.tagline.split(" ");

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent z-10">
      {/* Background Spotlights */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(242,123,80,0.06),_transparent_75%)]" />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5.5]} />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#f27b50" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#dfc7b3" />
          <Suspense fallback={null}>
            <HeroVisual />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Typography */}
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-primary font-mono text-[9px] tracking-[0.6em] uppercase block mb-4"
            >
              [ SYSTEM_READY_V2.026 // INTEL_CORE ]
            </motion.span>
            
            <h1 className="text-[10vw] lg:text-[8vw] font-display font-extrabold text-white uppercase tracking-tighter leading-[0.82] flex flex-col items-center">
              <StaggeredText text="NAMAN" className="block text-white" />
              <StaggeredText text="GAUTAM" className="block mt-1" isOutline={true} />
            </h1>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-8">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="text-sm md:text-base font-sans text-gray-400 tracking-wide uppercase leading-relaxed font-light"
            >
              {resumeData.profile.tagline.toUpperCase()}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="flex items-center justify-center gap-4 text-[9px] font-mono text-primary/60"
            >
              <span className="w-10 h-[1px] bg-primary/20" />
              <span className="tracking-widest">ROBOTICS</span>
              <span className="w-1.5 h-1.5 bg-primary/30 rounded-full animate-pulse" />
              <span className="tracking-widest">AI_SYSTEMS</span>
              <span className="w-1.5 h-1.5 bg-primary/30 rounded-full animate-pulse" />
              <span className="tracking-widest">EMBEDDED</span>
              <span className="w-10 h-[1px] bg-primary/20" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-14"
        >
          <MagneticButton onClick={scrollToProjects}>
            EXPLORE ARCHIVE
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[7px] font-mono text-white/20 tracking-[0.4em] rotate-90 origin-left translate-x-2">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/60 via-white/5 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

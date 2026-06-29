"use client";

import { useRef, Suspense, useState, useEffect } from "react";
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
          color="#e02424" // P5 Red
          roughness={0.2}
          metalness={0.8}
          emissive="#ff003c"
          emissiveIntensity={0.2}
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
  const [cameraZ, setCameraZ] = useState(5.5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCameraZ(7.5);
      } else {
        setCameraZ(5.5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(224,36,36,0.1),_transparent_75%)]" />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#e02424" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ffffff" />
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
              className="text-[#1a1a1a] font-mono text-[10px] tracking-[0.4em] uppercase block mb-4 font-bold border-2 border-black inline-block px-3 py-1 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -rotate-2"
            >
              [ HELLO THERE // WELCOME ]
            </motion.span>
            
            <h1 className="text-[10vw] lg:text-[8vw] font-display font-extrabold text-[#1a1a1a] uppercase tracking-tighter leading-[0.82] flex flex-col items-center">
              <StaggeredText text="NAMAN" className="block text-[#1a1a1a]" />
              <StaggeredText text="GAUTAM" className="block mt-1" isOutline={true} />
            </h1>
          </div>
          <div className="max-w-2xl mx-auto space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, type: "spring", stiffness: 100 }}
              className="inline-block px-4 sm:px-8 py-3 sm:py-3.5 rounded-full border-2 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]"
            >
              <p className="text-xs md:text-sm font-sans tracking-[0.08em] sm:tracking-[0.16em] uppercase font-bold text-[#1a1a1a]">
                {resumeData.profile.tagline.toUpperCase()}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#1a1a1a] font-bold"
            >
              <span className="w-10 h-[2px] bg-black" />
              <span className="tracking-widest">ROBOTICS</span>
              <span className="w-2 h-2 bg-primary border border-black rounded-full animate-bounce" />
              <span className="tracking-widest">AI_SYSTEMS</span>
              <span className="w-2 h-2 bg-primary border border-black rounded-full animate-bounce" />
              <span className="tracking-widest">EMBEDDED</span>
              <span className="w-10 h-[2px] bg-black" />
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
          <span className="text-[9px] font-mono font-bold text-[#1a1a1a] tracking-[0.4em] rotate-90 origin-left translate-x-3">SCROLL</span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-primary via-black to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

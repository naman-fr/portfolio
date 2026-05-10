"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import MagneticButton from "./MagneticButton";

function Blob() {
  const mesh = useRef<any>();
  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.distort = 0.4 + Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={2.2}>
        <MeshDistortMaterial
          color="#00ff88"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroV2() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent z-10">
      {/* Background Matrix/Noise */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,255,136,0.1),_transparent_70%)]" />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff88" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff00ff" />
          <Suspense fallback={null}>
            <Blob />
          </Suspense>
        </Canvas>
      </div>

      {/* Kinetic Typography */}
      <div className="relative z-10 text-center px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <span className="text-primary font-mono text-xs tracking-[0.6em] uppercase block mb-4">
              [ SYSTEM_READY_V2.026 ]
            </span>
            <h1 className="text-[12vw] lg:text-[10vw] font-bold text-white uppercase tracking-tighter leading-[0.85] mix-blend-difference">
              NAMAN<br />
              <span className="text-transparent stroke-text">GAUTAM</span>
            </h1>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-sm md:text-base font-mono text-gray-400 tracking-widest uppercase leading-relaxed">
              {resumeData.profile.tagline.toUpperCase()}
            </p>
            <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-primary/60">
              <span className="w-12 h-[1px] bg-primary/20" />
              <span>ROBOTICS</span>
              <span className="w-1 h-1 bg-primary rounded-full" />
              <span>AI_SYSTEMS</span>
              <span className="w-1 h-1 bg-primary rounded-full" />
              <span>EMBEDDED</span>
              <span className="w-12 h-[1px] bg-primary/20" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16"
        >
          <MagneticButton onClick={scrollToProjects}>
            INITIALIZE_ARCHIVE
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[8px] font-mono text-white/20 tracking-widest rotate-90 origin-left translate-x-2">SCROLL</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary via-white/10 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

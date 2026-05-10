"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";

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
      <Sphere args={[1, 100, 100]} scale={2}>
        <MeshDistortMaterial
          color="#00ff88"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
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
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
          <Suspense fallback={null}>
            <Blob />
          </Suspense>
        </Canvas>
      </div>

      {/* Kinetic Typography */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <h1 className="text-huge font-bold text-white uppercase tracking-tighter mix-blend-difference">
            CREATING<br />
            <span className="text-transparent border-t border-b border-white/20 px-4">THE_FUTURE</span>
          </h1>
          <p className="text-xl md:text-2xl font-mono text-primary/80 tracking-widest uppercase">
            [ INDUSTRIAL_INTELLIGENCE_SYSTEMS ]
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12"
        >
          <MagneticButton onClick={scrollToProjects}>
            EXPLORE_WORK
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-primary via-secondary to-transparent" />
      </motion.div>
    </section>
  );
}

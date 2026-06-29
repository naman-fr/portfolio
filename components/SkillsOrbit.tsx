"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const badgeColors = ["#8a8a8a", "#1b9fe5", "#e6a100", "#42a859", "#ff7300", "#9b5de5", "#ff4d4d", "#00bfa6"];

function BadgeMesh({ type }: { type: number }) {
  const index = type % 8;
  const color = badgeColors[index];
  
  if (index === 0) {
    return (
      <mesh>
        <boxGeometry args={[0.26, 0.26, 0.26]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
    );
  } else if (index === 1) {
    return (
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
      </mesh>
    );
  } else if (index === 2) {
    return (
      <mesh>
        <coneGeometry args={[0.18, 0.36, 4]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
    );
  } else if (index === 3) {
    return (
      <mesh>
        <octahedronGeometry args={[0.24, 0]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} />
      </mesh>
    );
  } else if (index === 4) {
    return (
      <mesh>
        <torusGeometry args={[0.15, 0.05, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
    );
  } else if (index === 5) {
    return (
      <mesh>
        <dodecahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
      </mesh>
    );
  } else if (index === 6) {
    return (
      <mesh>
        <coneGeometry args={[0.2, 0.38, 8]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
      </mesh>
    );
  } else {
    return (
      <mesh>
        <tetrahedronGeometry args={[0.24, 0]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
    );
  }
}

function OrbitingIcon({ index, total, label }: { index: number; total: number; label: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const radius = 4.2;
  const angle = (index / total) * Math.PI * 2;
  const activeColor = badgeColors[index % badgeColors.length];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angle + time * 0.15) * radius;
      meshRef.current.position.z = Math.sin(angle + time * 0.15) * radius;
      meshRef.current.position.y = Math.sin(time + index) * 0.4;
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.rotation.x = time * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <BadgeMesh type={index} />
        <Html position={[0, 0.5, 0]} center zIndexRange={[100, 0]}>
          <div 
            className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border-2 shadow-[2px_2px_0_0_#1a1a1a] flex items-center justify-center pointer-events-none whitespace-nowrap"
            style={{ borderColor: activeColor }}
          >
            <span className="font-mono font-black text-[10px] tracking-widest" style={{ color: activeColor }}>{label}</span>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function CentralNode() {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.distort = 0.2 + Math.sin(time * 2) * 0.15;
    }
  });

  return (
    <Sphere args={[1.3, 64, 64]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#e02424" // P5 Red
        speed={1.5}
        distort={0.3}
        radius={1}
        roughness={0.1}
        metalness={0.9}
      />
    </Sphere>
  );
}

import { resumeData } from "../data/resume";

const skills = [
  ...resumeData.skills.languages.slice(0, 3),
  ...resumeData.skills.frameworks.slice(0, 3),
  ...resumeData.skills.infrastructure.slice(0, 3),
  "HADOOP", "HDFS", "BIG_DATA"
].map(s => s.toUpperCase());

export default function SkillsOrbit() {
  const [cameraZ, setCameraZ] = useState(9.5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCameraZ(13.5);
      } else {
        setCameraZ(9.5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="skills" className="h-screen py-32 bg-transparent relative overflow-hidden z-10">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} />
          <ambientLight intensity={1.2} />
          <pointLight position={[10, 10, 10]} intensity={2.0} color="#e02424" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffffff" />
          
          <CentralNode />
          
          {skills.map((skill, i) => (
            <OrbitingIcon key={skill} index={i} total={skills.length} label={skill} />
          ))}
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center space-y-4">
          <span className="text-[#e02424] font-mono font-bold text-sm tracking-[0.4em] uppercase border-b-2 border-[#e02424]/30 pb-1 inline-block bg-white/80 px-4 py-1 rounded-t-lg shadow-sm">[ SKILLS // BADGES ]</span>
          <div className="bg-white/90 p-6 rounded-3xl border-4 border-[#1a1a1a] shadow-[8px_8px_0_0_#e02424] inline-block pointer-events-auto backdrop-blur-md">
            <h2 className="text-5xl md:text-7xl font-display font-black text-[#1a1a1a] tracking-tighter uppercase leading-none">
              TECH STACK
            </h2>
            <p className="text-[#e02424] font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest mt-4">
              [ MY ARSENAL ]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

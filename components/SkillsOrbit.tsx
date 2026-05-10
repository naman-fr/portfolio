"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function OrbitingIcon({ index, total, label }: { index: number; total: number; label: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const radius = 4;
  const angle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angle + time * 0.2) * radius;
      meshRef.current.position.z = Math.sin(angle + time * 0.2) * radius;
      meshRef.current.position.y = Math.sin(time + index) * 0.5;
      meshRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#00ff88" wireframe />
        </mesh>
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </Float>
    </group>
  );
}

function CentralNode() {
  return (
    <Sphere args={[1.5, 64, 64]}>
      <MeshDistortMaterial
        color="#ff00ff"
        speed={3}
        distort={0.3}
        radius={1}
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
  return (
    <section id="skills" className="h-screen py-32 bg-transparent relative overflow-hidden z-10">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
          
          <CentralNode />
          
          {skills.map((skill, i) => (
            <OrbitingIcon key={skill} index={i} total={skills.length} label={skill} />
          ))}
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center space-y-4">
          <span className="text-secondary font-mono text-sm tracking-[0.4em] uppercase">[ 04:_INTELLIGENCE_STACK ]</span>
          <h2 className="text-huge font-bold text-white tracking-tighter uppercase leading-none">CORE</h2>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-8">
            [ DISTRIBUTED_CORES_&_AGENTIC_MODELS ]
          </p>
        </div>
      </div>
    </section>
  );
}

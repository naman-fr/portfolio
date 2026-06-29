"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF, Float, Center, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Preload the model
useGLTF.preload("/poke.glb");

function PokeModel() {
  const { scene } = useGLTF("/poke.glb");
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const targetX = state.pointer.y * 0.2;
    const targetY = state.pointer.x * 0.2;
    
    if (groupRef.current) {
      // Parallax effect on mouse move
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      // Continuous slow rotation
      groupRef.current.rotation.y += 0.003; 
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.5}>
        <Center>
          <primitive object={scene} scale={2.5} />
        </Center>
      </Float>
      {/* Floating particles around the Pokeball */}
      <Sparkles count={120} scale={10} size={6} speed={0.3} opacity={0.8} color="#e02424" />
      <Sparkles count={80} scale={12} size={4} speed={0.2} opacity={0.6} color="#1a1a1a" />
      <Sparkles count={50} scale={8} size={8} speed={0.4} opacity={0.5} color="#ffffff" />
    </group>
  );
}

export default function EarthBackground() {
  const [cameraZ, setCameraZ] = useState(8);
  const [groupPos, setGroupPos] = useState<[number, number, number]>([0, -0.5, 0]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCameraZ(9.5);
        setGroupPos([0, -1.6, 0]);
      } else {
        setCameraZ(8);
        setGroupPos([0, -0.5, 0]);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden bg-[#fcfbf9]">
      {/* Dynamic warm spotlight background ambient glow (P5 Red) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(224,36,36,0.12),_transparent_75%)]" />
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1),_transparent_70%)] rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,_rgba(26,26,26,0.05),_transparent_70%)] rounded-full filter blur-3xl pointer-events-none" />
      
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={45} />
        
        {/* Lights for the Pokeball */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#e02424" />
        <pointLight position={[10, -10, 10]} intensity={1.0} color="#ffffff" />

        <Suspense fallback={null}>
          <group position={groupPos}>
            <PokeModel />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF, Float, Center, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Preload the model
useGLTF.preload("/poke.glb");

function FloatingShape({ position, color, type, speedFactor = 1 }: { position: [number, number, number], color: string, type: 'star' | 'diamond' | 'ring', speedFactor?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const px = state.pointer.x * 0.5;
    const py = state.pointer.y * 0.5;
    
    if (meshRef.current) {
      // Rotation reacting to mouse pointer coordinates
      meshRef.current.rotation.x = time * 0.4 * speedFactor + py * 0.5;
      meshRef.current.rotation.y = time * 0.3 * speedFactor + px * 0.5;
      
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + position[0]) * 0.25;
      meshRef.current.position.x = position[0] + Math.cos(time * 0.5 + position[2]) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {type === 'star' ? (
        <tetrahedronGeometry args={[0.22, 0]} />
      ) : type === 'diamond' ? (
        <octahedronGeometry args={[0.18, 0]} />
      ) : (
        <torusGeometry args={[0.14, 0.04, 8, 16]} />
      )}
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

function PokeModel({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF("/poke.glb");
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const targetX = state.pointer.y * 0.3;
    const targetY = state.pointer.x * 0.3;
    
    if (groupRef.current) {
      // Parallax effect on mouse move
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      // Continuous slow rotation
      groupRef.current.rotation.y += 0.002; 
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.5}>
        <Center>
          <primitive object={scene} scale={isMobile ? 0.1 : 0.18} />
        </Center>
      </Float>
      {/* Floating particles around the Pokeball */}
      <Sparkles count={80} scale={8} size={4} speed={0.3} opacity={0.8} color="#e02424" />
      <Sparkles count={50} scale={10} size={3} speed={0.2} opacity={0.6} color="#f9db34" />
      <Sparkles count={30} scale={6} size={5} speed={0.4} opacity={0.5} color="#ffffff" />
      
      {/* Anime / Persona style floating 3D markers */}
      <FloatingShape position={[-2.2, 1.5, -1]} color="#f9db34" type="star" speedFactor={1.2} />
      <FloatingShape position={[2.4, -0.8, -2]} color="#e02424" type="diamond" speedFactor={0.8} />
      <FloatingShape position={[-1.8, -1.2, -1.5]} color="#1b9fe5" type="ring" speedFactor={1.5} />
      <FloatingShape position={[2.0, 1.8, -1.2]} color="#ffffff" type="star" speedFactor={0.9} />
    </group>
  );
}

export default function EarthBackground() {
  const [cameraZ, setCameraZ] = useState(8);
  const [groupPos, setGroupPos] = useState<[number, number, number]>([0, -0.5, 0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setCameraZ(9.5);
        setGroupPos([0, -2.4, 0]); // Pushed way down on mobile to avoid overlapping hero text
      } else {
        setCameraZ(8);
        setGroupPos([2.5, 0.4, 0]); // Pushed to the right on desktop to clear text space
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden bg-transparent">
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
            <PokeModel isMobile={isMobile} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

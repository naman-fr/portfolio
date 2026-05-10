"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
// #region agent log
const logDebug = (location: string, message: string, data: any, hypothesisId: string) => {
  const payload = {location,message,data,timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId};
  console.log('[DEBUG]', payload);
  fetch('http://127.0.0.1:7242/ingest/4c46af64-f425-4826-8dc9-6d583fd34651',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
};
// #endregion

function KernelMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  // #region agent log
  logDebug('components/Kernel3D.tsx:15','KernelMesh component created',{hasRef:!!meshRef.current},'D');
  // #endregion

  useFrame((state, delta) => {
    // #region agent log
    if (Math.random() < 0.01) {
      logDebug('components/Kernel3D.tsx:21','useFrame executing',{hasMesh:!!meshRef.current,delta},'D');
    }
    // #endregion
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#00FF41"
          wireframe
          emissive="#00FF41"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#7C3AED"
          wireframe
          emissive="#7C3AED"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#F59E0B"
          wireframe
          emissive="#F59E0B"
          emissiveIntensity={0.5}
        />
      </mesh>
    </>
  );
}

export default function Kernel3D() {
  // #region agent log
  logDebug('components/Kernel3D.tsx:59','Kernel3D component render',{threeLoaded:typeof THREE!=='undefined'},'D');
  // #endregion
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00FF41" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7C3AED" />
        <KernelMesh />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

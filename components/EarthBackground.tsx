"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Generate points representing continents/particles on a sphere
function generateSpherePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Golden ratio distribution for even spacing on a sphere
    const k = i + 0.5;
    const phi = Math.acos(1 - (2 * k) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * k;

    // Convert spherical coordinates to Cartesian
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

interface ArcData {
  curve: THREE.QuadraticBezierCurve3;
  points: THREE.Vector3[];
  speed: number;
  offset: number;
}

function GlobeNetwork({ radius }: { radius: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate globe particles
  const particleCount = 1200;
  const positions = useMemo(() => generateSpherePoints(particleCount, radius), [radius]);

  // Generate connection arcs between random points on the sphere
  const arcCount = 12;
  const arcs = useMemo(() => {
    const generatedArcs: ArcData[] = [];
    const pointsArr: THREE.Vector3[] = [];

    // Map float array back to Vector3s
    for (let i = 0; i < particleCount; i++) {
      pointsArr.push(new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]));
    }

    for (let i = 0; i < arcCount; i++) {
      // Pick two random nodes
      const startIdx = Math.floor(Math.random() * pointsArr.length);
      let endIdx = Math.floor(Math.random() * pointsArr.length);
      while (startIdx === endIdx) {
        endIdx = Math.floor(Math.random() * pointsArr.length);
      }

      const p1 = pointsArr[startIdx];
      const p2 = pointsArr[endIdx];

      // Calculate midpoint and extrude it outwards to form an arch
      const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      midPoint.normalize().multiplyScalar(radius + dist * 0.35); // Height of the arc depends on distance

      const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
      generatedArcs.push({
        curve,
        points: curve.getPoints(30),
        speed: 0.2 + Math.random() * 0.4,
        offset: Math.random() * 100,
      });
    }
    return generatedArcs;
  }, [positions, radius]);

  // Animate rotation of the globe
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.04;
      groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Globe Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#dfc7b3" // Beige secondary color
          transparent
          opacity={0.45}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>

      {/* Network Rings */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[radius * 1.05, radius * 1.055, 64]} />
        <meshBasicMaterial color="#c9a080" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <ringGeometry args={[radius * 1.08, radius * 1.085, 64]} />
        <meshBasicMaterial color="#dfc7b3" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>

      {/* Connection Arcs & Pulse Points */}
      {arcs.map((arc, i) => (
        <group key={i}>
          {/* Static Arc Line */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array(arc.points.flatMap((p) => [p.x, p.y, p.z])),
                  3,
                ]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#f27b50" // Coral primary color
              transparent
              opacity={0.2}
              linewidth={1}
            />
          </line>
          
          {/* Animated Glowing Packet */}
          <PulsePacket curve={arc.curve} speed={arc.speed} offset={arc.offset} />
        </group>
      ))}
    </group>
  );
}

// Subcomponent to animate a packet flowing along the arc path
function PulsePacket({ curve, speed, offset }: { curve: THREE.QuadraticBezierCurve3; speed: number; offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const t = ((time * speed + offset) % 1); // Value between 0 and 1
    
    if (meshRef.current) {
      const pos = curve.getPointAt(t);
      meshRef.current.position.set(pos.x, pos.y, pos.z);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color="#f27b50" toneMapped={false} />
    </mesh>
  );
}

export default function EarthBackground() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden bg-[#0e0d0b]">
      {/* Dynamic warm spotlight background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(242,123,80,0.06),_transparent_75%)]" />
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,_rgba(223,199,179,0.03),_transparent_70%)] rounded-full filter blur-3xl pointer-events-none" />
      
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#dfc7b3" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f27b50" />

        <Suspense fallback={null}>
          {/* We position the Globe slightly off-center and lower for better layout balance */}
          <group position={[0, -0.5, 0]}>
            <GlobeNetwork radius={3.2} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

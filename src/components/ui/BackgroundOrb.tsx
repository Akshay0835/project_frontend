"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle constant rotation
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.z += delta * 0.05;

      // Mouse interaction
      const pointerX = state.pointer.x;
      const pointerY = state.pointer.y;
      
      meshRef.current.position.x += (pointerX * 0.5 - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (pointerY * 0.5 - meshRef.current.position.y) * 0.05;

      // Scroll interaction
      const scrollY = window.scrollY;
      meshRef.current.position.z = scrollY * 0.002;
      meshRef.current.rotation.x = scrollY * 0.001;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 128, 128]}>
        <MeshDistortMaterial
          color="#050505"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

export default function BackgroundOrb() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#020202]">
      {/* Decorative ambient lighting for the background container */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full h-full opacity-80">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.5} />
          
          {/* Dramatic colored lighting to reflect on the dark orb */}
          <directionalLight position={[5, 5, 5]} intensity={2} color="#00f0ff" />
          <directionalLight position={[-5, -5, -5]} intensity={2} color="#8b5cf6" />
          <pointLight position={[0, 0, -2]} intensity={1} color="#23d096ff" />
          
          {/* Environment maps give the dark metal reflections */}
          <Environment preset="city" />

          <React.Suspense fallback={null}>
            <Orb />
          </React.Suspense>
        </Canvas>
      </div>
    </div>
  );
}

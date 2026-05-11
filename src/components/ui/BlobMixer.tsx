"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Environment, Float, Lightformer, ContactShadows, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function AbstractCore() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      
      // Smooth parallax scroll
      groupRef.current.position.y = scrollY * 0.002;
      
      // Majestic, slow, eye-catchy rotation
      groupRef.current.rotation.x += delta * 0.05;
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -8]}>
      {/* Outer Cyan Wireframe */}
      <mesh>
        <torusKnotGeometry args={[5, 1.5, 256, 32]} />
        <meshStandardMaterial 
          color="#00f0ff"
          wireframe={true}
          transparent={true}
          opacity={0.15}
          emissive="#00f0ff"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Inner Emerald Wireframe */}
      <mesh scale={0.95}>
        <torusKnotGeometry args={[5, 1.5, 128, 16]} />
        <meshStandardMaterial 
          color="#23d096"
          wireframe={true}
          transparent={true}
          opacity={0.15}
          emissive="#23d096"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<any>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.z += delta * 0.1;

      // Mouse interaction
      const pointerX = state.pointer.x;
      const pointerY = state.pointer.y;

      meshRef.current.position.x += (pointerX * 0.5 - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (pointerY * 0.5 - meshRef.current.position.y) * 0.05;

      // Scroll interaction
      const scrollY = window.scrollY;
      meshRef.current.position.z = scrollY * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 256, 256]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#ffffff"
          roughness={0.1}
          metalness={0.5}
          transparent={true}
          opacity={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          distort={0.6}
          speed={2.5}
        />
      </Sphere>
    </Float>
  );
}

export default function BlobMixer() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#050505]">
      {/* Pure minimalist background, no colored glows */}

      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.4} />

          {/* Subtle directional lights to give shape */}
          <directionalLight position={[5, 5, 2]} intensity={1} color="#ffffff" />
          <directionalLight position={[-5, -5, -2]} intensity={0.5} color="#ffffff" />

          {/* Background Abstract Geometric Core that reacts to scroll */}
          <AbstractCore />

          {/* Environment maps for clear, colorless glass reflections (Studio Setup) */}
          <Environment resolution={512}>
            <group rotation={[-Math.PI / 4, -0.3, 0]}>
              <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#ffffff" />
              <Lightformer intensity={3} rotation-x={Math.PI / 2} position={[0, -5, -9]} scale={[10, 10, 1]} color="#aaaaaa" />
              <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 0, -9]} scale={[10, 10, 1]} color="#ffffff" />
            </group>
          </Environment>

          <React.Suspense fallback={null}>
            <Blob />
            <ContactShadows
              position={[0, -2.5, 0]}
              opacity={0.4}
              scale={15}
              blur={2.5}
              far={4}
              color="#000000"
            />
          </React.Suspense>
        </Canvas>
      </div>
    </div>
  );
}

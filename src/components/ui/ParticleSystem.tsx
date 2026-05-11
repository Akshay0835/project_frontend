"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  
  // Create random points inside a sphere
  const sphere = useMemo(() => {
    const numParticles = 3000;
    const positions = new Float32Array(numParticles * 3);
    
    for (let i = 0; i < numParticles; i++) {
      const radius = 2.5;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = Math.cbrt(Math.random()) * radius;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Gentle base rotation
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      // Interactive floating effect based on mouse position
      const pointerX = state.pointer.x;
      const pointerY = state.pointer.y;
      
      // Responsive to scroll (Parallax effect)
      const scrollY = window.scrollY;
      
      // 1. Mouse-based interaction (smooth rotation)
      ref.current.rotation.y += (pointerX * 0.2 - ref.current.rotation.y) * 0.05;
      ref.current.rotation.x += (-pointerY * 0.2 - ref.current.rotation.x) * 0.05;
      
      // 2. Pure Vertical Parallax (Moves up as you scroll down)
      ref.current.position.y = scrollY * 0.0015;
      
      // 3. Subtle Zoom (Moves slightly towards camera on scroll)
      ref.current.position.z = scrollY * 0.0005;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function ParticleSystem() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-brand-dark to-brand-darker">
      {/* Fallback pattern for very small screens or low power devices */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-cyan/5 to-transparent block md:hidden pointer-events-none" />
      
      <div className="hidden md:block w-full h-full">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <React.Suspense fallback={null}>
            <Particles />
          </React.Suspense>
        </Canvas>
      </div>
    </div>
  );
}

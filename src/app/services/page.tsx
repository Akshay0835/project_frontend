"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

const services = [
  {
    title: "Web Development",
    description: "High-performance architectures built with modern frameworks like Next.js.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>',
    accent: "cyan",
  },
  {
    title: "3D Experiences",
    description: "Immersive WebGL and React Three Fiber environments.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="m21 12-9-6-9 6 9 6 9-6Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m21 12-9 6v6" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9 6v6" /></svg>',
    accent: "emerald",
  },
  {
    title: "UI/UX Design",
    description: "Premium visual systems and intuitive user journeys.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.813-3.814a1.125 1.125 0 0 0-1.59-1.59l-3.814 3.813m-4.764 4.648 3.813-3.813m2.268-2.268L15.75 6.75" /></svg>',
    accent: "purple",
  },
  {
    title: "Creative Direction",
    description: "End-to-end brand strategy and visual storytelling.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" /></svg>',
    accent: "cyan",
  },
];

const TiltCard = ({ service, index }: { service: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const borderClass = 
    service.accent === "cyan" ? "hover:border-cyan-500/50" : 
    service.accent === "emerald" ? "hover:border-emerald-500/50" : 
    "hover:border-purple-500/50";

  const glowClass = 
    service.accent === "cyan" ? "from-cyan-500/20" : 
    service.accent === "emerald" ? "from-emerald-500/20" : 
    "from-purple-500/20";

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-lg border border-white/10 transition-colors duration-300 ${borderClass} group cursor-pointer`}
      >
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${glowClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10`} 
          style={{ transform: "translateZ(-20px)" }}
        />
        
        <div style={{ transform: "translateZ(40px)" }} className="flex flex-col gap-3 sm:gap-4">
          <div className="text-white mb-1 sm:mb-2" dangerouslySetInnerHTML={{ __html: service.icon }} />
          <h3 className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">{service.title}</h3>
          <p className="text-sm sm:text-base text-slate-300">{service.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ServicesPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center relative overflow-hidden w-full">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            Our <span className="text-cyan-400">Services</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            We deliver end-to-end digital solutions designed to elevate your brand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <TiltCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

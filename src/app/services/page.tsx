"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

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
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMobile || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    mouseX.set(mX);
    mouseY.set(mY);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
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

  const backgroundTemplate = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      var(--tw-gradient-from),
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={isMobile ? { opacity: 0, rotateX: 60, y: 30, scale: 0.9 } : { opacity: 0, scale: 0.9, y: 50 }}
      whileInView={isMobile ? { opacity: 1, rotateX: 0, y: 0, scale: 1 } : { opacity: 1, scale: 1, y: 0 }}
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
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full p-8 sm:p-10 rounded-3xl bg-[#050505]/80 backdrop-blur-xl border border-white/[0.05] transition-colors duration-500 ${borderClass} group cursor-pointer overflow-hidden shadow-2xl`}
      >
        {/* Desktop Dynamic Spotlight */}
        {!isMobile && (
          <motion.div
            className={`absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${glowClass.replace('/20', '')}`}
            style={{
              background: backgroundTemplate,
              opacity: 0.15
            }}
          />
        )}

        {/* Mobile Automated Pulsing Glow */}
        {isMobile && (
          <motion.div
            className={`absolute inset-0 z-0 opacity-20 ${glowClass.replace('/20', '')}`}
            animate={{
              background: [
                "radial-gradient(400px circle at 0% 0%, var(--tw-gradient-from), transparent 70%)",
                "radial-gradient(400px circle at 100% 100%, var(--tw-gradient-from), transparent 70%)",
                "radial-gradient(400px circle at 0% 100%, var(--tw-gradient-from), transparent 70%)",
                "radial-gradient(400px circle at 0% 0%, var(--tw-gradient-from), transparent 70%)"
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Deep 3D Content Translation */}
        <div style={{ transform: isMobile ? "none" : "translateZ(60px)" }} className="flex flex-col gap-4 sm:gap-6 relative z-10 group-hover:scale-105 transition-transform duration-500">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white mb-2 shadow-inner shadow-white/5 group-hover:bg-white/[0.08] transition-colors duration-500" dangerouslySetInnerHTML={{ __html: service.icon }} />
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">{service.title}</h3>
            <p className="text-base sm:text-lg text-slate-400 mt-2 leading-relaxed font-light">{service.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ServicesPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center relative overflow-hidden w-full">
      
      {/* Unique Services Section Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] sm:w-[60vw] sm:h-[60vw] bg-emerald-600/20 sm:bg-emerald-600/10 rounded-full blur-[100px] sm:blur-[150px] mix-blend-screen opacity-80 sm:opacity-70" />
        {/* Subtle diagonal technical pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 40px)' }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24 relative p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/[0.05] max-w-4xl mx-auto shadow-2xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-8 text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Services</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto px-4 font-light leading-relaxed">
            We deliver end-to-end digital solutions designed to elevate your brand through uncompromising design and elite engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {services.map((service, index) => (
            <TiltCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Discovery & Strategy",
    description: "We dive deep into your brand, understanding your goals and architecting a digital strategy that sets the foundation for success.",
  },
  {
    id: "02",
    title: "Design & Prototyping",
    description: "Crafting visually stunning, high-fidelity prototypes that define the user experience and visual language.",
  },
  {
    id: "03",
    title: "Development & Engineering",
    description: "Building robust, scalable architectures using Next.js and Three.js for seamless, high-performance execution.",
  },
  {
    id: "04",
    title: "Launch & Optimization",
    description: "Rigorous testing and deployment, followed by continuous monitoring and optimization to ensure peak performance.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative py-32 px-6 w-full flex flex-col items-center overflow-hidden">
      
      {/* Unique Process Section Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {/* Subtle timeline mesh/pillars */}
        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent left-[15%] hidden md:block" />
        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent right-[15%] hidden md:block" />
        {/* Central timeline glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[150vw] sm:w-[80vw] sm:h-[40vw] bg-[radial-gradient(ellipse,rgba(6,182,212,0.15)_0%,rgba(16,185,129,0.1)_50%,transparent_70%)] mix-blend-screen opacity-80 sm:opacity-50" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24 bg-black/40 backdrop-blur-xl p-10 md:p-14 rounded-[2.5rem] border border-white/[0.05] mx-auto max-w-4xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          
          <span className="text-emerald-400 font-semibold tracking-[0.3em] uppercase text-xs mb-6 block">How We Work</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Process</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-800 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan-400 to-emerald-400 w-full origin-top"
              style={{ scaleY: scrollYProgress, height: "100%" }}
            />
          </div>

          <div className="flex flex-col gap-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <StepItem key={step.id} step={step} index={index} isEven={isEven} isMobile={isMobile} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, index, isEven, isMobile }: { step: any; index: number; isEven: boolean; isMobile: boolean }) {
  return (
    <motion.div
      initial={isMobile ? { opacity: 0, x: isEven ? -100 : 100, scale: 0.9 } : { opacity: 0, y: 50 }}
      whileInView={isMobile ? { opacity: 1, x: 0, scale: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-50px" : "-150px" }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Node / Icon */}
      <div className="absolute left-8 md:left-1/2 w-14 h-14 rounded-full border border-slate-700/50 flex items-center justify-center -translate-x-1/2 z-10 bg-[#050505] overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <motion.div 
          className="absolute inset-0 border-[2px] border-emerald-400 rounded-full scale-0 opacity-0"
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        <span className="relative z-10 text-sm font-bold text-slate-400 group-hover:text-emerald-300 transition-colors duration-300">
          {step.id}
        </span>
      </div>

      {/* Content */}
      <div className={`w-full md:w-1/2 flex ${isEven ? "justify-start pl-24 md:pl-0" : "justify-end pl-24 md:pl-0"}`}>
        <motion.div 
          whileHover={isMobile ? {} : { scale: 1.03, y: -5 }}
          className={`bg-[#030303]/80 backdrop-blur-xl border border-white/[0.05] p-8 md:p-10 rounded-[2rem] max-w-md w-full relative overflow-hidden group shadow-2xl transition-all duration-500 ${!isMobile ? 'hover:border-emerald-500/30 hover:shadow-[0_10px_40px_rgba(52,211,153,0.1)]' : ''} ${
            isEven ? "md:mr-auto" : "md:ml-auto"
          }`}
        >
          {/* Subtle Hover Glow (Desktop) */}
          {!isMobile && <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
          
          {/* Automated Pulsing Glow (Mobile) */}
          {isMobile && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10"
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
            />
          )}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,transparent_70%)] rounded-full group-hover:bg-[radial-gradient(circle,rgba(16,185,129,0.25)_0%,transparent_70%)] transition-colors duration-500" />
          
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 relative z-10 text-white group-hover:text-emerald-300 transition-colors duration-300">{step.title}</h3>
          <p className="text-slate-400 relative z-10 leading-relaxed font-light text-sm sm:text-base">{step.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

"use client";

import { useRef } from "react";
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative py-32 px-6 w-full flex flex-col items-center">
      <div className="container mx-auto max-w-5xl relative">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24 bg-black/60 backdrop-blur-md p-10 rounded-3xl border border-white/10 mx-auto max-w-3xl shadow-xl"
        >
          <span className="text-emerald-400 font-semibold tracking-widest uppercase text-sm mb-4 block">How We Work</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Process</span>
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
                <StepItem key={step.id} step={step} index={index} isEven={isEven} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, index, isEven }: { step: any; index: number; isEven: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Node / Icon */}
      <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-full glass border border-slate-700 flex items-center justify-center -translate-x-1/2 z-10 bg-brand-dark overflow-hidden group">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0"
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <span className="relative z-10 text-sm font-bold text-slate-300 group-hover:text-white transition-colors duration-300">
          {step.id}
        </span>
      </div>

      {/* Content */}
      <div className={`w-full md:w-1/2 flex ${isEven ? "justify-start pl-20 md:pl-0" : "justify-end pl-20 md:pl-0"}`}>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl max-w-md w-full relative overflow-hidden group shadow-xl ${
            isEven ? "md:mr-auto" : "md:ml-auto"
          }`}
        >
          {/* Subtle Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <h3 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-cyan-300 transition-colors duration-300">{step.title}</h3>
          <p className="text-slate-400 relative z-10 leading-relaxed">{step.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

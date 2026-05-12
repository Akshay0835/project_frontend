"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const PREMIUM_EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yCards = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: any = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: PREMIUM_EASING },
    },
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-center items-center perspective-1000">
      {/* Main Content Overlay */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="z-10 container mx-auto px-6 text-center flex flex-col items-center max-w-5xl"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          <motion.div variants={itemVariants} className="overflow-hidden mb-6">
            <div className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
              <span className="text-cyan-300 tracking-widest uppercase text-xs md:text-sm font-semibold drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                Digital Excellence
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-white mb-6 leading-[1.05]"
          >
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Premium</span> <br className="hidden md:block" />
            Digital Realities.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed font-light"
          >
            We are TSC Web Development Agency. We engineer immersive, high-performance web applications that blur the line between code and art.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto text-center group relative px-6 py-3 sm:px-8 sm:py-4 bg-white/5 overflow-hidden rounded-full font-medium tracking-wide border border-white/10 backdrop-blur-md text-white hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-500">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Your Project
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 transition-all duration-500 ease-out group-hover:w-full"></div>
            </Link>
            <Link href="/portfolio" className="group text-slate-400 hover:text-white font-medium tracking-wide transition-colors duration-300 flex items-center gap-2">
              View Our Work
              <div className="w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-6" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Elegant Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-medium">Scroll</span>
        <div className="w-[1px] h-16 bg-white/10 overflow-hidden relative">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

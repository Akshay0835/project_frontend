"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TAGLINE = "Turning Simple Business into BRAND";

export default function CurtainHero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate progress based on the 300vh container (approx 3 * window.innerHeight)
      const containerHeight = window.innerHeight * 3;
      // Scrollable distance is containerHeight - window.innerHeight
      const maxScroll = containerHeight - window.innerHeight;
      
      if (maxScroll <= 0) return;
      
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 1. Tagline fades out early (0 to 10%)
  const taglineOpacity = scrollProgress < 0.1 ? 1 - (scrollProgress / 0.1) : 0;
  const taglineScale = 1 + (scrollProgress * 0.5);

  // 2. Curtains split (10% to 40%)
  const curtainProgress = scrollProgress < 0.1 ? 0 : scrollProgress > 0.4 ? 1 : (scrollProgress - 0.1) / 0.3;
  const leftCurtainX = `-${curtainProgress * 100}%`;
  const rightCurtainX = `${curtainProgress * 100}%`;
  
  // 3. Cinematic Laser Reveal Light
  // Glows intensely as curtains just start opening, then fades as they fully open.
  const laserOpacity = scrollProgress < 0.1 ? 0 : scrollProgress > 0.4 ? 0 : scrollProgress < 0.25 ? (scrollProgress - 0.1) / 0.15 : 1 - ((scrollProgress - 0.25) / 0.15);
  // Laser width scales horizontally with the curtain gap
  const laserWidthCore = `${(curtainProgress * 80) + 1}px`;
  const laserWidthGlow = `${(curtainProgress * 200) + 10}px`;
  
  // 4. Grid fades and zooms in (20% to 50%)
  const gridOpacity = scrollProgress < 0.2 ? 0 : scrollProgress > 0.5 ? 1 : (scrollProgress - 0.2) / 0.3;
  const gridScale = 0.85 + (gridOpacity * 0.15); // Dramatic zoom in

  // Framer Motion variants

  const sentenceVariants: import("framer-motion").Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const letterVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  return (
    <section className="relative w-full h-[300vh] bg-transparent">
      {/* Sticky viewport container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-transparent flex flex-col items-center justify-center">
        
        {/* --- Premium Background (Revealed behind curtains) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Beautiful fading grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
          
          {/* Subtle central volumetric glow */}
          <div className="absolute w-[200vw] h-[200vw] sm:w-[80vw] sm:h-[80vw] max-w-4xl max-h-4xl bg-cyan-500/20 sm:bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] opacity-80 sm:opacity-60 mix-blend-screen" />
          <div className="absolute w-[150vw] h-[150vw] sm:w-[60vw] sm:h-[60vw] max-w-2xl max-h-2xl bg-emerald-500/20 sm:bg-emerald-500/10 rounded-full blur-[60px] sm:blur-[80px] opacity-70 sm:opacity-40 mix-blend-screen" />
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        </div>

        {/* --- 1. The Reveal: Dynamic Tech Grid --- */}
        <motion.div 
          style={{ opacity: gridOpacity, scale: gridScale }}
          className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center p-2 sm:p-8 md:p-16 lg:p-24 z-10 w-full max-w-[1600px] mx-auto gap-4 sm:gap-8 lg:gap-20"
        >
          {/* Web Dev - 80% */}
          <div className="w-full lg:w-[80%] flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-2 sm:mb-8 lg:mb-12 relative"
            >
              <h3 className="text-cyan-400/60 uppercase tracking-[0.2em] lg:tracking-[0.3em] text-[8px] sm:text-[10px] font-bold mb-1 sm:mb-4 flex items-center gap-3 lg:gap-4">
                <span className="w-6 sm:w-12 h-[1px] bg-cyan-400/40"></span>
                01 // Engineering
              </h3>
              <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
                Web Development <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-emerald-300 font-medium drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Technologies.</span>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 place-items-stretch">
              {webDevIcons.map((tech, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-1 sm:gap-4 group p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border-t border-white/[0.1] border-l border-white/[0.05] border-b border-transparent border-r border-transparent hover:from-white/[0.08] hover:to-white/[0.02] hover:border-white/[0.15] transition-all duration-500 sm:hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_40px_rgba(34,211,238,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 shrink-0 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 shadow-inner flex items-center justify-center text-white/50 group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-all duration-500 sm:group-hover:scale-110 sm:group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] relative z-10">
                    <div className="scale-75 sm:scale-100 flex items-center justify-center">{tech.svg}</div>
                  </div>
                  <span className="text-[9px] sm:text-xs md:text-sm text-slate-300 group-hover:text-white transition-colors tracking-wide font-medium text-center sm:text-left relative z-10">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Teaching - 20% */}
          <div className="w-full lg:w-[20%] flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/[0.05] pt-3 sm:pt-8 lg:pt-0 lg:pl-16 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent hidden lg:block" />
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-2 sm:mb-8 lg:mb-12"
            >
              <h3 className="text-emerald-400/60 uppercase tracking-[0.2em] lg:tracking-[0.3em] text-[8px] sm:text-[10px] font-bold mb-1 sm:mb-4 flex items-center gap-3 lg:gap-4">
                <span className="w-6 sm:w-12 h-[1px] bg-emerald-400/40"></span>
                02 // Mentorship
              </h3>
              <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
                Code <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 font-medium drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Mastery.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-6 lg:gap-10">
              {teachingIcons.map((item, i) => (
                <div key={i} className="flex flex-col gap-1 sm:gap-4 group cursor-default p-2 sm:p-0 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border-t border-white/[0.1] border-l border-white/[0.05] sm:bg-none sm:border-none relative overflow-hidden sm:overflow-visible">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 block sm:hidden" />
                  <div className="w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 shadow-inner flex items-center justify-center text-white/50 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] relative z-10">
                    <div className="scale-75 sm:scale-100 flex items-center justify-center">{item.svg}</div>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-white text-[8px] sm:text-sm md:text-base font-medium tracking-wide mb-0 sm:mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-[9px] sm:text-xs leading-relaxed max-w-[240px] font-light hidden sm:block">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- 2. Cinematic Laser Beam Reveal --- */}
        <motion.div 
          style={{ opacity: laserOpacity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full z-20 flex items-center justify-center pointer-events-none mix-blend-screen"
        >
          <motion.div style={{ width: laserWidthCore }} className="h-full bg-white blur-[4px]" />
          <motion.div style={{ width: laserWidthGlow }} className="absolute h-full bg-cyan-400/80 blur-[20px]" />
          <motion.div style={{ width: `calc(${laserWidthGlow} * 2)` }} className="absolute h-full bg-emerald-500/40 blur-[60px]" />
        </motion.div>

        {/* --- 3. The Curtains --- */}
        {/* Left Curtain */}
        <motion.div 
          style={{ x: leftCurtainX === "-0%" ? "0%" : leftCurtainX }}
          className="absolute top-0 left-0 w-1/2 h-full bg-[#050505]/60 backdrop-blur-[100px] z-40 origin-left will-change-transform shadow-[20px_0_100px_rgba(0,0,0,1)] border-r border-white/[0.1] overflow-hidden"
        >
          {/* 3D Bevel Edge */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />
          {/* Subtle noise texture on the curtain */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
          {/* Intense luminous inner edge */}
          <div className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_rgba(34,211,238,1)]" />
          <div className="absolute right-0 top-0 w-[3px] h-full bg-cyan-400/30 blur-sm" />
        </motion.div>
        
        {/* Right Curtain */}
        <motion.div 
          style={{ x: rightCurtainX }}
          className="absolute top-0 right-0 w-1/2 h-full bg-[#050505]/60 backdrop-blur-[100px] z-40 origin-right will-change-transform shadow-[-20px_0_100px_rgba(0,0,0,1)] border-l border-white/[0.1] overflow-hidden"
        >
          {/* 3D Bevel Edge */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
          {/* Subtle noise texture on the curtain */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
          {/* Intense luminous inner edge */}
          <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-300 to-transparent shadow-[0_0_15px_rgba(52,211,153,1)]" />
          <div className="absolute left-0 top-0 w-[3px] h-full bg-emerald-400/30 blur-sm" />
        </motion.div>

        {/* --- 4. Initial Tagline --- */}
        <motion.div 
          style={{ opacity: taglineOpacity, scale: taglineScale }}
          className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none px-4 sm:px-6"
        >
          <motion.h1 
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl md:text-[7vw] font-medium text-center text-white tracking-tighter leading-[1.05] max-w-7xl flex flex-wrap justify-center gap-x-[0.15em] sm:gap-x-[0.2em] drop-shadow-2xl"
          >
            {TAGLINE.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block overflow-hidden pb-4 sm:pb-8">
                {word.split("").map((char, charIndex) => {
                  const isBrand = word === "BRAND";
                  return (
                    <motion.span 
                      key={charIndex} 
                      variants={letterVariants}
                      className={`inline-block ${isBrand ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-emerald-300 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]" : ""}`}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </motion.h1>

          {/* Premium Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-6 sm:bottom-12 flex flex-col items-center gap-3 sm:gap-5"
          >
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.5em] text-white/50 font-bold">Scroll</span>
            <div className="w-[1px] h-12 sm:h-20 bg-white/10 relative overflow-hidden">
              <motion.div 
                animate={{ y: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/80 to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}


// ---------------- Icons Data ---------------- //

const webDevIcons = [
  {
    name: "React",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(90 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    name: "Next.js",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M15 12L9 6V18" />
      </svg>
    )
  },
  {
    name: "TypeScript",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 10V16" />
        <path d="M7 10H11" />
        <path d="M13 14.5C13 15.3284 14.1193 16 15 16C15.8807 16 17 15.3284 17 14.5C17 13.6716 15.8807 13.5 15 13.5C14.1193 13.5 13 13.3284 13 12.5C13 11.6716 14.1193 11 15 11C15.8807 11 17 11.6716 17 12.5" />
      </svg>
    )
  },
  {
    name: "Node.js",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2L20.6603 7V17L12 22L3.33975 17V7L12 2Z" />
        <path d="M12 12L20.6603 7" strokeOpacity="0.3" />
        <path d="M12 12L3.33975 7" strokeOpacity="0.3" />
        <path d="M12 12V22" strokeOpacity="0.3" />
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M5 13C5 13 6 9 10 9C14 9 14.5 11.5 16 11.5C17.5 11.5 19 9 19 9" />
        <path d="M5 17C5 17 6 13 10 13C14 13 14.5 15.5 16 15.5C17.5 15.5 19 13 19 13" />
      </svg>
    )
  },
  {
    name: "Framer Motion",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4 4H20L12 12L4 4Z" />
        <path d="M4 12H12L20 20H12L4 12Z" />
      </svg>
    )
  },
  {
    name: "Prisma",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2L21 21H3L12 2Z" />
        <path d="M12 2V21" strokeOpacity="0.3" />
        <path d="M12 21L21 21" strokeOpacity="0.3" />
      </svg>
    )
  },
  {
    name: "Three.js",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 3L21 17H3L12 3Z" />
        <path d="M12 10L17 17H7L12 10Z" strokeOpacity="0.5" />
      </svg>
    )
  }
];

const teachingIcons = [
  {
    title: "1-on-1 Mentorship",
    desc: "Personalized guidance to elevate your code architecture.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" />
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" />
        <path d="M23 21V19C23 17.6715 22.352 16.4947 21.3283 15.7667" strokeOpacity="0.5" />
        <path d="M16 3.13C17.5255 3.51868 18.6667 4.90806 18.6667 6.66667C18.6667 8.42527 17.5255 9.81465 16 10.2033" strokeOpacity="0.5" />
      </svg>
    )
  },
  {
    title: "Technical Seminars",
    desc: "Deep dives into modern frameworks and scaling strategies.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21H16" />
        <path d="M12 17V21" />
        <path d="M10 10L14 10" />
        <path d="M10 13L12 13" />
      </svg>
    )
  },
  {
    title: "Code Reviews",
    desc: "Rigorous standards for high-performance applications.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M9 12L11 14L15 10" />
      </svg>
    )
  }
];

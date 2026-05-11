"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundOrb from "@/components/ui/BackgroundOrb";
import Image from "next/image";

const categories = ["All", "Web App", "3D WebGL", "E-Commerce"];

const projects = [
  { id: 1, title: "Aether AI", category: "Web App", size: "large", imageUrl: "/images/aether.png" },
  { id: 2, title: "Neon Meta", category: "3D WebGL", size: "medium", imageUrl: "/images/neon.png" },
  { id: 3, title: "Lumina Store", category: "E-Commerce", size: "medium", imageUrl: "/images/lumina.png" },
  { id: 4, title: "Quantum Dash", category: "Web App", size: "small", imageUrl: "/images/quantum.png" },
  { id: 5, title: "Void Space", category: "3D WebGL", size: "large", imageUrl: "/images/void.png" },
  { id: 6, title: "Vogue Boutique", category: "E-Commerce", size: "small", imageUrl: "/images/vogue.png" },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center relative overflow-hidden">
      <BackgroundOrb />
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 bg-black/50 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl max-w-4xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
            <span className="text-cyan-300 tracking-widest uppercase text-xs font-semibold">
              Our Work
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Portfolio</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 font-light">
            A curated selection of our finest digital experiences.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-white border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "bg-white/[0.02] border border-white/10 text-slate-400 hover:text-white hover:border-white/30 backdrop-blur-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-3xl group cursor-pointer border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-500 ${
                  project.size === "large" ? "md:col-span-2 md:row-span-2" :
                  project.size === "medium" ? "md:row-span-2" : "md:col-span-1 md:row-span-1"
                }`}
              >
                {/* Glow Border Effect via Pseudo element */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
                
                {/* Background Image */}
                <Image 
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs tracking-widest text-cyan-300 mb-3 font-medium">
                      {project.category}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="w-8 h-[2px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center relative w-full overflow-hidden">
      
      {/* Unique About Section Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-[-20%] sm:right-0 w-[150vw] h-[150vw] sm:w-[40vw] sm:h-[40vw] bg-indigo-600/20 sm:bg-indigo-600/10 rounded-full blur-[90px] sm:blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-20%] sm:left-[-10%] w-[150vw] h-[150vw] sm:w-[50vw] sm:h-[50vw] bg-cyan-600/20 sm:bg-cyan-600/10 rounded-full blur-[100px] sm:blur-[150px] mix-blend-screen" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24 relative p-6 sm:p-10 rounded-3xl"
        >
          {/* Subtle backdrop for text readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border border-white/[0.05] rounded-3xl shadow-2xl -z-10" />
          
          <div className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 mb-6 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 tracking-widest uppercase text-xs font-semibold">
              Who We Are
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 md:mb-8 text-white">
            Pioneers of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-400 animate-gradient-x drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">Digital Aesthetics</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light">
            We are a collective of digital craftsmen building immersive web experiences that blur the line between logic and art. We don't just build websites; we <span className="text-white font-medium">engineer digital realities</span>.
          </p>
        </motion.div>

        {/* Premium Stat Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24">
          {[
            { value: "50+", label: "Projects Delivered", color: "from-cyan-500/20" },
            { value: "14", label: "Awwwards Won", color: "from-emerald-500/20" },
            { value: "99%", label: "Client Satisfaction", color: "from-indigo-500/20" },
            { value: "5", label: "Years of Excellence", color: "from-purple-500/20" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#050505]/80 border border-white/[0.05] backdrop-blur-md overflow-hidden cursor-default transition-all duration-300 hover:border-white/[0.15]"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${stat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500">{stat.value}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-[0.2em] text-center relative z-10 group-hover:text-slate-200 transition-colors duration-300">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Vision & Approach Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 sm:p-12 rounded-3xl bg-[#030303]/80 border border-white/[0.05] backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-700" />
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white relative z-10 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-cyan-400 block" /> Our Vision
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-light relative z-10 group-hover:text-slate-100 transition-colors duration-300">
              To redefine the boundaries of the web by integrating premium design with cutting-edge technologies like 3D WebGL rendering, physics-based animations, and fluid micro-interactions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 sm:p-12 rounded-3xl bg-[#030303]/80 border border-white/[0.05] backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(52,211,153,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-700" />
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white relative z-10 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-emerald-400 block" /> Our Approach
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-light relative z-10 group-hover:text-slate-100 transition-colors duration-300">
              Every pixel matters. We approach each project with an obsessive focus on performance, scalability, and an uncompromising aesthetic standard that sets our clients apart globally.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

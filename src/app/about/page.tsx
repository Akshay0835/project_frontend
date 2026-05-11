"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center relative z-10 w-full">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24 bg-black/50 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/10"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
            <span className="text-emerald-300 tracking-widest uppercase text-xs font-semibold">
              Who We Are
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 md:mb-8">
            Pioneers of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Digital Aesthetics</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light">
            We are a collective of digital craftsmen building immersive web experiences that blur the line between logic and art. We don't just build websites; we engineer digital realities.
          </p>
        </motion.div>

        {/* Premium Stat Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "14", label: "Awwwards Won" },
            { value: "99%", label: "Client Satisfaction" },
            { value: "5", label: "Years of Excellence" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center p-4 sm:p-8 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md"
            >
              <span className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">{stat.value}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest text-center">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Vision & Approach Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-10 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Our Vision</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-light">
              To redefine the boundaries of the web by integrating premium design with cutting-edge technologies like 3D WebGL rendering, physics-based animations, and fluid micro-interactions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-10 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Our Approach</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-light">
              Every pixel matters. We approach each project with an obsessive focus on performance, scalability, and an uncompromising aesthetic standard that sets our clients apart globally.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

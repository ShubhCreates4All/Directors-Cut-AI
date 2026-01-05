import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles, Zap, Cpu, Layers, PlayCircle } from 'lucide-react';
import { DirectorsCutModal } from './DirectorsCutModal';

export const VisionCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Animated Gradient Background Layer */}
        <motion.div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            background: "linear-gradient(120deg, #312e81, #1e3a8a, #831843, #312e81)", // Indigo -> Blue -> Pink loop
            backgroundSize: "300% 300%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-0 opacity-80" />

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10 pointer-events-none"
          style={{
            background: "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.04), transparent 40%)"
          }}
        />

        {/* Content Container */}
        <div className="relative z-20 h-full p-6 md:p-12 flex flex-col md:flex-row gap-10 items-center justify-between backdrop-blur-sm bg-black/20">
          
          {/* Left Side: Text Content */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-red-600/20 border border-red-500/30 text-red-500">
                <Film className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                  <span className="text-xs font-bold tracking-widest uppercase text-yellow-500 shadow-black drop-shadow-md">
                    Original Series
                  </span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                Director's Cut AI
              </h2>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                <span className="text-green-400">98% Match</span>
                <span>2025</span>
                <span className="border border-slate-500 px-1 text-xs">5.1</span>
                <span>Interactive</span>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
                A concept for the <span className="text-white font-medium">'Netflix 2.0'</span> era. 
                Generate low-fidelity script/audio branches instantly, with high-fidelity video rendering on demand.
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Cpu className="w-3.5 h-3.5" />
                <span>Gemini 3 Flash</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Layers className="w-3.5 h-3.5" />
                <span>Vector DB</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Real-time Audio</span>
              </div>
            </div>
          </div>

          {/* Right Side: CTA */}
          <div className="shrink-0">
             <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative overflow-hidden rounded-full bg-red-600 px-8 py-4 font-bold text-white shadow-xl shadow-red-900/20 transition-all hover:scale-105 hover:bg-red-700 active:scale-95"
              >
                <div className="flex items-center gap-3 relative z-10">
                   <PlayCircle className="w-6 h-6 fill-white/20" />
                   <span className="text-lg">Launch Interactive Alpha</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
              </button>
              <p className="text-center text-xs text-slate-500 mt-4 font-medium tracking-wide">
                PRESS PLAY TO REWRITE THE SCENE
              </p>
          </div>
        </div>
      </motion.div>

      {/* Render the Modal */}
      <DirectorsCutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Play, RefreshCw, Upload, Image as ImageIcon, Zap } from 'lucide-react';

// Mock Data simulating "Before" and "After" states with Cinematic Unsplash Images
const CLIPS = [
  {
    id: '1',
    title: 'The Midnight Chase',
    style: 'Cyberpunk 2077',
    description: 'Applies a futuristic, neon-drenched aesthetic with dystopian themes.',
    original: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop', // Dark moody city alley
    remix: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop', // Cyberpunk neon city
  },
  {
    id: '2',
    title: 'Dune Drifter',
    style: 'Mars Sci-Fi',
    description: 'Transports the scene to a red, dusty martian landscape with sci-fi elements.',
    original: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop', // Wide desert dunes
    remix: 'https://images.unsplash.com/photo-1614730341194-75c60740a070?q=80&w=800&auto=format&fit=crop', // Red planet surface
  },
  {
    id: '3',
    title: 'Metro Commute',
    style: 'Claymation',
    description: 'Transforms reality into a charming, textured stop-motion clay animation style.',
    original: 'https://images.unsplash.com/photo-1558230496-e17f043f5454?q=80&w=800&auto=format&fit=crop', // Train interior
    remix: 'https://images.unsplash.com/photo-1585842880295-a20120155b9e?q=80&w=800&auto=format&fit=crop', // Clay/Play-doh texture
  },
  {
    id: '4',
    title: 'Enchanted Woods',
    style: 'Studio Ghibli',
    description: 'Reimagines the world with vibrant colors and hand-drawn cel-shaded artistry.',
    original: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop', // Mystical forest
    remix: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop', // Anime/Illustrated style landscape
  },
  {
    id: '5',
    title: 'Orbit Breach',
    style: 'Oil Painting',
    description: 'Applies thick brushstrokes and rich textures resembling a classical oil masterpiece.',
    original: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', // Earth from space
    remix: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=800&auto=format&fit=crop', // Abstract/Oil paint cosmic
  }
];

export const RemixWall: React.FC = () => {
  const [remixedIds, setRemixedIds] = useState<Set<string>>(new Set());
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());

  const toggleRemix = (id: string) => {
    if (remixedIds.has(id)) {
      // Revert to original
      const next = new Set(remixedIds);
      next.delete(id);
      setRemixedIds(next);
    } else {
      // Start generation simulation
      setGeneratingIds(prev => new Set(prev).add(id));
      
      // Fake API delay
      setTimeout(() => {
        setGeneratingIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        setRemixedIds(prev => new Set(prev).add(id));
      }, 2000);
    }
  };

  const handleUpload = () => {
    alert("You've joined the waitlist for the Creator Beta!");
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
        
        {CLIPS.map((clip) => {
          const isRemixed = remixedIds.has(clip.id);
          const isGenerating = generatingIds.has(clip.id);

          return (
            <motion.div
              key={clip.id}
              layoutId={`card-${clip.id}`}
              className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-white/5 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="popLayout">
                  {isRemixed ? (
                    <motion.img
                      key="remix"
                      src={clip.remix}
                      alt={clip.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <motion.img
                      key="original"
                      src={clip.original}
                      alt={clip.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
              </div>

              {/* Progress Bar (Visible when generating) */}
              {isGenerating && (
                <div className="absolute inset-x-0 top-0 h-1 bg-slate-800 z-30">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  />
                </div>
              )}

              {/* Status Badge & Tooltip Container */}
              <div className="absolute top-4 right-4 z-20 flex flex-col items-end group/badge">
                <div className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border transition-colors cursor-default ${
                  isRemixed 
                    ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-200 cursor-help' 
                    : 'bg-black/30 border-white/10 text-slate-300'
                }`}>
                  {isRemixed ? clip.style : 'Original Source'}
                </div>

                {/* Tooltip */}
                {isRemixed && (
                  <div className="absolute top-full mt-2 right-0 w-48 p-3 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl text-xs text-slate-300 shadow-xl opacity-0 group-hover/badge:opacity-100 transition-all duration-200 translate-y-1 group-hover/badge:translate-y-0 pointer-events-none z-30">
                    <div className="absolute -top-1 right-3 w-2 h-2 bg-slate-900/95 border-t border-l border-white/10 rotate-45"></div>
                    {clip.description}
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-medium text-lg mb-1">{clip.title}</h3>
                
                <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                    {isRemixed ? 'AI Generated' : 'Raw Footage'}
                  </span>
                  
                  <button
                    onClick={() => toggleRemix(clip.id)}
                    disabled={isGenerating}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isGenerating
                        ? 'bg-slate-800 text-slate-400 cursor-wait'
                        : 'bg-white text-slate-900 hover:bg-indigo-50 hover:scale-105 hover:ring-2 hover:ring-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                    }`}
                  >
                    {isGenerating ? (
                      <>Generating...</>
                    ) : isRemixed ? (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        Reset
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        Remix Scene
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Upload Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpload}
          className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/30 hover:bg-slate-800/50 hover:border-indigo-500/50 cursor-pointer transition-all duration-300 min-h-[300px]"
        >
          <div className="p-4 rounded-full bg-slate-800 text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300 mb-4 shadow-lg">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-slate-300 group-hover:text-white">Add Your Scene</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-[200px] text-center group-hover:text-slate-400">
            Upload footage to train your own style LoRA.
          </p>
          <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        </motion.div>

      </div>
    </div>
  );
};
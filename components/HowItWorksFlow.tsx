import React from 'react';
import { motion } from 'framer-motion';
import { Film, Wand2, Cpu, Share2, ChevronRight, ChevronDown } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: "Select Base Scene",
    description: "Pick from curated studio clips or community uploads.",
    icon: Film,
    color: "from-cyan-400 to-blue-500",
    shadow: "shadow-cyan-500/20",
    border: "border-cyan-500/30"
  },
  {
    id: 2,
    title: "Direct the Twist",
    description: "Apply a style change or inject a plot twist.",
    icon: Wand2,
    color: "from-blue-500 to-indigo-500",
    shadow: "shadow-indigo-500/20",
    border: "border-indigo-500/30"
  },
  {
    id: 3,
    title: "AI Rendering Core",
    description: "Our engine regenerates every frame based on your vision.",
    icon: Cpu,
    color: "from-indigo-500 to-purple-500",
    shadow: "shadow-purple-500/20",
    border: "border-purple-500/30"
  },
  {
    id: 4,
    title: "Publish & Remix",
    description: "Your new scene joins the library for others to build upon.",
    icon: Share2,
    color: "from-purple-500 to-pink-500",
    shadow: "shadow-pink-500/20",
    border: "border-pink-500/30"
  }
];

export const HowItWorksFlow: React.FC = () => {
  return (
    <section className="w-full py-16 relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter"
        >
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Works</span>
        </motion.h2>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        
        {/* Connecting Line Layer (Desktop) */}
        <div className="absolute top-12 left-0 w-full h-0.5 hidden md:block z-0 px-12">
           <div className="w-full h-full bg-slate-800/50 relative overflow-hidden rounded-full">
              <motion.div 
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-1/2 blur-sm"
              />
           </div>
        </div>

        {STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            
            {/* The Node Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center max-w-[240px]"
            >
              {/* Floating Container */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 4, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  delay: index * 0.5 // Stagger the float so they don't move in unison
                }}
                className={`group relative p-6 rounded-2xl bg-[#0f0f10] border ${step.border} ${step.shadow} backdrop-blur-xl mb-6 transition-all duration-300 hover:scale-105 hover:bg-slate-900`}
              >
                {/* Glowing Icon Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} p-[1px]`}>
                  <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Connection Dot (Desktop) */}
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-3 w-1.5 h-1.5 rounded-full bg-slate-700 ring-4 ring-black z-20" />
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-3 w-1.5 h-1.5 rounded-full bg-slate-700 ring-4 ring-black z-20" />
              </motion.div>

              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
            </motion.div>

            {/* Mobile Connector Arrow */}
            {index < STEPS.length - 1 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: "auto" }}
                className="md:hidden text-slate-600"
              >
                <ChevronDown className="w-6 h-6 animate-bounce" />
              </motion.div>
            )}

          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

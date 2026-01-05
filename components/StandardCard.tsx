import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface StandardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

export const StandardCard: React.FC<StandardCardProps> = ({ title, description, icon, tag }) => {
  return (
    <motion.div
      className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 hover:bg-slate-800/50 transition-colors duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/50">
            {icon}
          </div>
          <span className="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-400 border border-slate-700">
            {tag}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-slate-100 mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-slate-300 transition-colors">
        <span>View Project</span>
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.div>
  );
};
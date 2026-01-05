import React from 'react';
import { VisionCard } from './components/VisionCard';
import { RemixWall } from './components/RemixWall';
import { HowItWorksFlow } from './components/HowItWorksFlow';
import { Clapperboard, Bell, Search, User, Info } from 'lucide-react';

const App: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-[#0b0b0b] text-white selection:bg-red-600/30 overflow-x-hidden font-sans">
      
      {/* Navbar - Streaming Platform Style */}
      <nav className="fixed top-0 w-full z-50 px-4 md:px-12 py-4 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent transition-all duration-300">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-1 text-red-600">
             <Clapperboard className="w-8 h-8 fill-current" />
             <span className="text-xl md:text-2xl font-black tracking-tighter uppercase hidden md:block">Director's Cut</span>
           </div>
           <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
             <a href="#" className="text-white font-bold cursor-default">Home</a>
             <a href="#" className="hover:text-slate-200 transition-colors cursor-default">TV Shows</a>
             <a href="#" className="hover:text-slate-200 transition-colors cursor-default">Movies</a>
             <a href="#" className="hover:text-slate-200 transition-colors cursor-default">New & Popular</a>
             <a href="#" className="hover:text-slate-200 transition-colors cursor-default">My List</a>
           </div>
        </div>
        <div className="flex items-center gap-6 text-white">
           <Search className="w-5 h-5 cursor-pointer hover:text-slate-300" />
           <Bell className="w-5 h-5 cursor-pointer hover:text-slate-300" />
           <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center overflow-hidden border border-transparent group-hover:border-white transition-all">
                 <User className="w-5 h-5" />
              </div>
           </div>
        </div>
      </nav>

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/10 rounded-full blur-[150px]" />
         <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-red-900/10 rounded-full blur-[150px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4 md:px-12 max-w-[1600px] mx-auto space-y-12">
        
        {/* Hero Text Section */}
        <div className="flex flex-col items-start space-y-6 md:w-2/3 lg:w-1/2 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <div className="inline-flex items-center gap-2 px-1 py-0.5">
              <span className="text-4xl font-black tracking-widest uppercase text-red-600 drop-shadow-lg">N</span>
              <span className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">Series</span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white drop-shadow-2xl">
             YOU ARE THE <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-indigo-400 bg-[length:200%_auto] animate-gradient">DIRECTOR.</span>
           </h1>
           
           <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-xl drop-shadow-md">
             Experience the first generative streaming platform where the plot bends to your will. 
             Rewrite scenes in real-time. Change genres instantly. The story is yours to tell.
           </p>

           <div className="flex items-center gap-4 pt-2">
              <button className="bg-white text-black px-8 py-3 rounded hover:bg-white/90 font-bold flex items-center gap-2 transition-transform hover:scale-105">
                 <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 Play Demo
              </button>
              <button className="bg-gray-500/30 text-white backdrop-blur-sm px-8 py-3 rounded hover:bg-gray-500/40 font-bold flex items-center gap-2 transition-colors">
                 <Info className="w-6 h-6" />
                 More Info
              </button>
           </div>
        </div>

        {/* Featured Interactive Unit (VisionCard) */}
        <div className="w-full border-t border-white/10 pt-12">
           <h3 className="text-lg font-bold text-slate-400 mb-6">Featured Interactive Experience</h3>
           <VisionCard />
        </div>

        {/* The Engine Flow */}
        <div className="w-full border-t border-white/10 pt-8">
           <HowItWorksFlow />
        </div>

        {/* Trending Section (RemixWall) */}
        <div className="space-y-6 pt-8 border-t border-white/10">
          <div className="flex items-end justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-white">Trending Remixes</h2>
            <div className="hidden md:flex gap-2">
               <div className="h-1 w-4 bg-slate-600 rounded-full"></div>
               <div className="h-1 w-4 bg-slate-600 rounded-full"></div>
               <div className="h-1 w-8 bg-red-600 rounded-full"></div>
               <div className="h-1 w-4 bg-slate-600 rounded-full"></div>
            </div>
          </div>
          <RemixWall />
        </div>

      </div>
    </main>
  );
};

export default App;
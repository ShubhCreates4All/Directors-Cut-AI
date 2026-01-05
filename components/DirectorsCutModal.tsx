import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clapperboard, Sparkles, Lock, Video, Play, Loader2, Volume2, StopCircle, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface DirectorsCutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper to decode base64 audio
const decodeAudio = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

export const DirectorsCutModal: React.FC<DirectorsCutModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [script, setScript] = useState('');
  const [displayedScript, setDisplayedScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  // Cinematic placeholder image
  const bgImage = "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=2000&auto=format&fit=crop";
  
  const loadingMessages = [
    "Analyzing Plot Trajectory...",
    "Consulting Vector Database...",
    "Generating Character Arcs...",
    "Finalizing Screenplay..."
  ];

  // Cycling loading messages
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Typewriter effect
  useEffect(() => {
    if (!script || !showScript) {
      setDisplayedScript('');
      return;
    }
    
    let i = 0;
    const speed = 10; // ms per char
    const interval = setInterval(() => {
      if (i < script.length) {
        setDisplayedScript((prev) => prev + script.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [script, showScript]);

  const handleAction = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setShowScript(false);
    setScript('');
    setDisplayedScript('');
    stopAudio(); // Stop any previous audio

    try {
      // Use process.env.API_KEY as per best practices
      const apiKey = process.env.API_KEY;
      
      let generatedText = "";

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        
        const systemInstruction = `You are an award-winning Hollywood Screenwriter. 
        Your task is to take a user's "Plot Twist" and write a SHORT, INTENSE movie scene (max 150 words).
        
        Formatting Rules:
        1. Use standard Screenplay format.
        2. SCENE HEADING must be in ALL CAPS (e.g., INT. WAREHOUSE - NIGHT).
        3. Character names must be CENTERED and ALL CAPS.
        4. Dialogue must be CENTERED.
        5. Keep it dramatic, moody, and cinematic.
        6. Do NOT include markdown. Raw text only.
        
        The scene should immediately reflect the consequences of the plot twist.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `The current scene is a tense noir thriller. 
          PLOT TWIST: ${prompt}
          
          Write the scene now.`,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.8,
          }
        });
        generatedText = response.text || "";
      } else {
        // Mock response if no API Key (for demo purposes)
        await new Promise(resolve => setTimeout(resolve, 2000));
        generatedText = `INT. SERVER ROOM - NIGHT\n\nSYSTEM\n(Warning)\nAPI Key not detected. Engaging simulation mode.\n\nNARRATOR\nThe user requested: "${prompt}".\n\nHERO\n(Looking at screen)\nWait... this is just a simulation?\n\nVILLAIN\nAlways has been.`;
      }

      setScript(generatedText);
      setShowScript(true);
      
    } catch (error) {
      console.error("Director's Cut Error:", error);
      setScript(`INT. SYSTEM CORE - NIGHT\n\nERROR LOG\nConnection to the creative mainframe was interrupted.\n\nSYSTEM (V.O.)\nPlease check your configuration or try again.\n\n(The screen fades to black)`);
      setShowScript(true);
    } finally {
      setIsLoading(false);
    }
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  const handleReadScript = async () => {
    if (isPlayingAudio) {
      stopAudio();
      return;
    }
    
    if (!script) return;

    try {
      setIsPlayingAudio(true);
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("No API Key");

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: script }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("No audio generated");

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioBuffer = await audioContextRef.current.decodeAudioData(decodeAudio(base64Audio));
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => setIsPlayingAudio(false);
      source.start();
      sourceNodeRef.current = source;

    } catch (e) {
      console.error("TTS Error", e);
      setIsPlayingAudio(false);
      alert("Audio generation requires a valid API Key with Gemini 2.5 Flash TTS access.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl bg-black rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                  <Clapperboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Director's Cut AI</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> 
                    Studio Active
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { stopAudio(); onClose(); }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* The Stage (Main Content) */}
            <div className="relative flex-1 bg-black min-h-[400px] overflow-hidden group">
              
              {/* Cinematic Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-1000"
                style={{ backgroundImage: `url(${bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

              {/* Loading State Overlay */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20"
                  >
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-6" />
                    <motion.p 
                      key={loadingStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-indigo-300 font-mono tracking-widest uppercase text-sm"
                    >
                      {loadingMessages[loadingStep]}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Script View Overlay */}
              <AnimatePresence>
                {showScript && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 z-10 flex flex-col"
                  >
                    {/* Script Container */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
                      <div className="max-w-3xl mx-auto font-mono text-slate-300 whitespace-pre-wrap leading-relaxed border-l-2 border-indigo-500/20 pl-6">
                         {/* Header Metadata */}
                         <div className="text-xs text-indigo-400/60 mb-8 select-none tracking-widest uppercase">
                            // GEN_ID: {Math.random().toString(36).substr(2, 9)}<br/>
                            // MODE: SCREENPLAY_V1
                         </div>
                         
                         {/* The Typewriter Text */}
                         {displayedScript}
                         
                         {/* Cursor */}
                         {displayedScript.length < script.length && (
                           <span className="inline-block w-2 h-5 ml-1 bg-indigo-500 animate-pulse align-middle" />
                         )}
                      </div>
                    </div>
                    
                    {/* Floating Controls Bar */}
                    <div className="p-6 bg-gradient-to-t from-black via-black to-transparent flex flex-wrap justify-center gap-4">
                       
                       {/* Audio Readout Toggle */}
                       <button 
                         onClick={handleReadScript}
                         className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all ${
                           isPlayingAudio 
                             ? 'bg-red-500/20 border-red-500/50 text-red-200 hover:bg-red-500/30' 
                             : 'bg-indigo-500/20 border-indigo-500/50 text-indigo-200 hover:bg-indigo-500/30'
                         }`}
                       >
                          {isPlayingAudio ? (
                            <>
                              <StopCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">Stop Audio</span>
                              <span className="flex gap-0.5 items-end h-3 ml-2">
                                <span className="w-0.5 h-full bg-current animate-pulse"/>
                                <span className="w-0.5 h-2/3 bg-current animate-pulse delay-75"/>
                                <span className="w-0.5 h-1/2 bg-current animate-pulse delay-150"/>
                              </span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4" />
                              <span className="text-sm font-medium">Read Scene (TTS)</span>
                            </>
                          )}
                       </button>

                       {/* Disabled Render Button */}
                       <div className="group/btn relative">
                         <button disabled className="flex items-center gap-3 px-6 py-2.5 bg-slate-800 text-slate-500 rounded-full border border-slate-700 cursor-not-allowed opacity-80">
                            <Lock className="w-4 h-4" />
                            <span>Render Video (200 Tokens)</span>
                         </button>
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-md opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Coming in v2.0
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-indigo-600"></div>
                         </div>
                       </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Empty State / Prompt */}
              {!showScript && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Video className="w-10 h-10 text-white/20" />
                    </div>
                    <h4 className="text-white text-xl font-medium tracking-tight mb-2">Awaiting Direction</h4>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                      Use the console below to inject a plot twist. The AI will rewrite the scene in real-time.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Director's Chair (Input Area) */}
            <div className="p-6 bg-slate-950 border-t border-white/10 relative z-30">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Sparkles className="w-4 h-4 text-indigo-400 group-focus-within:text-indigo-300 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                    placeholder="Enter a plot twist (e.g. 'The hero realizes they are in a simulation')"
                    className="w-full pl-11 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
                <button
                  onClick={handleAction}
                  disabled={!prompt.trim() || isLoading}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 min-w-[160px] hover:scale-105 active:scale-95"
                >
                  {isLoading ? (
                    'Directing...'
                  ) : (
                    <>
                      <span>Action</span>
                      <Play className="w-4 h-4 fill-current" />
                    </>
                  )}
                </button>
              </div>
              <div className="mt-4 flex justify-between items-center text-[10px] md:text-xs text-slate-500 px-1">
                <p>
                  *Powered by <span className="text-slate-400">Gemini 3 Flash</span> & <span className="text-slate-400">Gemini 2.5 TTS</span>
                </p>
                <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                   <span>Systems Online</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
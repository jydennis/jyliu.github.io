
import React from 'react';
import WebGPUCanvas from './WebGPUCanvas';

const HomeView: React.FC = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden">
      {/* Background WebGPU Animation */}
      <div className="absolute inset-0 z-0">
        <WebGPUCanvas />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl space-y-8 animate-in fade-in duration-1000">
        <div className="space-y-4">
          <h2 className="text-blue-400 font-mono text-sm tracking-[0.3em] uppercase">
            Creative technologist
          </h2>
          <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tighter leading-tight">
            Let creativity <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
              thrive.
            </span>
          </h1>
        </div>
        
        <p className="text-gray-300 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light">
          Unleash the hidden power of creativity by technology and more. 
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
          <button className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-400 transition-all transform hover:scale-105 active:scale-95">
            View Work
          </button>
          <button className="w-full sm:w-auto px-10 py-4 glass rounded-full hover:bg-white/10 transition-all border border-white/20">
            Read Research
          </button>
        </div>
      </div>

      {/* Subtle bottom gradient for readability */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-5"></div>
    </div>
  );
};

export default HomeView;

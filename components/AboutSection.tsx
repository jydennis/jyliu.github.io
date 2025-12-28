
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div className="px-6 lg:px-20 py-12 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="aspect-square glass rounded-2xl overflow-hidden border border-white/10">
            <img 
              src="https://picsum.photos/seed/profile/500/500" 
              alt="Profile" 
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="mt-6 space-y-4">
             <div>
                <p className="text-[10px] mono text-gray-500 uppercase">Location</p>
                <p className="text-sm">Shanghai, China</p>
             </div>
             <div>
                <p className="text-[10px] mono text-gray-500 uppercase">Email</p>
                <p className="text-sm hover:text-blue-400 cursor-pointer">-@-.-</p>
             </div>
             <div>
                <p className="text-[10px] mono text-gray-500 uppercase">Social</p>
                <div className="flex space-x-3 mt-1">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">X</div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">In</div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">Gh</div>
                </div>
             </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight">About Me</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            I am a Integrated Circuits Engineer focus on GPU Architecture.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Currently exploring WebGPU's potential for real-time generative art and 
            integrating LLMs into the creative process to rethink how we build visual tools.
          </p>
          
          <div className="pt-8 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Tech Stack
              </h4>
              <ul className="text-sm text-gray-500 space-y-2 font-mono">
                <li>WebGPU / Vulkan</li>
                <li>Python / C++</li>
                <li>Gemini API</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Focus Areas
              </h4>
              <ul className="text-sm text-gray-500 space-y-2 font-mono">
                <li>Generative Design</li>
                <li>GPU Computing</li>
                <li>ML for Graphics</li>
                <li>Procedural Worlds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

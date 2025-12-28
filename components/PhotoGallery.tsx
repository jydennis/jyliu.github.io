
import React, { useState } from 'react';
import { Photo } from '../types';

const MOCK_PHOTOS: Photo[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `placeholder-${i}`,
  url: '', // Empty URL to trigger placeholder state
  title: `Project Title ${i + 1}`,
  description: 'Generic placeholder description for project documentation and visual assets.',
  category: i % 3 === 0 ? 'Research' : i % 2 === 0 ? 'Architecture' : 'Abstract'
}));

const PhotoGallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Research', 'Architecture', 'Abstract'];

  const filteredPhotos = filter === 'All' 
    ? MOCK_PHOTOS 
    : MOCK_PHOTOS.filter(p => p.category === filter);

  return (
    <div className="px-6 lg:px-20 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/5 pb-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">Portfolio Gallery</h2>
          <p className="text-gray-400 max-w-md">This section is a placeholder for your visual work and project documentation.</p>
        </div>
        <div className="flex space-x-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] mono uppercase tracking-widest transition-all ${
                filter === cat ? 'bg-blue-600 text-white border-blue-600' : 'glass text-gray-400 hover:text-white border-white/10'
              } border`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="group relative glass rounded-2xl overflow-hidden aspect-[4/3] border border-white/5 hover:border-blue-500/30 transition-all duration-500">
            {/* Technical Placeholder Background */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] group-hover:bg-[#0f0f0f] transition-colors duration-700">
               <div className="flex flex-col items-center space-y-3 opacity-20 group-hover:opacity-40 transition-opacity">
                  <div className="w-12 h-12 border border-white/50 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-mono text-white">IMG</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-tighter uppercase text-white">Placeholder • 800 x 600</span>
               </div>
               
               {/* Decorative Blueprint Lines */}
               <div className="absolute top-0 left-0 w-full h-px bg-white/5"></div>
               <div className="absolute bottom-0 left-0 w-full h-px bg-white/5"></div>
               <div className="absolute top-0 left-0 w-px h-full bg-white/5"></div>
               <div className="absolute top-0 right-0 w-px h-full bg-white/5"></div>
               <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.02]"></div>
               <div className="absolute top-0 left-1/2 w-px h-full bg-white/[0.02]"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[9px] mono text-blue-400 mb-2 block uppercase tracking-[0.2em]">{photo.category}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{photo.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 max-w-xs">{photo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-3xl">
         <p className="text-gray-500 text-sm italic font-light">"Capturing the evolution of integrated systems and visual research."</p>
         <div className="mt-4 flex space-x-2">
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
         </div>
      </div>
    </div>
  );
};

export default PhotoGallery;

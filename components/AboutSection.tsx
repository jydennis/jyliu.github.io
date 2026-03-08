
import React from 'react';
import { useLanguage } from '../LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="px-6 lg:px-20 py-12 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="aspect-square glass rounded-2xl overflow-hidden border border-white/10">
            <img 
              src="https://picsum.photos/seed/profile/500/500" 
              alt="Profile" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-6 space-y-4">
             <div>
                <p className="text-[10px] mono text-gray-500 uppercase">{t('label_location')}</p>
                <p className="text-sm">{t('location_val')}</p>
             </div>
             <div>
                <p className="text-[10px] mono text-gray-500 uppercase">{t('label_email')}</p>
                <p className="text-sm hover:text-blue-400 cursor-pointer">-@-.-</p>
             </div>
             <div>
                <p className="text-[10px] mono text-gray-500 uppercase">{t('label_social')}</p>
                <div className="flex space-x-3 mt-1">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">X</div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">In</div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">Gh</div>
                </div>
             </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight">{t('about_title')}</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            {t('about_desc_1')}
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            {t('about_desc_2')}
          </p>
          
          <div className="pt-8 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {t('label_tech_stack')}
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
                {t('label_focus_areas')}
              </h4>
              <ul className="text-sm text-gray-500 space-y-2 font-mono">
                <li>Generative World</li>
                <li>GPU Computing</li>
                <li>ML for Graphics</li>
                <li>3D Printing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

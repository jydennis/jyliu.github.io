
import React from 'react';
import { View, Language } from '../types';
import { useLanguage } from '../LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  const { language, setLanguage, t } = useLanguage();

  const navItems: { label: string; view: View; tKey: string }[] = [
    { label: 'Home', view: 'home', tKey: 'nav_home' },
    { label: 'Photos', view: 'photos', tKey: 'nav_photos' },
    { label: 'Projects', view: 'projects', tKey: 'nav_projects' },
    { label: 'About', view: 'about', tKey: 'nav_about' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '中文' },
    { code: 'ja', label: '日本語' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div 
            className="text-xl font-bold tracking-tighter cursor-pointer hover:text-blue-400 transition-colors lowercase"
            onClick={() => onViewChange('home')}
          >
            dennis <span className="text-blue-500">liu</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => onViewChange(item.view)}
                className={`text-sm uppercase tracking-widest transition-all ${
                  (currentView === item.view || (item.view === 'projects' && currentView === 'project-detail')) ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t(item.tKey)}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 border-l border-white/10 pl-6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-[10px] mono tracking-widest transition-all ${
                  language === lang.code ? 'text-blue-400 font-bold' : 'text-gray-500 hover:text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="py-8 px-6 text-center text-gray-500 text-xs tracking-widest border-t border-white/5">
        &copy; {new Date().getFullYear()} DENNIS LIU • {t('footer_powered')}
      </footer>
    </div>
  );
};

export default Layout;

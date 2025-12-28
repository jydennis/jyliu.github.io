
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  const navItems: { label: string; view: View }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Photos', view: 'photos' },
    { label: 'Research', view: 'research' },
    { label: 'About', view: 'about' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex justify-between items-center">
        <div 
          className="text-xl font-bold tracking-tighter cursor-pointer hover:text-blue-400 transition-colors lowercase"
          onClick={() => onViewChange('home')}
        >
          dennis <span className="text-blue-500">liu</span>
        </div>
        <nav className="flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => onViewChange(item.view)}
              className={`text-sm uppercase tracking-widest transition-all ${
                currentView === item.view ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="py-8 px-6 text-center text-gray-500 text-xs tracking-widest border-t border-white/5">
        &copy; {new Date().getFullYear()} DENNIS LIU • POWERED BY WEBGPU & GEMINI
      </footer>
    </div>
  );
};

export default Layout;

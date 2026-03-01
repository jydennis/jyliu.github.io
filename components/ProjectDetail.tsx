
import React from 'react';
import { Project } from '../types';
import { PROJECTS } from '../constants';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
  const project = PROJECTS.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="px-6 lg:px-20 py-12 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-20 py-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span className="text-xs font-bold uppercase tracking-widest">Back to Projects</span>
      </button>

      <div className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] mono bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded text-blue-400 uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          {project.title}
        </h1>
        
        <p className="text-lg text-gray-400 mb-8 font-medium">
          {project.authors.join(', ')}
        </p>

        <div className="flex items-center space-x-4 text-sm text-gray-500 mono uppercase tracking-widest">
          <span>Date: {project.date}</span>
          <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
          <span>Status: Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-6 text-white border-l-2 border-blue-500 pl-4 uppercase tracking-wider">Overview</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              {project.abstract}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6 text-white border-l-2 border-blue-500 pl-4 uppercase tracking-wider">Details & Methodology</h2>
            <div className="glass p-8 rounded-2xl border border-white/5 space-y-4">
              <p className="text-gray-400 leading-relaxed">
                This project involved a comprehensive development cycle, focusing on scalable architecture and user-centric design. 
                Key milestones included initial prototyping, core feature implementation, and rigorous testing.
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Requirement analysis and system design</li>
                <li>Frontend and backend integration</li>
                <li>Performance optimization and security audits</li>
                <li>Deployment and continuous monitoring</li>
              </ul>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="glass p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-gray-300">Resources</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <span className="text-xs font-medium text-gray-400 group-hover:text-white">Documentation</span>
                <span className="text-gray-600 group-hover:text-blue-400">↓</span>
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <span className="text-xs font-medium text-gray-400 group-hover:text-white">GitHub Repo</span>
                <span className="text-gray-600 group-hover:text-blue-400">↗</span>
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <span className="text-xs font-medium text-gray-400 group-hover:text-white">Live Demo</span>
                <span className="text-gray-600 group-hover:text-blue-400">⛁</span>
              </a>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-gray-300">Project Info</h3>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-gray-500">Role</span>
                  <span className="text-gray-300">Lead Developer</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-gray-500">Stack</span>
                  <span className="text-gray-300">React, WebGPU, Node.js</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-gray-500">Client</span>
                  <span className="text-gray-300">Internal Research</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;


import React, { useState } from 'react';
import { ResearchPaper } from '../types';
import { GoogleGenAI } from "@google/genai";

const PAPERS: ResearchPaper[] = [
  {
    id: 'placeholder-1',
    title: 'Research Project Title Placeholder',
    authors: ['Author Name', 'Collaborator'],
    abstract: 'This is a placeholder for your research abstract. Once you have your publications ready, you can replace this text with the actual summary of your work, including methodologies and key findings.',
    date: '202X-XX-XX',
    tags: ['Domain', 'Technology', 'Method'],
  },
  {
    id: 'placeholder-2',
    title: 'Upcoming Publication',
    authors: ['Author Name'],
    abstract: 'Abstract for an upcoming piece of research. This section will highlight the core contributions and results of the study once it is finalized and ready for public display.',
    date: 'In Progress',
    tags: ['Future Work', 'Innovation'],
  }
];

const ResearchSection: React.FC = () => {
  const [summary, setSummary] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const summarizePaper = async (paper: ResearchPaper) => {
    setLoading(paper.id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize this research paper abstract in two clear sentences for a general audience: ${paper.abstract}`,
      });
      
      setSummary(prev => ({ ...prev, [paper.id]: response.text || "No summary available." }));
    } catch (err) {
      console.error(err);
      setSummary(prev => ({ ...prev, [paper.id]: "AI summarizing failed. Check API key." }));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="px-6 lg:px-20 py-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12 border-b border-white/5 pb-8">
        <h2 className="text-4xl font-bold tracking-tight mb-4">Publications & Research</h2>
        <p className="text-gray-400 max-w-2xl">
          This section is currently a placeholder for your academic and professional contributions. 
          As you populate this with your actual papers, visitors will be able to see your trajectory in the field.
        </p>
      </div>

      <div className="space-y-8">
        {PAPERS.map((paper) => (
          <div key={paper.id} className="glass p-8 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all duration-500 group">
            <div className="flex flex-wrap gap-2 mb-6">
              {paper.tags.map(tag => (
                <span key={tag} className="text-[9px] mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-500 uppercase tracking-widest group-hover:text-blue-400 group-hover:border-blue-400/30 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
            
            <h3 className="text-2xl font-bold mb-3 text-gray-300 group-hover:text-white transition-colors">
              {paper.title}
            </h3>
            
            <p className="text-sm text-blue-500/70 font-medium mb-4 mono uppercase tracking-wider">
              {paper.authors.join(', ')} <span className="mx-2 text-gray-700">•</span> {paper.date}
            </p>
            
            <div className="relative">
              <p className="text-gray-500 leading-relaxed mb-8 italic relative z-10">
                "{paper.abstract}"
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/5">
              <button 
                onClick={() => summarizePaper(paper)}
                disabled={loading === paper.id}
                className="px-5 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-500/20 transition-all disabled:opacity-50"
              >
                {loading === paper.id ? 'Analyzing...' : 'AI Summary'}
              </button>
              <button className="px-5 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10 text-gray-400 hover:text-white">
                View Repository
              </button>
            </div>

            {summary[paper.id] && (
              <div className="mt-6 p-5 bg-blue-500/5 rounded-xl border border-blue-500/10 text-sm text-gray-300 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="font-bold text-[10px] text-blue-400 uppercase tracking-widest">Gemini Insight</span>
                </div>
                {summary[paper.id]}
              </div>
            )}
          </div>
        ))}

        <div className="mt-16 p-12 rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-2xl text-gray-600">+</span>
          </div>
          <div className="max-w-xs">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Future Works</h4>
            <p className="text-xs text-gray-500 mt-2">More research will be added as the projects progress through the pipeline.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchSection;

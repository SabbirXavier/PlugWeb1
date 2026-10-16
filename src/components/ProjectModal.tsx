import React from 'react';
import { X, ExternalLink, Check, Sparkles, Layers } from 'lucide-react';
import { sfx } from '../utils/audio';

export interface CaseStudy {
  id: string;
  title: string;
  category: 'Web' | 'AI' | 'Creative';
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  imageUrl: string;
  challenge: string;
  solution: string;
  clientQuote: { text: string; author: string; role: string };
}

interface ProjectModalProps {
  project: CaseStudy | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border border-black/10 max-w-4xl w-full overflow-hidden shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            sfx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-black/10 flex items-center justify-center text-[#090a0b] hover:bg-black hover:text-white transition-all shadow-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header */}
        <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative overflow-hidden bg-[#f4f4f2]">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#b8ee00] text-[#090a0b] font-mono text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="text-white/80 font-mono text-xs uppercase tracking-wider">
                  {project.subtitle}
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-[#f4f4f2] rounded-2xl border border-black/5">
            {project.metrics.map((m, idx) => (
              <div key={idx}>
                <div className="font-display font-bold text-2xl sm:text-3xl text-[#090a0b]">
                  {m.value}
                </div>
                <div className="font-mono text-xs text-[#505256] uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Overview, Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-bold text-lg text-[#090a0b] mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#a5d600]" />
                <span>The Challenge</span>
              </h3>
              <p className="font-body text-sm text-[#505256] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-[#090a0b] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#b8ee00]" />
                <span>PLUG Engineering Solution</span>
              </h3>
              <p className="font-body text-sm text-[#505256] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Client Testimonial Quote */}
          <div className="p-6 bg-[#090a0b] text-white rounded-2xl border border-black/10 flex flex-col gap-3">
            <p className="font-body italic text-sm sm:text-base leading-relaxed text-slate-200">
              "{project.clientQuote.text}"
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-xs font-mono">
              <span className="font-bold text-[#b8ee00]">{project.clientQuote.author}</span>
              <span className="text-slate-400">· {project.clientQuote.role}</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t, i) => (
                <span key={i} className="font-mono text-xs bg-[#f4f4f2] px-3 py-1 rounded-md text-[#090a0b]">
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                onClose();
                const el = document.querySelector('#contact-inquiry');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider bg-[#b8ee00] text-[#090a0b] hover:bg-[#c7ff3d] px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>Build Similar Architecture</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Calculator, ArrowRight, Clock, Users, Cpu } from 'lucide-react';
import { sfx } from '../utils/audio';

export const ScopeCalculator: React.FC = () => {
  const [discipline, setDiscipline] = useState<string>('web-solutions');
  const [scale, setScale] = useState<'mvp' | 'growth' | 'enterprise'>('growth');

  const getCalculation = () => {
    let sprintWeeks = 2;
    let teamSize = '3 Senior Engineers + 1 Designer';
    let deliverables = ['Responsive Web Platform', 'SEO & Analytics Setup', 'CMS Integration'];
    let stack = 'Next.js, Tailwind CSS, TypeScript';

    if (discipline === 'ai-automation') {
      deliverables = ['Custom Autonomous AI Agent', 'RAG Vector Database', 'CRM & Support Automation'];
      stack = 'OpenAI / Gemini, LangChain, Python, Vector DB';
    } else if (discipline === 'performance-marketing') {
      deliverables = ['Google & Meta Paid Ad Campaigns', 'Server-Side Tagging & CAPI', 'High-Converting Landing Pages'];
      stack = 'Google Ads, Meta Manager, Server-Side GTM, GA4';
    } else if (discipline === 'social-media') {
      deliverables = ['Monthly Content Calendar', 'Short-Form Video Edits', 'Multi-Channel Publishing Queue'];
      stack = 'Buffer, Figma, Premiere Pro, Analytics';
    } else if (discipline === 'creative-studio') {
      deliverables = ['3D Motion Graphics', 'Brand Design System', 'Ad Creative Asset Suite'];
      stack = 'After Effects, Figma, Cinema 4D / Blender';
    } else if (discipline === 'brand-partnerships') {
      deliverables = ['PR Outreach & Press Release', 'Creator Sponsorship Deals', 'Co-Marketing Campaign Briefs'];
      stack = 'Muck Rack, PR Newswire, Creator Hub';
    } else if (discipline === 'fullstack') {
      deliverables = ['Web Platform + 3D Interactions', 'AI Support & Workflow Loop', 'Performance Ads + PR Campaign'];
      stack = 'Next.js, Three.js, Gemini API, Meta & Google Ads';
    }

    if (scale === 'mvp') {
      sprintWeeks = 2;
    } else if (scale === 'growth') {
      sprintWeeks = 4;
      teamSize = '4 Senior Engineers + 1 Media Lead + 1 Creative Director';
    } else {
      sprintWeeks = 6;
      teamSize = '6 Senior Engineers + 2 Media Directors + 2 Design Partners';
    }

    return { sprintWeeks, teamSize, deliverables, stack };
  };

  const calc = getCalculation();

  return (
    <div className="bg-white rounded-3xl border border-black/10 p-8 sm:p-10 shadow-xl max-w-4xl mx-auto my-12">
      <div className="flex items-center justify-between pb-6 border-b border-black/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#090a0b] text-[#b8ee00] flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-[#090a0b]">Interactive Scope & Sprint Estimator</h3>
            <p className="font-body text-xs text-[#505256]">Configure your goals across our 6 service pillars to see sprint timelines.</p>
          </div>
        </div>
        <span className="font-mono text-xs bg-[#f4f4f2] text-[#090a0b] px-3 py-1 rounded-full font-bold">
          Instant Estimation
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Discipline Selector */}
          <div>
            <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#090a0b] block mb-2.5">
              1. Select Service Pillar
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'web-solutions', label: '01. Web Dev' },
                { id: 'ai-automation', label: '02. AI & Auto' },
                { id: 'performance-marketing', label: '03. Performance Ads' },
                { id: 'social-media', label: '04. Social Media' },
                { id: 'creative-studio', label: '05. Creative Studio' },
                { id: 'brand-partnerships', label: '06. PR & Partners' },
                { id: 'fullstack', label: 'Full Retainer' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setDiscipline(item.id);
                    sfx.playClick();
                  }}
                  className={`p-2.5 rounded-xl font-mono text-xs text-center border transition-all cursor-pointer ${
                    discipline === item.id
                      ? 'bg-[#090a0b] text-[#b8ee00] border-[#090a0b] shadow-2xs font-bold'
                      : 'bg-white text-[#090a0b] border-black/10 hover:border-black/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scale Selector */}
          <div>
            <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#090a0b] block mb-2.5">
              2. Scope Scale & Depth
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mvp', label: 'Core Launch' },
                { id: 'growth', label: 'Growth Scale' },
                { id: 'enterprise', label: 'Enterprise' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setScale(item.id as typeof scale);
                    sfx.playClick();
                  }}
                  className={`p-3 rounded-xl font-mono text-xs text-center border transition-all cursor-pointer ${
                    scale === item.id
                      ? 'bg-[#090a0b] text-[#b8ee00] border-[#090a0b] shadow-2xs font-bold'
                      : 'bg-white text-[#090a0b] border-black/10 hover:border-black/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculated Results Card */}
        <div className="bg-[#f4f4f2] p-6 rounded-2xl border border-black/10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#505256] uppercase">Estimated Timeline</span>
              <span className="font-display font-bold text-2xl text-[#090a0b] flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-[#a5d600]" />
                <span>{calc.sprintWeeks} Weeks ({calc.sprintWeeks / 2} Sprints)</span>
              </span>
            </div>

            <div className="pt-3 border-t border-black/10">
              <span className="font-mono text-xs text-[#505256] uppercase block mb-1">Dedicated Team</span>
              <span className="font-body text-xs font-semibold text-[#090a0b] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#090a0b]" />
                <span>{calc.teamSize}</span>
              </span>
            </div>

            <div className="pt-3 border-t border-black/10">
              <span className="font-mono text-xs text-[#505256] uppercase block mb-1">Recommended Tech Stack</span>
              <span className="font-mono text-xs text-[#090a0b] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#536d00]" />
                <span>{calc.stack}</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sfx.playClick();
              const el = document.querySelector('#contact-inquiry');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full inline-flex items-center justify-center gap-2 font-display text-xs font-bold uppercase tracking-wider bg-[#b8ee00] text-[#090a0b] hover:bg-[#c7ff3d] py-3.5 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <span>Lock In This Scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Layers, Sparkles, TrendingUp, Cpu, Globe, ArrowRight } from 'lucide-react';
import { sfx } from '../utils/audio';

export const BrandStatement: React.FC = () => {
  const handleScrollToInquiry = () => {
    sfx.playClick();
    const el = document.querySelector('#contact-inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full py-20 px-6 sm:px-10 bg-white border-y border-black/[0.08] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-widest text-[#505256] font-semibold block mb-3">
              The PLUG Unified Philosophy
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#090a0b] tracking-tight leading-[1.08] mb-6">
              Engineering, Marketing & Creativity. <br className="hidden sm:inline" />
              Unified Under One Engine.
            </h2>
            <p className="font-body text-base sm:text-lg text-[#505256] leading-relaxed mb-6">
              Most businesses struggle with fragmented vendors—hiring one agency for web code, another for paid ad campaigns, a third for social media, and an isolated team for AI automation. PLUG eliminates agency silos by uniting high-velocity web engineering, precision performance advertising, smart AI business loops, and vanguard creative production into one coordinated partner.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleScrollToInquiry}
                className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider bg-[#090a0b] text-[#b8ee00] hover:bg-neutral-800 px-6 py-3.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Partner With PLUG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#f4f4f2] border border-black/10 flex flex-col justify-between">
              <CodeIcon className="w-6 h-6 text-[#090a0b] mb-3" />
              <div className="font-display font-bold text-lg text-[#090a0b]">Web & Portals</div>
              <div className="font-mono text-[11px] text-[#505256]">Sub-100ms Speed</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f4f4f2] border border-black/10 flex flex-col justify-between">
              <Cpu className="w-6 h-6 text-[#536d00] mb-3" />
              <div className="font-display font-bold text-lg text-[#090a0b]">AI Automation</div>
              <div className="font-mono text-[11px] text-[#505256]">Smart Workflows</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f4f4f2] border border-black/10 flex flex-col justify-between">
              <TrendingUp className="w-6 h-6 text-emerald-600 mb-3" />
              <div className="font-display font-bold text-lg text-[#090a0b]">Performance Ads</div>
              <div className="font-mono text-[11px] text-[#505256]">Google & Meta Ads</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f4f4f2] border border-black/10 flex flex-col justify-between">
              <Globe className="w-6 h-6 text-[#090a0b] mb-3" />
              <div className="font-display font-bold text-lg text-[#090a0b]">Media & PR</div>
              <div className="font-mono text-[11px] text-[#505256]">Brand Partnerships</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Layers {...props} />;
}

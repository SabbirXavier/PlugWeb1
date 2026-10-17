import React from 'react';
import { ArrowRight, ArrowDown, Zap, Network, CheckCircle2, Target, Cpu } from 'lucide-react';
import { Hero3DCanvas } from './three/Hero3DCanvas';
import { sfx } from '../utils/audio';

interface HeroProps {
  reducedMotion: boolean;
}

export const Hero: React.FC<HeroProps> = ({ reducedMotion }) => {
  const handleScrollTo = (id: string) => {
    sfx.playClick();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[94vh] lg:min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 overflow-hidden">
      {/* Ambient background light gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-[#b8ee00]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-12 left-10 w-[380px] h-[380px] bg-slate-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Interactive 3D Canvas Centerpiece */}
      <Hero3DCanvas reducedMotion={reducedMotion} />

      {/* Main Content */}
      <div className="max-w-[1440px] w-full mx-auto relative z-10 flex flex-col items-center text-center my-auto pt-4 sm:pt-8">
        {/* Clean Editorial Eyebrow (Zero-Pill Discipline) */}
        <div className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-widest text-[#505256]">
          <span className="font-bold text-[#090a0b]">PLUG Agency</span>
          <span aria-hidden="true">·</span>
          <span>Enterprise Growth Engine</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#536d00] font-semibold">Guaranteed 2-Week Sprints</span>
        </div>

        {/* Oversized Headline with Balanced Wrap */}
        <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[86px] leading-[0.98] tracking-tight max-w-6xl text-[#090a0b] select-none [text-wrap:balance]">
          YOUR CONNECTED DIGITAL, <br className="hidden sm:block" />
          <span className="relative inline-block px-2 my-1 sm:my-2">
            <span className="relative z-10">CREATIVE & GROWTH</span>
            <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-3 sm:h-5 bg-[#b8ee00]/90 -z-0 rounded-xs" />
          </span>{' '}
          ENGINE.
        </h1>

        {/* Crisp Editorial Subtext */}
        <p className="font-body text-base sm:text-lg md:text-xl text-[#505256] max-w-3xl mt-6 leading-relaxed font-normal [text-wrap:balance]">
          We engineer high-velocity 3D web platforms, deploy autonomous AI customer workflows, and scale high-ROAS performance ad campaigns — unified under one senior partner team with zero junior handoffs.
        </p>

        {/* Dual CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#scope-calculator"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('#scope-calculator');
            }}
            onMouseEnter={() => sfx.playLimeHover()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-display text-xs font-bold uppercase tracking-wider bg-[#b8ee00] text-[#090a0b] hover:bg-[#c7ff3d] px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all glow-lime cursor-pointer"
          >
            <span>Calculate Project Scope & ROI</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#disciplines"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('#disciplines');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-display text-xs font-semibold uppercase tracking-wider bg-white/80 hover:bg-white text-[#090a0b] border border-black/10 px-8 py-4 rounded-xl shadow-xs hover:border-black/20 hover:-translate-y-0.5 transition-all backdrop-blur-md cursor-pointer"
          >
            <span>Explore 6 Capabilities</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        {/* Verified Enterprise Metrics Bar */}
        <div className="w-full max-w-4xl mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
          <div className="bg-white/85 backdrop-blur-md border border-black/[0.08] p-3.5 rounded-xl shadow-xs flex items-center gap-3 hover:border-black/20 transition-all">
            <div className="w-2.5 h-2.5 rounded-full bg-[#b8ee00]" />
            <div>
              <div className="font-display font-bold text-base text-[#090a0b] tabular-nums">$42M+</div>
              <div className="font-mono text-[10px] text-[#505256] uppercase tracking-wider">
                Pipeline Generated
              </div>
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-md border border-black/[0.08] p-3.5 rounded-xl shadow-xs flex items-center gap-3 hover:border-black/20 transition-all">
            <Target className="w-4 h-4 text-[#a5d600]" />
            <div>
              <div className="font-display font-bold text-base text-[#090a0b] tabular-nums">4.6x Average</div>
              <div className="font-mono text-[10px] text-[#505256] uppercase tracking-wider">
                Attributed ROAS
              </div>
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-md border border-black/[0.08] p-3.5 rounded-xl shadow-xs flex items-center gap-3 hover:border-black/20 transition-all">
            <Cpu className="w-4 h-4 text-[#090a0b]" />
            <div>
              <div className="font-display font-bold text-base text-[#090a0b]">100% Senior</div>
              <div className="font-mono text-[10px] text-[#505256] uppercase tracking-wider">
                Dedicated Partners
              </div>
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-md border border-black/[0.08] p-3.5 rounded-xl shadow-xs flex items-center gap-3 hover:border-black/20 transition-all">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="font-display font-bold text-base text-[#090a0b]">2-Week</div>
              <div className="font-mono text-[10px] text-[#505256] uppercase tracking-wider">
                Sprint Cadence
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="max-w-[1440px] w-full mx-auto relative z-10 pt-6 flex items-center justify-between border-t border-black/[0.06] text-xs text-[#505256] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b8ee00]" />
          <span>INTERACTIVE 3D SCENE — SCROLL TO EXPLORE FULL ECOSYSTEM</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span>EXPLORE SERVICES BELOW</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#090a0b]" />
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ShieldCheck, Zap, Layers, BarChart3 } from 'lucide-react';
import { sfx } from '../utils/audio';

interface StoryBeat {
  chapterNum: string;
  subtitle: string;
  headline: string;
  description: string;
  icon: React.ReactNode;
  statLabel: string;
  statValue: string;
  accentBadge: string;
}

const storyBeats: StoryBeat[] = [
  {
    chapterNum: '01 / 04',
    subtitle: 'NARRATIVE PHASE 1 — THE AGENCY PROBLEM',
    headline: 'Traditional agency models are broken by bloated hierarchies.',
    description: 'Multiple account managers, junior handoffs, opaque markups, and fragmented communications cause projects to lose velocity and visual precision.',
    icon: <Layers className="w-6 h-6 text-red-400" />,
    statLabel: 'Average Waste in Traditional Agencies',
    statValue: '45%',
    accentBadge: 'Legacy Bloat',
  },
  {
    chapterNum: '02 / 04',
    subtitle: 'NARRATIVE PHASE 2 — THE PLUG ARCHITECTURE',
    headline: 'Direct collaboration with senior partner architects & leads.',
    description: 'No middle managers. You work directly with senior principal architects, AI systems leads, performance directors, and video creative leads.',
    icon: <ShieldCheck className="w-6 h-6 text-[var(--color-electric-lime)]" />,
    statLabel: 'Senior Talent Dedicated',
    statValue: '100%',
    accentBadge: 'Senior Core',
  },
  {
    chapterNum: '03 / 04',
    subtitle: 'NARRATIVE PHASE 3 — UNIFIED DIGITAL ENGINE',
    headline: 'Web, AI automation & performance advertising under one roof.',
    description: 'We build high-velocity 3D web platforms, deploy autonomous AI customer chatbots, manage social content, and scale Google/Meta ad campaigns.',
    icon: <Zap className="w-6 h-6 text-[#00f0ff]" />,
    statLabel: 'Integrated Capabilities',
    statValue: '6 Pillars',
    accentBadge: 'Full-Stack Agency',
  },
  {
    chapterNum: '04 / 04',
    subtitle: 'NARRATIVE PHASE 4 — MEASURED OUTCOMES',
    headline: 'Engineering measurable pipeline & brand authority.',
    description: 'Every web platform, automated AI workflow, and creative campaign is measured against real conversion performance and enterprise scalability.',
    icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
    statLabel: 'Average Client ROI Boost',
    statValue: '4.2x',
    accentBadge: 'Proven Impact',
  },
];

export const ScrollytellingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [scrollProgressRatio, setScrollProgressRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;

      if (totalHeight > 0) {
        const scrolled = -rect.top;
        const ratio = Math.max(0, Math.min(1, scrolled / totalHeight));
        setScrollProgressRatio(ratio);

        const newIndex = Math.min(
          storyBeats.length - 1,
          Math.floor(ratio * storyBeats.length)
        );

        if (newIndex !== activeBeatIndex) {
          sfx.playClick();
          setActiveBeatIndex(newIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeBeatIndex]);

  const currentBeat = storyBeats[activeBeatIndex];

  return (
    <section id="scrollytelling" className="w-full bg-[var(--color-primary)] text-white">
      {/* Mobile & Tablet Responsive Flow (No sticky 320vh gap) */}
      <div className="block lg:hidden py-16 px-6 sm:px-10 max-w-[1440px] mx-auto space-y-8">
        <div className="border-b border-white/15 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-electric-lime)] uppercase tracking-widest font-bold">
            <Sparkles className="w-4 h-4" />
            <span>The PLUG Manifesto</span>
          </div>
          <span className="font-mono text-xs text-white/60">4 Phases</span>
        </div>

        {/* Mobile Tab Selector */}
        <div className="grid grid-cols-2 gap-2">
          {storyBeats.map((beat, idx) => (
            <button
              key={idx}
              onClick={() => {
                sfx.playClick();
                setActiveBeatIndex(idx);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeBeatIndex === idx
                  ? 'bg-white/20 border-[var(--color-electric-lime)] text-white'
                  : 'bg-white/5 border-white/10 text-white/60'
              }`}
            >
              <div className="font-mono text-[9px] text-[var(--color-electric-lime)] font-bold">Phase 0{idx + 1}</div>
              <div className="font-display font-bold text-xs truncate">{beat.accentBadge}</div>
            </button>
          ))}
        </div>

        {/* Active Beat Card on Mobile */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl space-y-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-electric-lime)] font-bold block">
            {currentBeat.subtitle}
          </span>
          <h3 className="font-display font-bold text-2xl text-white leading-tight">
            {currentBeat.headline}
          </h3>
          <p className="font-body text-sm text-white/80 leading-relaxed">
            {currentBeat.description}
          </p>

          <div className="pt-4 border-t border-white/15 flex items-center justify-between">
            <div>
              <span className="font-display font-bold text-3xl text-white block">{currentBeat.statValue}</span>
              <span className="font-mono text-[10px] text-white/60 uppercase">{currentBeat.statLabel}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10">{currentBeat.icon}</div>
          </div>
        </div>
      </div>

      {/* Desktop Pinned Viewport Scrollytelling (lg+ only) */}
      <div ref={containerRef} className="hidden lg:block relative h-[320vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-12 lg:p-16 overflow-hidden">
          {/* Dynamic Background SVG Glow Mesh */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx={`${20 + activeBeatIndex * 20}%`}
                cy={`${30 + activeBeatIndex * 15}%`}
                r="300"
                fill="var(--color-electric-lime)"
                filter="blur(120px)"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>

          {/* Top Scrollytelling Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-electric-lime)] uppercase tracking-widest font-bold">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Interactive Scrollytelling Manifesto</span>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs text-white/70">
              <span>{currentBeat.chapterNum}</span>
              <div className="w-36 h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-electric-lime)] transition-all duration-300"
                  style={{ width: `${scrollProgressRatio * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Middle Main Narrative Card */}
          <div className="relative z-10 max-w-5xl mx-auto my-auto w-full grid grid-cols-12 gap-8 items-center py-6">
            <div className="col-span-8 flex flex-col gap-5 animate-fade-in">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-electric-lime)] font-bold">
                {currentBeat.subtitle}
              </span>

              <h2 className="font-display font-bold text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] transition-all duration-500">
                {currentBeat.headline}
              </h2>

              <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl">
                {currentBeat.description}
              </p>
            </div>

            {/* Right Stat Callout Box */}
            <div className="col-span-4 bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col justify-between gap-6 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-white/10">{currentBeat.icon}</div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-[var(--color-electric-lime)] text-black px-2.5 py-1 rounded-md">
                  {currentBeat.accentBadge}
                </span>
              </div>

              <div>
                <span className="font-display font-bold text-6xl text-white block">
                  {currentBeat.statValue}
                </span>
                <span className="font-mono text-xs text-white/70 uppercase tracking-wider block mt-1">
                  {currentBeat.statLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Step Bar */}
          <div className="relative z-10 grid grid-cols-4 gap-3 border-t border-white/15 pt-4">
            {storyBeats.map((beat, idx) => {
              const isActive = idx === activeBeatIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    sfx.playClick();
                    const container = containerRef.current;
                    if (container) {
                      const top = container.getBoundingClientRect().top + window.pageYOffset;
                      const stepHeight = (container.getBoundingClientRect().height - window.innerHeight) / storyBeats.length;
                      window.scrollTo({ top: top + stepHeight * idx + 50, behavior: 'smooth' });
                    }
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/20 border-[var(--color-electric-lime)] text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="font-mono text-[10px] text-[var(--color-electric-lime)] font-bold mb-1">
                    0{idx + 1} // BEAT
                  </div>
                  <div className="font-display font-bold text-xs truncate">{beat.accentBadge}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

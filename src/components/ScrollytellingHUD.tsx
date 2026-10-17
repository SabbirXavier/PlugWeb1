import React, { useEffect, useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audio';

interface ScrollytellingChapter {
  id: string;
  num: string;
  title: string;
  targetId: string;
}

const chapters: ScrollytellingChapter[] = [
  { id: 'hero', num: '01', title: 'DISCOVER', targetId: '#hero' },
  { id: 'scrollytelling', num: '02', title: 'THE MANIFESTO', targetId: '#scrollytelling' },
  { id: 'disciplines', num: '03', title: 'PILLARS (6)', targetId: '#disciplines' },
  { id: 'performance', num: '04', title: 'PERFORMANCE', targetId: '#performance-marketing' },
  { id: 'scope', num: '05', title: 'SCOPE & ROI', targetId: '#scope-calculator' },
  { id: 'work', num: '06', title: 'PROOF & WORK', targetId: '#selected-work' },
  { id: 'advantage', num: '07', title: 'ADVANTAGE', targetId: '#advantage' },
  { id: 'process', num: '08', title: 'METHODOLOGY', targetId: '#process' },
  { id: 'team', num: '09', title: 'COLLECTIVE', targetId: '#team' },
  { id: 'contact', num: '10', title: 'INITIATE', targetId: '#contact-inquiry' },
];

export const ScrollytellingHUD: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      chapters.forEach((ch, idx) => {
        const el = document.querySelector(ch.targetId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset;
          const height = el.getBoundingClientRect().height;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveChapterIndex(idx);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-3 pointer-events-auto transition-all duration-300">
      {/* Chapter Indicator Badge */}
      <div className="bg-[#090a0b]/85 backdrop-blur-xl text-white border border-white/20 rounded-xl px-3 py-2 shadow-2xl flex items-center gap-2 text-xs font-mono">
        <Compass className="w-3.5 h-3.5 text-[var(--color-electric-lime)] animate-spin-slow" />
        <span className="text-[var(--color-electric-lime)] font-bold">{currentChapter.num}</span>
        <span className="text-white/40">/</span>
        <span className="text-white/90 font-bold uppercase tracking-wider text-[10px]">
          {currentChapter.title}
        </span>
      </div>

      {/* Vertical Scrollytelling Progress Track */}
      <div className="bg-[#090a0b]/60 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex flex-col items-center gap-2 shadow-xl">
        {chapters.map((ch, idx) => {
          const isActive = idx === activeChapterIndex;
          return (
            <button
              key={ch.id}
              onClick={() => {
                sfx.playClick();
                const el = document.querySelector(ch.targetId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => sfx.playLimeHover()}
              className="relative group py-0.5 cursor-pointer focus:outline-none"
              title={`${ch.num}. ${ch.title}`}
            >
              {/* Dot Track Indicator */}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--color-electric-lime)] scale-125 shadow-[0_0_10px_var(--color-electric-lime)]'
                    : 'bg-white/30 group-hover:bg-white/70 scale-90'
                }`}
              />

              {/* Hover Tooltip Label */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                <span className="text-[var(--color-electric-lime)] mr-1.5">{ch.num}</span>
                <span>{ch.title}</span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

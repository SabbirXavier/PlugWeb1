import React, { useState } from 'react';
import { Target, TrendingUp, ArrowRight, CheckCircle2, DollarSign, BarChart2, Layers, MousePointerClick, ShieldCheck } from 'lucide-react';
import { PerformanceAds3DCanvas } from './three/PerformanceAds3DCanvas';
import { sfx } from '../utils/audio';

interface PerformanceTile {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
}

const performanceTiles: PerformanceTile[] = [
  {
    id: 'google-ads',
    num: '01',
    title: 'Google Ads Management',
    subtitle: 'Search, Display & Shopping Campaigns',
    desc: 'Capture high-intent buyers the exact moment they search for your solutions. High-converting keyword structures, negative match lists, and quality score optimization.',
    features: ['Search Engine Advertising', 'Display Retargeting Networks', 'Google Shopping Feeds', 'Bidding Strategy Optimization'],
  },
  {
    id: 'meta-ads',
    num: '02',
    title: 'Meta Ads Management',
    subtitle: 'Facebook & Instagram Advertising',
    desc: 'Scalable paid social acquisition built around creative testing, Advantage+ audience modeling, dynamic product catalog ads, and retargeting sequences.',
    features: ['Advantage+ Campaigns', 'Creative A/B Testing', 'Lookalike Audiences', 'Instagram Reels & Story Ads'],
  },
  {
    id: 'youtube-ads',
    num: '03',
    title: 'YouTube Advertising',
    subtitle: 'High-Impact Video Action Ads',
    desc: 'Engage targeted audiences through skippable video ads, bumper formats, and in-feed video placements engineered for brand authority and direct action.',
    features: ['In-Stream Video Action', 'Bumper Ad Units', 'Audience Intent Targeting', 'Video Creative Optimization'],
  },
  {
    id: 'media-buying',
    num: '04',
    title: 'Performance Media Buying',
    subtitle: 'Cross-Channel Allocation',
    desc: 'Disciplined budget pacing, cross-platform attribution modeling, and strategic media placement that maximizes customer acquisition ROAS.',
    features: ['Multi-Touch Attribution', 'Cross-Channel Media Pacing', 'Programmatic Bidding', 'CPM/CPA Rate Benchmarking'],
  },
  {
    id: 'lead-generation',
    num: '05',
    title: 'Lead Generation',
    subtitle: 'Qualified Pipeline Acceleration',
    desc: 'Full-funnel lead capture architectures incorporating instant lead forms, interactive quizzes, automated triage routing, and CRM synchronization.',
    features: ['B2B & B2C Lead Funnels', 'Automated Lead Scoring', 'CRM System Pipeline Sync', 'Real-Time Lead Triage'],
  },
  {
    id: 'landing-pages',
    num: '06',
    title: 'Landing Pages & Conversion Tracking',
    subtitle: 'Sub-Second Conversion Funnels',
    desc: 'Conversion-rate optimized landing pages paired with Server-Side GTM, Meta CAPI, and Google Analytics 4 tracking for 100% data accuracy.',
    features: ['High-Velocity Landing Pages', 'Meta Conversion API (CAPI)', 'Server-Side Google Tag Manager', 'GA4 Analytics Dashboards'],
  },
  {
    id: 'ad-strategy',
    num: '07',
    title: 'Digital Advertising Strategy',
    subtitle: 'Holistic Campaign Architecture',
    desc: 'Strategic campaign planning connecting brand messaging, offer positioning, competitive media audits, and growth scaling roadmaps.',
    features: ['Competitive Media Audits', 'Offer & Positioning Tests', 'Cross-Platform Channel Mix', 'ROAS Scaling Frameworks'],
  },
];

export const PerformanceSpotlight: React.FC = () => {
  const [activeTile, setActiveTile] = useState<string>(performanceTiles[0].id);

  const handleScrollToInquiry = () => {
    sfx.playClick();
    const el = document.querySelector('#contact-inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentTileObj = performanceTiles.find((t) => t.id === activeTile) || performanceTiles[0];

  return (
    <section className="w-full py-28 px-6 sm:px-10 bg-white border-t border-black/[0.08] relative" id="performance-marketing">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#505256] font-semibold block mb-2">
              Performance Spotlight
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#090a0b] tracking-tight mb-3">
              Built Around Your Next Conversion.
            </h2>
            <p className="font-body text-base sm:text-lg text-[#505256] leading-relaxed">
              From campaign planning and creative testing to landing pages and conversion tracking, we connect the pieces that turn advertising into measurable business opportunities.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#b8ee00] text-[#090a0b] px-4 py-2 rounded-xl font-display text-xs font-bold uppercase shadow-2xs">
            <Target className="w-4 h-4 text-black" />
            <span>Cross-Channel Ads Engine</span>
          </div>
        </div>

        {/* Interactive 7 Tiles & Visual Showcase Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 7 Service Selector Tiles */}
          <div className="lg:col-span-6 space-y-3">
            <div className="font-mono text-xs text-[#505256] uppercase tracking-wider font-semibold mb-2">
              Select a Performance Pillar (1 of 7):
            </div>

            {performanceTiles.map((tile) => {
              const isActive = tile.id === activeTile;

              return (
                <div
                  key={tile.id}
                  onClick={() => {
                    setActiveTile(tile.id);
                    sfx.playClick();
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-[#090a0b] text-white border-[#090a0b] shadow-xl'
                      : 'bg-[#f4f4f2] text-[#090a0b] border-black/5 hover:border-black/20 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`font-mono text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-[#b8ee00] text-[#090a0b]' : 'bg-white text-[#090a0b]'
                      }`}
                    >
                      {tile.num}
                    </span>
                    <div>
                      <div className="font-display font-bold text-base sm:text-lg">{tile.title}</div>
                      <div className={`font-mono text-[11px] ${isActive ? 'text-slate-300' : 'text-[#505256]'}`}>
                        {tile.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-[#b8ee00] translate-x-1' : 'text-[#505256]'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Detail Inspection Card & 3D Funnel Visualizer */}
          <div className="lg:col-span-6 space-y-6 sticky top-24">
            <div className="bg-[#f4f4f2] rounded-3xl border border-black/10 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10">
                <span className="font-mono text-xs font-bold text-[#090a0b] uppercase bg-[#b8ee00] px-3 py-1 rounded-md">
                  PILLAR {currentTileObj.num} // {currentTileObj.title}
                </span>
                <span className="font-mono text-xs text-[#505256]">Illustrative Funnel</span>
              </div>

              <h3 className="font-display font-bold text-2xl text-[#090a0b] mb-3">
                {currentTileObj.title}
              </h3>

              <p className="font-body text-sm text-[#505256] leading-relaxed mb-6">
                {currentTileObj.desc}
              </p>

              {/* Feature Checkpoints */}
              <div className="space-y-2.5 mb-6">
                {currentTileObj.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-xs text-[#090a0b] font-medium bg-white p-2.5 rounded-xl border border-black/5">
                    <CheckCircle2 className="w-4 h-4 text-[#a5d600] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* 3D Performance Funnel Visual Canvas */}
              <div className="w-full h-[260px] rounded-2xl overflow-hidden relative border border-black/10 bg-white">
                <PerformanceAds3DCanvas />
              </div>

              <div className="pt-6 border-t border-black/10 flex items-center justify-between gap-4 mt-6">
                <span className="font-mono text-[11px] text-[#505256]">
                  Cross-channel campaign tracking included.
                </span>

                <button
                  onClick={handleScrollToInquiry}
                  className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider bg-[#b8ee00] text-[#090a0b] hover:bg-[#c7ff3d] px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <span>Launch {currentTileObj.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

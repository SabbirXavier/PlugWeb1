import React, { useState } from 'react';
import { sfx } from '../utils/audio';

export interface TeamMember {
  id: string;
  name: string;
  badge: 'PLUG PARTNER' | 'PLUG LEAD';
  role: string;
  category: 'exec' | 'tech' | 'creative' | 'ops' | 'growth';
  bio: string;
  tags: string[];
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 'rishab-sing',
    name: 'Rishab Sing',
    badge: 'PLUG PARTNER',
    role: 'PARTNER · PRINCIPAL ARCHITECT',
    category: 'exec',
    bio: 'Specialized in distributed edge web systems, TypeScript micro-frameworks, and high-load database architecture.',
    tags: ['Next.js', 'Rust', 'Cloudflare', 'WebGL'],
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'future-female-partner',
    name: 'Future Female Partner of PLUG',
    badge: 'PLUG PARTNER',
    role: 'PARTNER · SALES, GROWTH & MARKETING',
    category: 'growth',
    bio: 'Drives commercial growth, performance marketing strategies, enterprise client acquisition, and high-impact global brand partnerships.',
    tags: ['Sales', 'Growth', 'Performance Ads', 'Client Acquisition'],
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'iqqqq',
    name: 'Iqqqq',
    badge: 'PLUG PARTNER',
    role: 'PARTNER · CREATIVE DIRECTOR',
    category: 'creative',
    bio: 'Shapes bold editorial typography, tactile motion choreography, and high-impact identity systems across global markets.',
    tags: ['Brand Systems', 'Motion 3D', 'Typography', 'Figma'],
    imageUrl:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nemo',
    name: 'Nemo',
    badge: 'PLUG PARTNER',
    role: 'LEAD · AI SYSTEMS LEAD',
    category: 'tech',
    bio: 'Builds autonomous multi-agent pipelines, fine-tunes specialized inference models, and optimizes low-latency embeddings.',
    tags: ['LangChain', 'Python', 'Vector DBs', 'Gemini API'],
    imageUrl:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mayank',
    name: 'Mayank',
    badge: 'PLUG LEAD',
    role: 'LEAD · OPERATIONS LEAD',
    category: 'ops',
    bio: 'Oversees sprint execution, agency operations, client handoffs, and resource allocation across all 6 service pillars.',
    tags: ['Operations', 'Sprint Delivery', 'Client Success', 'Agile'],
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'archill',
    name: '4rChill',
    badge: 'PLUG LEAD',
    role: 'LEAD · LEAD GRAPHIC ARTIST',
    category: 'creative',
    bio: 'Crafts bold brand visual identities, campaign poster artwork, graphic assets, and editorial identity systems.',
    tags: ['Graphic Design', 'Brand Identity', 'Campaign Art', 'Visuals'],
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'samir',
    name: 'Samir',
    badge: 'PLUG LEAD',
    role: 'LEAD · SENIOR GRAPHIC ARTIST',
    category: 'creative',
    bio: 'Specializes in performance advertising creatives, social media visual assets, and high-impact digital design.',
    tags: ['Visual Design', 'Ad Creatives', 'Social Assets', 'Figma'],
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ayush',
    name: 'Ayush',
    badge: 'PLUG LEAD',
    role: 'LEAD · VIDEO & MOTION LEAD',
    category: 'creative',
    bio: 'Drives high-production video editing, short-form promotional content, 3D motion graphics, and launch films.',
    tags: ['Video Editing', 'Motion Graphics', 'Short-Form', 'Premiere Pro'],
    imageUrl:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
  },
];

export const TeamCollective: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'exec' | 'growth' | 'tech' | 'creative' | 'ops'>('all');

  const filteredMembers =
    filter === 'all'
      ? teamMembers
      : teamMembers.filter((m) => m.category === filter || (filter === 'exec' && m.badge === 'PLUG PARTNER'));

  return (
    <section className="w-full py-28 px-6 sm:px-10 bg-[var(--color-surface-low)]/50 border-t border-[var(--color-outline)]" id="team">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
        {/* Header & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-8 border-b border-[var(--color-outline)]">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] font-semibold block mb-2">
              05 // The Collective
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--color-primary)] tracking-tight">
              Senior minds focused on precision craft.
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="font-body text-base sm:text-lg text-[var(--color-primary)] leading-relaxed">
              PLUG operates as an elite core collective of senior architects, creative directors, sales & growth partners, AI leads, graphic artists, video directors, and operations leads who build high-velocity digital experiences with surgical precision.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[var(--color-outline)]">
              <div className="p-3 rounded-xl bg-[var(--color-surface-card)] shadow-xs hover:shadow-md transition-all">
                <span className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-primary)] block">
                  8 Active
                </span>
                <span className="font-mono text-xs text-[var(--color-muted)] uppercase">
                  Core Team Leads
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--color-surface-card)] shadow-xs hover:shadow-md transition-all">
                <span className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-primary)] block">
                  100%
                </span>
                <span className="font-mono text-xs text-[var(--color-muted)] uppercase">
                  Senior Talent Only
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--color-surface-card)] shadow-xs hover:shadow-md transition-all">
                <span className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-primary)] block">
                  4.9 / 5
                </span>
                <span className="font-mono text-xs text-[var(--color-muted)] uppercase">
                  Client Rating
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
            Team Roster ({filteredMembers.length} Members):
          </span>

          <div className="flex items-center gap-1.5 p-1 bg-[var(--color-surface-card)] border border-[var(--color-outline)] rounded-xl shadow-2xs">
            {[
              { id: 'all', label: 'All Collective (8)' },
              { id: 'exec', label: 'Partners' },
              { id: 'growth', label: 'Sales & Growth' },
              { id: 'tech', label: 'Tech & AI' },
              { id: 'creative', label: 'Creative & Video' },
              { id: 'ops', label: 'Operations' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id as typeof filter);
                  sfx.playClick();
                }}
                onMouseEnter={() => sfx.playLimeHover()}
                className={`px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[var(--color-primary)] text-[var(--color-electric-lime)] shadow-2xs scale-102'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-low)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Team Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((m) => (
            <div
              key={m.id}
              onMouseEnter={() => sfx.playLimeHover()}
              className="tilt-card bg-[var(--color-surface-card)] p-6 rounded-2xl border border-[var(--color-outline)] shadow-2xs hover:shadow-2xl hover:border-[var(--color-primary)]/30 hover:-translate-y-1.5 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Photo with Grayscale Filter & Hover Zoom */}
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-[var(--color-surface-low)] mb-5 relative">
                  <img
                    src={m.imageUrl}
                    alt={m.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-108 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-3 right-3 bg-[var(--color-primary)]/90 backdrop-blur-md text-[var(--color-electric-lime)] font-mono text-[9px] font-bold uppercase px-2.5 py-1 rounded-md shadow-xs group-hover:scale-105 transition-all">
                    {m.badge}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-bold text-xl text-[var(--color-primary)] group-hover:text-[var(--color-electric-lime)] transition-colors leading-tight">
                    {m.name}
                  </h3>
                </div>

                <span className="font-mono text-[11px] text-[var(--color-muted)] block mb-3 uppercase tracking-wider font-semibold">
                  {m.role}
                </span>

                <p className="font-body text-xs text-[var(--color-muted)] leading-relaxed mb-4">{m.bio}</p>
              </div>

              <div className="flex gap-1.5 flex-wrap mt-4 pt-4 border-t border-[var(--color-outline)]">
                {m.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] bg-[var(--color-surface-low)] group-hover:bg-[var(--color-electric-lime)]/20 px-2 py-0.5 rounded text-[var(--color-primary)] transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


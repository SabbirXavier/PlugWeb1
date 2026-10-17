import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Filter } from 'lucide-react';
import { ProjectModal, CaseStudy } from './ProjectModal';
import { sfx } from '../utils/audio';

const caseStudies: CaseStudy[] = [
  {
    id: 'lumen-healthcare',
    title: 'LUMEN HEALTHCARE',
    category: 'Web',
    subtitle: 'Clinical Operations Portal',
    description:
      'Architected a unified patient portal and enterprise staff scheduling engine processing 40,000+ monthly clinical bookings with zero downtime and sub-100ms response times.',
    metrics: [
      { label: 'Monthly Bookings', value: '40,000+' },
      { label: 'Latency', value: '< 90ms' },
      { label: 'Uptime', value: '99.99%' },
    ],
    tags: ['Web Solutions', 'Next.js', 'HIPAA Engine', 'Edge API'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAky2C5ICg1rFTrznRbR3--4uHbAHApA71iFy0QtMBTGxJEGBLyC1AnlEsvLr4AFLedPvwVI_LhjxF8Vs_3a9yqz8XsAXk5p9tlEuYLlE32QOPMrNfTPEWV5piUnYhC55gSmfmrfwhMSCs1n0fl2kjiGpsQqsEXbx_dyYUj6RV0H4ElHFZ6x9dcVgOwqKCBxY9iRav2ylePs44INk-uYrFxSdaeAkhABlvr7FdgGaA',
    challenge:
      'Lumen Healthcare faced fragmented patient portals, slow booking latency, and security compliance bottlenecks that led to high dropoff rates.',
    solution:
      'PLUG engineered a Next.js micro-frontend with distributed edge caching and automated appointment sync, dropping booking times from 4 minutes to 30 seconds.',
    clientQuote: {
      text: 'PLUG delivered our entire clinical portal 3 weeks ahead of deadline. The speed and design elevation transformed patient feedback.',
      author: 'Dr. Sarah Lin',
      role: 'Chief Medical Officer, Lumen',
    },
  },
  {
    id: 'kinetic-commerce',
    title: 'KINETIC COMMERCE',
    category: 'Web',
    subtitle: 'Headless DTC Storefront',
    description:
      'Global direct-to-consumer flagship storefront featuring interactive 3D product exploration, sub-second page transitions, and frictionless checkout.',
    metrics: [
      { label: 'Sales Velocity', value: '+240%' },
      { label: 'Conversion Rate', value: '4.8%' },
      { label: 'Checkout Time', value: '1.2s' },
    ],
    tags: ['Web Solutions', 'Headless Shopify', 'Three.js 3D', 'Stripe'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFMiIq1Wea7-ceSZjZCkg2_rRZm8OWwt1gBjkrEzwO_VQOk3wHWrNnRbC_VZwF1SbnaWCLgetIEiD3Nd3kdJqgNsatxDMCaqcXNhYfq6OOWP95TC9SRZ8wZHXb29gICS5rlt6co5MVhTGOx9u7XjoilWgzgPrPYoAqZPh4gX2pclRP57QdkUjq3rBskSvfbplsE2YdXtxbSU3BiSFyiMPvuJ8sILAAPZbLzxBzXXw',
    challenge:
      'Legacy monolithic e-commerce stack suffered from slow page loads, poor mobile conversion, and static product imagery.',
    solution:
      'PLUG constructed a 3D web product preview canvas, instant cart drawer, and headless storefront pipeline yielding 2.4x conversion acceleration.',
    clientQuote: {
      text: 'The 3D product viewer built by PLUG became our highest-converting feature overnight.',
      author: 'Alexandre Mercer',
      role: 'Founder, Kinetic',
    },
  },
  {
    id: 'synapse-flow',
    title: 'SYNAPSE FLOW',
    category: 'AI',
    subtitle: 'AI Workflow Architecture',
    description:
      'Engineered an autonomous customer support and intelligent triage system handling 85,000 inquiries monthly, reducing human ticket volume by 72%.',
    metrics: [
      { label: 'Auto Resolution', value: '72%' },
      { label: 'Avg Response', value: '< 3.8s' },
      { label: 'Monthly Volume', value: '85,000' },
    ],
    tags: ['AI & Automation', 'LangChain', 'Vector DB', 'Multi-Agent'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpJAumoS88fLply-W1_GoRfmHYhUFfKoty_RrUiXn3lxmyjIhjvErE47mEcUr-V0-xRRwk6k3-Rar788yQ0gMUzgU5a84jKsBjCUIy8J3KBHjVcnmJtJJvrGiz38b8KGlb3_LqjzPXiSkW5uBQUR7uKMB41UT6gph5YoOJ4hqqyUN5rB4YVfWCdBvhDloAcu7wz4GcTeFlFr9G-XoX4WWwPcLWXA1r28D1g2O-hAg',
    challenge:
      'Customer support team was overwhelmed by repetitive tier-1 tickets, leading to 24-hour response delays and customer churn.',
    solution:
      'PLUG built a multi-agent AI triage system trained on company documentation that resolves inquiries autonomously and routes complex edge cases instantly.',
    clientQuote: {
      text: 'PLUG turned our support department into a profit center. Response latency dropped from 24 hours to 3 seconds.',
      author: 'David K. Vance',
      role: 'VP Operations, Synapse',
    },
  },
  {
    id: 'apex-performance',
    title: 'APEX PERFORMANCE',
    category: 'Creative',
    subtitle: 'Google & Meta Acquisition',
    description:
      'Cross-channel paid search and Meta advertising funnel connecting high-intent Google Search traffic with conversion-optimized landing pages.',
    metrics: [
      { label: 'Lead Volume', value: '+310%' },
      { label: 'CPA Reduction', value: '-38%' },
      { label: 'Attribution', value: '100% CAPI' },
    ],
    tags: ['Performance Ads', 'Google Search', 'Meta CAPI', 'Landing Pages'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1VJoHonCau4GZ_fZSpcSId66wUyw3kVsGDFZmRDXcwhBie3FcNUMzH1YsXIV5NQieYrzztEt9_s59FxRJoUB5grM1kH2Ny-CzaxA5dJSq3YoEnOq_Zv37jwe6GY0b7OFJrEMBiCSNcNSQVwYBy0hXXfUKRn8DmLQlXz8VKI7xSfDcZsH5Mhfqyisd0w73wYKT5zC9Mdy-YdXyDLK5ANE94VePWPfNf0pF-OMFA7aHQ',
    challenge:
      'Unfocused ad spend across Facebook and Google Ads resulted in high CPA and poor lead qualification.',
    solution:
      'PLUG re-architected the ad strategy with Advantage+ targeting, custom video creative testing, and server-side Tag Manager conversion tracking.',
    clientQuote: {
      text: 'PLUG brought absolute clarity to our ad budgets. We tripled qualified lead volume while cutting CPA by 38%.',
      author: 'Rachel Sterling',
      role: 'Head of Growth, Apex',
    },
  },
  {
    id: 'aetheria-portal',
    title: 'AETHERIA CAMPUS',
    category: 'Web',
    subtitle: 'School & Portal System',
    description:
      'Integrated student, teacher, and employee management platform serving 12,000 active users with real-time gradebooks and schedule sync.',
    metrics: [
      { label: 'Active Users', value: '12,000' },
      { label: 'Data Sync', value: 'Instant' },
      { label: 'Role Security', value: '100%' },
    ],
    tags: ['Web Solutions', 'Role RBAC', 'PostgreSQL', 'Tailwind'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1XmCB3OdmJcmU2Dc5jxWs-PeKqFW0jDJFNx9rFMmUi9o4ro-BvoG1B4tFcpCZShJPjBzMjEIq3rq1pYNZj-59G8CloUBSVl9ANepCYkklbrdVrZA4XQZtm1tRUbiCT8SRcqqVXOxQt46ifVC9wEZ9v2MWmre19PojTiPX8wNUGEOKOePK3rhVC88wNnuV8dxBQrTM3epBNGDx0fAQFSoq1iVmmyVMlYr9xCHLfiIDGM',
    challenge:
      'Disparate legacy software for attendance, grades, and staff scheduling created administrative headaches and data silos.',
    solution:
      'PLUG built a unified web portal with role-based permissions, instant messaging, and automated attendance reporting.',
    clientQuote: {
      text: 'Our teachers and staff saved 8+ hours a week thanks to PLUG’s intuitive portal design.',
      author: 'Elena Rostova',
      role: 'Dean of Technology, Aetheria',
    },
  },
  {
    id: 'vanguard-creative',
    title: 'VANGUARD MEDIA',
    category: 'Creative',
    subtitle: 'Brand System & Creator PR',
    description:
      'End-to-end social media management, 3D motion design, and PR creator collaborations yielding 12M+ organic impressions.',
    metrics: [
      { label: 'Impressions', value: '12M+' },
      { label: 'Creator Deals', value: '24' },
      { label: 'Engagement', value: '+180%' },
    ],
    tags: ['Creative Studio', 'PR & Collaborations', 'Social Media', 'Motion 3D'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1WStq13zagMsJfFeB9Sl-FeCVHUQTNjDjtGyT8u3iM58cMsCehjVUUURORgE1YgHUpTct0xD3fwoXxFlbd7S6mhNureXLF63dy2BZkBZtI7VXyxPRA2n33DMbbljjno6xRx43yTrfaY6NF7oF0NxJRPnUS66Ex8UhcpJFn2-j-lzOuaqmsIcMeu8FZZrBEnBwsoQITLqjOBk0Cr-Prhe_bdqVpxmJChkgg1bEUOHbZh',
    challenge:
      'Vanguard needed a breakthrough brand identity, launch film, and PR outreach to disrupt a crowded market.',
    solution:
      'PLUG developed custom 3D motion trailers, editorial campaign assets, and managed top-tier creator sponsorship deals.',
    clientQuote: {
      text: 'The 3D campaign visuals created by PLUG won Site of the Day honors and drove 12 million impressions.',
      author: 'Marcus Chen',
      role: 'Brand Lead, Vanguard',
    },
  },
];

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Web' | 'AI' | 'Creative'>('All');
  const [activeModalProject, setActiveModalProject] = useState<CaseStudy | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? caseStudies
    : caseStudies.filter((c) => c.category === selectedCategory);

  return (
    <section className="w-full py-14 sm:py-20 lg:py-28 px-6 sm:px-10 relative" id="selected-work">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#505256] font-semibold block mb-2">
              03. Verified Commercial Proof
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#090a0b] tracking-tight">
              Enterprise Case Studies & Attributed ROI
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#f4f4f2] border border-black/10 rounded-xl">
            {(['All', 'Web', 'AI', 'Creative'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  sfx.playClick();
                }}
                className={`px-3.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#090a0b] text-[#b8ee00] shadow-2xs'
                    : 'text-[#505256] hover:text-[#090a0b]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {filteredProjects.map((project, idx) => {
            const isFeatured = idx === 0 && selectedCategory === 'All';
            const colSpan = isFeatured ? 'lg:col-span-8' : idx === 1 && selectedCategory === 'All' ? 'lg:col-span-4' : 'lg:col-span-6';

            return (
              <div
                key={project.id}
                onClick={() => {
                  sfx.playClick();
                  setActiveModalProject(project);
                }}
                className={`tilt-card ${colSpan} bg-white rounded-3xl border border-black/[0.08] overflow-hidden group shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="aspect-[16/9] w-full overflow-hidden bg-[#f4f4f2] relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#b8ee00] text-[#090a0b] font-mono text-[11px] font-bold uppercase px-3 py-1 rounded-full shadow-2xs">
                        {project.category}
                      </span>
                      <span className="bg-white/90 backdrop-blur-md text-[#090a0b] font-mono text-[11px] uppercase px-3 py-1 rounded-full font-semibold">
                        {project.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#090a0b] group-hover:text-[#536d00] transition-colors">
                        {project.title}
                      </h3>
                      <span className="font-mono text-xs text-[#505256] uppercase">
                        {project.subtitle}
                      </span>
                    </div>
                    <p className="font-body text-sm sm:text-base text-[#505256] leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/[0.06]">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((t, i) => (
                        <span key={i} className="font-mono text-xs bg-[#f4f4f2] px-3 py-1 rounded-md text-[#090a0b]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase text-[#090a0b] group-hover:text-[#a5d600] transition-colors">
                      <span>Inspect Concept</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal Inspector */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

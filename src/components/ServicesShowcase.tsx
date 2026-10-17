import React, { useState } from 'react';
import { Check, ArrowRight, Code, Cpu, Target, Share2, Palette, Handshake, Sparkles } from 'lucide-react';
import { WebDev3DCanvas } from './three/WebDev3DCanvas';
import { AiAutomation3DCanvas } from './three/AiAutomation3DCanvas';
import { PerformanceAds3DCanvas } from './three/PerformanceAds3DCanvas';
import { SocialMedia3DCanvas } from './three/SocialMedia3DCanvas';
import { Creative3DCanvas } from './three/Creative3DCanvas';
import { Partnerships3DCanvas } from './three/Partnerships3DCanvas';
import { AiChatSimulator } from './AiChatSimulator';
import { ServiceDetailModal, ServiceDetail } from './ServiceDetailModal';
import { sfx } from '../utils/audio';

export const serviceDetailsData: ServiceDetail[] = [
  {
    id: 'web-solutions',
    num: '01',
    title: 'Web & Digital Solutions',
    category: 'Engineering & Portals',
    heroCopy: 'Build your digital presence with high-performance web platforms, e-commerce storefronts, and enterprise portal systems.',
    supportingCopy: 'High-speed, scalable digital platforms engineered with surgical code quality, sub-second latency, flawless design fidelity, and search dominance.',
    bulletServices: [
      'Static and dynamic websites (Next.js, Astro, Remix)',
      'E-commerce websites and landing pages (Shopify, custom checkout)',
      'School management websites and systems',
      'Office and employee-management systems',
      'Business portals and web applications',
      'Conversion-focused landing pages with A/B testing',
    ],
    deliverables: ['Custom Next.js Web App', 'Sub-100ms Page Hydration', 'CMS Integration', 'Responsive 3D Viewports'],
    techStack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Three.js / WebGL', 'PostgreSQL'],
    keyBenefits: [
      { label: 'Sub-100ms Latency', desc: 'Lightning-fast edge rendering.' },
      { label: 'Conversion Coded', desc: 'Tuned for lead generation.' },
    ],
  },
  {
    id: 'ai-automation',
    num: '02',
    title: 'AI & Business Automation',
    category: 'Intelligence & Workflows',
    heroCopy: 'Make everyday business operations smarter with autonomous neural agents and automated customer triage loops.',
    supportingCopy: 'Custom neural agents, business logic triggers, and autonomous pipelines that eradicate repetitive busywork and scale operations effortlessly.',
    bulletServices: [
      'AI chatbots and customer support automation',
      'Business workflow automation (CRM, Notion, Slack)',
      'Automated customer interactions and ticket triage',
      'Lead qualification and enquiry routing',
      'Real-time data processing and automated report digests',
    ],
    deliverables: ['Custom AI Support Chatbot', 'RAG Knowledge Base', 'Multi-App CRM Automation', 'Automated Lead Triage'],
    techStack: ['OpenAI / Gemini API', 'LangChain', 'Python', 'Vector DBs', 'Webhooks'],
    keyBenefits: [
      { label: '70%+ Ticket Resolution', desc: 'Auto-resolve routine queries.' },
      { label: 'Zero Lag Response', desc: 'Instant 24/7 customer support.' },
    ],
  },
  {
    id: 'performance-marketing',
    num: '03',
    title: 'Performance Marketing & Advertising',
    category: 'Media & Acquisition',
    heroCopy: 'Turn advertising budgets into measurable business opportunities across Google, Meta, and YouTube.',
    supportingCopy: 'Connect campaign strategy, creative messaging, targeting, landing pages, and conversion measurement around your business objectives.',
    bulletServices: [
      'Google Ads: Search, Display, and Shopping campaigns',
      'Meta Ads: Facebook and Instagram advertising',
      'YouTube advertising (In-stream & Action units)',
      'Performance marketing and media buying',
      'Lead generation and pipeline acceleration',
      'Landing pages and conversion tracking (GTM, CAPI)',
      'Digital advertising strategy and campaign optimisation',
    ],
    deliverables: ['Cross-Channel Paid Media Campaigns', 'GA4 & Server-Side Tagging', 'High-ROAS Ad Creatives', 'Conversion Funnel Pages'],
    techStack: ['Google Ads', 'Meta Ads Manager', 'YouTube Ads', 'Server-Side GTM', 'Meta CAPI'],
    keyBenefits: [
      { label: '100% Attribution', desc: 'Accurate server-side tracking.' },
      { label: 'Scalable ROAS', desc: 'Data-driven audience targeting.' },
    ],
  },
  {
    id: 'social-media',
    num: '04',
    title: 'Social Media & Content Management',
    category: 'Brand Presence & Community',
    heroCopy: 'Keep your brand active, consistent, and connected with the people who matter to your business.',
    supportingCopy: 'Build a consistent and recognisable brand through structured content calendars, active community management, and multi-channel storytelling.',
    bulletServices: [
      'Social media account management across all channels',
      'Content calendars and automated publishing queues',
      'Content planning and narrative publishing',
      'Community and account management',
      'Social media growth and performance marketing',
    ],
    deliverables: ['Monthly Content Calendar', 'Short-Form Video Posts', 'Community Engagement Triage', 'Brand Aesthetic Guidelines'],
    techStack: ['Figma', 'Buffer / Hootsuite', 'Premiere Pro', 'Social Analytics'],
    keyBenefits: [
      { label: 'Consistent Branding', desc: 'Never miss a publishing window.' },
      { label: 'Engaged Audience', desc: 'Active community interaction.' },
    ],
  },
  {
    id: 'creative-studio',
    num: '05',
    title: 'Creative Studio & Production',
    category: 'Design & Motion Video',
    heroCopy: 'Turn ideas into visual identities, engaging content, and creative assets that make your brand stand out.',
    supportingCopy: 'Create content that captures attention—from high-production motion graphics and short-form videos to campaign posters and brand design systems.',
    bulletServices: [
      'Graphic design and brand creative systems',
      'Video editing and short-form promotional videos',
      'Advertising creatives and campaign asset suites',
      'Promotional content and 3D motion graphics',
      'Social media visual production and launch films',
    ],
    deliverables: ['3D Motion Graphics', 'Short-Form Video Edits', 'Campaign Asset Suite', 'Complete Brand Design System'],
    techStack: ['Figma', 'After Effects', 'Premiere Pro', 'Cinema 4D / Blender'],
    keyBenefits: [
      { label: 'Category Standout', desc: 'Vanguard 3D & editorial design.' },
      { label: 'Multi-Format Assets', desc: 'Ready for ads, social & web.' },
    ],
  },
  {
    id: 'brand-partnerships',
    num: '06',
    title: 'Brand Partnerships, PR & Collaborations',
    category: 'Public Relations & Creators',
    heroCopy: 'Bring brands, creators, and opportunities together through meaningful partnerships and coordinated campaigns.',
    supportingCopy: 'Connect brands with the right opportunities through strategic public relations, creator collaborations, press outreach, and deal coordination.',
    bulletServices: [
      'Public relations and brand communication strategy',
      'Brand deals and corporate sponsorships',
      'Influencer and creator collaboration management',
      'Partnership coordination and campaign execution',
      'Co-branded product launches and press placement',
    ],
    deliverables: ['Press Release & PR Distribution', 'Creator Collaboration Deals', 'Sponsorship Management', 'Co-Marketing Campaign Briefs'],
    techStack: ['PR Newswire', 'Muck Rack', 'Creator CRM', 'Notion Partner Hub'],
    keyBenefits: [
      { label: 'Global Media Reach', desc: 'Featured in leading publications.' },
      { label: 'Authentic Partnerships', desc: 'High-converting creator deals.' },
    ],
  },
];

export const ServicesShowcase: React.FC<{ onStartProject: (serviceId: string) => void }> = ({
  onStartProject,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeDetailService, setActiveDetailService] = useState<ServiceDetail | null>(null);
  const [aiViewMode, setAiViewMode] = useState<'3d' | 'chat'>('3d');

  const openServiceModal = (serviceId: string) => {
    sfx.playClick();
    const found = serviceDetailsData.find((s) => s.id === serviceId);
    if (found) setActiveDetailService(found);
  };

  return (
    <section className="w-full py-14 sm:py-20 lg:py-28 px-6 sm:px-10 bg-[#f4f4f2]/50 relative border-t border-black/[0.06]" id="disciplines">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16 sm:gap-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/[0.08]">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#505256] font-semibold block mb-3">
              01. Core Capabilities Ecosystem
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#090a0b] tracking-tight mb-3">
              Everything Your Brand Needs to Move Forward
            </h2>
            <p className="font-body text-base sm:text-lg text-[#505256] leading-relaxed">
              From building your digital presence to attracting customers and creating meaningful brand connections, PLUG brings your digital growth under one roof.
            </p>
          </div>

          {/* Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-black/10 rounded-xl shadow-2xs">
            {[
              { id: 'all', label: 'All 6 Services' },
              { id: 'web-solutions', label: '01. Web' },
              { id: 'ai-automation', label: '02. AI' },
              { id: 'performance-marketing', label: '03. Ads' },
              { id: 'social-media', label: '04. Social' },
              { id: 'creative-studio', label: '05. Creative' },
              { id: 'brand-partnerships', label: '06. PR' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  sfx.playClick();
                }}
                onMouseEnter={() => sfx.playLimeHover()}
                className={`px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#090a0b] text-[#b8ee00] shadow-2xs scale-102'
                    : 'text-[#505256] hover:text-[#090a0b] hover:bg-[#f4f4f2]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SERVICE 01: WEB & DIGITAL SOLUTIONS */}
        {(activeTab === 'all' || activeTab === 'web-solutions') && (
          <div
            onMouseEnter={() => sfx.playLimeHover()}
            className="tilt-card bg-white rounded-3xl border border-black/[0.08] hover:border-black/30 p-8 lg:p-12 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5 flex flex-col justify-between h-full order-2 lg:order-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase font-semibold px-3 py-1 bg-[#eeeeec] group-hover:bg-[#b8ee00]/30 rounded-md text-[#090a0b] flex items-center gap-1.5 transition-colors">
                      <Code className="w-3.5 h-3.5 text-[#a5d600]" />
                      <span>SERVICE 01 · WEB & DIGITAL SOLUTIONS</span>
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#b8ee00]/30 group-hover:bg-[#b8ee00] text-[#090a0b] flex items-center justify-center font-bold font-mono text-xs transition-colors">
                      01
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#090a0b] group-hover:text-[#536d00] transition-colors mb-4 tracking-tight">
                    Web & Digital Solutions
                  </h3>

                  <p className="font-body text-sm sm:text-base text-[#505256] leading-relaxed mb-6">
                    Build your digital presence with high-performance web platforms, e-commerce storefronts, and enterprise management systems.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      'Static and dynamic websites (Next.js, Astro)',
                      'E-commerce websites and custom checkout flows',
                      'Landing pages and conversion-focused web pages',
                      'School management websites and portals',
                      'Office and employee-management systems',
                      'Business portals and web applications',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-[#090a0b] group/item hover:translate-x-1 transition-transform">
                        <span className="w-5 h-5 rounded-full bg-[#b8ee00] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                          <Check className="w-3 h-3 text-[#090a0b]" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#505256]">Sub-100ms Hydration</span>
                  <button
                    onClick={() => openServiceModal('web-solutions')}
                    className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase text-[#090a0b] hover:text-[#a5d600] transition-colors group-hover:translate-x-1.5 duration-200 cursor-pointer"
                  >
                    <span>Explore Web Solutions</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <WebDev3DCanvas />
              </div>
            </div>
          </div>
        )}

        {/* SERVICE 02: AI & BUSINESS AUTOMATION */}
        {(activeTab === 'all' || activeTab === 'ai-automation') && (
          <div
            onMouseEnter={() => sfx.playLimeHover()}
            className="tilt-card bg-white rounded-3xl border border-black/[0.08] hover:border-black/30 p-8 lg:p-12 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 relative">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#505256] uppercase font-semibold">
                    Interactive AI Showcase
                  </span>
                  <div className="flex items-center gap-1 bg-[#f4f4f2] p-1 rounded-xl border border-black/10">
                    <button
                      onClick={() => {
                        setAiViewMode('3d');
                        sfx.playClick();
                      }}
                      className={`px-3 py-1 text-xs font-mono font-medium rounded-lg transition-all ${
                        aiViewMode === '3d' ? 'bg-[#090a0b] text-[#b8ee00]' : 'text-[#505256] hover:text-[#090a0b]'
                      }`}
                    >
                      3D Node Mesh
                    </button>
                    <button
                      onClick={() => {
                        setAiViewMode('chat');
                        sfx.playClick();
                      }}
                      className={`px-3 py-1 text-xs font-mono font-medium rounded-lg transition-all ${
                        aiViewMode === 'chat' ? 'bg-[#090a0b] text-[#b8ee00]' : 'text-[#505256] hover:text-[#090a0b]'
                      }`}
                    >
                      Live Chatbot Sandbox
                    </button>
                  </div>
                </div>

                {aiViewMode === '3d' ? <AiAutomation3DCanvas /> : <AiChatSimulator />}
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase font-semibold px-3 py-1 bg-[#eeeeec] group-hover:bg-[#b8ee00]/30 rounded-md text-[#090a0b] flex items-center gap-1.5 transition-colors">
                      <Cpu className="w-3.5 h-3.5 text-[#536d00]" />
                      <span>SERVICE 02 · AI & BUSINESS AUTOMATION</span>
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#b8ee00]/30 group-hover:bg-[#b8ee00] text-[#090a0b] flex items-center justify-center font-bold font-mono text-xs transition-colors">
                      02
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#090a0b] group-hover:text-[#536d00] transition-colors mb-4 tracking-tight">
                    AI & Business Automation
                  </h3>

                  <p className="font-body text-sm sm:text-base text-[#505256] leading-relaxed mb-6">
                    Make everyday business operations smarter with custom neural agents, workflow automation, and automated triage loops.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      'AI chatbots and customer support automation',
                      'Automated customer interactions and triage',
                      'Business workflow automation (CRM, Notion, Slack)',
                      'Lead qualification and enquiry routing',
                      'Customer support automation and RAG DBs',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-[#090a0b] group/item hover:translate-x-1 transition-transform">
                        <span className="w-5 h-5 rounded-full bg-[#b8ee00] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                          <Check className="w-3 h-3 text-[#090a0b]" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#505256]">70%+ Auto Resolution</span>
                  <button
                    onClick={() => openServiceModal('ai-automation')}
                    className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase text-[#090a0b] hover:text-[#a5d600] transition-colors group-hover:translate-x-1.5 duration-200 cursor-pointer"
                  >
                    <span>Explore Automation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SERVICE 03: PERFORMANCE MARKETING & ADVERTISING */}
        {(activeTab === 'all' || activeTab === 'performance-marketing') && (
          <div
            onMouseEnter={() => sfx.playLimeHover()}
            className="tilt-card bg-white rounded-3xl border border-black/[0.08] hover:border-black/30 p-8 lg:p-12 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5 flex flex-col justify-between h-full order-2 lg:order-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase font-semibold px-3 py-1 bg-[#eeeeec] group-hover:bg-[#b8ee00]/30 rounded-md text-[#090a0b] flex items-center gap-1.5 transition-colors">
                      <Target className="w-3.5 h-3.5 text-[#090a0b]" />
                      <span>SERVICE 03 · PERFORMANCE MARKETING</span>
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#b8ee00]/30 group-hover:bg-[#b8ee00] text-[#090a0b] flex items-center justify-center font-bold font-mono text-xs transition-colors">
                      03
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#090a0b] group-hover:text-[#536d00] transition-colors mb-4 tracking-tight">
                    Performance Marketing & Advertising
                  </h3>

                  <p className="font-body text-sm sm:text-base text-[#505256] leading-relaxed mb-6">
                    Turn advertising budgets into measurable business opportunities across Google, Meta, and YouTube channels.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      'Google Ads: Search, Display, and Shopping campaigns',
                      'Meta Ads: Facebook and Instagram advertising',
                      'YouTube advertising and Video Action ads',
                      'Performance marketing and media buying',
                      'Lead generation and conversion tracking',
                      'Digital advertising strategy and campaign optimisation',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-[#090a0b] group/item hover:translate-x-1 transition-transform">
                        <span className="w-5 h-5 rounded-full bg-[#b8ee00] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                          <Check className="w-3 h-3 text-[#090a0b]" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#505256]">Server-Side CAPI & GA4</span>
                  <button
                    onClick={() => openServiceModal('performance-marketing')}
                    className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase text-[#090a0b] hover:text-[#a5d600] transition-colors group-hover:translate-x-1.5 duration-200 cursor-pointer"
                  >
                    <span>Explore Performance Marketing</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <PerformanceAds3DCanvas />
              </div>
            </div>
          </div>
        )}

        {/* SERVICE 04: SOCIAL MEDIA & CONTENT MANAGEMENT */}
        {(activeTab === 'all' || activeTab === 'social-media') && (
          <div
            onMouseEnter={() => sfx.playLimeHover()}
            className="tilt-card bg-white rounded-3xl border border-black/[0.08] hover:border-black/30 p-8 lg:p-12 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7">
                <SocialMedia3DCanvas />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase font-semibold px-3 py-1 bg-[#eeeeec] group-hover:bg-[#b8ee00]/30 rounded-md text-[#090a0b] flex items-center gap-1.5 transition-colors">
                      <Share2 className="w-3.5 h-3.5 text-[#a5d600]" />
                      <span>SERVICE 04 · SOCIAL MEDIA & CONTENT</span>
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#b8ee00]/30 group-hover:bg-[#b8ee00] text-[#090a0b] flex items-center justify-center font-bold font-mono text-xs transition-colors">
                      04
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#090a0b] group-hover:text-[#536d00] transition-colors mb-4 tracking-tight">
                    Social Media & Content Management
                  </h3>

                  <p className="font-body text-sm sm:text-base text-[#505256] leading-relaxed mb-6">
                    Keep your brand active, consistent, and connected with the people who matter to your business.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      'Social media account management',
                      'Content calendars and automated posting',
                      'Content planning and publishing',
                      'Community and account management',
                      'Social media marketing campaigns',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-[#090a0b] group/item hover:translate-x-1 transition-transform">
                        <span className="w-5 h-5 rounded-full bg-[#b8ee00] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                          <Check className="w-3 h-3 text-[#090a0b]" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#505256]">Multi-Channel Publishing</span>
                  <button
                    onClick={() => openServiceModal('social-media')}
                    className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase text-[#090a0b] hover:text-[#a5d600] transition-colors group-hover:translate-x-1.5 duration-200 cursor-pointer"
                  >
                    <span>Explore Social Media</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SERVICE 05: CREATIVE STUDIO & PRODUCTION */}
        {(activeTab === 'all' || activeTab === 'creative-studio') && (
          <div
            onMouseEnter={() => sfx.playLimeHover()}
            className="tilt-card bg-white rounded-3xl border border-black/[0.08] hover:border-black/30 p-8 lg:p-12 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5 flex flex-col justify-between h-full order-2 lg:order-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase font-semibold px-3 py-1 bg-[#eeeeec] group-hover:bg-[#b8ee00]/30 rounded-md text-[#090a0b] flex items-center gap-1.5 transition-colors">
                      <Palette className="w-3.5 h-3.5 text-[#090a0b]" />
                      <span>SERVICE 05 · CREATIVE STUDIO</span>
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#b8ee00]/30 group-hover:bg-[#b8ee00] text-[#090a0b] flex items-center justify-center font-bold font-mono text-xs transition-colors">
                      05
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#090a0b] group-hover:text-[#536d00] transition-colors mb-4 tracking-tight">
                    Creative Studio & Production
                  </h3>

                  <p className="font-body text-sm sm:text-base text-[#505256] leading-relaxed mb-6">
                    Turn ideas into visual identities, engaging content, and creative assets that make your brand stand out.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      'Graphic design and brand creative systems',
                      'Video editing and short-form promotional videos',
                      'Advertising creatives and campaign asset suites',
                      'Promotional content and 3D motion graphics',
                      'Social media visual production and launch films',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-[#090a0b] group/item hover:translate-x-1 transition-transform">
                        <span className="w-5 h-5 rounded-full bg-[#b8ee00] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                          <Check className="w-3 h-3 text-[#090a0b]" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#505256]">3D Motion & Video Studio</span>
                  <button
                    onClick={() => openServiceModal('creative-studio')}
                    className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase text-[#090a0b] hover:text-[#a5d600] transition-colors group-hover:translate-x-1.5 duration-200 cursor-pointer"
                  >
                    <span>Explore Creative Services</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <Creative3DCanvas />
              </div>
            </div>
          </div>
        )}

        {/* SERVICE 06: BRAND PARTNERSHIPS, PR & COLLABORATIONS */}
        {(activeTab === 'all' || activeTab === 'brand-partnerships') && (
          <div
            onMouseEnter={() => sfx.playLimeHover()}
            className="tilt-card bg-white rounded-3xl border border-black/[0.08] hover:border-black/30 p-8 lg:p-12 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7">
                <Partnerships3DCanvas />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase font-semibold px-3 py-1 bg-[#eeeeec] group-hover:bg-[#b8ee00]/30 rounded-md text-[#090a0b] flex items-center gap-1.5 transition-colors">
                      <Handshake className="w-3.5 h-3.5 text-[#536d00]" />
                      <span>SERVICE 06 · PR & PARTNERSHIPS</span>
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#b8ee00]/30 group-hover:bg-[#b8ee00] text-[#090a0b] flex items-center justify-center font-bold font-mono text-xs transition-colors">
                      06
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#090a0b] group-hover:text-[#536d00] transition-colors mb-4 tracking-tight">
                    Brand Partnerships, PR & Collaborations
                  </h3>

                  <p className="font-body text-sm sm:text-base text-[#505256] leading-relaxed mb-6">
                    Bring brands, creators, and opportunities together through meaningful partnerships and coordinated campaigns.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      'Public relations and brand communication strategy',
                      'Brand deals and corporate sponsorships',
                      'Influencer and creator collaboration management',
                      'Partnership coordination and campaign execution',
                      'Co-branded product launches and press placement',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-[#090a0b] group/item hover:translate-x-1 transition-transform">
                        <span className="w-5 h-5 rounded-full bg-[#b8ee00] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                          <Check className="w-3 h-3 text-[#090a0b]" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#505256]">Global Creator & Press Network</span>
                  <button
                    onClick={() => openServiceModal('brand-partnerships')}
                    className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase text-[#090a0b] hover:text-[#a5d600] transition-colors group-hover:translate-x-1.5 duration-200 cursor-pointer"
                  >
                    <span>Explore Partnerships</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Service Detail Modal Inspection */}
      <ServiceDetailModal
        service={activeDetailService}
        onClose={() => setActiveDetailService(null)}
        onStartProject={(sId) => {
          onStartProject(sId);
        }}
      />
    </section>
  );
};

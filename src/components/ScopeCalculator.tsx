import React, { useState } from 'react';
import { Calculator, ArrowRight, Clock, Users, Cpu, TrendingUp, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { sfx } from '../utils/audio';

interface ServiceOption {
  id: string;
  name: string;
  baseWeeks: number;
  baseCost: number;
  expectedRoiMultiplier: number;
  hoursSavedWeekly: number;
  deliverableSample: string;
}

const SERVICES_CATALOG: ServiceOption[] = [
  {
    id: 'web-solutions',
    name: '01. Web & Portals',
    baseWeeks: 2,
    baseCost: 7500,
    expectedRoiMultiplier: 3.4,
    hoursSavedWeekly: 14,
    deliverableSample: 'Sub-100ms Edge Next.js Platform + 3D Viewport',
  },
  {
    id: 'ai-automation',
    name: '02. AI Automation',
    baseWeeks: 2,
    baseCost: 6500,
    expectedRoiMultiplier: 4.5,
    hoursSavedWeekly: 32,
    deliverableSample: 'Custom Neural Agent + CRM & Support Triage Loop',
  },
  {
    id: 'performance-marketing',
    name: '03. Performance Ads',
    baseWeeks: 2,
    baseCost: 8000,
    expectedRoiMultiplier: 4.8,
    hoursSavedWeekly: 18,
    deliverableSample: 'Meta & Google Ads Campaign + Server CAPI Tagging',
  },
  {
    id: 'social-media',
    name: '04. Social Media',
    baseWeeks: 2,
    baseCost: 4500,
    expectedRoiMultiplier: 2.8,
    hoursSavedWeekly: 20,
    deliverableSample: 'Monthly Content Queue + Short-Form Video Motion',
  },
  {
    id: 'creative-studio',
    name: '05. Creative Studio',
    baseWeeks: 2,
    baseCost: 6000,
    expectedRoiMultiplier: 3.2,
    hoursSavedWeekly: 15,
    deliverableSample: '3D Motion Graphics + Brand Identity Asset Suite',
  },
  {
    id: 'brand-partnerships',
    name: '06. PR & Partners',
    baseWeeks: 2,
    baseCost: 5500,
    expectedRoiMultiplier: 3.9,
    hoursSavedWeekly: 12,
    deliverableSample: 'Press Syndication + Creator Collaboration Deals',
  },
];

export const ScopeCalculator: React.FC<{ onScopeLocked?: (summary: string) => void }> = ({ onScopeLocked }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['web-solutions', 'performance-marketing']);
  const [scaleTier, setScaleTier] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [monthlySpend, setMonthlySpend] = useState<number>(25000);

  const toggleService = (id: string) => {
    sfx.playClick();
    setSelectedServices((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const selectFullRetainer = () => {
    sfx.playClick();
    setSelectedServices(SERVICES_CATALOG.map((s) => s.id));
  };

  // Calculations
  const activeServiceObjs = SERVICES_CATALOG.filter((s) => selectedServices.includes(s.id));
  
  const scaleMultiplier = scaleTier === 'mvp' ? 1.0 : scaleTier === 'growth' ? 1.6 : 2.4;
  const sprintWeeks = Math.min(8, Math.max(2, Math.round(activeServiceObjs.length * 0.9 * scaleMultiplier)));
  const totalCost = Math.round(activeServiceObjs.reduce((acc, curr) => acc + curr.baseCost, 0) * (scaleTier === 'mvp' ? 1 : scaleTier === 'growth' ? 1.4 : 1.9));
  const avgRoi = (activeServiceObjs.reduce((acc, curr) => acc + curr.expectedRoiMultiplier, 0) / activeServiceObjs.length + (monthlySpend > 20000 ? 0.4 : 0)).toFixed(1);
  const totalHoursSaved = Math.round(activeServiceObjs.reduce((acc, curr) => acc + curr.hoursSavedWeekly, 0) * (scaleTier === 'enterprise' ? 1.8 : 1.2));
  const teamStaffing = scaleTier === 'mvp'
    ? '2 Senior Architects + 1 Designer'
    : scaleTier === 'growth'
    ? '4 Senior Partners (Architect, Media Lead, AI Engineer, Art Director)'
    : '6 Full-Time Dedicated Partner Leads across all 6 Pillars';

  const handleLockInScope = () => {
    sfx.playClick();
    const summary = `Selected Scope: ${activeServiceObjs.map((s) => s.name).join(', ')} | Tier: ${scaleTier.toUpperCase()} | Est. Sprint: ${sprintWeeks} Weeks | Budget Band: $${totalCost.toLocaleString()}`;
    if (onScopeLocked) {
      onScopeLocked(summary);
    }
    const el = document.querySelector('#contact-inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full py-16 sm:py-24 px-6 sm:px-10 bg-[var(--color-surface)] border-t border-[var(--color-outline)]" id="scope-calculator">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--color-outline)]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] font-semibold mb-2">
              <Calculator className="w-4 h-4 text-[var(--color-electric-lime)]" />
              <span>Interactive Scoping Engine</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--color-primary)] tracking-tight">
              Service Scope & Sprint ROI Calculator
            </h2>
          </div>

          <p className="font-body text-sm sm:text-base text-[var(--color-muted)] max-w-md">
            Model your deliverables, sprint velocity, and estimated revenue return. No opaque agency billable hours—only guaranteed 2-week partner cadences.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 1. Multi-Select Services */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-outline)] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  1. Select Required Capabilities ({selectedServices.length} Active)
                </span>
                <button
                  type="button"
                  onClick={selectFullRetainer}
                  className="font-mono text-[11px] text-[var(--color-electric-lime)] hover:underline cursor-pointer"
                >
                  Select All 6 Pillars
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES_CATALOG.map((svc) => {
                  const isSelected = selectedServices.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => toggleService(svc.id)}
                      onMouseEnter={() => sfx.playLimeHover()}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[var(--color-primary)] text-[var(--color-surface)] border-transparent shadow-md'
                          : 'bg-[var(--color-surface-low)] hover:bg-[var(--color-surface-card)] text-[var(--color-primary)] border-[var(--color-outline)]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-bold text-xs">{svc.name}</span>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-[var(--color-electric-lime)] text-black' : 'border border-[var(--color-outline)]'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-black stroke-[var(--color-electric-lime)]" />}
                        </div>
                      </div>
                      <span className={`font-mono text-[10px] ${isSelected ? 'text-[var(--color-electric-lime)]' : 'text-[var(--color-muted)]'}`}>
                        {svc.deliverableSample}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Scale Tier */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-outline)] shadow-xs space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] block">
                2. Project Scale & Rollout Velocity
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'mvp', title: 'Core Sprint', subtitle: 'Targeted single-funnel launch' },
                  { id: 'growth', title: 'Growth Engine', subtitle: 'Multi-channel acquisition & web' },
                  { id: 'enterprise', title: 'Full Retainer', subtitle: 'Omni-channel senior architecture' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setScaleTier(tier.id as typeof scaleTier);
                      sfx.playClick();
                    }}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      scaleTier === tier.id
                        ? 'bg-[var(--color-primary)] text-[var(--color-surface)] border-transparent shadow-md'
                        : 'bg-[var(--color-surface-low)] text-[var(--color-primary)] border-[var(--color-outline)] hover:border-[var(--color-primary)]/30'
                    }`}
                  >
                    <div className="font-display font-bold text-xs mb-1">{tier.title}</div>
                    <div className={`font-body text-[10px] leading-tight ${scaleTier === tier.id ? 'text-white/70' : 'text-[var(--color-muted)]'}`}>
                      {tier.subtitle}
                    </div>
                  </button>
                ))}
              </div>

              {/* Monthly Ad Budget Slider */}
              <div className="pt-4 border-t border-[var(--color-outline)] space-y-2">
                <div className="flex justify-between font-mono text-xs text-[var(--color-muted)]">
                  <span>Current / Target Monthly Media Spend</span>
                  <span className="font-bold text-[var(--color-primary)]">${monthlySpend.toLocaleString()}/mo</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(parseInt(e.target.value))}
                  className="w-full accent-[var(--color-electric-lime)] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-[var(--color-primary)] text-[var(--color-surface)] p-8 sm:p-10 rounded-3xl border border-[var(--color-outline)] shadow-2xl flex flex-col justify-between gap-8 sticky top-24">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[var(--color-electric-lime)]" />
                  <span className="font-display font-bold text-lg text-white">Projected Sprint Metrics</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded bg-[var(--color-electric-lime)] text-black font-bold">
                  Guaranteed Sprints
                </span>
              </div>

              {/* KPI Matrix */}
              <div className="grid grid-cols-2 gap-6 my-6">
                <div>
                  <span className="font-mono text-xs text-white/60 uppercase block mb-1">Estimated Timeline</span>
                  <div className="font-display font-bold text-3xl sm:text-4xl text-white flex items-baseline gap-1.5">
                    <span>{sprintWeeks}</span>
                    <span className="font-body text-xs font-normal text-white/70">Weeks</span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--color-electric-lime)] mt-1 block">
                    {Math.ceil(sprintWeeks / 2)} Bi-Weekly Sprints
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xs text-white/60 uppercase block mb-1">Projected ROI</span>
                  <div className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-electric-lime)]">
                    {avgRoi}x
                  </div>
                  <span className="font-mono text-[10px] text-white/60 mt-1 block">
                    Historical Pipeline Return
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xs text-white/60 uppercase block mb-1">Est. Investment Band</span>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-white">
                    ${(totalCost * 0.9).toLocaleString('en-US', { maximumFractionDigits: 0 })} - ${(totalCost * 1.15).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <span className="font-mono text-[10px] text-white/60 mt-1 block">
                    Fixed-Scope Milestone Billing
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xs text-white/60 uppercase block mb-1">Automation Impact</span>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-white">
                    ~{totalHoursSaved}h
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 mt-1 block">
                    Weekly Team Hours Saved
                  </span>
                </div>
              </div>

              {/* Dedicated Team Allocation */}
              <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-electric-lime)] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Dedicated Senior Allocation</span>
                </div>
                <p className="font-body text-xs text-white/85 leading-relaxed">
                  {teamStaffing}. Zero junior handoffs. Direct Slack & Loom daily communication with partners.
                </p>
              </div>
            </div>

            {/* Lock In Button */}
            <button
              type="button"
              onClick={handleLockInScope}
              className="w-full inline-flex items-center justify-center gap-2 font-display text-xs font-bold uppercase tracking-wider bg-[var(--color-electric-lime)] text-black hover:bg-[var(--color-lime-bright)] py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <span>Lock In This Scope & Book Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

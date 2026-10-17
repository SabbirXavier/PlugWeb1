import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, Compass, Code, Rocket, TrendingUp } from 'lucide-react';
import { sfx } from '../utils/audio';

interface ProcessStep {
  num: string;
  phase: string;
  title: string;
  tag: string;
  summary: string;
  icon: React.ReactNode;
  details: string[];
}

const steps: ProcessStep[] = [
  {
    num: '01',
    phase: 'Phase 01',
    title: 'DISCUSS',
    tag: 'Scope Alignment',
    summary:
      'Deep dive into commercial goals, audit current technical debt & media performance, map operational bottlenecks, and align on defined scope milestones.',
    icon: <MessageSquare className="w-5 h-5 text-[#090a0b]" />,
    details: [
      'Commercial goal & Growth KPI alignment workshop',
      'Technical architecture audit & ad account evaluation',
      'Detailed scope specification & timeline lock',
    ],
  },
  {
    num: '02',
    phase: 'Phase 02',
    title: 'PLAN',
    tag: 'Growth Blueprint',
    summary:
      'System architecture blueprints, UX interaction flows, AI automation schematics, campaign media funnels, and creative direction boards.',
    icon: <Compass className="w-5 h-5 text-[#a5d600]" />,
    details: [
      '3D interactive prototype & campaign motion boards',
      'Database schema & API contract design',
      'Google & Meta ad campaign funnel schematics',
    ],
  },
  {
    num: '03',
    phase: 'Phase 03',
    title: 'CREATE',
    tag: 'Sprint Execution',
    summary:
      'Bi-weekly engineering sprints, ad creative production, AI model fine-tuning, motion design creation, and continuous staging reviews.',
    icon: <Code className="w-5 h-5 text-[#090a0b]" />,
    details: [
      '2-week production sprints with Friday staging demos',
      'Sub-100ms web optimization & 3D WebGL tuning',
      'Ad creative testing & AI triage pipeline build',
    ],
  },
  {
    num: '04',
    phase: 'Phase 04',
    title: 'LAUNCH',
    tag: 'Go-Live & Kickoff',
    summary:
      'Production go-live, edge stress testing, ad account activation, team enablement workshops, and server-side conversion tracking verification.',
    icon: <Rocket className="w-5 h-5 text-[#090a0b]" />,
    details: [
      'Distributed edge deployment & security hardening',
      'Cross-channel paid ad campaign go-live',
      'Server-side GTM & Meta CAPI verification',
    ],
  },
  {
    num: '05',
    phase: 'Phase 05',
    title: 'IMPROVE',
    tag: 'Data Optimization',
    summary:
      'Continuous performance analysis, A/B creative testing, conversion rate optimization (CRO), ROAS scaling, and iterative feature retainers.',
    icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
    details: [
      'Weekly ROAS & conversion rate optimization',
      'Iterative ad creative refreshes & A/B testing',
      'Continuous retainer support & feature expansion',
    ],
  },
];

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <section className="w-full py-14 sm:py-20 lg:py-28 px-6 sm:px-10 relative" id="process">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#505256] font-semibold block mb-2">
              04 // Operating Cadence
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#090a0b] tracking-tight">
              Five Steps From Concept to Scaled Growth
            </h2>
          </div>
          <span className="font-mono text-xs text-[#505256] uppercase tracking-wider">
            Discuss · Plan · Create · Launch · Improve
          </span>
        </div>

        {/* 5 Step Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const isExpanded = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => {
                  setActiveStep(isExpanded ? null : idx);
                  sfx.playClick();
                }}
                className={`tilt-card bg-white p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isExpanded
                    ? 'border-[#090a0b] ring-1 ring-[#090a0b] shadow-xl'
                    : 'border-black/[0.08] shadow-2xs hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`w-9 h-9 rounded-xl font-display font-bold text-xs flex items-center justify-center transition-colors ${
                        isExpanded
                          ? 'bg-[#b8ee00] text-[#090a0b]'
                          : 'bg-[#f4f4f2] text-[#090a0b] group-hover:bg-[#b8ee00]'
                      }`}
                    >
                      {step.num}
                    </span>
                    <span className="font-mono text-[10px] text-[#505256] uppercase">
                      {step.phase}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#090a0b] mb-2 flex items-center justify-between">
                    <span>{step.title}</span>
                    {step.icon}
                  </h3>

                  <p className="font-body text-xs text-[#505256] leading-relaxed mb-4">
                    {step.summary}
                  </p>

                  {/* Expandable Phase Details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-black/10 space-y-2 animate-fade-in">
                      <span className="font-mono text-[9px] text-[#090a0b] uppercase font-bold block mb-1">
                        Key Deliverables:
                      </span>
                      {step.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-[#090a0b]">
                          <CheckCircle2 className="w-3 h-3 text-[#a5d600] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#b8ee00]" />
                    <span className="font-mono text-[10px] uppercase text-[#505256]">
                      {step.tag}
                    </span>
                  </div>

                  <span className="font-mono text-[9px] text-[#505256] underline group-hover:text-[#090a0b]">
                    {isExpanded ? 'Hide' : 'Expand'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

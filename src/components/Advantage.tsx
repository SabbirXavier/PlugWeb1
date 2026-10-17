import React from 'react';
import { Users, Bolt, Brain, TrendingUp } from 'lucide-react';
import { ScopeCalculator } from './ScopeCalculator';

export const Advantage: React.FC = () => {
  return (
    <section className="w-full py-14 sm:py-20 lg:py-28 px-6 sm:px-10 bg-[#f4f4f2]/60 border-t border-black/[0.06]" id="advantage">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#505256] font-semibold block mb-2">
            03 // The Connected Advantage
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#090a0b] tracking-tight mb-4">
            Why Partner With PLUG?
          </h2>
          <p className="font-body text-base sm:text-lg text-[#505256] leading-relaxed">
            Most agencies sell fragmented pieces: engineers who do not speak brand narrative, and marketers who do not understand algorithmic systems. PLUG integrates all three into an accelerated compounding advantage.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="tilt-card bg-white p-8 rounded-2xl border border-black/[0.08] shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#f4f4f2] flex items-center justify-center text-[#090a0b] mb-6">
                <Users className="w-6 h-6" />
              </div>
              <span className="font-mono text-[11px] text-[#505256] block mb-1">
                PILLAR 01 // SYNCHRONICITY
              </span>
              <h3 className="font-display font-bold text-xl text-[#090a0b] mb-2">
                Single Unified Team
              </h3>
              <p className="font-body text-sm text-[#505256] leading-relaxed">
                Zero handoff friction, lost contexts, or agency finger-pointing. Designers, software engineers, and growth directors sit at the same daily table.
              </p>
            </div>
            <div className="w-8 h-1 bg-[#b8ee00] mt-6 rounded-full" />
          </div>

          {/* Pillar 2 */}
          <div className="tilt-card bg-white p-8 rounded-2xl border border-black/[0.08] shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#f4f4f2] flex items-center justify-center text-[#090a0b] mb-6">
                <Bolt className="w-6 h-6 text-[#a5d600]" />
              </div>
              <span className="font-mono text-[11px] text-[#505256] block mb-1">
                PILLAR 02 // VELOCITY
              </span>
              <h3 className="font-display font-bold text-xl text-[#090a0b] mb-2">
                Speed to Market
              </h3>
              <p className="font-body text-sm text-[#505256] leading-relaxed">
                Disciplined two-week production sprints with live demo builds delivered every Friday. We launch enterprise-grade solutions in weeks, not quarters.
              </p>
            </div>
            <div className="w-8 h-1 bg-[#b8ee00] mt-6 rounded-full" />
          </div>

          {/* Pillar 3 */}
          <div className="tilt-card bg-white p-8 rounded-2xl border border-black/[0.08] shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#f4f4f2] flex items-center justify-center text-[#090a0b] mb-6">
                <Brain className="w-6 h-6 text-[#536d00]" />
              </div>
              <span className="font-mono text-[11px] text-[#505256] block mb-1">
                PILLAR 03 // INTELLIGENCE
              </span>
              <h3 className="font-display font-bold text-xl text-[#090a0b] mb-2">
                Intelligent Automation
              </h3>
              <p className="font-body text-sm text-[#505256] leading-relaxed">
                We do not just paint pretty surfaces; we construct dynamic backend LLM loops and automated workflows that permanently elevate team capacity.
              </p>
            </div>
            <div className="w-8 h-1 bg-[#b8ee00] mt-6 rounded-full" />
          </div>

          {/* Pillar 4 */}
          <div className="tilt-card bg-white p-8 rounded-2xl border border-black/[0.08] shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#f4f4f2] flex items-center justify-center text-[#090a0b] mb-6">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="font-mono text-[11px] text-[#505256] block mb-1">
                PILLAR 04 // OUTCOMES
              </span>
              <h3 className="font-display font-bold text-xl text-[#090a0b] mb-2">
                Commercial Rigor
              </h3>
              <p className="font-body text-sm text-[#505256] leading-relaxed">
                Every layout decision, animation timing, and line of code is anchored to conversion metrics, customer acquisition costs, and bottom-line ROI.
              </p>
            </div>
            <div className="w-8 h-1 bg-[#b8ee00] mt-6 rounded-full" />
          </div>
        </div>

        {/* Embedded Interactive Scope Estimator */}
        <ScopeCalculator />
      </div>
    </section>
  );
};

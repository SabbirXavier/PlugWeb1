import React from 'react';
import { X, ArrowRight, CheckCircle2, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { sfx } from '../utils/audio';

export interface ServiceDetail {
  id: string;
  num: string;
  title: string;
  category: string;
  heroCopy: string;
  supportingCopy: string;
  bulletServices: string[];
  deliverables: string[];
  techStack: string[];
  keyBenefits: { label: string; desc: string }[];
}

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onStartProject: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onStartProject,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border border-black/10 max-w-4xl w-full overflow-hidden shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            sfx.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-[#f4f4f2] hover:bg-[#090a0b] hover:text-[#b8ee00] text-[#090a0b] flex items-center justify-center transition-all shadow-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="bg-[#090a0b] text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#b8ee00]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold text-[#b8ee00] bg-[#b8ee00]/10 px-3 py-1 rounded-full border border-[#b8ee00]/30">
              SERVICE {service.num}
            </span>
            <span className="font-mono text-xs uppercase text-slate-300">
              {service.category}
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4 text-white">
            {service.title}
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {service.heroCopy}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Supporting Statement */}
          <div className="p-5 bg-[#f4f4f2] rounded-2xl border border-black/5">
            <p className="font-body text-sm text-[#090a0b] leading-relaxed font-medium">
              "{service.supportingCopy}"
            </p>
          </div>

          {/* Full Capability List */}
          <div>
            <h3 className="font-display font-bold text-lg text-[#090a0b] mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#a5d600]" />
              <span>Full Service Scope & Capabilities</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.bulletServices.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-black/10 flex items-start gap-3 shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#a5d600] shrink-0 mt-0.5" />
                  <span className="font-body text-xs text-[#090a0b] font-medium leading-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables & Tech Stack Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-black/10">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase text-[#090a0b] mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#a5d600]" />
                <span>Primary Deliverables</span>
              </h4>
              <ul className="space-y-2">
                {service.deliverables.map((d, i) => (
                  <li key={i} className="text-xs font-body text-[#505256] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8ee00]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase text-[#090a0b] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#090a0b]" />
                <span>Tools & Infrastructure</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((t, i) => (
                  <span key={i} className="font-mono text-[11px] bg-[#f4f4f2] px-3 py-1 rounded-md text-[#090a0b]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#505256]">
              Includes 2-week production sprints & dedicated partner oversight.
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                onClose();
                onStartProject(service.id);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-display text-xs font-bold uppercase tracking-wider bg-[#b8ee00] text-[#090a0b] hover:bg-[#c7ff3d] px-8 py-4 rounded-xl shadow-md transition-all cursor-pointer glow-lime"
            >
              <span>Start {service.title} Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

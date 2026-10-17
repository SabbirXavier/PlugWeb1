import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { CtaAssembly3DCanvas } from './three/CtaAssembly3DCanvas';
import { sfx } from '../utils/audio';

export const ContactCTA: React.FC<{ defaultServiceId?: string; defaultDetails?: string }> = ({
  defaultServiceId = 'web-solutions',
  defaultDetails = '',
}) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [service, setService] = useState(defaultServiceId);
  const [budget, setBudget] = useState('tier2');
  const [details, setDetails] = useState(defaultDetails);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (defaultDetails) {
      setDetails(defaultDetails);
    }
  }, [defaultDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClick();
    setSubmitted(true);
  };

  return (
    <section className="w-full py-14 sm:py-20 lg:py-28 px-6 sm:px-10 relative overflow-hidden" id="contact-inquiry">
      {/* Subtle lime ambient glow */}
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-[#b8ee00]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto">
        <div className="bg-white rounded-3xl border border-black/[0.08] p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#505256] font-semibold block mb-3">
                  Initiate Collaboration
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#090a0b] tracking-tight leading-[1.08]">
                  HAVE SOMETHING BIG IN MIND? LET’S PLUG IN.
                </h2>
                <p className="font-body text-base text-[#505256] mt-6 leading-relaxed">
                  Tell us about your brand vision, web platform, ad budget, or automation challenge. A senior partner reviews every single brief within 24 business hours.
                </p>

                {/* Direct Phone & WhatsApp Highlight Box */}
                <div className="p-5 my-6 rounded-2xl bg-[#090a0b] text-white space-y-3 shadow-lg border border-black/10">
                  <div className="font-mono text-xs uppercase text-[#b8ee00] font-bold flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    <span>Direct Helpline & WhatsApp</span>
                  </div>
                  <a
                    href="tel:+918699866723"
                    className="font-display font-bold text-2xl sm:text-3xl text-white hover:text-[#b8ee00] transition-colors block"
                  >
                    +91 86998 66723
                  </a>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <a
                      href="tel:+918699866723"
                      className="px-3.5 py-1.5 rounded-lg bg-[#b8ee00] text-[#090a0b] font-mono text-xs font-bold hover:bg-[#c7ff3d] transition-all inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Helpline</span>
                    </a>
                    <a
                      href="https://wa.me/918699866723"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold hover:bg-emerald-500 transition-all inline-flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Chat</span>
                    </a>
                  </div>
                </div>

                {/* Assembling 3D Graphics Canvas */}
                <div className="hidden sm:block w-full h-[180px] rounded-2xl bg-[#f4f4f2] overflow-hidden border border-black/5 relative">
                  <CtaAssembly3DCanvas />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg font-mono text-[10px] text-[#090a0b] font-bold">
                    3D Visual Composition
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-black/[0.08] space-y-6">
                <div>
                  <span className="font-mono text-xs text-[#505256] uppercase tracking-wider block mb-1">
                    Direct Email Inquiries
                  </span>
                  <a
                    href="mailto:hello@plugagency.co"
                    className="font-display font-bold text-xl text-[#090a0b] hover:text-[#a5d600] transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>hello@plugagency.co</span>
                  </a>
                </div>

                <div>
                  <span className="font-mono text-xs text-[#505256] uppercase tracking-wider block mb-1">
                    Global Studios
                  </span>
                  <span className="font-body text-sm text-[#090a0b] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#505256]" />
                    <span>Chandigarh · India · Remote Worldwide</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Inquiry Form */}
            <div className="lg:col-span-7 bg-[#f4f4f2]/60 p-6 sm:p-10 rounded-2xl border border-black/[0.06]">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-white text-[#090a0b] flex flex-col items-center text-center gap-4 border border-[#b8ee00] shadow-sm animate-fade-in my-12">
                  <div className="w-12 h-12 rounded-full bg-[#b8ee00] flex items-center justify-center text-[#090a0b]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-2xl">Project Brief Received!</h3>
                  <p className="font-body text-sm text-[#505256] max-w-md leading-relaxed">
                    Thank you for reaching out. A senior partner from PLUG will review your objectives and contact you at {phoneInput || workEmail} within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setWorkEmail('');
                      setPhoneInput('');
                      setDetails('');
                    }}
                    className="mt-4 font-mono text-xs underline text-[#090a0b] hover:text-[#a5d600]"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Full Name & Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#090a0b]" htmlFor="fullName">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jane Doe"
                        className="h-12 px-4 bg-white text-[#090a0b] placeholder-[#505256]/50 font-body text-sm rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#090a0b]" htmlFor="workEmail">
                        Work Email *
                      </label>
                      <input
                        id="workEmail"
                        type="email"
                        required
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="jane@company.com"
                        className="h-12 px-4 bg-white text-[#090a0b] placeholder-[#505256]/50 font-body text-sm rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number Input */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#090a0b]" htmlFor="phoneInput">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      id="phoneInput"
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+91 86998 66723 or your phone number"
                      className="h-12 px-4 bg-white text-[#090a0b] placeholder-[#505256]/50 font-body text-sm rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                    />
                  </div>

                  {/* Primary Service Discipline Selector */}
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#090a0b]">
                      Primary Service Pillar
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: 'web-solutions', label: '01. Web & Digital Solutions' },
                        { id: 'ai-automation', label: '02. AI & Business Automation' },
                        { id: 'performance-marketing', label: '03. Performance Marketing' },
                        { id: 'social-media', label: '04. Social Media & Content' },
                        { id: 'creative-studio', label: '05. Creative Studio & Production' },
                        { id: 'brand-partnerships', label: '06. PR & Brand Partnerships' },
                        { id: 'all', label: 'Full-Service Retainer' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setService(item.id);
                            sfx.playClick();
                          }}
                          className={`px-3 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all text-left cursor-pointer ${
                            service === item.id
                              ? 'bg-[#090a0b] text-[#b8ee00] border-[#090a0b] shadow-2xs font-bold'
                              : 'bg-white text-[#090a0b] border-black/10 hover:border-black/30'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Approximate Budget Selector */}
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#090a0b]">
                      Approximate Budget Tier
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'tier1', label: '< $15k' },
                        { id: 'tier2', label: '$15k - $30k' },
                        { id: 'tier3', label: '$30k - $60k' },
                        { id: 'tier4', label: '$60k+' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setBudget(item.id);
                            sfx.playClick();
                          }}
                          className={`px-3 py-2.5 rounded-xl text-xs font-mono border transition-all text-center cursor-pointer ${
                            budget === item.id
                              ? 'bg-[#090a0b] text-[#b8ee00] border-[#090a0b] shadow-2xs font-bold'
                              : 'bg-white text-[#090a0b] border-black/10 hover:border-black/30'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Overview Details */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#090a0b]" htmlFor="projectDetails">
                      Project Overview
                    </label>
                    <textarea
                      id="projectDetails"
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Tell us about your goals, current obstacles, or ad campaign target..."
                      className="p-4 bg-white text-[#090a0b] placeholder-[#505256]/50 font-body text-sm rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all resize-none"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-display text-xs font-bold uppercase tracking-wider bg-[#b8ee00] text-[#090a0b] hover:bg-[#c7ff3d] px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all glow-lime cursor-pointer"
                    >
                      <span>Send Project Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[11px] text-[#505256] text-center sm:text-right">
                      Guaranteed response ≤ 24h
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

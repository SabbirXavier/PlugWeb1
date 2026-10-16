import React, { useState } from 'react';
import { Mail, Check, Phone, MessageCircle } from 'lucide-react';
import { sfx } from '../utils/audio';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClick();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleNavClick = (id: string) => {
    sfx.playClick();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#f4f4f2] border-t border-black/[0.08] pt-20 pb-12 px-6 sm:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-black/[0.08]">
          {/* Brand Info & Direct Line */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-2xl tracking-tight text-[#090a0b]">
                PLUG
              </span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#b8ee00]" />
            </div>

            <p className="font-body text-sm text-[#505256] max-w-sm leading-relaxed">
              Full-service digital, creative, and performance marketing agency. High-velocity web platforms, smart AI business automation, Google/Meta ads, and brand creative systems.
            </p>

            <div className="mt-2 space-y-2">
              <span className="font-mono text-xs uppercase text-[#505256] block">
                Direct Line & Helpline
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="tel:+918699866723"
                  className="font-display font-bold text-lg text-[#090a0b] hover:text-[#a5d600] transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-[#a5d600]" />
                  <span>+91 86998 66723</span>
                </a>
                <a
                  href="https://wa.me/918699866723"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                  title="WhatsApp PLUG"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
              <a
                href="mailto:hello@plugagency.co"
                className="font-mono text-xs text-[#505256] hover:text-[#090a0b] transition-colors flex items-center gap-1.5 pt-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>hello@plugagency.co</span>
              </a>
            </div>
          </div>

          {/* 6 Service Pillars Column */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#090a0b] font-bold">
              Service Pillars (6)
            </span>
            <ul className="flex flex-col gap-2 font-body text-sm text-[#505256]">
              <li>
                <button onClick={() => handleNavClick('#disciplines')} className="hover:text-[#090a0b] transition-colors cursor-pointer text-left">
                  01. Web & Digital Solutions
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('#disciplines')} className="hover:text-[#090a0b] transition-colors cursor-pointer text-left">
                  02. AI & Business Automation
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('#performance-marketing')} className="hover:text-[#090a0b] transition-colors cursor-pointer text-left font-semibold text-[#090a0b]">
                  03. Performance Marketing
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('#disciplines')} className="hover:text-[#090a0b] transition-colors cursor-pointer text-left">
                  04. Social Media & Content
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('#disciplines')} className="hover:text-[#090a0b] transition-colors cursor-pointer text-left">
                  05. Creative Studio & Production
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('#disciplines')} className="hover:text-[#090a0b] transition-colors cursor-pointer text-left">
                  06. Brand Partnerships & PR
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#090a0b] font-bold">
              Navigation
            </span>
            <ul className="flex flex-col gap-2 font-body text-sm text-[#505256]">
              <li>
                <button onClick={() => handleNavClick('#selected-work')} className="hover:text-[#090a0b] transition-colors cursor-pointer">
                  Selected Work
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('#advantage')} className="hover:text-[#090a0b] transition-colors cursor-pointer">
                  Advantage
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('#process')} className="hover:text-[#090a0b] transition-colors cursor-pointer">
                  Process (5 Steps)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('#team')} className="hover:text-[#090a0b] transition-colors cursor-pointer">
                  Collective
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('#contact-inquiry')} className="hover:text-[#090a0b] transition-colors cursor-pointer">
                  Contact Brief
                </button>
              </li>
            </ul>
          </div>

          {/* Dispatch Newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#090a0b] font-bold">
              Dispatch
            </span>
            <p className="font-body text-xs text-[#505256]">
              Bi-weekly dispatches on performance advertising, 3D interfaces, and autonomous business loops.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-[#b8ee00] text-xs font-mono text-[#090a0b] font-bold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 mt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="work@domain.com"
                  className="h-10 px-3 bg-white text-[#090a0b] text-xs rounded-lg border border-black/10 focus:outline-none focus:ring-1 focus:ring-black flex-1"
                />
                <button
                  type="submit"
                  className="h-10 px-3 bg-[#090a0b] text-white font-mono text-xs font-semibold uppercase rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--color-muted)]">
          <span>© 2025 PLUG Agency. Chandigarh · India · Remote Worldwide</span>
          <div className="flex items-center gap-6">
            <a href="tel:+918699866723" className="hover:text-[var(--color-primary)] transition-colors font-bold text-[var(--color-primary)]">
              +91 86998 66723
            </a>
            <a href="#" className="hover:text-[#090a0b] transition-colors">
              Twitter / X
            </a>
            <a href="#" className="hover:text-[#090a0b] transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-[#090a0b] transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

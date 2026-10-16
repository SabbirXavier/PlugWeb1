import React, { useState, useEffect } from 'react';
import { Hexagon, Phone, ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';
import { ThemeDropdownMenu } from './ThemeDropdownMenu';
import { sfx } from '../utils/audio';

interface HeaderProps {
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  reducedMotion,
  setReducedMotion,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    sfx.playClick();
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/15 bg-black/20 backdrop-blur-md transition-all duration-300">
      {/* Active Scroll Progress Bar */}
      <div
        className="h-[2.5px] bg-[var(--color-electric-lime)] transition-all duration-150 ease-out shadow-[0_0_10px_var(--color-electric-lime)]"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 h-16 sm:h-20 flex items-center justify-between gap-6">
        {/* Brand Logo: Hexagon Icon + PLUG */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            sfx.playClick();
          }}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <Hexagon className="w-6 h-6 text-white stroke-[1.5] group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-sans font-medium text-lg sm:text-xl tracking-tight text-white">
            PLUG
          </span>
        </a>

        {/* Center Nav Links (md+) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm text-white/85">
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setServicesDropdown(!servicesDropdown);
                sfx.playClick();
              }}
              className="hover:text-white transition-colors py-1 flex items-center gap-1 cursor-pointer"
            >
              <span>Services</span>
              <sup className="font-mono text-[10px] text-white/60">6</sup>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdown ? 'rotate-180' : ''}`} />
            </button>

            {servicesDropdown && (
              <div className="absolute top-full left-0 mt-3 w-72 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-3 flex flex-col gap-1 text-xs font-mono normal-case animate-fade-in z-50">
                <button
                  onClick={() => handleNavClick('#disciplines')}
                  className="p-2.5 rounded-xl hover:bg-white/15 text-left text-white font-bold flex items-center justify-between"
                >
                  <span>01. Web & Digital Solutions</span>
                  <span className="text-[10px] text-white/50">Portals</span>
                </button>
                <button
                  onClick={() => handleNavClick('#disciplines')}
                  className="p-2.5 rounded-xl hover:bg-white/15 text-left text-white font-bold flex items-center justify-between"
                >
                  <span>02. AI & Automation</span>
                  <span className="text-[10px] text-white/50">Chatbots</span>
                </button>
                <button
                  onClick={() => handleNavClick('#performance-marketing')}
                  className="p-2.5 rounded-xl hover:bg-white/15 text-left text-white font-bold flex items-center justify-between"
                >
                  <span>03. Performance Marketing</span>
                  <span className="text-[10px] text-white/50">Google/Meta</span>
                </button>
                <button
                  onClick={() => handleNavClick('#disciplines')}
                  className="p-2.5 rounded-xl hover:bg-white/15 text-left text-white font-bold flex items-center justify-between"
                >
                  <span>04. Social Media</span>
                  <span className="text-[10px] text-white/50">Content</span>
                </button>
                <button
                  onClick={() => handleNavClick('#disciplines')}
                  className="p-2.5 rounded-xl hover:bg-white/15 text-left text-white font-bold flex items-center justify-between"
                >
                  <span>05. Creative Studio</span>
                  <span className="text-[10px] text-white/50">3D Motion</span>
                </button>
                <button
                  onClick={() => handleNavClick('#disciplines')}
                  className="p-2.5 rounded-xl hover:bg-white/15 text-left text-white font-bold flex items-center justify-between"
                >
                  <span>06. Brand Partnerships & PR</span>
                  <span className="text-[10px] text-white/50">Media</span>
                </button>
              </div>
            )}
          </div>

          <a
            href="#performance-marketing"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#performance-marketing');
            }}
            className="hover:text-white transition-colors"
          >
            Performance Ads
          </a>

          <a
            href="#selected-work"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#selected-work');
            }}
            className="hover:text-white transition-colors"
          >
            Work
          </a>

          <a
            href="#advantage"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#advantage');
            }}
            className="hover:text-white transition-colors"
          >
            Advantage
          </a>

          <a
            href="#process"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#process');
            }}
            className="hover:text-white transition-colors"
          >
            Process
          </a>

          <a
            href="#team"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#team');
            }}
            className="hover:text-white transition-colors"
          >
            Collective
          </a>
        </nav>

        {/* Right Action Group + Small Top Right Palette Icon */}
        <div className="flex items-center gap-3">
          {/* Direct Phone Number Link */}
          <a
            href="tel:+918699866723"
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-mono text-white/80 hover:text-white"
          >
            <Phone className="w-3.5 h-3.5 text-[#b8ee00]" />
            <span>+91 86998 66723</span>
          </a>

          {/* Consultation Glass CTA */}
          <a
            href="#contact-inquiry"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact-inquiry');
            }}
            className="rounded-md border border-white/20 bg-white/15 backdrop-blur-md px-4 py-2 text-xs sm:px-5 sm:text-sm text-white hover:bg-white/25 transition-all font-medium"
          >
            Get Free Consultation
          </a>

          {/* Small Top Right Icon for Theme Selection */}
          <ThemeDropdownMenu />

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-2xl p-6 flex flex-col justify-between border-b border-white/15 md:hidden">
          <div className="flex flex-col gap-6 pt-4 text-white">
            <a
              href="tel:+918699866723"
              className="p-3.5 rounded-xl bg-white/10 border border-white/20 flex items-center justify-between text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#b8ee00]" />
                <span>+91 86998 66723 (Call / WhatsApp)</span>
              </div>
            </a>

            <a
              href="#disciplines"
              onClick={() => handleNavClick('#disciplines')}
              className="text-lg font-medium"
            >
              Services (6 Categories)
            </a>
            <a
              href="#performance-marketing"
              onClick={() => handleNavClick('#performance-marketing')}
              className="text-lg font-medium text-[#b8ee00]"
            >
              Performance Ads
            </a>
            <a
              href="#selected-work"
              onClick={() => handleNavClick('#selected-work')}
              className="text-lg font-medium"
            >
              Selected Work
            </a>
            <a
              href="#advantage"
              onClick={() => handleNavClick('#advantage')}
              className="text-lg font-medium"
            >
              Advantage
            </a>
            <a
              href="#process"
              onClick={() => handleNavClick('#process')}
              className="text-lg font-medium"
            >
              Process
            </a>
            <a
              href="#team"
              onClick={() => handleNavClick('#team')}
              className="text-lg font-medium"
            >
              Collective
            </a>
          </div>

          <div className="pt-6 border-t border-white/15">
            <a
              href="#contact-inquiry"
              onClick={() => handleNavClick('#contact-inquiry')}
              className="w-full inline-flex items-center justify-center py-3 rounded-full bg-white text-black font-medium text-sm"
            >
              Get Free Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

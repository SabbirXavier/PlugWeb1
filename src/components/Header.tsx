import React, { useState } from 'react';
import { Hexagon, Phone, Menu, X } from 'lucide-react';
import { ThemeDropdownMenu } from './ThemeDropdownMenu';
import { sfx } from '../utils/audio';

interface HeaderProps {
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    sfx.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/15 bg-black/20 backdrop-blur-md transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 h-16 sm:h-20 flex items-center justify-between gap-6">
        {/* Logo: Hexagon Icon + Brand Name */}
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
            novaai
          </span>
        </a>

        {/* Center Nav Links (md+) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm text-white/85">
          <a
            href="#selected-work"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#selected-work');
            }}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Projects</span>
            <sup className="font-mono text-[10px] text-white/60">6</sup>
          </a>

          <a
            href="#advantage"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#advantage');
            }}
            className="hover:text-white transition-colors"
          >
            About
          </a>

          <a
            href="#team"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#team');
            }}
            className="hover:text-white transition-colors"
          >
            Blog
          </a>

          <a
            href="#contact-inquiry"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact-inquiry');
            }}
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Actions: Phone + Free Consultation CTA + Small Theme Switcher */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+918699866723"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-white/80 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#b8ee00]" />
            <span>+91 86998 66723</span>
          </a>

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

          {/* Theme Palette Switcher Icon */}
          <ThemeDropdownMenu />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-2xl p-6 flex flex-col justify-between border-b border-white/15 md:hidden">
          <div className="flex flex-col gap-6 pt-4 text-white">
            <a
              href="tel:+918699866723"
              className="p-3.5 rounded-xl bg-white/10 border border-white/20 flex items-center justify-between text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#b8ee00]" />
                <span>+91 86998 66723</span>
              </div>
            </a>

            <a
              href="#selected-work"
              onClick={() => handleNavClick('#selected-work')}
              className="text-lg font-medium"
            >
              Projects <sup className="font-mono text-xs text-white/60">6</sup>
            </a>

            <a
              href="#advantage"
              onClick={() => handleNavClick('#advantage')}
              className="text-lg font-medium"
            >
              About
            </a>

            <a
              href="#team"
              onClick={() => handleNavClick('#team')}
              className="text-lg font-medium"
            >
              Blog
            </a>

            <a
              href="#contact-inquiry"
              onClick={() => handleNavClick('#contact-inquiry')}
              className="text-lg font-medium"
            >
              Contact
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

import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const AnimatedSvgScrollBackground: React.FC = () => {
  const { currentDesign } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.pageYOffset || document.documentElement.scrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const patternKey = currentDesign.svgPatternKey;

  // Calculating dynamic wave displacement based on scrollY
  const wave1 = Math.sin(scrollY * 0.002) * 40;
  const wave2 = Math.cos(scrollY * 0.0015) * 50;
  const rotation = (scrollY * 0.05) % 360;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-opacity duration-700"
      aria-hidden="true"
    >
      {/* Global Scroll SVG Container */}
      <svg
        className="w-full h-full opacity-35 transition-all duration-700"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Linear Gradient for SVG Strokes */}
          <linearGradient id="svgAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-electric-lime)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-electric-lime)" stopOpacity="0.9" />
          </linearGradient>

          {/* Grid Crosshairs Pattern */}
          <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="var(--color-outline)"
              strokeWidth="0.8"
            />
            <circle cx="0" cy="0" r="1.5" fill="var(--color-electric-lime)" opacity="0.6" />
          </pattern>
        </defs>

        {/* Dynamic Background Pattern Grid */}
        <rect width="100%" height="100%" fill="url(#gridPattern)" opacity="0.6" />

        {/* Animated Connected SVG Vertical Pipeline */}
        <g transform={`translate(0, ${-scrollY * 0.1})`}>
          {/* Main Flowing Scroll Bezier Curves */}
          <path
            d={`M -100 ${200 + wave1} Q 400 ${600 + wave2}, 800 ${1000 - wave1} T 1600 ${1800 + wave2} T 2400 ${2600 - wave1}`}
            fill="none"
            stroke="url(#svgAccentGradient)"
            strokeWidth="2.5"
            strokeDasharray="12 8"
            className="transition-all duration-300 ease-out"
          />

          <path
            d={`M 2000 ${100 - wave2} Q 1200 ${800 - wave1}, 600 ${1500 + wave2} T -200 ${2300 - wave1}`}
            fill="none"
            stroke="var(--color-electric-lime)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            strokeDasharray="6 6"
          />
        </g>

        {/* Rotating Geometric SVG Accents Shifted by Scroll Depth */}
        <g transform={`translate(120, ${300 - scrollY * 0.25}) rotate(${rotation}, 120, 300)`}>
          <polygon
            points="0,-40 35,20 -35,20"
            fill="none"
            stroke="var(--color-electric-lime)"
            strokeWidth="2"
            opacity="0.5"
          />
          <circle cx="0" cy="0" r="8" fill="var(--color-electric-lime)" opacity="0.8" />
        </g>

        <g transform={`translate(${window.innerWidth - 140}, ${700 - scrollY * 0.35}) rotate(${-rotation * 1.5}, ${window.innerWidth - 140}, 700)`}>
          <rect
            x="-35"
            y="-35"
            width="70"
            height="70"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="-35"
            y1="-35"
            x2="35"
            y2="35"
            stroke="var(--color-electric-lime)"
            strokeWidth="1"
          />
        </g>

        {patternKey === 'cyber-circuits' && (
          <g transform={`translate(0, ${-scrollY * 0.15})`}>
            <circle cx="30%" cy="400" r="180" fill="none" stroke="var(--color-electric-lime)" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
            <circle cx="75%" cy="900" r="240" fill="none" stroke="var(--color-electric-lime)" strokeWidth="1.5" opacity="0.25" />
          </g>
        )}

        {patternKey === 'velocity-diagonals' && (
          <g transform={`translate(0, ${-scrollY * 0.2})`}>
            <line x1="-100" y1="200" x2="1200" y2="1500" stroke="var(--color-electric-lime)" strokeWidth="3" opacity="0.2" />
            <line x1="200" y1="100" x2="1500" y2="1400" stroke="var(--color-primary)" strokeWidth="2" opacity="0.15" />
          </g>
        )}

        {patternKey === 'neural-mesh' && (
          <g transform={`translate(0, ${-scrollY * 0.12})`}>
            <circle cx="20%" cy="300" r="6" fill="var(--color-electric-lime)" />
            <circle cx="50%" cy="500" r="8" fill="var(--color-electric-lime)" />
            <circle cx="80%" cy="350" r="6" fill="var(--color-electric-lime)" />
            <line x1="20%" y1="300" x2="50%" y2="500" stroke="var(--color-electric-lime)" strokeWidth="1.5" opacity="0.5" />
            <line x1="50%" y1="500" x2="80%" y2="350" stroke="var(--color-electric-lime)" strokeWidth="1.5" opacity="0.5" />
          </g>
        )}
      </svg>
    </div>
  );
};

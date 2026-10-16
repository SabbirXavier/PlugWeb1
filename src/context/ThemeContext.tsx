import React, { createContext, useContext, useState, useEffect } from 'react';
import { sfx } from '../utils/audio';

export type DesignStyleKey =
  | 'swiss-kinetic'
  | 'cyber-glass'
  | 'hyper-performance'
  | 'editorial-luxury'
  | 'vanguard-mint';

export interface DesignStyleConfig {
  key: DesignStyleKey;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  bg: string;
  bgLow: string;
  bgCard: string;
  text: string;
  textMuted: string;
  accent: string;
  accentBright: string;
  accentDim: string;
  accentText: string;
  border: string;
  borderRadiusClass: string;
  borderWidthClass: string;
  shadowClass: string;
  svgPatternKey: 'grid-crosshairs' | 'cyber-circuits' | 'velocity-diagonals' | 'flowing-waves' | 'neural-mesh';
}

export const designStyles: Record<DesignStyleKey, DesignStyleConfig> = {
  'swiss-kinetic': {
    key: 'swiss-kinetic',
    name: 'Swiss Kinetic Brutalism',
    badge: 'Sharp Grid & Lime',
    tagline: 'High-contrast typography, sharp borders, electric lime',
    description: 'Industrial Swiss design with zero-radius cards, heavy structural outlines, technical grid crosshairs and high-energy lime accents.',
    bg: '#fbfbf9',
    bgLow: '#f4f4f2',
    bgCard: '#ffffff',
    text: '#090a0b',
    textMuted: '#505256',
    accent: '#b8ee00',
    accentBright: '#c7ff3d',
    accentDim: '#a5d600',
    accentText: '#090a0b',
    border: 'rgba(9, 10, 11, 0.2)',
    borderRadiusClass: 'rounded-none',
    borderWidthClass: 'border-2',
    shadowClass: 'shadow-none',
    svgPatternKey: 'grid-crosshairs',
  },
  'cyber-glass': {
    key: 'cyber-glass',
    name: 'Cyber Glassmorphism',
    badge: 'Cyan Neon & Glass',
    tagline: 'Futuristic frosted glass, glowing cyan lasers',
    description: 'Cyberpunk glass UI with rounded pill borders, cyan glow highlights, subtle laser scanlines and interactive circuit paths.',
    bg: '#0c1017',
    bgLow: '#161e2e',
    bgCard: '#1a2336',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    accent: '#00f0ff',
    accentBright: '#38bdf8',
    accentDim: '#0284c7',
    accentText: '#0f172a',
    border: 'rgba(0, 240, 255, 0.3)',
    borderRadiusClass: 'rounded-2xl',
    borderWidthClass: 'border',
    shadowClass: 'shadow-[0_0_25px_rgba(0,240,255,0.15)]',
    svgPatternKey: 'cyber-circuits',
  },
  'hyper-performance': {
    key: 'hyper-performance',
    name: 'Hyper-Performance Marketing',
    badge: 'International Orange',
    tagline: 'High-velocity conversion aesthetic with punchy orange',
    description: 'High-energy agency vibe with thick solid black borders, international orange highlights, punchy drop-shadows and diagonal velocity lines.',
    bg: '#fdfbf7',
    bgLow: '#f5efdf',
    bgCard: '#ffffff',
    text: '#111111',
    textMuted: '#555555',
    accent: '#ff3b00',
    accentBright: '#ff5500',
    accentDim: '#cc2f00',
    accentText: '#ffffff',
    border: 'rgba(0, 0, 0, 0.85)',
    borderRadiusClass: 'rounded-xl',
    borderWidthClass: 'border-2',
    shadowClass: 'shadow-[4px_4px_0px_rgba(0,0,0,1)]',
    svgPatternKey: 'velocity-diagonals',
  },
  'editorial-luxury': {
    key: 'editorial-luxury',
    name: 'Editorial Luxury Studio',
    badge: 'Hyper Violet & Onyx',
    tagline: 'Super-refined typography, velvet violet, smooth curves',
    description: 'Haute-couture digital agency layout with extra-large curved corners, soft ambient violet glow, editorial typography and flowing bezier curves.',
    bg: '#f9f8fd',
    bgLow: '#f1effa',
    bgCard: '#ffffff',
    text: '#0f0e1c',
    textMuted: '#585570',
    accent: '#8b5cf6',
    accentBright: '#a78bfa',
    accentDim: '#7c3aed',
    accentText: '#ffffff',
    border: 'rgba(139, 92, 246, 0.18)',
    borderRadiusClass: 'rounded-3xl',
    borderWidthClass: 'border',
    shadowClass: 'shadow-xl',
    svgPatternKey: 'flowing-waves',
  },
  'vanguard-mint': {
    key: 'vanguard-mint',
    name: 'Vanguard Bio-Mint AI',
    badge: 'Emerald Bio-Mesh',
    tagline: 'Autonomous AI node aesthetic with electric mint',
    description: 'Modern bio-tech and autonomous AI look with electric mint green accents, organic soft glass panels and interconnected neural mesh paths.',
    bg: '#f3faf6',
    bgLow: '#e5f5ec',
    bgCard: '#ffffff',
    text: '#092115',
    textMuted: '#3d5e4d',
    accent: '#10b981',
    accentBright: '#34d399',
    accentDim: '#059669',
    accentText: '#092115',
    border: 'rgba(16, 185, 129, 0.2)',
    borderRadiusClass: 'rounded-2xl',
    borderWidthClass: 'border',
    shadowClass: 'shadow-md',
    svgPatternKey: 'neural-mesh',
  },
};

interface ThemeContextType {
  designStyleKey: DesignStyleKey;
  currentDesign: DesignStyleConfig;
  setDesignStyleKey: (key: DesignStyleKey) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [designStyleKey, setDesignStyleKey] = useState<DesignStyleKey>('swiss-kinetic');

  const currentDesign = designStyles[designStyleKey] || designStyles['swiss-kinetic'];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-surface', currentDesign.bg);
    root.style.setProperty('--color-surface-low', currentDesign.bgLow);
    root.style.setProperty('--color-surface-card', currentDesign.bgCard);
    root.style.setProperty('--color-primary', currentDesign.text);
    root.style.setProperty('--color-electric-lime', currentDesign.accent);
    root.style.setProperty('--color-lime-bright', currentDesign.accentBright);
    root.style.setProperty('--color-lime-dim', currentDesign.accentDim);
    root.style.setProperty('--color-muted', currentDesign.textMuted);
    root.style.setProperty('--color-outline', currentDesign.border);
    document.body.style.backgroundColor = currentDesign.bg;
    document.body.style.color = currentDesign.text;
    document.body.setAttribute('data-design-style', currentDesign.key);
  }, [designStyleKey, currentDesign]);

  const handleSetDesignStyleKey = (key: DesignStyleKey) => {
    sfx.playClick();
    setDesignStyleKey(key);
  };

  return (
    <ThemeContext.Provider
      value={{
        designStyleKey,
        currentDesign,
        setDesignStyleKey: handleSetDesignStyleKey,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
};


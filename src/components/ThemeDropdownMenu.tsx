import React, { useState, useRef, useEffect } from 'react';
import { Layers, Check, Sparkles } from 'lucide-react';
import { useTheme, designStyles, DesignStyleKey } from '../context/ThemeContext';
import { sfx } from '../utils/audio';

export const ThemeDropdownMenu: React.FC = () => {
  const { designStyleKey, currentDesign, setDesignStyleKey } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Sleek Small Icon Button in Top Right */}
      <button
        type="button"
        onClick={() => {
          sfx.playClick();
          setIsOpen(!isOpen);
        }}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer group relative"
        title={`Select Website Design Preset (Current: ${currentDesign.name})`}
      >
        <Layers className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
        <span
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full border border-black/40 shadow-xs animate-pulse"
          style={{ backgroundColor: currentDesign.accent }}
        />
      </button>

      {/* Floating Selection Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-black/92 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-3 z-50 animate-fade-in space-y-2">
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/80 font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-electric-lime)]" />
              <span>Select Website Design Preset</span>
            </div>
            <span className="font-mono text-[10px] text-white/50">5 Styles</span>
          </div>

          <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
            {(Object.keys(designStyles) as DesignStyleKey[]).map((key) => {
              const item = designStyles[key];
              const isSelected = key === designStyleKey;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setDesignStyleKey(key);
                    setIsOpen(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white/20 text-white border-white/50 shadow-md ring-1 ring-white/30'
                      : 'bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Swatch & Shape Preview */}
                    <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                      <div className="flex -space-x-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/30"
                          style={{ backgroundColor: item.bg }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/30"
                          style={{ backgroundColor: item.text }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-xs"
                          style={{ backgroundColor: item.accent }}
                        />
                      </div>
                      <span className="font-mono text-[9px] text-white/40 uppercase">
                        {item.borderRadiusClass.replace('rounded-', '')}
                      </span>
                    </div>

                    <div>
                      <div className="font-display font-bold text-xs text-white flex items-center gap-2">
                        <span>{item.name}</span>
                        {isSelected && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#b8ee00] text-black">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[10px] text-white/60 mb-1">{item.badge}</div>
                      <div className="font-body text-[11px] text-white/50 leading-tight">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-[#b8ee00] shrink-0 mt-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};


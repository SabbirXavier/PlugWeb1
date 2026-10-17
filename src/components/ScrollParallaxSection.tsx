import React, { useEffect, useRef, useState } from 'react';

interface ScrollParallaxSectionProps {
  children: React.ReactNode;
  animationType?: 'fade-up' | 'slide-right' | 'slide-left' | 'scale-up' | 'perspective-3d';
  speed?: number; // Speed offset multiplier for parallax depth effect
  className?: string;
  id?: string;
}

export const ScrollParallaxSection: React.FC<ScrollParallaxSectionProps> = ({
  children,
  animationType = 'fade-up',
  speed = 0.1,
  className = '',
  id,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Check if mobile screen
    const isMobile = window.innerWidth < 768;

    // On mobile, reveal immediately to eliminate empty scrolling gaps
    if (isMobile) {
      setIsVisible(true);
    }

    // IntersectionObserver to trigger entry reveal early
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: isMobile ? 0.001 : 0.02,
        rootMargin: isMobile ? '300px 0px 300px 0px' : '150px 0px 150px 0px',
      }
    );

    observer.observe(el);

    // Scroll listener for parallax translation (desktop only to prevent mobile lag/gaps)
    let ticking = false;
    const handleScroll = () => {
      if (isMobile) return; // Disable parallax offset on mobile for tight spacing
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const centerDiff = rect.top + rect.height / 2 - windowHeight / 2;
            setOffsetY(centerDiff * speed * -0.4);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  // Transform styles based on animation type and scroll state
  const getTransformStyle = () => {
    if (!isVisible) {
      switch (animationType) {
        case 'slide-right':
          return 'translate3d(-20px, 20px, 0) opacity-0';
        case 'slide-left':
          return 'translate3d(20px, 20px, 0) opacity-0';
        case 'scale-up':
          return 'translate3d(0, 20px, 0) scale(0.96) opacity-0';
        case 'perspective-3d':
          return 'translate3d(0, 20px, 0) opacity-0';
        case 'fade-up':
        default:
          return 'translate3d(0, 20px, 0) opacity-0';
      }
    }
    return 'translate3d(0, 0, 0) scale(1) rotateX(0deg) opacity-100';
  };

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform ${getTransformStyle()} ${className}`}
      style={{
        transform: isVisible && offsetY !== 0 ? `translate3d(0, ${offsetY}px, 0)` : undefined,
      }}
    >
      {children}
    </div>
  );
};

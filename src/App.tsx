import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandStatement } from './components/BrandStatement';
import { ServicesShowcase } from './components/ServicesShowcase';
import { PerformanceSpotlight } from './components/PerformanceSpotlight';
import { Portfolio } from './components/Portfolio';
import { Advantage } from './components/Advantage';
import { ProcessTimeline } from './components/ProcessTimeline';
import { TeamCollective } from './components/TeamCollective';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { ParallaxBackgroundCanvas } from './components/three/ParallaxBackgroundCanvas';
import { AnimatedSvgScrollBackground } from './components/AnimatedSvgScrollBackground';
import { ScrollParallaxSection } from './components/ScrollParallaxSection';
import { ScrollytellingHUD } from './components/ScrollytellingHUD';
import { ScrollytellingSection } from './components/ScrollytellingSection';
import { ThemeProvider } from './context/ThemeContext';

function MainAppContent() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [inquiryDefaultService, setInquiryDefaultService] = useState('web-solutions');

  const handleStartProject = (serviceId: string) => {
    setInquiryDefaultService(serviceId);
    const el = document.querySelector('#contact-inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-primary)] font-body transition-colors duration-500 relative">
      {/* 3D Animated Parallax Background Canvas */}
      <ParallaxBackgroundCanvas reducedMotion={reducedMotion} />

      {/* Animated SVG Motion & Scroll Bezier Background */}
      {!reducedMotion && <AnimatedSvgScrollBackground />}

      {/* Floating Chapter Scrollytelling Navigation HUD */}
      {!reducedMotion && <ScrollytellingHUD />}

      {/* Top Header Navigation */}
      <Header
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Homepage Storytelling Flow */}
      <main className="w-full relative z-10 space-y-4">
        {/* 1. Hero (Perspective 3D) */}
        <ScrollParallaxSection animationType="perspective-3d" speed={0.08}>
          <Hero reducedMotion={reducedMotion} />
        </ScrollParallaxSection>

        {/* 2. Brand Statement (Slide Right) */}
        <ScrollParallaxSection animationType="slide-right" speed={0.12}>
          <BrandStatement />
        </ScrollParallaxSection>

        {/* 3. Pinned Scrollytelling Manifesto Section */}
        <ScrollytellingSection />

        {/* 4. Six Service Categories (Scale Up) */}
        <ScrollParallaxSection animationType="scale-up" speed={0.1}>
          <ServicesShowcase onStartProject={handleStartProject} />
        </ScrollParallaxSection>

        {/* 4. Dedicated Performance Marketing Spotlight (Slide Left) */}
        <ScrollParallaxSection animationType="slide-left" speed={0.14}>
          <PerformanceSpotlight />
        </ScrollParallaxSection>

        {/* 5. Selected Work (Perspective 3D) */}
        <ScrollParallaxSection animationType="perspective-3d" speed={0.1}>
          <Portfolio />
        </ScrollParallaxSection>

        {/* 6. Why PLUG / Connected Advantage (Slide Right) */}
        <ScrollParallaxSection animationType="slide-right" speed={0.12}>
          <Advantage />
        </ScrollParallaxSection>

        {/* 7. Process (Scale Up) */}
        <ScrollParallaxSection animationType="scale-up" speed={0.08}>
          <ProcessTimeline />
        </ScrollParallaxSection>

        {/* 8. About and Team (Slide Left) */}
        <ScrollParallaxSection animationType="slide-left" speed={0.1}>
          <TeamCollective />
        </ScrollParallaxSection>

        {/* 9. Final CTA and Project Inquiry Form (Perspective 3D) */}
        <ScrollParallaxSection animationType="perspective-3d" speed={0.14}>
          <ContactCTA defaultServiceId={inquiryDefaultService} />
        </ScrollParallaxSection>
      </main>

      {/* 10. Footer with Complete Navigation */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}

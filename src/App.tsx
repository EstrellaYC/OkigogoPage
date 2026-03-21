import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import WhySection from './sections/WhySection';
import ShowcaseSection from './sections/ShowcaseSection';
import CareersSection from './sections/CareersSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reduced snap intensity to prevent rollback on short scrolls
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Only snap if we're clearly within a pinned section
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.05 && value <= r.end + 0.05);
            if (!inPinned) return value;
            
            // Find nearest center but with less aggressive snapping
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            // Only snap if we're reasonably close to the center (prevent rollback on short scrolls)
            const distance = Math.abs(target - value);
            if (distance > 0.15) return value; // Don't snap if too far from center
            
            return target;
          },
          duration: { min: 0.1, max: 0.25 },
          delay: 0,
          ease: "power1.out"
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-ok-dark min-h-screen">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        {/* Section 1: Hero - pin: true */}
        <HeroSection className="z-10" />
        
        {/* Section 2: Why + Metrics (merged) - pin: true */}
        <WhySection className="z-20" />
        
        {/* Section 3: Cases + Livestream + Services (merged) - pin: false (flowing) */}
        <ShowcaseSection className="z-30" />
        
        {/* Section 4: Careers - pin: false */}
        <CareersSection className="z-40" />
        
        {/* Section 5: Contact - pin: false */}
        <ContactSection className="z-50" />
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;

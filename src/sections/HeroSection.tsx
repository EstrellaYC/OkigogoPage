import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mobilePreviewRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  // Load animation (auto-play on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Glow fade in
      tl.fromTo(glowRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8 }, 
        0
      );

      // Headline animation
      tl.fromTo(headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.1
      );

      // Subheadline
      tl.fromTo(subheadRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.25
      );

      // CTAs
      tl.fromTo(ctaRef.current,
        { y: 18, scale: 0.98, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5 },
        0.4
      );

      if (mobilePreviewRef.current) {
        tl.fromTo(mobilePreviewRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          0.5
        );
      }

      if (heroImageRef.current) {
        tl.fromTo(heroImageRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7 },
          0.35
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
            onLeaveBack: () => {
              gsap.set([headlineRef.current, subheadRef.current, ctaRef.current, heroImageRef.current], {
                opacity: 1, y: 0, x: 0
              });
            }
          }
        });

        scrollTl.fromTo(headlineRef.current,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(subheadRef.current,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.72
        );

        scrollTl.fromTo(ctaRef.current,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.74
        );

        scrollTl.fromTo(heroImageRef.current,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className={`section-pinned min-h-[100svh] bg-ok-dark flex items-start justify-center lg:items-center ${className}`}
    >
      {/* Orange glow background */}
      <div 
        ref={glowRef}
        className="absolute inset-0 glow-orange opacity-0"
      />



      {/* Main Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center pt-24 pb-10 lg:min-h-screen lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
          {/* Mobile: Image preview — top on mobile, hidden on desktop */}
          <div ref={mobilePreviewRef} className="mb-6 opacity-0 lg:hidden">
            <div className="mobile-hero-frame">
              <div className="mobile-hero-border" />
              <div className="mobile-hero-clip">
                <img
                  src="/images/hero-panel-video.jpg"
                  alt="Contenido y livestream para TikTok Shop"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Left: Text */}
          <div className="flex-1 max-w-2xl">
        <h1 
          ref={headlineRef}
          className="font-display font-black text-[2.8rem] sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl text-ok-text leading-[0.95] tracking-tight mb-6 sm:mb-8 opacity-0"
        >
          <span className="block">Go <span className="text-gradient">Bigger</span></span>
          <span className="block">Go <span className="text-gradient">Further</span></span>
          <span className="block">Go <span className="text-gradient">Together</span></span>
        </h1>
        
        <p 
          ref={subheadRef}
          className="text-base sm:text-lg lg:text-xl text-ok-text-secondary max-w-lg mb-6 sm:mb-8 leading-relaxed opacity-0"
        >
          Soluciones completas de e-commerce con equipo local y estrategia comprobada.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4 opacity-0">
          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-primary flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto px-6 py-3"
          >
            Agenda una llamada
            <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => scrollToSection('cases')}
            className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto px-6 py-3"
          >
            Ver casos
          </button>
        </div>
          </div>{/* end left column */}

          {/* Right: Hero Image with lava lamp border - Desktop Only */}
          <div ref={heroImageRef} className="hidden lg:flex flex-1 max-w-xl items-center justify-center opacity-0">
            <div className="lava-lamp-frame">
              <div className="lava-lamp-glow" />
              <div className="lava-lamp-border" />
              <div className="lava-lamp-clip">
                <img
                  src="/images/hero-panel-video.jpg"
                  alt="Okigogo — e-commerce de alto impacto"
                  className="lava-lamp-image"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

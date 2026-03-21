import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Play, TrendingUp, Radio, Heart, Users, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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

      // Panels stagger
      const panels = panelsRef.current?.querySelectorAll('.floating-panel');
      if (panels) {
        tl.fromTo(panels,
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          0.3
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadRef.current, ctaRef.current], {
              opacity: 1, y: 0, x: 0
            });
            const panels = panelsRef.current?.querySelectorAll('.floating-panel');
            if (panels) {
              gsap.set(panels, { opacity: 1, x: 0, y: 0 });
            }
          }
        }
      });

      // EXIT phase (70% - 100%)
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

      // Panels exit in different directions
      const panels = panelsRef.current?.querySelectorAll('.floating-panel');
      if (panels) {
        const directions = [
          { x: '-10vw', y: '-10vh' },
          { x: '10vw', y: '-10vh' },
          { x: '-10vw', y: '10vh' },
          { x: '10vw', y: '10vh' }
        ];
        
        panels.forEach((panel, i) => {
          scrollTl.fromTo(panel,
            { x: 0, y: 0, opacity: 1 },
            { x: directions[i]?.x || 0, y: directions[i]?.y || 0, opacity: 0, ease: 'power2.in' },
            0.7 + i * 0.02
          );
        });
      }

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
      className={`section-pinned bg-ok-dark flex items-center justify-center ${className}`}
    >
      {/* Orange glow background */}
      <div 
        ref={glowRef}
        className="absolute inset-0 glow-orange opacity-0"
      />

      {/* Floating UI Panels - Desktop Only */}
      <div ref={panelsRef} className="absolute inset-0 pointer-events-none hidden lg:block">
        {/* Top-left panel - Search */}
        <div className="floating-panel absolute left-[6vw] top-[14vh] w-[26vw] min-w-[280px] panel p-4 pointer-events-auto animate-float">
          <div className="mono-label mb-3">Búsqueda</div>
          <div className="flex items-center gap-2 bg-ok-dark/50 rounded-lg px-3 py-2 mb-3">
            <Search size={14} className="text-ok-text-secondary" />
            <span className="text-sm text-ok-text-secondary">TikTok Shop México</span>
          </div>
          <div className="space-y-2">
            {['Influencers', 'Livestreams', 'Productos'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-ok-text/70">
                <div className="w-1 h-1 rounded-full bg-ok-orange" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Top-right panel - Video */}
        <div 
          className="floating-panel absolute right-[6vw] top-[14vh] w-[22vw] min-w-[260px] panel overflow-hidden pointer-events-auto animate-float"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="mono-label absolute top-3 left-3 z-10">Contenido</div>
          <img 
            src="/images/hero-panel-video.jpg" 
            alt="TikTok content" 
            className="w-full h-40 object-cover"
          />
          <div className="p-3 flex items-center gap-2">
            <Play size={14} className="text-ok-orange" />
            <span className="text-sm text-ok-text">125K views</span>
          </div>
        </div>

        {/* Bottom-left panel - Metrics */}
        <div 
          className="floating-panel absolute left-[6vw] bottom-[12vh] w-[24vw] min-w-[260px] panel p-4 pointer-events-auto animate-float"
          style={{ animationDelay: '1s' }}
        >
          <div className="mono-label mb-3">Métricas</div>
          <div className="flex items-end gap-2 mb-2">
            <TrendingUp size={20} className="text-ok-cyan" />
            <span className="text-2xl font-display font-bold text-ok-text">+120%</span>
          </div>
          <div className="text-xs text-ok-text-secondary">GMV growth this quarter</div>
          <div className="mt-3 h-8 flex items-end gap-1">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 bg-ok-orange/60 rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Bottom-right panel - Livestream */}
        <div 
          className="floating-panel absolute right-[6vw] bottom-[12vh] w-[24vw] min-w-[260px] panel p-4 pointer-events-auto animate-float"
          style={{ animationDelay: '1.5s' }}
        >
          <div className="mono-label mb-3">Livestream</div>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-ok-orange/20 flex items-center justify-center">
                <Radio size={18} className="text-ok-orange" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-live-pulse" />
            </div>
            <div>
              <div className="text-sm font-medium text-ok-text">En vivo</div>
              <div className="text-xs text-ok-text-secondary flex items-center gap-1">
                <Users size={10} />
                2.4k viewers
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-ok-text-secondary">
            <Heart size={14} className="text-ok-orange" />
            <span>12.4k likes</span>
          </div>
        </div>
      </div>

      {/* Mobile Stats Bar */}
      <div className="absolute top-20 left-0 right-0 px-4 lg:hidden">
        <div className="flex justify-center gap-3">
          <div className="panel px-3 py-2 flex items-center gap-2">
            <TrendingUp size={14} className="text-ok-orange" />
            <span className="text-xs font-medium">+120% GMV</span>
          </div>
          <div className="panel px-3 py-2 flex items-center gap-2">
            <Users size={14} className="text-ok-cyan" />
            <span className="text-xs font-medium">2.4k Live</span>
          </div>
          <div className="panel px-3 py-2 flex items-center gap-2">
            <Heart size={14} className="text-ok-orange" />
            <span className="text-xs font-medium">12.4k</span>
          </div>
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-16 lg:pt-0">
        <h1 
          ref={headlineRef}
          className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-ok-text leading-[1.05] sm:leading-[0.95] tracking-tight mb-4 sm:mb-6 opacity-0"
        >
          Impulsa tu marca en{' '}
          <span className="text-gradient">TikTok Shop</span>{' '}
          México
        </h1>
        
        <p 
          ref={subheadRef}
          className="text-sm sm:text-base lg:text-lg xl:text-xl text-ok-text-secondary max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0 opacity-0"
        >
          Soluciones completas de e-commerce con equipo local y estrategia comprobada.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 opacity-0">
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
      </div>
    </section>
  );
};

export default HeroSection;

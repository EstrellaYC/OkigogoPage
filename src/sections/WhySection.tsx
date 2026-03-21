import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, ShoppingBag, TrendingUp, TrendingUp as TrendingIcon, Target, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WhySectionProps {
  className?: string;
}

const WhySection = ({ className = '' }: WhySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      // Text block from left
      scrollTl.fromTo(textRef.current,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Image from right
      scrollTl.fromTo(imageRef.current,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Metrics from bottom
      scrollTl.fromTo(metricsRef.current,
        { y: '30vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo([textRef.current, imageRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(metricsRef.current,
        { y: 0, opacity: 1 },
        { y: '20vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bullets = [
    { icon: Users, text: 'Audiencia de compra activa' },
    { icon: ShoppingBag, text: 'Descubrimiento + conversión' },
    { icon: TrendingUp, text: 'Escalable con livestreams' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="why-tiktok"
      className={`section-pinned bg-ok-dark ${className}`}
    >
      {/* Mobile Layout */}
      <div className="lg:hidden absolute inset-0 flex flex-col pt-16">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col px-4">
          {/* Image */}
          <div ref={imageRef} className="h-[35vh] w-full relative rounded-xl overflow-hidden mb-4">
            <img 
              src="/images/split-creator.jpg" 
              alt="Creator in Mexico" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ok-dark/80" />
          </div>
          
          {/* Text Content */}
          <div ref={textRef} className="flex-1">
            <h2 className="font-display font-black text-2xl text-ok-text leading-tight mb-2">
              El momento es <span className="text-gradient">ahora</span>
            </h2>
            
            <p className="text-sm text-ok-text-secondary leading-relaxed mb-3">
              TikTok Shop está creciendo en México. Las marcas que entran temprano construyen audiencia y ventas.
            </p>

            <div className="space-y-2 mb-4">
              {bullets.map((bullet, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-ok-orange/10 flex items-center justify-center flex-shrink-0">
                    <bullet.icon size={12} className="text-ok-orange" />
                  </div>
                  <span className="text-ok-text text-sm">{bullet.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Bar */}
        <div ref={metricsRef} className="px-4 pb-6">
          <div className="panel p-4">
            <p className="text-xs text-ok-text-secondary mb-3 text-center">Resultados comprobados</p>
            <div className="flex justify-around">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingIcon size={14} className="text-ok-cyan" />
                </div>
                <div className="font-mono text-xl font-bold text-ok-text">+120%</div>
                <div className="text-[10px] text-ok-text-secondary">GMV</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target size={14} className="text-ok-orange" />
                </div>
                <div className="font-mono text-xl font-bold text-ok-text">4.8%</div>
                <div className="text-[10px] text-ok-text-secondary">Conversión</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users size={14} className="text-ok-cyan" />
                </div>
                <div className="font-mono text-xl font-bold text-ok-text">50+</div>
                <div className="text-[10px] text-ok-text-secondary">Marcas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="absolute inset-0 flex items-center px-[8vw]">
          {/* Left Content */}
          <div ref={textRef} className="w-[38vw] pr-8">
            <h2 className="font-display font-black text-4xl xl:text-5xl text-ok-text leading-tight mb-4">
              El momento es <span className="text-gradient">ahora</span>
            </h2>
            
            <p className="text-base text-ok-text-secondary leading-relaxed mb-6">
              TikTok Shop está creciendo en México. Las marcas que entran temprano construyen audiencia, posicionamiento y ventas recurrentes antes que la competencia.
            </p>

            <div className="space-y-3 mb-6">
              {bullets.map((bullet, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-ok-orange/10 flex items-center justify-center flex-shrink-0">
                    <bullet.icon size={16} className="text-ok-orange" />
                  </div>
                  <span className="text-ok-text font-medium">{bullet.text}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => scrollToSection('showcase')}
              className="inline-flex items-center gap-2 text-ok-orange hover:text-ok-orange-dark transition-colors font-medium group"
            >
              Ver casos de éxito
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Center Image */}
          <div ref={imageRef} className="w-[26vw] h-[55vh] panel overflow-hidden mx-4">
            <img 
              src="/images/split-creator.jpg" 
              alt="Creator in Mexico" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Metrics */}
          <div ref={metricsRef} className="w-[22vw]">
            <div className="panel p-6">
              <p className="text-sm text-ok-text-secondary mb-6">Datos que convierten</p>
              
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingIcon size={18} className="text-ok-cyan" />
                    <span className="text-sm text-ok-text-secondary">GMV generado</span>
                  </div>
                  <div className="font-mono text-3xl font-bold text-ok-text">+120%</div>
                  <div className="text-xs text-ok-text-secondary">Promedio trimestral</div>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Target size={18} className="text-ok-orange" />
                    <span className="text-sm text-ok-text-secondary">Conversión</span>
                  </div>
                  <div className="font-mono text-3xl font-bold text-ok-text">4.8%</div>
                  <div className="text-xs text-ok-text-secondary">En campañas con livestream</div>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={18} className="text-ok-cyan" />
                    <span className="text-sm text-ok-text-secondary">Marcas activas</span>
                  </div>
                  <div className="font-mono text-3xl font-bold text-ok-text">50+</div>
                  <div className="text-xs text-ok-text-secondary">En México</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;

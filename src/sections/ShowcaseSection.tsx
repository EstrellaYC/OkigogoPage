import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  TrendingUp, 
  Target, 
  Award,
  Users,
  FileText,
  Radio,
  Store,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseSectionProps {
  className?: string;
}

const ShowcaseSection = ({ className = '' }: ShowcaseSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      if (!isDesktop) {
        gsap.set([headlineRef.current, contentRef.current], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(headlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
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

  const cases = [
    {
      image: '/images/case-card-1.jpg',
      title: 'Beauty',
      subtitle: 'Cuidado personal',
      metric: '+85%',
      metricLabel: 'ventas',
      icon: TrendingUp,
    },
    {
      image: '/images/case-card-2.jpg',
      title: 'Hogar',
      subtitle: 'Lifestyle',
      metric: '+3.2x',
      metricLabel: 'ROAS',
      icon: Target,
    },
    {
      image: '/images/case-card-3.jpg',
      title: 'Moda',
      subtitle: 'Accesorios',
      metric: 'Top 10',
      metricLabel: 'categoría',
      icon: Award,
    },
  ];

  const services = [
    {
      icon: FileText,
      title: 'Estrategia de contenido',
      description: 'Calendario editorial, guiones creativos y hooks que captan atención.',
      features: ['Calendario mensual', 'Guiones optimizados', 'Análisis de trends'],
    },
    {
      icon: Radio,
      title: 'Livestream commerce',
      description: 'Producción profesional con hosts entrenados.',
      features: ['Hosting profesional', 'Scripts de venta', 'Análisis post-live'],
    },
    {
      icon: Users,
      title: 'Gestión de creators',
      description: 'Selección de influencers alineados a tu marca.',
      features: ['Matching inteligente', 'Briefs claros', 'Reportes de performance'],
    },
    {
      icon: Store,
      title: 'Operación de tienda',
      description: 'Configuración de catálogo y gestión de inventario.',
      features: ['Setup completo', 'Gestión de pedidos', 'Soporte 24/7'],
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="showcase"
      className={`relative overflow-x-clip scroll-mt-20 lg:scroll-mt-24 bg-ok-dark py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        {/* Section Headline */}
        <div ref={headlineRef} className="mb-10 text-left sm:mb-14 lg:text-center">
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-ok-text leading-tight mb-3">
            Casos de <span className="text-gradient">éxito</span> y servicios
          </h2>
          <p className="max-w-lg text-sm text-ok-text-secondary sm:text-base lg:mx-auto">
            Estrategias reales con resultados medibles. Todo lo que necesitas para crecer en TikTok Shop.
          </p>
        </div>

        {/* Main Content Grid - Cases Left (2/3), Services Right (1/3) */}
        <div ref={contentRef} className="grid overflow-x-hidden lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: Cases - Horizontal Scroll (2/3 width) */}
          <div id="cases" className="lg:col-span-2 scroll-mt-20 lg:scroll-mt-24">
            <h3 className="font-display font-bold text-base sm:text-lg text-ok-text mb-4 flex items-center gap-2">
              <Award size={18} className="text-ok-orange" />
              Casos de éxito
            </h3>
            <div className="relative w-full overflow-hidden lg:overflow-visible">
              <div className="-mx-4 flex w-[calc(100%+2rem)] snap-x snap-mandatory gap-4 overflow-x-auto touch-pan-x overscroll-x-contain scrollbar-hide lg:mx-0 lg:w-full lg:gap-3 lg:px-0 lg:snap-none lg:overflow-visible">
                {cases.map((caseItem, i) => (
                  <div 
                    key={i}
                    className="group relative aspect-[3/4] w-[56%] min-w-[56%] flex-none snap-start overflow-hidden rounded-2xl border border-white/[0.08] bg-ok-panel shadow-panel lg:w-[220px] lg:min-w-[220px]"
                  >
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ok-dark via-ok-dark/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ok-orange/20">
                          <caseItem.icon size={14} className="text-ok-orange" />
                        </div>
                      </div>
                      <h4 className="mb-1 text-base font-display font-bold text-ok-text">
                        {caseItem.title}
                      </h4>
                      <p className="mb-2 text-xs text-ok-text-secondary">{caseItem.subtitle}</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-mono text-xl font-bold text-ok-orange">
                          {caseItem.metric}
                        </span>
                        <span className="text-xs text-ok-text-secondary">
                          {caseItem.metricLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-ok-dark via-ok-dark/70 to-transparent lg:hidden" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-ok-dark via-ok-dark/70 to-transparent lg:hidden" />
            </div>

            {/* Livestream Preview - Below Cases */}
            <div id="livestream" className="mt-6 w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-ok-panel shadow-panel scroll-mt-20 lg:scroll-mt-24">
              <div className="relative aspect-[16/11] w-full sm:h-[200px] sm:aspect-auto">
                <img 
                  src="/images/stage-host.jpg" 
                  alt="Livestream" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ok-dark/80 to-transparent" />
                
                <div className="absolute top-3 right-3 flex items-center gap-1.5 panel px-2 py-1">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-live-pulse" />
                  <span className="mono-label text-[10px]">LIVE</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="font-display font-bold text-lg text-ok-text mb-1">
                    Livestreams que <span className="text-gradient">venden</span>
                  </h4>
                  <p className="text-sm text-ok-text-secondary mb-3 max-w-[18rem]">
                    Hosting profesional con conversión optimizada
                  </p>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-ok-orange text-xs font-medium flex items-center gap-1"
                  >
                    Cotizar
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Services - Vertical Stack (1/3 width) */}
          <div id="services" className="lg:col-span-1 scroll-mt-20 lg:scroll-mt-24">
            <h3 className="font-display font-bold text-base sm:text-lg text-ok-text mb-4 flex items-center gap-2">
              <Store size={18} className="text-ok-orange" />
              Nuestros servicios
            </h3>
            
            {/* Mobile: Accordion */}
            <div className="w-full lg:hidden">
              <div className="w-full space-y-3">
                {services.map((service, i) => {
                  const isActive = i === activeService;

                  return (
                    <div
                      key={service.title}
                      className={`overflow-hidden rounded-2xl border bg-ok-panel shadow-panel transition-colors ${
                        isActive ? 'border-ok-orange/30' : 'border-white/[0.08]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveService(i)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                      >
                        <div className="min-w-0 flex-1">
                          <h4 className="font-display text-base font-bold text-ok-text">
                            {service.title}
                          </h4>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`flex-shrink-0 text-ok-text-secondary transition-transform ${
                            isActive ? 'rotate-180 text-ok-orange' : ''
                          }`}
                        />
                      </button>

                      {isActive ? (
                        <div className="border-t border-white/10 px-4 py-4">
                          <div className="mb-3 text-sm leading-relaxed text-ok-text-secondary">
                            {service.description}
                          </div>
                          <div className="space-y-2">
                            {service.features.map((feature, j) => (
                              <div key={j} className="flex items-center gap-2 text-sm text-ok-text">
                                <CheckCircle2 size={14} className="flex-shrink-0 text-ok-orange" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop: Vertical Stack */}
            <div className="hidden lg:flex lg:flex-col gap-3">
              {services.map((service, i) => (
                <div key={i} className="panel p-4 hover:border-ok-orange/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-ok-orange/10 flex items-center justify-center flex-shrink-0">
                      <service.icon size={20} className="text-ok-orange" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-ok-text text-sm mb-1">{service.title}</h4>
                      <p className="text-xs text-ok-text-secondary mb-2">{service.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.features.map((feature, j) => (
                          <span key={j} className="px-2 py-0.5 rounded bg-ok-dark text-[10px] text-ok-text-secondary">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;

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
  ChevronLeft,
  ChevronRight
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

  const nextService = () => {
    setActiveService((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setActiveService((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section 
      ref={sectionRef}
      id="showcase"
      className={`relative bg-ok-dark py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        {/* Section Headline */}
        <div ref={headlineRef} className="text-center mb-10 sm:mb-14">
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-ok-text leading-tight mb-3">
            Casos de <span className="text-gradient">éxito</span> y servicios
          </h2>
          <p className="text-sm sm:text-base text-ok-text-secondary max-w-lg mx-auto">
            Estrategias reales con resultados medibles. Todo lo que necesitas para crecer en TikTok Shop.
          </p>
        </div>

        {/* Main Content Grid - Cases Left (2/3), Services Right (1/3) */}
        <div ref={contentRef} className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: Cases - Horizontal Scroll (2/3 width) */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-bold text-base sm:text-lg text-ok-text mb-4 flex items-center gap-2">
              <Award size={18} className="text-ok-orange" />
              Casos de éxito
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
              {cases.map((caseItem, i) => (
                <div 
                  key={i}
                  className="group relative w-[200px] sm:w-[220px] min-w-[200px] sm:min-w-[220px] aspect-[3/4] panel overflow-hidden"
                >
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ok-dark via-ok-dark/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-6 h-6 rounded-lg bg-ok-orange/20 flex items-center justify-center">
                        <caseItem.icon size={12} className="text-ok-orange" />
                      </div>
                    </div>
                    <h4 className="text-sm font-display font-bold text-ok-text mb-0.5">
                      {caseItem.title}
                    </h4>
                    <p className="text-[10px] text-ok-text-secondary mb-1.5">{caseItem.subtitle}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-lg font-bold text-ok-orange">
                        {caseItem.metric}
                      </span>
                      <span className="text-[10px] text-ok-text-secondary">
                        {caseItem.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Livestream Preview - Below Cases */}
            <div className="mt-6 panel overflow-hidden">
              <div className="relative h-[180px] sm:h-[200px]">
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

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="font-display font-bold text-base text-ok-text mb-1">
                    Livestreams que <span className="text-gradient">venden</span>
                  </h4>
                  <p className="text-xs text-ok-text-secondary mb-2">
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
          <div className="lg:col-span-1">
            <h3 className="font-display font-bold text-base sm:text-lg text-ok-text mb-4 flex items-center gap-2">
              <Store size={18} className="text-ok-orange" />
              Nuestros servicios
            </h3>
            
            {/* Mobile: Carousel with navigation */}
            <div className="lg:hidden">
              <div className="relative">
                <div className="panel overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-ok-orange/10 flex items-center justify-center flex-shrink-0">
                        {(() => {
                          const Icon = services[activeService].icon;
                          return <Icon size={20} className="text-ok-orange" />;
                        })()}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-ok-text text-sm mb-1">
                          {services[activeService].title}
                        </h4>
                        <p className="text-xs text-ok-text-secondary">
                          {services[activeService].description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {services[activeService].features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-ok-text">
                          <CheckCircle2 size={12} className="text-ok-orange flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3 mt-3">
                  <button 
                    onClick={prevService}
                    className="w-8 h-8 rounded-full bg-ok-panel border border-white/10 flex items-center justify-center text-ok-text hover:border-ok-orange/50 hover:text-ok-orange transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex gap-1.5">
                    {services.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveService(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === activeService ? 'bg-ok-orange' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={nextService}
                    className="w-8 h-8 rounded-full bg-ok-panel border border-white/10 flex items-center justify-center text-ok-text hover:border-ok-orange/50 hover:text-ok-orange transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
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

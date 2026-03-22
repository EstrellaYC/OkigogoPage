import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  DollarSign, 
  Star, 
  TrendingUp, 
  Globe, 
  Video, 
  Mic, 
  Edit3, 
  ShoppingCart,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CareersSectionProps {
  className?: string;
}

const CareersSection = ({ className = '' }: CareersSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeHook, setActiveHook] = useState(0);
  const touchStartX = useRef(0);
  const whatsappNumber = '525564612028';

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHook((prev) => (prev + 1) % emotionalHooks.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

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

  const emotionalHooks = [
    {
      icon: DollarSign,
      title: 'Gana dinero haciendo contenido',
      description: 'Convierte tu pasión en ingresos reales. Monetiza tu creatividad con marcas internacionales.',
      image: '/images/hook-money.jpg',
    },
    {
      icon: Star,
      title: 'Conviértete en influencer',
      description: 'Te entrenamos, te guiamos y te conectamos con las mejores oportunidades del mercado.',
      image: '/images/hook-star.jpg',
    },
    {
      icon: TrendingUp,
      title: 'Crece desde cero',
      description: 'No necesitas experiencia previa. Te damos las herramientas y el conocimiento para triunfar.',
      image: '/images/hook-growth.jpg',
    },
    {
      icon: Globe,
      title: 'Marcas internacionales',
      description: 'Colabora con empresas de China, Estados Unidos y Europa que buscan talento mexicano.',
      image: '/images/hook-global.jpg',
    },
  ];

  const roles = [
    {
      icon: Video,
      title: 'Content Creator',
      description: 'Crea videos virales para TikTok.',
      requirements: ['18-35 años', 'Activo en redes', 'Creatividad'],
    },
    {
      icon: Mic,
      title: 'TikTok LIVE Host',
      description: 'Presenta productos en vivo.',
      requirements: ['18-35 años', 'Buena presencia', 'Flexible'],
    },
    {
      icon: Edit3,
      title: 'Video Editor',
      description: 'Edición profesional de contenido.',
      requirements: ['Experiencia', 'Conocimiento trends', 'Velocidad'],
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Operator',
      description: 'Gestiona tiendas y pedidos.',
      requirements: ['Organización', 'Excel', 'Inglés básico'],
    },
  ];

  const openWhatsAppForRole = (role: string) => {
    const message = `Hola, me interesa aplicar al puesto de ${role}. ¿Podrían compartir conmigo los siguientes pasos?`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openWhatsAppForCv = () => {
    const url = `https://wa.me/${whatsappNumber}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const goToNextHook = () => {
    setActiveHook((prev) => (prev + 1) % emotionalHooks.length);
  };

  const goToPrevHook = () => {
    setActiveHook((prev) => (prev - 1 + emotionalHooks.length) % emotionalHooks.length);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) < 50) {
      return;
    }

    if (diff > 0) {
      goToNextHook();
      return;
    }

    goToPrevHook();
  };

  return (
    <section 
      ref={sectionRef}
      id="careers"
      className={`relative scroll-mt-20 lg:scroll-mt-24 bg-ok-dark py-16 sm:py-20 lg:py-24 ${className}`}
    >
      {/* Orange glow */}
      <div className="absolute inset-0 glow-orange opacity-50 pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-8 text-left sm:text-center sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-ok-orange/10 border border-ok-orange/20 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-ok-orange animate-pulse" />
            <span className="text-xs sm:text-sm text-ok-orange font-medium">¡Estamos contratando!</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-ok-text leading-tight mb-2 sm:mb-3">
            Únete al <span className="text-gradient">equipo</span>
          </h2>
          <p className="text-sm sm:text-base text-ok-text-secondary max-w-lg sm:mx-auto px-0 sm:px-0">
            Oportunidades para jóvenes talentos mexicanos.
          </p>
        </div>

        {/* Main Content Grid */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-6 lg:gap-8 lg:items-stretch">
          {/* Left: Emotional Hooks Gallery with Image Background */}
          <div className="flex flex-col lg:h-full">
            <h3 className="font-display font-bold text-sm sm:text-base text-ok-text mb-3 sm:mb-4 flex items-center gap-2">
              <Star size={16} className="text-ok-orange" />
              ¿Por qué unirte?
            </h3>
            
            {/* Gallery Card with Image Background */}
            <div className="relative flex-1 min-h-[220px] sm:min-h-[280px] lg:min-h-0">
              <div
                className="panel overflow-hidden h-full"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative h-[220px] sm:h-[280px] lg:h-full">
                  {emotionalHooks.map((hook, i) => {
                    return (
                      <div
                        key={hook.title}
                        className="absolute inset-0 transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(${(i - activeHook) * 100}%)` }}
                      >
                        <img 
                          src={hook.image} 
                          alt={hook.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ok-dark via-ok-dark/70 to-ok-dark/40" />

                        <div className="relative h-full p-4 sm:p-6 flex flex-col justify-end">
                          <div className="mb-8 sm:mb-12">
                            <h4 className="font-display font-bold text-white text-base sm:text-lg mb-1.5 sm:mb-2">
                              {hook.title}
                            </h4>
                            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                              {hook.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5 sm:gap-2">
                    {emotionalHooks.map((hook, i) => (
                      <button
                        key={hook.title}
                        onClick={() => setActiveHook(i)}
                        aria-label={`Ver motivo ${i + 1}`}
                        className={`h-1.5 sm:h-2 rounded-full transition-all ${
                          i === activeHook
                            ? 'w-4 sm:w-6 bg-ok-orange'
                            : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Vacantes - One per row */}
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-ok-text mb-3 sm:mb-4 flex items-center gap-2">
              <Video size={16} className="text-ok-orange" />
              Vacantes disponibles
            </h3>
            
            <div className="space-y-2 sm:space-y-3">
              {roles.map((role, i) => (
                <div 
                  key={i}
                  className="panel p-4 hover:border-ok-orange/30 transition-all duration-300"
                >
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-3">
                    <div className="w-10 h-10 rounded-xl bg-ok-orange/10 flex items-center justify-center flex-shrink-0">
                      <role.icon size={16} className="sm:hidden text-ok-orange" />
                      <role.icon size={18} className="hidden sm:block text-ok-orange" />
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display font-bold text-ok-text text-base sm:text-base">
                        {role.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-xs text-ok-text-secondary leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => openWhatsAppForRole(role.title)}
                      className="flex w-full items-center justify-center gap-1 rounded-lg border border-ok-orange/30 px-4 py-2 text-xs font-medium text-ok-orange transition-colors hover:bg-ok-orange hover:text-white sm:w-auto"
                    >
                      Aplicar
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="panel p-4 sm:p-6 lg:p-8 max-w-lg mx-auto">
            <h3 className="font-display font-bold text-base sm:text-lg text-ok-text mb-2">
              ¿No ves tu perfil?
            </h3>
            <p className="text-xs sm:text-sm text-ok-text-secondary mb-4 sm:mb-5">
              Siempre estamos buscando talento. Envíanos tu información.
            </p>
            <button 
              onClick={openWhatsAppForCv}
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Enviar CV
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;

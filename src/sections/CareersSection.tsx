import { useRef, useLayoutEffect, useState } from 'react';
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
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CareersSectionProps {
  className?: string;
}

const CareersSection = ({ className = '' }: CareersSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [activeHook, setActiveHook] = useState(0);

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

  const openApplyModal = (role: string) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const nextHook = () => {
    setActiveHook((prev) => (prev + 1) % emotionalHooks.length);
  };

  const prevHook = () => {
    setActiveHook((prev) => (prev - 1 + emotionalHooks.length) % emotionalHooks.length);
  };

  const hook = emotionalHooks[activeHook];

  return (
    <section 
      ref={sectionRef}
      id="careers"
      className={`relative bg-ok-dark py-16 sm:py-20 lg:py-24 ${className}`}
    >
      {/* Orange glow */}
      <div className="absolute inset-0 glow-orange opacity-50 pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-ok-orange/10 border border-ok-orange/20 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-ok-orange animate-pulse" />
            <span className="text-xs sm:text-sm text-ok-orange font-medium">¡Estamos contratando!</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-ok-text leading-tight mb-2 sm:mb-3">
            Únete al <span className="text-gradient">equipo</span>
          </h2>
          <p className="text-sm sm:text-base text-ok-text-secondary max-w-lg mx-auto px-2 sm:px-0">
            Oportunidades para jóvenes talentos mexicanos.
          </p>
        </div>

        {/* Main Content Grid */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left: Emotional Hooks Gallery with Image Background */}
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-ok-text mb-3 sm:mb-4 flex items-center gap-2">
              <Star size={16} className="text-ok-orange" />
              ¿Por qué unirte?
            </h3>
            
            {/* Gallery Card with Image Background */}
            <div className="relative">
              <div className="panel overflow-hidden">
                <div className="h-[220px] sm:h-[280px] relative">
                  {/* Background Image */}
                  <img 
                    src={hook.image} 
                    alt={hook.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Dark Overlay Filter */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ok-dark via-ok-dark/70 to-ok-dark/40" />
                  
                  {/* Content */}
                  <div className="relative h-full p-4 sm:p-6 flex flex-col justify-end">
                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-ok-orange/20 backdrop-blur-sm flex items-center justify-center mb-3">
                      {(() => {
                        const Icon = hook.icon;
                        return <Icon size={20} className="sm:hidden text-ok-orange" />;
                      })()}
                      {(() => {
                        const Icon = hook.icon;
                        return <Icon size={24} className="hidden sm:block text-ok-orange" />;
                      })()}
                    </div>
                    
                    {/* Text */}
                    <div>
                      <h4 className="font-display font-bold text-white text-base sm:text-lg mb-1.5 sm:mb-2">
                        {hook.title}
                      </h4>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                        {hook.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center justify-between mt-3">
                <button 
                  onClick={prevHook}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-ok-panel border border-white/10 flex items-center justify-center text-ok-text hover:border-ok-orange/50 hover:text-ok-orange transition-colors"
                >
                  <ChevronLeft size={16} className="sm:hidden" />
                  <ChevronLeft size={18} className="hidden sm:block" />
                </button>
                
                <div className="flex gap-1.5 sm:gap-2">
                  {emotionalHooks.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveHook(i)}
                      className={`h-1.5 sm:h-2 rounded-full transition-all ${
                        i === activeHook 
                          ? 'w-4 sm:w-6 bg-ok-orange' 
                          : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextHook}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-ok-panel border border-white/10 flex items-center justify-center text-ok-text hover:border-ok-orange/50 hover:text-ok-orange transition-colors"
                >
                  <ChevronRight size={16} className="sm:hidden" />
                  <ChevronRight size={18} className="hidden sm:block" />
                </button>
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
                  className="panel p-3 sm:p-4 hover:border-ok-orange/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ok-orange/10 flex items-center justify-center flex-shrink-0">
                      <role.icon size={16} className="sm:hidden text-ok-orange" />
                      <role.icon size={18} className="hidden sm:block text-ok-orange" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-ok-text text-sm sm:text-base truncate">
                        {role.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-ok-text-secondary truncate">
                        {role.description}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => openApplyModal(role.title)}
                      className="flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-ok-orange/30 text-ok-orange text-xs font-medium hover:bg-ok-orange hover:text-white transition-colors flex items-center gap-1"
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
              onClick={() => openApplyModal('General')}
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Enviar CV
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-ok-dark/90 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative panel p-4 sm:p-6 lg:p-8 w-full sm:w-full sm:max-w-md max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-ok-text-secondary hover:text-ok-text transition-colors"
            >
              <X size={20} />
            </button>
            
            <h3 className="font-display font-bold text-lg sm:text-xl text-ok-text mb-1 sm:mb-2 pr-8">
              Aplicar: {selectedRole}
            </h3>
            <p className="text-xs sm:text-sm text-ok-text-secondary mb-4 sm:mb-6">
              Completa el formulario y nos pondremos en contacto.
            </p>
            
            <form className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-ok-text-secondary mb-1 sm:mb-1.5">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="w-full bg-ok-dark border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-ok-text text-sm placeholder:text-ok-text-secondary/50 focus:outline-none focus:border-ok-orange/60 transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs sm:text-sm text-ok-text-secondary mb-1 sm:mb-1.5">
                    Edad
                  </label>
                  <input
                    type="number"
                    className="w-full bg-ok-dark border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-ok-text text-sm placeholder:text-ok-text-secondary/50 focus:outline-none focus:border-ok-orange/60 transition-colors"
                    placeholder="18-35"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-ok-text-secondary mb-1 sm:mb-1.5">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    className="w-full bg-ok-dark border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-ok-text text-sm placeholder:text-ok-text-secondary/50 focus:outline-none focus:border-ok-orange/60 transition-colors"
                    placeholder="CDMX"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm text-ok-text-secondary mb-1 sm:mb-1.5">
                  Correo / WhatsApp
                </label>
                <input
                  type="text"
                  className="w-full bg-ok-dark border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-ok-text text-sm placeholder:text-ok-text-secondary/50 focus:outline-none focus:border-ok-orange/60 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm text-ok-text-secondary mb-1 sm:mb-1.5">
                  ¿Por qué quieres unirte?
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-ok-dark border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-ok-text text-sm placeholder:text-ok-text-secondary/50 focus:outline-none focus:border-ok-orange/60 transition-colors resize-none"
                  placeholder="Cuéntanos sobre ti..."
                />
              </div>
              
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  alert('¡Gracias por tu aplicación! Te contactaremos pronto.');
                }}
                className="w-full btn-primary py-3 sm:py-3.5 text-sm"
              >
                Enviar aplicación
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CareersSection;

import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    marca: '',
    mensaje: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      if (!isDesktop) {
        gsap.set([glowRef.current, textRef.current, formRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Glow
      gsap.fromTo(glowRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );

      // Text reveal
      gsap.fromTo(textRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

      // Form reveal
      gsap.fromTo(formRef.current,
        { y: 32, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/9ad9ca0b7f882359f47d75cbf7fab185', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Nuevo mensaje de contacto - ${formData.nombre || 'Sitio Web'}`,
          nombre: formData.nombre,
          correo: formData.correo,
          marca: formData.marca,
          mensaje: formData.mensaje,
          _captcha: 'false',
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el mensaje.');
      }

      setIsSubmitted(true);
      setFormData({
        nombre: '',
        correo: '',
        marca: '',
        mensaje: '',
      });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      setSubmitError('No pudimos enviar tu mensaje. Intenta de nuevo en unos minutos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className={`relative scroll-mt-20 lg:scroll-mt-24 bg-ok-dark py-16 sm:py-20 lg:py-32 ${className}`}
    >
      {/* Orange glow */}
      <div 
        ref={glowRef}
        className="absolute inset-0 glow-orange opacity-0 pointer-events-none"
      />

      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        <div className="lg:flex lg:gap-16 items-start">
          {/* Left Text */}
          <div ref={textRef} className="lg:w-[38vw] mb-8 sm:mb-10 lg:mb-0 text-center lg:text-left">
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-5xl text-ok-text leading-[1.1] tracking-tight mb-3 sm:mb-4">
              <span className="text-gradient">Hablemos</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-ok-text-secondary leading-relaxed mb-6 sm:mb-8">
              Cuéntanos tu marca y tus objetivos. Te responderemos en menos de 24h.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <a 
                  href="https://www.tiktok.com/@okigogomcn88" 
                target="_blank" 
                rel="noopener noreferrer"
                  aria-label="TikTok Okigogo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ok-panel border border-white/10 flex items-center justify-center hover:border-ok-orange/50 hover:text-ok-orange transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                  href="https://www.instagram.com/okigogomcn/" 
                target="_blank" 
                rel="noopener noreferrer"
                  aria-label="Instagram Okigogo MCN"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ok-panel border border-white/10 flex items-center justify-center hover:border-ok-orange/50 hover:text-ok-orange transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                  href="https://www.facebook.com/share/18cQvabXJa/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                  aria-label="Facebook Okigogo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ok-panel border border-white/10 flex items-center justify-center hover:border-ok-orange/50 hover:text-ok-orange transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v3h2.5v8h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div ref={formRef} className="lg:w-[40vw]">
            <div className="panel p-4 sm:p-6 lg:p-8">
              {isSubmitted ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-ok-orange/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <MessageCircle size={20} className="sm:hidden text-ok-orange" />
                    <MessageCircle size={28} className="hidden sm:block text-ok-orange" />
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-ok-text mb-1 sm:mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-xs sm:text-sm text-ok-text-secondary">
                    Te contactaremos en menos de 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-ok-text-secondary mb-1 sm:mb-1.5">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full bg-ok-dark border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-ok-text text-sm placeholder:text-ok-text-secondary/50 focus:outline-none focus:border-ok-orange/60 transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-ok-text-secondary mb-1 sm:mb-1.5">
                      Correo
                    </label>
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      required
                      className="w-full bg-ok-dark border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-ok-text text-sm placeholder:text-ok-text-secondary/50 focus:outline-none focus:border-ok-orange/60 transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-ok-text-secondary mb-1 sm:mb-1.5">
                      Marca / Sitio web
                    </label>
                    <input
                      type="text"
                      name="marca"
                      value={formData.marca}
                      onChange={handleChange}
                      className="w-full bg-ok-dark border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-ok-text text-sm placeholder:text-ok-text-secondary/50 focus:outline-none focus:border-ok-orange/60 transition-colors"
                      placeholder="tumarca.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-ok-text-secondary mb-1 sm:mb-1.5">
                      ¿Qué necesitas?
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full bg-ok-dark border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-ok-text text-sm placeholder:text-ok-text-secondary/50 focus:outline-none focus:border-ok-orange/60 transition-colors resize-none"
                      placeholder="Cuéntanos sobre tu proyecto..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3 sm:py-4 text-sm"
                  >
                    <Send size={16} />
                    {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                  </button>

                  {submitError && (
                    <p className="text-xs sm:text-sm text-red-400">{submitError}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

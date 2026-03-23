import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Nosotros', id: 'why-tiktok' },
    { label: 'Casos', id: 'cases' },
    { label: 'Carreras', id: 'careers' },
    { label: 'Contacto', id: 'contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'bg-ok-dark/95 backdrop-blur-md border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group"
            >
              <img
                src="/images/oki_icon.png"
                alt="Okigogo MCN"
                className="h-6 w-auto sm:h-7 lg:h-8"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-ok-text-secondary hover:text-ok-text transition-colors text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-primary text-sm"
              >
                Agenda una llamada
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -mr-2 text-ok-text hover:text-ok-orange transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[99] bg-ok-dark transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex min-h-screen flex-col px-4 pb-8 pt-4">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <img
              src="/images/oki_icon.png"
              alt="Okigogo MCN"
              className="h-8 w-auto"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-full p-2 text-ok-text hover:text-ok-orange transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center py-10">
            <div className="mb-4 text-xs uppercase tracking-[0.16em] text-ok-text-secondary">
              Navegación
            </div>
            <nav className="flex flex-col gap-3 w-full">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="panel w-full px-5 py-4 text-left text-xl font-display font-semibold text-ok-text hover:border-ok-orange/40 hover:text-ok-orange transition-colors"
              >
                {link.label}
              </button>
            ))}
            </nav>

            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary text-base mt-6 w-full"
            >
              Agenda una llamada
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-ok-text-secondary">
            <p>contacto@okigogo.com</p>
            <p className="mt-1">CDMX, México</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;

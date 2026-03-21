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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Servicios', id: 'services' },
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
              className="flex items-center gap-1 group"
            >
              <span className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-ok-text tracking-tight">
                Okigog<span className="text-ok-orange">o</span>
              </span>
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
        {/* Close button at top */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-ok-text hover:text-ok-orange transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center px-6 -mt-16">
          {/* Logo in menu */}
          <div className="mb-10">
            <span className="font-display font-bold text-2xl text-ok-text">
              Okigog<span className="text-ok-orange">o</span>
            </span>
          </div>
          
          <nav className="flex flex-col items-center gap-6 w-full">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xl font-display font-semibold text-ok-text hover:text-ok-orange transition-colors py-2 w-full text-center"
              >
                {link.label}
              </button>
            ))}
          </nav>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-primary text-base mt-10 w-full max-w-xs"
          >
            Agenda una llamada
          </button>
          
          {/* Contact info */}
          <div className="mt-10 text-center">
            <p className="text-sm text-ok-text-secondary">hola@okigogo.com</p>
            <p className="text-sm text-ok-text-secondary mt-1">CDMX, México</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;

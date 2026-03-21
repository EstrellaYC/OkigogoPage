import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    servicios: [
      { label: 'Estrategia', href: '#services' },
      { label: 'Livestream', href: '#livestream' },
      { label: 'Creators', href: '#services' },
      { label: 'Operación', href: '#services' },
    ],
    company: [
      { label: 'Casos', href: '#cases' },
      { label: 'Nosotros', href: '#why-tiktok' },
      { label: 'Carreras', href: '#careers' },
      { label: 'Contacto', href: '#contact' },
    ],
    legal: [
      { label: 'Términos', href: '#' },
      { label: 'Privacidad', href: '#' },
    ],
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-ok-dark border-t border-white/5">
      <div className="w-full px-4 sm:px-6 lg:px-[8vw] py-10 sm:py-16 lg:py-20">
        {/* Mobile: Stacked layout */}
        <div className="lg:hidden">
          {/* Brand */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-1 mb-3">
              <span className="font-display font-bold text-xl text-ok-text tracking-tight">
                Okigog<span className="text-ok-orange">o</span>
              </span>
            </div>
            <p className="text-xs text-ok-text-secondary leading-relaxed max-w-xs mx-auto">
              Tu socio estratégico para crecer en TikTok Shop México.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <h4 className="font-display font-bold text-ok-text text-xs mb-2">Servicios</h4>
              <ul className="space-y-1.5">
                {footerLinks.servicios.map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-[10px] text-ok-text-secondary hover:text-ok-text transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-ok-text text-xs mb-2">Compañía</h4>
              <ul className="space-y-1.5">
                {footerLinks.company.map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-[10px] text-ok-text-secondary hover:text-ok-text transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-ok-text text-xs mb-2">Legal</h4>
              <ul className="space-y-1.5">
                {footerLinks.legal.map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-[10px] text-ok-text-secondary hover:text-ok-text transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="flex items-center gap-2 text-xs text-ok-text-secondary">
              <Mail size={12} className="text-ok-orange" />
              <a href="mailto:hola@okigogo.com" className="hover:text-ok-text transition-colors">
                hola@okigogo.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-ok-text-secondary">
              <Phone size={12} className="text-ok-orange" />
              <a href="https://wa.me/5215555555555" target="_blank" rel="noopener noreferrer" className="hover:text-ok-text transition-colors">
                +52 1 55 5555 5555
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-ok-text-secondary">
              <MapPin size={12} className="text-ok-orange" />
              <span>CDMX, México</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-white rounded-lg p-1.5 mb-2">
              <div className="w-full h-full bg-ok-dark rounded flex items-center justify-center">
                <svg className="w-10 h-10 text-ok-text" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="10" y="10" width="25" height="25" />
                  <rect x="65" y="10" width="25" height="25" />
                  <rect x="10" y="65" width="25" height="25" />
                  <rect x="15" y="15" width="15" height="15" fill="#0B0C10" />
                  <rect x="70" y="15" width="15" height="15" fill="#0B0C10" />
                  <rect x="15" y="70" width="15" height="15" fill="#0B0C10" />
                  <rect x="40" y="40" width="20" height="20" />
                  <rect x="45" y="45" width="10" height="10" fill="#0B0C10" />
                  <rect x="65" y="65" width="25" height="25" />
                  <rect x="70" y="70" width="15" height="15" fill="#0B0C10" />
                </svg>
              </div>
            </div>
            <p className="text-[10px] text-ok-text-secondary">WhatsApp</p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <span className="font-display font-bold text-2xl text-ok-text tracking-tight">
                Okigog<span className="text-ok-orange">o</span>
              </span>
            </div>
            <p className="text-sm text-ok-text-secondary leading-relaxed mb-6 max-w-sm">
              Tu socio estratégico para crecer en TikTok Shop México. Equipo local, estrategia comprobada, resultados medibles.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-ok-text-secondary">
                <MapPin size={16} className="text-ok-orange flex-shrink-0" />
                <span>Ciudad de México, México</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-ok-text-secondary">
                <Mail size={16} className="text-ok-orange flex-shrink-0" />
                <a href="mailto:hola@okigogo.com" className="hover:text-ok-text transition-colors">
                  hola@okigogo.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-ok-text-secondary">
                <Phone size={16} className="text-ok-orange flex-shrink-0" />
                <a href="https://wa.me/5215555555555" target="_blank" rel="noopener noreferrer" className="hover:text-ok-text transition-colors">
                  +52 1 55 5555 5555
                </a>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-bold text-ok-text mb-4">Servicios</h4>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-ok-text-secondary hover:text-ok-text transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-bold text-ok-text mb-4">Compañía</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-ok-text-secondary hover:text-ok-text transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* QR Code */}
          <div>
            <h4 className="font-display font-bold text-ok-text mb-4">Conecta</h4>
            <div className="w-24 h-24 bg-white rounded-lg p-2 mb-4">
              <div className="w-full h-full bg-ok-dark rounded flex items-center justify-center">
                <svg className="w-16 h-16 text-ok-text" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="10" y="10" width="25" height="25" />
                  <rect x="65" y="10" width="25" height="25" />
                  <rect x="10" y="65" width="25" height="25" />
                  <rect x="15" y="15" width="15" height="15" fill="#0B0C10" />
                  <rect x="70" y="15" width="15" height="15" fill="#0B0C10" />
                  <rect x="15" y="70" width="15" height="15" fill="#0B0C10" />
                  <rect x="40" y="40" width="20" height="20" />
                  <rect x="45" y="45" width="10" height="10" fill="#0B0C10" />
                  <rect x="65" y="65" width="25" height="25" />
                  <rect x="70" y="70" width="15" height="15" fill="#0B0C10" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-ok-text-secondary">Escanea para WhatsApp</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-ok-text-secondary">
            © {currentYear} Okigogo MCN. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {footerLinks.legal.map((link, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(link.href)}
                className="text-[10px] sm:text-xs text-ok-text-secondary hover:text-ok-text transition-colors flex items-center gap-1"
              >
                {link.label}
                <ExternalLink size={10} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      href: 'https://www.tiktok.com/@okigogo88',
      ariaLabel: 'TikTok Okigogo',
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    },
    {
      href: 'https://www.instagram.com/okigogomcn/',
      ariaLabel: 'Instagram Okigogo MCN',
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      href: 'https://www.facebook.com/share/18cQvabXJa/?mibextid=wwXIfr',
      ariaLabel: 'Facebook Okigogo',
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v3h2.5v8h3z" />
        </svg>
      ),
    },
  ];

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
            <div className="mb-3 flex items-center justify-center">
              <img
                src="/images/oki_icon.png"
                alt="Okigogo MCN"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-xs text-ok-text-secondary leading-relaxed max-w-xs mx-auto">
              Tu socio estratégico para crecer en TikTok Shop México.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-display font-bold text-ok-text text-sm mb-3">Servicios</h4>
              <ul className="space-y-2">
                {footerLinks.servicios.map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-xs text-left text-ok-text-secondary hover:text-ok-text transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-ok-text text-sm mb-3">Compañía</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-xs text-left text-ok-text-secondary hover:text-ok-text transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ok-panel border border-white/10 flex items-center justify-center text-ok-text-secondary hover:border-ok-orange/50 hover:text-ok-orange transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Conecta */}
          <div className="flex flex-col items-center gap-3 mb-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
            <h4 className="font-display font-bold text-ok-text text-sm">Conecta</h4>
            <div className="flex items-center gap-2 text-sm text-ok-text-secondary">
              <Mail size={12} className="text-ok-orange" />
              <a href="mailto:rh@okigogomcn.com" className="hover:text-ok-text transition-colors">
                rh@okigogomcn.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-ok-text-secondary">
              <Phone size={12} className="text-ok-orange" />
              <a href="https://wa.me/525574689228" target="_blank" rel="noopener noreferrer" className="hover:text-ok-text transition-colors">
                +52 55 7468 9228
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-ok-text-secondary">
              <MapPin size={12} className="text-ok-orange" />
              <a href="https://maps.app.goo.gl/FSwsS1YrJGPPFwW99" target="_blank" rel="noopener noreferrer" className="hover:text-ok-text transition-colors">
                CDMX, México
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center">
              <img
                src="/images/oki_icon.png"
                alt="Okigogo MCN"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-ok-text-secondary leading-relaxed mb-6 max-w-sm">
              Tu socio estratégico para crecer en TikTok Shop México. Equipo local, estrategia comprobada, resultados medibles.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="w-10 h-10 rounded-lg bg-ok-panel border border-white/10 flex items-center justify-center text-ok-text-secondary hover:border-ok-orange/50 hover:text-ok-orange transition-colors"
                >
                  {link.icon}
                </a>
              ))}
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

          {/* Conecta */}
          <div>
            <h4 className="font-display font-bold text-ok-text mb-4">Conecta</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-ok-text-secondary">
                <Mail size={16} className="text-ok-orange flex-shrink-0" />
                <a href="mailto:rh@okigogomcn.com" className="hover:text-ok-text transition-colors">
                  rh@okigogomcn.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-ok-text-secondary">
                <Phone size={16} className="text-ok-orange flex-shrink-0" />
                <a href="https://wa.me/525574689228" target="_blank" rel="noopener noreferrer" className="hover:text-ok-text transition-colors">
                  +52 55 7468 9228
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-ok-text-secondary">
                <MapPin size={16} className="text-ok-orange flex-shrink-0" />
                <a href="https://maps.app.goo.gl/FSwsS1YrJGPPFwW99" target="_blank" rel="noopener noreferrer" className="hover:text-ok-text transition-colors">
                  Ciudad de México, México
                </a>
              </div>
            </div>
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

import { useEffect } from 'react';
import Navigation from '../sections/Navigation';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-ok-dark min-h-screen">
      <div className="grain-overlay" />
      <Navigation />
      <main>
        <ContactSection className="pt-20 lg:pt-24" />
        <Footer />
      </main>
    </div>
  );
};

export default ContactPage;

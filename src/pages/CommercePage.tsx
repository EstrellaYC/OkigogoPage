import { useEffect } from 'react';
import Navigation from '../sections/Navigation';
import WhySection from '../sections/WhySection';
import Footer from '../sections/Footer';

const CommercePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-ok-dark min-h-screen">
      <div className="grain-overlay" />
      <Navigation />
      <main>
        <WhySection className="pt-20 lg:pt-24" />
        <Footer />
      </main>
    </div>
  );
};

export default CommercePage;

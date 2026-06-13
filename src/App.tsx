import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TriangleAlert } from 'lucide-react';
import './App.css';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

// Import sections
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import WhySection from './sections/WhySection';
import ShowcaseSection from './sections/ShowcaseSection';
import Footer from './sections/Footer';
import CareerPage from './pages/CareerPage';
import ContactPage from './pages/ContactPage';
import CommercePage from './pages/CommercePage';
import EntertainmentPage from './pages/EntertainmentPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let snapTrigger: ScrollTrigger | null = null;
    let scrollDirection: 1 | -1 = 1;

    // Walk up the offsetParent chain to get the true document-level top position.
    const getDocumentTop = (el: HTMLElement): number => {
      let top = 0;
      let curr: HTMLElement | null = el;
      while (curr) {
        top += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      return top;
    };

    // Return the scroll position at which this section should be snapped to.
    // GSAP wraps pinned sections in a "pin-spacer" div and sets the section itself
    // to position:fixed while pinned, making offsetParent null and offsetTop
    // viewport-relative. Reading the spacer's position instead gives the correct
    // document top for both pinned and normal sections.
    const getSectionScrollTop = (el: HTMLElement): number => {
      const parent = el.parentElement;
      if (parent && parent.classList.contains('pin-spacer')) {
        return getDocumentTop(parent);
      }
      return getDocumentTop(el);
    };

    const buildSnapTrigger = () => {
      if (!mainRef.current) return;

      if (window.matchMedia('(max-width: 767px)').matches) {
        snapTrigger?.kill();
        snapTrigger = null;
        return;
      }

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll) return;

      // For pinned sections, use ScrollTrigger's pre-computed pixel values.
      // Sections whose start > 0 have scroll-driven entrance animations, so we
      // snap to 45% of the way through the pin range — well inside the settled
      // "content fully visible" zone (entrance ends ~42%, exit starts ~58%).
      // The first section (start === 0) is already settled at scroll 0, so we
      // keep it at 0.
      const pinnedStartByEl = new Map<Element, number>();
      ScrollTrigger.getAll()
        .filter(st => st.vars.pin && st.trigger)
        .forEach(st => {
          const snapPx = st.start === 0
            ? 0
            : st.start + (st.end - st.start) * 0.45;
          pinnedStartByEl.set(st.trigger as Element, snapPx);
        });

      // After GSAP pins a section it wraps it in a `div.pin-spacer`, so the
      // section is no longer a direct child of <main>. Use :scope to match
      // both the normal case (`main > section`) and the pinned case
      // (`main > .pin-spacer > section`).
      const mainEl = mainRef.current.querySelector('main');
      if (!mainEl) return;
      const contentBlocks = Array.from(
        mainEl.querySelectorAll<HTMLElement>(
          ':scope > section, :scope > .pin-spacer > section, :scope > footer'
        )
      );

      if (contentBlocks.length === 0) return;

      const points = Array.from(new Set([
        0,
        ...contentBlocks
          .map(block => {
            if (pinnedStartByEl.has(block)) {
              return pinnedStartByEl.get(block)! / maxScroll;
            }
            return getSectionScrollTop(block) / maxScroll;
          })
          .filter(value => Number.isFinite(value))
          .map(value => Math.max(0, Math.min(1, value))),
        1,
      ])).sort((a, b) => a - b);

      if (points.length < 2) return;

      snapTrigger?.kill();
      snapTrigger = ScrollTrigger.create({
        onUpdate: (self) => {
          scrollDirection = self.direction >= 0 ? 1 : -1;
        },
        snap: {
          directional: true,
          // Snap to actual content block positions and honor scroll direction.
          snapTo: (value: number) => {
            const epsilon = 0.001;

            if (scrollDirection > 0) {
              const nextPoint = points.find(point => point > value + epsilon);
              if (typeof nextPoint === 'number') return nextPoint;
              return points[points.length - 1];
            }

            const reversePoints = [...points].reverse();
            const prevPoint = reversePoints.find(point => point < value - epsilon);
            if (typeof prevPoint === 'number') return prevPoint;
            return points[0];
          },
          duration: { min: 0.12, max: 0.3 },
          delay: 0.04,
          ease: 'power1.out',
        }
      });
    };

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      buildSnapTrigger();
    }, 500);

    const onRefresh = () => {
      buildSnapTrigger();
    };

    ScrollTrigger.addEventListener('refresh', onRefresh);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      snapTrigger?.kill();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div ref={mainRef} className="relative bg-ok-dark min-h-screen">
            {/* Grain overlay */}
            <div className="grain-overlay" />
            
            {/* Navigation */}
            <Navigation />
            
            {/* Main content */}
            <main className="relative">
              <div className="relative z-40 px-4 pt-20 sm:px-6 lg:px-12 lg:pt-24">
                <div className="mx-auto max-w-6xl">
                  <Alert className="border-2 border-orange-400 bg-red-950/90 text-red-50 shadow-[0_0_0_1px_rgba(251,146,60,0.45),0_18px_48px_rgba(239,68,68,0.35)]">
                    <TriangleAlert className="mt-0.5 size-5 text-orange-300" aria-hidden="true" />
                    <AlertTitle className="text-base font-bold tracking-wide text-orange-200 sm:text-lg">
                      ALERTA DE SEGURIDAD
                    </AlertTitle>
                    <AlertDescription className="text-sm leading-relaxed text-red-100 sm:text-base">
                      Hemos detectado personas que se hacen pasar por nuestra empresa para ofrecer empleos falsos y pedir dinero.{' '}
                      <span className="font-semibold uppercase tracking-wide text-orange-100">Nunca solicitamos pagos, depósitos ni inversiones para contratar.</span>{' '}
                      Si recibes un mensaje sospechoso, no pagues y repórtalo.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              {/* Section 1: Hero - pin: true */}
              <HeroSection className="z-10" />
              
              {/* Section 2: Why + Metrics (merged) - pin: true */}
              <WhySection className="z-20" />
              
              {/* Section 3: Cases + Livestream + Services (merged) - pin: false (flowing) */}
              <ShowcaseSection className="z-30" />
              
              {/* Footer */}
              <Footer />
            </main>
          </div>
        } />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/commerce" element={<CommercePage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseSectionProps {
  className?: string;
}

const row1 = [
  "/images/case-card-1.jpg",
  "/images/split-creator.jpg",
  "/images/stage-host.jpg",
  "/images/hook-star.jpg",
  "/images/case-card-2.jpg",
  "/images/hook-global.jpg",
  "/images/case-card-3.jpg",
];

const row2 = [
  "/images/studio-setup.jpg",
  "/images/team-culture.jpg",
  "/images/hook-growth.jpg",
  "/images/team-office.jpg",
  "/images/hook-money.jpg",
  "/images/metrics-preview-host.jpg",
  "/images/hero-panel-video.jpg",
];

const PhotoStrip = ({ images, direction }: { images: string[]; direction: "left" | "right" }) => {
  const doubled = [...images, ...images];
  return (
    <div className="relative w-full overflow-hidden">
      <div className={direction === "left" ? "marquee-track-left" : "marquee-track-right"}>
        {doubled.map((src, i) => (
          <div
            key={i}
            className="marquee-item relative h-48 w-72 flex-none overflow-hidden rounded-xl sm:h-56 sm:w-80 lg:h-64 lg:w-96"
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ok-dark/40 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
};

const ShowcaseSection = ({ className = "" }: ShowcaseSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className={"relative w-full overflow-hidden bg-ok-dark py-20 lg:py-28 " + className}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ok-orange/5 blur-[120px]" />

      <div ref={headingRef} className="relative z-10 mx-auto mb-14 max-w-4xl px-4 text-center opacity-0 sm:px-6 lg:mb-16 lg:px-8">
        <h2 className="font-display text-2xl font-black leading-tight text-ok-text sm:text-3xl lg:text-4xl">
          Personas{" "}
          <span className="text-gradient">creativas</span>
          <br />
          impulsando ideas
          <br />
          que conectan.
        </h2>
      </div>

      <div id="cases" className="relative z-10 flex flex-col gap-4 sm:gap-5">
        <PhotoStrip images={row1} direction="left" />
        <PhotoStrip images={row2} direction="right" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-ok-dark to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-ok-dark to-transparent" />
    </section>
  );
};

export default ShowcaseSection;
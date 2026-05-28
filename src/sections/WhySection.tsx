import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mic2, ShoppingBag, Zap, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface WhySectionProps {
  className?: string;
}

const cards = [
  {
    Icon: Mic2,
    accentClass: "text-ok-orange",
    bgClass: "bg-ok-orange/10",
    glowClass: "from-ok-orange/20",
    title: "Tengo Audiencia",
    hook: "Quiero crecer",
    bullets: ["Monetizar mi influencia", "Crear algo más grande"],
  },
  {
    Icon: ShoppingBag,
    accentClass: "text-ok-cyan",
    bgClass: "bg-ok-cyan/10",
    glowClass: "from-ok-cyan/20",
    title: "Tengo Marca",
    hook: "Quiero vender más",
    bullets: ["Conectar con personas", "Crecer digitalmente"],
  },
  {
    Icon: Zap,
    accentClass: "text-ok-orange",
    bgClass: "bg-ok-orange/10",
    glowClass: "from-ok-orange/20",
    title: "Tengo Ambición",
    hook: "Quiero Aprender",
    bullets: ["Entrar a la industria", "Crecer con un equipo creativo"],
  },
];

const WhySection = ({ className = "" }: WhySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      const cardEls = cardsRef.current?.querySelectorAll(".why-card");
      if (cardEls) {
        gsap.fromTo(
          cardEls,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-tiktok"
      className={`relative w-full overflow-hidden bg-ok-dark py-24 lg:py-32 ${className}`}
    >
      <div className="pointer-events-none absolute left-[10%] top-[20%] h-[40vw] w-[40vw] max-w-[600px] rounded-full bg-ok-orange/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[5%] h-[35vw] w-[35vw] max-w-[500px] rounded-full bg-ok-cyan/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="mb-14 text-center opacity-0">
          <h2 className="font-display text-4xl font-black leading-tight text-ok-text sm:text-5xl lg:text-6xl">
            ¿Qué quieres{" "}
            <span className="text-gradient">lograr?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-ok-text-secondary sm:text-lg">
            Elige tu objetivo y descubre cómo podemos ayudarte.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map(({ Icon, accentClass, bgClass, glowClass, title, hook, bullets }) => (
            <div
              key={title}
              className="why-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.07] sm:p-7 opacity-0"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${glowClass} via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className={`relative z-10 mb-5 inline-flex items-center justify-center rounded-xl ${bgClass} p-3`}>
                <Icon size={22} className={accentClass} />
              </div>
              <h3 className="relative z-10 mb-1.5 font-display text-xl font-bold text-ok-text sm:text-2xl">
                {title}
              </h3>
              <p className={`relative z-10 mb-4 text-sm font-semibold ${accentClass}`}>
                {hook}
              </p>
              <div className="relative z-10 mb-4 h-px bg-white/10" />
              <ul className="relative z-10 space-y-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-ok-text-secondary">
                    <Check size={14} className={`flex-shrink-0 ${accentClass}`} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
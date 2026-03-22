import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, ShoppingBag, TrendingUp, TrendingUp as TrendingIcon, Target, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WhySectionProps {
	className?: string;
}

const WhySection = ({ className = '' }: WhySectionProps) => {
	const sectionRef = useRef<HTMLElement>(null);
	const mobileTextRef = useRef<HTMLDivElement>(null);
	const mobileImageRef = useRef<HTMLDivElement>(null);
	const mobileMetricsRef = useRef<HTMLDivElement>(null);
	const desktopTextRef = useRef<HTMLDivElement>(null);
	const desktopImageRef = useRef<HTMLDivElement>(null);
	const desktopMetricsRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			mm.add('(min-width: 768px)', () => {
				const scrollTl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top top',
						end: '+=120%',
						pin: true,
						scrub: 0.6,
					}
				});

				scrollTl.fromTo(
					desktopTextRef.current,
					{ x: '-50vw', opacity: 0 },
					{ x: 0, opacity: 1, ease: 'none' },
					0
				);

				scrollTl.fromTo(
					desktopImageRef.current,
					{ x: '50vw', opacity: 0 },
					{ x: 0, opacity: 1, ease: 'none' },
					0
				);

				scrollTl.fromTo(
					desktopMetricsRef.current,
					{ y: '30vh', opacity: 0 },
					{ y: 0, opacity: 1, ease: 'none' },
					0.15
				);

				scrollTl.fromTo(
					[desktopTextRef.current, desktopImageRef.current],
					{ opacity: 1 },
					{ opacity: 0, ease: 'power2.in' },
					0.7
				);

				scrollTl.fromTo(
					desktopMetricsRef.current,
					{ y: 0, opacity: 1 },
					{ y: '20vh', opacity: 0, ease: 'power2.in' },
					0.7
				);
			});

			mm.add('(max-width: 767px)', () => {
				gsap.set([mobileTextRef.current, mobileImageRef.current, mobileMetricsRef.current], {
					opacity: 1,
					y: 0,
				});
			});

			return () => mm.revert();
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const bullets = [
		{ icon: Users, text: 'Audiencia de compra activa' },
		{ icon: ShoppingBag, text: 'Descubrimiento + conversión' },
		{ icon: TrendingUp, text: 'Escalable con livestreams' },
	];

	return (
		<section
			ref={sectionRef}
			id="why-tiktok"
			className={`section-pinned scroll-mt-20 md:scroll-mt-24 bg-ok-dark ${className}`}
		>
			<div className="px-4 pb-10 pt-20 md:hidden">
				<div ref={mobileTextRef} className="mb-5">
					<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-ok-text-secondary">
						<span className="h-1.5 w-1.5 rounded-full bg-ok-orange" />
						Ventaja de entrada temprana
					</div>
					<h2 className="mb-3 font-display text-[2rem] font-black leading-[1.02] text-ok-text">
						El momento es <span className="text-gradient">ahora</span>
					</h2>
					<p className="text-sm leading-relaxed text-ok-text-secondary">
						TikTok Shop está creciendo en México. Las marcas que entran temprano construyen audiencia, posicionamiento y ventas antes que su competencia.
					</p>
				</div>

				<div ref={mobileImageRef} className="panel mb-4 overflow-hidden">
					<div className="relative aspect-[4/5] w-full">
						<img
							src="/images/split-creator.jpg"
							alt="Creator in Mexico"
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-ok-dark via-ok-dark/30 to-transparent" />
						<div className="absolute inset-x-0 bottom-0 p-4">
							<div className="text-sm font-semibold text-ok-text">Mercado en expansión</div>
							<div className="mt-1 text-xs leading-relaxed text-ok-text-secondary">
								Contenido, afiliación y livestream en un solo ecosistema de compra.
							</div>
						</div>
					</div>
				</div>

				<div className="panel mb-4 p-4">
					<div className="mb-4 space-y-2.5">
						{bullets.map((bullet, i) => (
							<div key={i} className="flex items-center gap-2.5">
								<div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-ok-orange/10">
									<bullet.icon size={13} className="text-ok-orange" />
								</div>
								<span className="text-sm text-ok-text">{bullet.text}</span>
							</div>
						))}
					</div>
				</div>

				<div ref={mobileMetricsRef} className="grid grid-cols-3 gap-3">
					<div className="panel p-3 text-center">
						<TrendingIcon size={14} className="mx-auto mb-2 text-ok-cyan" />
						<div className="font-mono text-lg font-bold text-ok-text">+120%</div>
						<div className="text-[10px] text-ok-text-secondary">GMV</div>
					</div>
					<div className="panel p-3 text-center">
						<Target size={14} className="mx-auto mb-2 text-ok-orange" />
						<div className="font-mono text-lg font-bold text-ok-text">4.8%</div>
						<div className="text-[10px] text-ok-text-secondary">Conversión</div>
					</div>
					<div className="panel p-3 text-center">
						<Users size={14} className="mx-auto mb-2 text-ok-cyan" />
						<div className="font-mono text-lg font-bold text-ok-text">50+</div>
						<div className="text-[10px] text-ok-text-secondary">Marcas</div>
					</div>
				</div>
			</div>

			<div className="hidden md:block">
				<div className="absolute inset-0 flex items-center px-6 lg:px-[8vw]">
					<div ref={desktopTextRef} className="w-[42vw] pr-6 lg:w-[38vw] lg:pr-8">
						<h2 className="mb-4 font-display text-3xl font-black leading-tight text-ok-text lg:text-4xl xl:text-5xl">
							El momento es <span className="text-gradient">ahora</span>
						</h2>
						<p className="mb-6 text-sm leading-relaxed text-ok-text-secondary lg:text-base">
							TikTok Shop está creciendo en México. Las marcas que entran temprano construyen audiencia, posicionamiento y ventas recurrentes antes que la competencia.
						</p>
						<div className="mb-6 space-y-3">
							{bullets.map((bullet, i) => (
								<div key={i} className="flex items-center gap-3">
									<div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-ok-orange/10 lg:h-8 lg:w-8">
										<bullet.icon size={14} className="text-ok-orange lg:hidden" />
										<bullet.icon size={16} className="hidden text-ok-orange lg:block" />
									</div>
									<span className="text-sm font-medium text-ok-text lg:text-base">{bullet.text}</span>
								</div>
							))}
						</div>
						<button
							onClick={() => scrollToSection('showcase')}
							className="group inline-flex items-center gap-2 text-sm font-medium text-ok-orange transition-colors hover:text-ok-orange-dark lg:text-base"
						>
							Ver casos de éxito
							<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
						</button>
					</div>

					<div ref={desktopImageRef} className="mx-3 h-[46vh] w-[24vw] overflow-hidden rounded-2xl border border-white/[0.08] bg-ok-panel shadow-panel lg:mx-4 lg:h-[55vh] lg:w-[26vw]">
						<img
							src="/images/split-creator.jpg"
							alt="Creator in Mexico"
							className="h-full w-full object-cover"
						/>
					</div>

					<div ref={desktopMetricsRef} className="w-[26vw] lg:w-[22vw]">
						<div className="panel p-4 lg:p-6">
							<p className="mb-5 text-xs text-ok-text-secondary lg:mb-6 lg:text-sm">Datos que convierten</p>
							<div className="space-y-5">
								<div>
									<div className="mb-1 flex items-center gap-2">
										<TrendingIcon size={16} className="text-ok-cyan lg:hidden" />
										<TrendingIcon size={18} className="hidden text-ok-cyan lg:block" />
										<span className="text-xs text-ok-text-secondary lg:text-sm">GMV generado</span>
									</div>
									<div className="font-mono text-2xl font-bold text-ok-text lg:text-3xl">+120%</div>
									<div className="text-xs text-ok-text-secondary">Promedio trimestral</div>
								</div>
								<div className="h-px bg-white/10" />
								<div>
									<div className="mb-1 flex items-center gap-2">
										<Target size={16} className="text-ok-orange lg:hidden" />
										<Target size={18} className="hidden text-ok-orange lg:block" />
										<span className="text-xs text-ok-text-secondary lg:text-sm">Conversión</span>
									</div>
									<div className="font-mono text-2xl font-bold text-ok-text lg:text-3xl">4.8%</div>
									<div className="text-xs text-ok-text-secondary">En campañas con livestream</div>
								</div>
								<div className="h-px bg-white/10" />
								<div>
									<div className="mb-1 flex items-center gap-2">
										<Users size={16} className="text-ok-cyan lg:hidden" />
										<Users size={18} className="hidden text-ok-cyan lg:block" />
										<span className="text-xs text-ok-text-secondary lg:text-sm">Marcas activas</span>
									</div>
									<div className="font-mono text-2xl font-bold text-ok-text lg:text-3xl">50+</div>
									<div className="text-xs text-ok-text-secondary">En México</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhySection;
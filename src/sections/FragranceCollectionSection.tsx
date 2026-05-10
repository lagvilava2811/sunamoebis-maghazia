import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fragrances } from '@/data/fragrances';
import LivingWaveCanvas from '@/components/LivingWaveCanvas';
import { useMousePosition } from '@/hooks/useMousePosition';

gsap.registerPlugin(ScrollTrigger);

export default function FragranceCollectionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    // Only do horizontal scroll on desktop
    const isDesktop = window.innerWidth > 768;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(headerRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      if (isDesktop) {
        // Horizontal scroll
        gsap.to(container, {
          x: '-75%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.8,
            end: '+=3000',
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative bg-obsidian"
    >
      {/* Section header */}
      <div ref={headerRef} className="pt-[120px] pb-16 text-center max-w-[1400px] mx-auto px-6">
        <p className="text-overline text-gold">THE COLLECTION</p>
        <h2 className="font-display text-4xl md:text-[56px] font-medium text-alabaster leading-[1.08] tracking-[-0.015em] mt-4">
          Four Scents, Four Worlds
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="flex gap-[4vw] px-[7.5vw] pb-[120px] md:flex-row flex-col md:gap-[4vw] gap-8"
      >
        {fragrances.map((fragrance) => (
          <div
            key={fragrance.id}
            className="relative flex-shrink-0 w-[90vw] md:w-[85vw] md:h-[80vh] h-auto rounded-2xl overflow-hidden"
          >
            {/* Living wave canvas */}
            <div className="absolute inset-0 z-0 opacity-20">
              <LivingWaveCanvas
                layers={fragrance.waveLayers}
                gradientTop={fragrance.gradientTop}
                gradientBottom={fragrance.gradientBottom}
                mouseRef={mousePos}
              />
            </div>

            {/* Image — larger, no padding, blends with dark background */}
            <div className="relative z-10 h-[75%] overflow-hidden flex items-center justify-center">
              <img
                src={fragrance.image}
                alt={fragrance.name}
                className="w-full h-full object-contain scale-[1.15]"
                style={{ filter: 'saturate(0.5)' }}
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-[25%] px-6 md:px-10 flex flex-col justify-center">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-medium text-alabaster">
                    {fragrance.name}
                  </h3>
                  <p className="text-overline text-gold mt-1">{fragrance.scentFamily}</p>
                </div>
                <p className="font-display text-xl font-normal text-[rgba(245,240,235,0.4)] italic hidden md:block">
                  {fragrance.moodWord}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data/fragrances';
import ProductCard from '@/components/ProductCard';

gsap.registerPlugin(ScrollTrigger);

export default function CollectionGridSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const perfumesGridRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bodyHeaderRef = useRef<HTMLDivElement>(null);
  const bodyGridRef = useRef<HTMLDivElement>(null);

  const perfumes = products.filter((p) => p.category === 'perfume');
  const bodyRituals = products.filter((p) => p.category === 'body-ritual');

  useEffect(() => {
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

      // Editorial divider entrance
      gsap.from(dividerRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Body rituals header
      gsap.from(bodyHeaderRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bodyHeaderRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="bg-warm-white pt-[120px]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <p className="text-overline text-charcoal">SHOP THE COLLECTION</p>
          <h2 className="font-display text-4xl md:text-[56px] font-medium text-charcoal leading-[1.08] tracking-[-0.015em] mt-4">
            Perfume & Ritual
          </h2>
        </div>

        {/* Perfumes Category Label */}
        <div className="mb-8">
          <p className="text-overline text-charcoal/50">EAU DE PARFUM</p>
          <div className="w-full h-px bg-charcoal/10 mt-4" />
        </div>

        {/* Perfumes grid */}
        <div ref={perfumesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {perfumes.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>

      {/* Editorial Divider */}
      <div ref={dividerRef} className="relative w-full aspect-video mt-24 mb-24 overflow-hidden group">
        <img
          src="/assets/editorial-divider.jpg"
          alt="The Body as Temple"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ filter: 'saturate(0.5)' }}
          loading="lazy"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-[rgba(8,8,8,0.55)]" />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h3
            className="font-display text-2xl md:text-4xl font-medium text-alabaster"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
          >
            The Body as Temple
          </h3>
          <p
            className="text-base font-light text-alabaster/70 mt-3 max-w-md"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
          >
            Ritual care for the skin that carries your scent
          </p>
          <div className="w-16 h-px bg-[rgba(245,240,235,0.35)] mt-5" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-[120px]">
        {/* Body Rituals Category Label */}
        <div ref={bodyHeaderRef} className="mb-8">
          <p className="text-overline text-charcoal/50">BODY RITUAL</p>
          <div className="w-full h-px bg-charcoal/10 mt-4" />
        </div>

        {/* Body Rituals grid */}
        <div ref={bodyGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {bodyRituals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}

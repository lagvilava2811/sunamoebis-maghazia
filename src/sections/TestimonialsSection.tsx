import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/data/fragrances';
import LiquidGlassCard from '@/components/LiquidGlassCard';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-obsidian py-[120px] overflow-hidden"
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url(/assets/hero-fallback.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'saturate(0.45)',
        }}
      />
      <div className="absolute inset-0 z-[1] bg-obsidian/80" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-overline text-gold">FROM THE JOURNAL</p>
          <h2 className="font-display text-4xl md:text-[56px] font-medium text-alabaster leading-[1.08] tracking-[-0.015em] mt-4">
            What They Whisper
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <LiquidGlassCard
              key={testimonial.id}
              className="p-10 md:p-12"
            >
              {/* Stars */}
              <div className="flex gap-1 text-gold text-base">
                {'*****'.split('').map((_, i) => (
                  <span key={i}>*</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-base font-light text-alabaster/80 italic leading-relaxed mt-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <p className="text-body-small text-alabaster/50 mt-8">
                {testimonial.author}
              </p>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

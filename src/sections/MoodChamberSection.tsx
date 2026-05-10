import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fragrances } from '@/data/fragrances';
import LivingWaveCanvas from '@/components/LivingWaveCanvas';
import { useMousePosition } from '@/hooks/useMousePosition';

gsap.registerPlugin(ScrollTrigger);

export default function MoodChamberSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const moodLabelRef = useRef<HTMLParagraphElement>(null);
  const moodWordRef = useRef<HTMLHeadingElement>(null);
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const mousePos = useMousePosition();


  const activeFragrance = activeIndex >= 0 ? fragrances[activeIndex] : null;

  const selectFragrance = useCallback((index: number) => {
    if (index === activeIndex) return;

    const fragrance = fragrances[index];
    setActiveIndex(index);

    // GSAP color transition
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        '--bg-color-1': fragrance.gradientTop,
        '--bg-color-2': fragrance.gradientBottom,
        duration: 3,
        ease: 'power2.inOut',
      });
    }

    // Crossfade mood label
    if (moodLabelRef.current) {
      gsap.to(moodLabelRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        onComplete: () => {
          if (moodLabelRef.current) {
            gsap.to(moodLabelRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.2,
            });
          }
        },
      });
    }

    // Crossfade mood word
    if (moodWordRef.current) {
      gsap.to(moodWordRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        onComplete: () => {
          if (moodWordRef.current) {
            gsap.to(moodWordRef.current, {
              opacity: 0.3,
              scale: 1,
              duration: 0.6,
              delay: 0.2,
            });
          }
        },
      });
    }

    if (overlineRef.current) {
      gsap.to(overlineRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (overlineRef.current) {
            gsap.to(overlineRef.current, {
              opacity: 0.5,
              duration: 0.5,
              delay: 0.3,
            });
          }
        },
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Ambient gradient drift
  useEffect(() => {
    let raf: number;
    const startTime = Date.now();

    const drift = () => {
      const t = (Date.now() - startTime) / 1000;
      const offsetX = Math.sin(t / 15 * Math.PI * 2) * 5;
      const offsetY = Math.cos(t / 15 * Math.PI * 2) * 5;

      if (bgRef.current) {
        bgRef.current.style.backgroundPosition = `${50 + offsetX}% ${50 + offsetY}%`;
      }
      raf = requestAnimationFrame(drift);
    };

    raf = requestAnimationFrame(drift);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Mouse influence on gradient
  useEffect(() => {
    let raf: number;
    const update = () => {
      if (bgRef.current) {
        const mx = (mousePos.current.x - 0.5) * 3;
        const my = (mousePos.current.y - 0.5) * 3;
        bgRef.current.style.setProperty('--mouse-x', `${mx}%`);
        bgRef.current.style.setProperty('--mouse-y', `${my}%`);
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [mousePos]);

  return (
    <section
      id="mood-chamber"
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Dynamic gradient background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at calc(50% + var(--mouse-x, 0%)) calc(50% + var(--mouse-y, 0%)), var(--bg-color-1, #080808) 0%, var(--bg-color-2, #1A1A1A) 100%)',
          transition: 'background 0.1s ease-out',
        }}
      />

      {/* Living wave canvas */}
      {activeFragrance && (
        <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none">
          <LivingWaveCanvas
            layers={activeFragrance.waveLayers}
            gradientTop={activeFragrance.gradientTop}
            gradientBottom={activeFragrance.gradientBottom}
            opacity={0.15}
            mouseRef={mousePos}
          />
        </div>
      )}

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Overline */}
        <p ref={overlineRef} className="text-overline text-alabaster/50 mb-6">
          {activeFragrance ? 'SELECTED FRAGRANCE' : 'SELECT A FRAGRANCE'}
        </p>

        {/* Mood label */}
        <p
          ref={moodLabelRef}
          className="font-display text-4xl md:text-5xl font-medium text-alabaster"
        >
          {activeFragrance ? activeFragrance.name : ''}
        </p>

        {/* Mood word */}
        <h2
          ref={moodWordRef}
          className="font-display text-5xl md:text-7xl font-normal text-alabaster/30 mt-12"
        >
          {activeFragrance ? activeFragrance.moodWord : ''}
        </h2>

        {/* Hotspots */}
        <div className="flex items-center gap-8 mt-24">
          {fragrances.map((fragrance, index) => (
            <button
              key={fragrance.id}
              onClick={() => selectFragrance(index)}
              className="flex flex-col items-center gap-3 group"
            >
              <div
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  activeIndex === index
                    ? 'border-gold scale-110'
                    : 'border-[rgba(245,240,235,0.2)] group-hover:border-[rgba(245,240,235,0.6)] group-hover:scale-110'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full transition-all duration-300 ${
                    activeIndex === index ? 'animate-pulse-glow' : ''
                  }`}
                  style={{ backgroundColor: fragrance.accentColor }}
                />
              </div>
              <span className="font-display text-sm font-medium text-alabaster">
                {fragrance.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

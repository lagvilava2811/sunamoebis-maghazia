import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  dark?: boolean;
}

export default function SectionDivider({ dark = true }: SectionDividerProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
      <div
        ref={lineRef}
        className="w-full h-px origin-left"
        style={{
          backgroundColor: dark ? 'rgba(245,240,235,0.06)' : 'rgba(42,37,32,0.08)',
        }}
      />
    </div>
  );
}

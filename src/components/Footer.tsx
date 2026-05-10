import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        transformOrigin: 'left',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(leftRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(rightRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const linkColumns = [
    {
      title: 'Shop',
      links: ['All', 'Perfume', 'Body Ritual', 'Gift Sets'],
    },
    {
      title: 'Learn',
      links: ['About Us', 'Philosophy', 'Stockist'],
    },
    {
      title: 'Support',
      links: ['Shipping', 'Returns', 'Contact'],
    },
    {
      title: 'Social',
      links: ['Instagram', 'Pinterest', 'Newsletter'],
    },
  ];

  return (
    <footer id="footer" ref={sectionRef} className="bg-obsidian">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div
          ref={lineRef}
          className="w-full h-px origin-left"
          style={{ backgroundColor: 'rgba(245,240,235,0.06)' }}
        />

        <div className="py-20 pb-12 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left - Newsletter */}
          <div ref={leftRef}>
            <h3 className="font-display text-4xl md:text-[56px] font-medium text-alabaster leading-[1.08] tracking-tight">
              Stay Close
            </h3>
            <p className="text-base font-light text-mist mt-4 max-w-[380px] leading-relaxed">
              New rituals, limited editions, and quiet dispatches from the atelier.
            </p>

            <div className="mt-10 max-w-[360px]">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-transparent border-b border-[rgba(245,240,235,0.2)] text-alabaster font-light text-base py-3 outline-none placeholder:text-[rgba(245,240,235,0.25)] focus:border-gold transition-colors duration-300"
              />
            </div>

            <button className="mt-6 font-display text-sm font-medium uppercase tracking-[0.12em] text-gold border border-gold px-8 py-3.5 rounded hover:bg-gold hover:text-obsidian transition-all duration-300">
              Subscribe
            </button>

            <div className="mt-12 flex items-center gap-2 font-display text-sm text-mist">
              <span className="hover:text-alabaster hover:underline cursor-pointer transition-colors">Instagram</span>
              <span className="text-mist">·</span>
              <span className="hover:text-alabaster hover:underline cursor-pointer transition-colors">Pinterest</span>
              <span className="text-mist">·</span>
              <span className="hover:text-alabaster hover:underline cursor-pointer transition-colors">Newsletter</span>
            </div>
          </div>

          {/* Right - Link Directory */}
          <div ref={rightRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {linkColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-overline text-gold mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <span className="text-sm font-light text-mist hover:text-alabaster transition-colors cursor-pointer">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t border-[rgba(245,240,235,0.08)] py-6 flex flex-col md:flex-row items-center justify-between gap-2"
        >
          <span className="text-body-small text-mist">&copy; 2026 Atelier Veil</span>
          <div className="flex items-center gap-2 text-body-small text-mist">
            <span className="hover:text-alabaster cursor-pointer transition-colors">Terms</span>
            <span>·</span>
            <span className="hover:text-alabaster cursor-pointer transition-colors">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

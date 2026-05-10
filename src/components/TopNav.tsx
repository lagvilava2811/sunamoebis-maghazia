import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] h-[72px] flex items-center justify-between px-6 md:px-12 mix-blend-difference"
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-display text-base font-medium tracking-[0.08em] uppercase text-alabaster"
      >
        ATELIER VEIL
      </button>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10">
        {[
          { label: 'Collection', id: 'collection' },
          { label: 'Mood', id: 'mood-chamber' },
          { label: 'Shop', id: 'shop' },
          { label: 'Contact', id: 'footer' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="font-display text-base font-medium tracking-[0.02em] text-alabaster relative group"
          >
            {item.label}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-alabaster transition-all duration-400 group-hover:w-full" />
          </button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-5 h-px bg-alabaster transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}
        />
        <span
          className={`block w-5 h-px bg-alabaster transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`block w-5 h-px bg-alabaster transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}
        />
      </button>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="fixed top-[72px] right-0 w-[320px] bg-onyx/95 backdrop-blur-xl p-8 md:hidden">
          <div className="flex flex-col gap-6">
            {[
              { label: 'Collection', id: 'collection' },
              { label: 'Mood', id: 'mood-chamber' },
              { label: 'Shop', id: 'shop' },
              { label: 'Contact', id: 'footer' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-display text-lg font-medium tracking-[0.02em] text-alabaster text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

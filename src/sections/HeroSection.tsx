import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMousePosition } from '@/hooks/useMousePosition';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 3.0,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 2.5,
        ease: 'power3.out',
        delay: 0.7,
      });

      gsap.from(arrowRef.current, {
        opacity: 0,
        duration: 2.0,
        ease: 'power2.out',
        delay: 1.2,
      });

      // Scroll-driven arrow fade-out
      gsap.to(arrowRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '100px top',
          scrub: true,
        },
      });

      // Scroll-driven video playback (desktop only)
      const isDesktop = window.innerWidth > 768;
      if (isDesktop && videoRef.current) {
        const video = videoRef.current;

        // Wait for video metadata
        const setupScrollVideo = () => {
          const duration = video.duration;
          if (!duration) return;

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              const targetTime = Math.max(0, Math.min(self.progress * duration, duration - 0.1));
              if (Math.abs(video.currentTime - targetTime) > 0.1) {
                video.currentTime = targetTime;
              }
            },
          });
        };

        if (video.readyState >= 1) {
          setupScrollVideo();
        } else {
          video.addEventListener('loadedmetadata', setupScrollVideo, { once: true });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  // Mouse-responsive gradient
  useEffect(() => {
    const gradient = gradientRef.current;
    if (!gradient) return;

    let raf: number;
    const update = () => {
      gradient.style.setProperty('--mx', String(mousePos.current.x));
      gradient.style.setProperty('--my', String(mousePos.current.y));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [mousePos]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 70%' }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero-fallback.jpg"
      >
        <source src="/assets/hero-background.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(8,8,8,0.50) 0%, rgba(8,8,8,0.85) 100%)',
        }}
      />

      {/* Mouse-responsive gradient */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at calc(var(--mx, 0.5) * 100%) calc(var(--my, 0.5) * 100%), rgba(200, 169, 126, 0.06), transparent 60%),
            radial-gradient(ellipse 600px 400px at calc(var(--mx, 0.5) * 80% + 20%) calc(var(--my, 0.5) * 70% + 30%), rgba(215, 165, 100, 0.04), transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-[100dvh] px-8 md:px-[8vw] pb-[15vh]">
        <div className="max-w-[700px]">
          <h1
            ref={headingRef}
            className="font-display text-[44px] md:text-[72px] font-normal text-alabaster leading-[1.05] tracking-[-0.02em]"
          >
            Atelier Veil
          </h1>
          <p
            ref={subtitleRef}
            className="font-sans text-base md:text-lg font-light text-[rgba(245,240,235,0.55)] mt-6 leading-relaxed tracking-[0.02em]"
          >
            Perfume as ritual. Scent as memory.
          </p>
        </div>
      </div>

      {/* Scroll arrow */}
      <div
        ref={arrowRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <span className="block text-alabaster text-2xl animate-scroll-bounce">
          &rsaquo;
        </span>
      </div>
    </section>
  );
}

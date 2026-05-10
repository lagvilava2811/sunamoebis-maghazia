import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '@/data/fragrances';

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.96,
        duration: 1.0,
        ease: 'power3.inOut',
        delay: index * 0.08,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer rounded-xl overflow-hidden bg-onyx flex flex-col h-full"
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden flex-shrink-0 p-6 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ filter: 'saturate(0.5)' }}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
        <div>
          <p className="text-overline text-gold mb-2">{product.overline}</p>
          <h3 className="font-display text-xl md:text-2xl font-medium text-alabaster leading-tight">
            {product.title}
          </h3>
          <p className="text-body-small text-mist mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        <p className="text-price text-gold mt-4 pt-4 border-t border-[rgba(245,240,235,0.08)]">
          {product.price}
        </p>
      </div>
    </div>
  );
}

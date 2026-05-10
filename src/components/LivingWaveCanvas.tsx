import { useRef, useEffect, useCallback } from 'react';

interface WaveLayer {
  text: string;
  frequency: number;
  amplitude: number;
  letterSpacing: number;
  yPosition: number;
  weight: number;
}

interface LivingWaveCanvasProps {
  layers: WaveLayer[];
  gradientTop: string;
  gradientBottom: string;
  opacity?: number;
  className?: string;
  mouseRef?: React.RefObject<{ x: number; y: number }>;
}

export default function LivingWaveCanvas({
  layers,
  gradientTop,
  gradientBottom,
  opacity = 1,
  className = '',
  mouseRef,
}: LivingWaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const mouseOffsetRef = useRef({ x: 0, y: 0 });

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resize();

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth <= 768;
    const fontSize = isMobile ? 28 : 48;

    const render = () => {
      timeRef.current += 0.012;
      const time = timeRef.current;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Mouse influence
      if (mouseRef?.current) {
        mouseOffsetRef.current.x += (mouseRef.current.x - 0.5 - mouseOffsetRef.current.x) * 0.05;
        mouseOffsetRef.current.y += (mouseRef.current.y - 0.5 - mouseOffsetRef.current.y) * 0.05;
      }

      ctx.clearRect(0, 0, w, h);

      // Gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, gradientTop + '20'); // 12% opacity
      grad.addColorStop(1, gradientBottom + '35'); // 20% opacity
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Draw each wave layer
      layers.forEach((layer) => {
        ctx.font = `${layer.weight} ${fontSize}px "Cormorant Garamond", Georgia, serif`;
        ctx.fillStyle = `rgba(245, 240, 235, ${opacity * 0.45})`;
        ctx.textBaseline = 'middle';

        const yBase = h * layer.yPosition;
        let x = w * 0.1;

        for (let i = 0; i < layer.text.length; i++) {
          const char = layer.text[i];
          const charWidth = ctx.measureText(char).width;
          const yOffset =
            Math.sin(i * layer.frequency + time + mouseOffsetRef.current.x * 2) *
            layer.amplitude *
            (1 + mouseOffsetRef.current.y * 0.3);

          ctx.save();
          ctx.translate(x, yBase + yOffset);
          ctx.fillText(char, 0, 0);
          ctx.restore();

          x += charWidth + layer.letterSpacing;
        }
      });

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [layers, gradientTop, gradientBottom, opacity, mouseRef, resize]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}

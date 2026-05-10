import type { ReactNode } from 'react';

interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function LiquidGlassCard({ children, className = '' }: LiquidGlassCardProps) {
  return (
    <div className={`liquid-glass ${className}`}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

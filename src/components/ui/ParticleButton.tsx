import React, { useState, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
}

export interface ParticleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  particleColors?: string[];
  particleCount?: number;
  glowColor?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'amber' | 'navy' | 'whatsapp';
}

export const ParticleButton: React.FC<ParticleButtonProps> = ({
  children = 'Explore Machinery',
  icon,
  particleColors = ['#C69347', '#E5B869', '#FFFFFF', '#263849'],
  particleCount = 24,
  glowColor = 'rgba(198, 147, 71, 0.35)',
  variant = 'amber',
  className = '',
  onClick,
  ...props
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animRef = useRef<number | null>(null);

  const spawnParticles = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.9;
      const speed = Math.random() * 4.5 + 3;
      return {
        id: Date.now() + i + Math.random(),
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 5 + 2.5,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: 1,
        rotation: Math.random() * 360,
      };
    });

    setParticles(newParticles);

    const startTime = performance.now();
    const duration = 650;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress >= 1) {
        setParticles([]);
        if (animRef.current) cancelAnimationFrame(animRef.current);
        animRef.current = null;
        return;
      }

      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy + 0.14,
          alpha: 1 - Math.pow(progress, 1.6),
          size: Math.max(0, p.size * (1 - progress * 0.5)),
          rotation: p.rotation + 3,
        }))
      );

      animRef.current = requestAnimationFrame(animate);
    };

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
  }, [particleColors, particleCount]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    spawnParticles();
    if (onClick) onClick(e);
  };

  const variantStyles = {
    amber:
      'bg-gradient-to-r from-[#C69347] via-[#D8A658] to-[#C69347] text-white hover:brightness-105 border-amber-400/40 shadow-[0_4px_20px_-2px_rgba(198,147,71,0.35)] hover:shadow-[0_6px_28px_rgba(198,147,71,0.5)]',
    navy:
      'bg-gradient-to-r from-[#0B192B] to-[#1E2C3D] text-white border-white/15 hover:border-amber-400/50 shadow-[0_4px_20px_-2px_rgba(11,25,43,0.5)]',
    whatsapp:
      'bg-gradient-to-r from-[#25D366] to-[#20BD5A] text-white border-emerald-400/30 hover:brightness-105 shadow-[0_4px_20px_-2px_rgba(37,211,102,0.4)]',
  }[variant];

  return (
    <div className="relative inline-block isolate">
      {/* Particle Canvas Overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-visible z-30" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full pointer-events-none shadow-sm"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.alpha,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              boxShadow: `0 0 8px ${p.color}`,
            }}
          />
        ))}
      </div>

      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        className={cn(
          'group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5',
          'text-xs font-semibold tracking-wider uppercase transition-all duration-300',
          'rounded-xl border active:scale-[0.98] cursor-pointer select-none',
          variantStyles,
          className
        )}
        style={{
          boxShadow: `0 4px 20px -2px ${glowColor}`,
        }}
        {...props}
      >
        <span
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        <span className="relative z-10 font-medium">{children}</span>
        {icon ?? <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />}
      </button>
    </div>
  );
};

export default ParticleButton;
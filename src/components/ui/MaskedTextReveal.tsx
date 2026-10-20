import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MaskedTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'p' | 'span';
  stagger?: number;
  progress?: number; // When provided, overrides scrollTrigger for direct deterministic scrubbing
}

export const MaskedTextReveal: React.FC<MaskedTextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.9,
  tag = 'div',
  progress,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // If progress is provided, apply direct deterministic transform
  useEffect(() => {
    if (progress === undefined || !innerRef.current) return;
    const clampedP = Math.max(0, Math.min(1, progress));
    const yPct = (1 - clampedP) * 105;
    const opacity = Math.min(1, clampedP * 1.5);
    innerRef.current.style.transform = `translateY(${yPct.toFixed(2)}%)`;
    innerRef.current.style.opacity = opacity.toFixed(3);
  }, [progress]);

  // If progress is NOT provided, bind to GSAP ScrollTrigger
  useEffect(() => {
    if (progress !== undefined) return;
    const el = containerRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    let ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [progress, delay, duration]);

  const Tag = tag as any;

  return (
    <Tag ref={containerRef} className={`overflow-hidden block ${className}`}>
      <div
        ref={innerRef}
        className="transform-gpu will-change-transform inline-block w-full"
        style={progress !== undefined ? { transform: 'translateY(105%)', opacity: 0 } : undefined}
      >
        {children}
      </div>
    </Tag>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'motion/react';

const SPRING_CONFIG: SpringOptions = { stiffness: 220, damping: 15, mass: 0.15 };

export type MagneticProps = {
  children: React.ReactNode;
  intensity?: number;
  range?: number;
  actionArea?: 'self' | 'parent';
  springOptions?: SpringOptions;
  className?: string;
};

export function Magnetic({
  children,
  intensity = 0.45,
  range = 100,
  actionArea = 'self',
  springOptions = SPRING_CONFIG,
  className = '',
}: MagneticProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  useEffect(() => {
    const calculateDistance = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        const absoluteDistance = Math.hypot(distanceX, distanceY);

        if (isHovered && absoluteDistance <= range) {
          const scale = 1 - absoluteDistance / range;
          x.set(distanceX * intensity * scale);
          y.set(distanceY * intensity * scale);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener('mousemove', calculateDistance);
    return () => window.removeEventListener('mousemove', calculateDistance);
  }, [isHovered, intensity, range, x, y]);

  useEffect(() => {
    if (actionArea === 'parent' && ref.current?.parentElement) {
      const parent = ref.current.parentElement;
      const enter = () => setIsHovered(true);
      const leave = () => setIsHovered(false);
      parent.addEventListener('mouseenter', enter);
      parent.addEventListener('mouseleave', leave);
      return () => {
        parent.removeEventListener('mouseenter', enter);
        parent.removeEventListener('mouseleave', leave);
      };
    }
  }, [actionArea]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseEnter={() => {
        if (actionArea === 'self') setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (actionArea === 'self') {
          setIsHovered(false);
          x.set(0);
          y.set(0);
        }
      }}
    >
      {children}
    </motion.div>
  );
}

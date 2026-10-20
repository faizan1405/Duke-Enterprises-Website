import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark'; // we keep theme prop but will only use light now
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        align === 'center' ? 'mx-auto text-center' : align === 'right' ? 'ml-auto text-right' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-widest font-semibold mb-3 border',
            isDark
              ? 'bg-surface-muted/80 text-accent border-accent/30 shadow-[0_0_12px_rgba(182,139,92,0.15)]'
              : 'bg-accent/10 text-accent-dark border-accent/20'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          'text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight leading-tight',
          isDark ? 'text-surface-white' : 'text-typography'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed',
            isDark ? 'text-surface-muted' : 'text-typography/70'
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          'h-0.5 w-16 mt-4',
          align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : '',
          'bg-gradient-to-r from-accent to-accent-hover/40'
        )}
      />
    </div>
  );
};

export default SectionHeading;
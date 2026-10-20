import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { CategoryItem } from '@/data/machineryData';
import { cn } from '@/lib/utils';
import SpotlightCard from './SpotlightCard';

interface CategoryCardProps {
  category: CategoryItem;
  onClick: (category: CategoryItem) => void;
  featured?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, featured = false }) => {
  return (
    <SpotlightCard
      theme="light"
      spotlightColor="#B68B5C"
      intensity={0.2}
      borderGlow={0.4}
      onClick={() => onClick(category)}
      className={cn(
        'group cursor-pointer flex flex-col justify-between transition-all duration-500 hover:-translate-y-1',
        featured
          ? 'md:col-span-2 md:row-span-2 bg-gradient-to-br from-surface-white to-surface-offwhite border-surface-muted/80 shadow-md'
          : 'bg-surface-white border-surface-muted/90 hover:border-accent/40'
      )}
    >
      <div>
        {/* Card Header Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-surface-muted/20 text-typography/60 border border-surface-muted/30">
            {category.machineCount}
          </span>
          <div className="w-8 h-8 rounded-full bg-surface-muted/20 group-hover:bg-accent/10 group-hover:text-accent text-typography/60 flex items-center justify-center transition-colors duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Category Image Frame */}
        <div
          className={cn(
            'relative rounded-xl overflow-hidden bg-surface-offwhite flex items-center justify-center border border-surface-muted/20',
            featured ? 'h-64 sm:h-72 p-6' : 'h-44 sm:h-48 p-4'
          )}
        >
          <img
            src={category.image}
            alt={category.name}
            className="max-h-full max-w-full object-contain filter drop-shadow-sm machinery-card-img"
          />
          {/* Subtle badge on featured */}
          {featured && (
            <div className="absolute top-3 left-3 bg-surface-muted/80 backdrop-blur-md text-typography/80 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-surface-muted/30">
              FEATURED CATEGORY
            </div>
          )}
        </div>

        {/* Text Details */}
        <div className="mt-5">
          <h3
            className={cn(
              'font-display font-bold text-typography group-hover:text-accent transition-colors leading-snug',
              featured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
            )}
          >
            {category.name}
          </h3>
          <p
            className={cn(
              'text-typography/60 mt-2 leading-relaxed',
              featured ? 'text-sm' : 'text-xs line-clamp-2'
            )}
          >
            {category.description}
          </p>
        </div>
      </div>

      {/* Bottom Footer Affordance */}
        <div className="mt-5 pt-3 border-t border-surface-muted/20 flex items-center justify-between text-xs text-typography/50">
          <span className="font-mono text-[11px]">{category.materialHighlight}</span>
          <span className="font-semibold text-typography group-hover:text-accent flex items-center gap-1 transition-colors">
            Explore Series
          </span>
        </div>
      </SpotlightCard>
  );
};

export default CategoryCard;
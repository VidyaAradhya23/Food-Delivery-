import React from 'react';
import type { ProductColor } from '../../types';
import { cn } from '../../utils/helpers';
import { Flame, Check } from 'lucide-react';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: string | null;
  onSelectColor: (colorName: string) => void;
  className?: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onSelectColor,
  className,
}) => {
  if (!colors || colors.length === 0) return null;

  return (
    <div className={cn('space-y-2.5', className)}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
          <Flame size={14} className="text-accent" />
          Spice Level / Style:
        </span>
        <span className="text-xs font-bold text-accent">
          {selectedColor || colors[0]?.name}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {colors.map((color) => {
          const isSelected = (selectedColor || colors[0]?.name) === color.name;
          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onSelectColor(color.name)}
              title={color.name}
              aria-label={`Select ${color.name}`}
              className={cn(
                'px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 focus-visible:outline-none',
                isSelected
                  ? 'border-accent bg-accent text-white shadow-sm ring-2 ring-accent/30'
                  : 'border-border text-gray-700 bg-white hover:border-gray-400'
              )}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                style={{ backgroundColor: color.hex }}
              />
              <span>{color.name}</span>
              {isSelected && <Check size={12} className="stroke-[3]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};


import React from 'react';
import type { Product } from '../../types';
import { Accordion } from '../ui/Accordion';
import { cn } from '../../utils/helpers';
import { ShieldCheck, Award } from 'lucide-react';

interface ProductAccordionProps {
  product: Product;
  className?: string;
}

export const ProductAccordion: React.FC<ProductAccordionProps> = ({
  product,
  className,
}) => {
  const isVeg = product.isVeg;

  const items = [
    {
      id: 'details',
      title: "Chef's Preparation & Ingredients",
      content: (
        <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
          <p>{product.description}</p>
          {product.highlights && product.highlights.length > 0 && (
            <div className="pt-2">
              <h5 className="font-extrabold text-primary mb-1.5 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                <Award size={13} className="text-accent" /> Key Highlights
              </h5>
              <ul className="list-disc list-inside space-y-1 text-muted">
                {product.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'specs',
      title: 'Nutritional & Dietary Details',
      content: (
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs py-1">
          <div>
            <span className="text-muted block text-[11px]">Dietary Type</span>
            <span className={cn('font-bold', isVeg ? 'text-emerald-700' : 'text-rose-700')}>
              {isVeg ? '🟢 100% Pure Veg' : '🔴 Non-Vegetarian'}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">Cuisine</span>
            <span className="font-semibold text-primary">{product.cuisine || product.fabric || 'Specialty'}</span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">Portion Size</span>
            <span className="font-semibold text-primary">{product.portionSize || product.fit || 'Serves 1-2'}</span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">Estimated Calories</span>
            <span className="font-semibold text-primary">{product.calories ? `${product.calories} kcal` : 'Approx 520 kcal'}</span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">Spice Level</span>
            <span className="font-semibold text-primary">{product.spiceLevel || 'Medium 🌶️'}</span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">Preparation Time</span>
            <span className="font-semibold text-primary">{product.prepTime || '20-25 mins'}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'safety',
      title: 'Hygiene & Packaging Guarantee',
      content: (
        <div className="text-xs text-gray-700 space-y-2 leading-relaxed">
          <div className="flex items-start gap-2 bg-emerald-950/25 border border-emerald-500/30 p-2.5 rounded-lg text-emerald-300">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">100% FSSAI Certified Gourmet Kitchen</span>
              <span className="text-[11px] text-emerald-400/80">Prepared adhering to strict thermal sanitization and contactless cooking standards.</span>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1 text-muted text-[11px] pt-1">
            <li>Packed in leak-proof, food-grade biodegradable containers</li>
            <li>Tamper-evident safety seal on all delivery bags</li>
            <li>Best enjoyed hot right after delivery</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className={cn('border-t border-border mt-4', className)}>
      <Accordion items={items} defaultOpen={['details', 'specs']} />
    </div>
  );
};

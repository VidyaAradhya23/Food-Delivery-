import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Star, Zap, Tag, ArrowUpDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface ZomatoFilterPillsProps {
  className?: string;
}

export const ZomatoFilterPills: React.FC<ZomatoFilterPillsProps> = ({ className }) => {
  const navigate = useNavigate();

  const pills = [
    {
      id: 'filters',
      label: 'Filters',
      icon: <SlidersHorizontal size={13} className="text-rose-400" />,
      onClick: () => navigate('/search'),
      highlight: false,
    },
    {
      id: 'rating',
      label: 'Rating: 4.0+',
      icon: <Star size={13} className="text-amber-400 fill-amber-400" />,
      onClick: () => navigate('/search?rating=4'),
      highlight: false,
    },
    {
      id: 'veg',
      label: 'Pure Veg',
      icon: (
        <span className="w-3.5 h-3.5 rounded-xs border-2 border-emerald-500 bg-slate-900 flex items-center justify-center p-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </span>
      ),
      onClick: () => navigate('/search?veg=1'),
      highlight: false,
    },
    {
      id: 'offers',
      label: 'Offers & Deals',
      icon: <Tag size={13} className="text-rose-400" />,
      onClick: () => navigate('/search?discount=30'),
      highlight: true,
    },
    {
      id: 'fast',
      label: 'Fast Delivery (< 30 mins)',
      icon: <Zap size={13} className="text-amber-400 fill-amber-400" />,
      onClick: () => navigate('/search?sort=delivery-time'),
      highlight: false,
    },
    {
      id: 'sort',
      label: 'Cost: Low to High',
      icon: <ArrowUpDown size={13} className="text-slate-400" />,
      onClick: () => navigate('/search?sort=price-asc'),
      highlight: false,
    },
  ];

  return (
    <div className={cn('sticky top-[var(--header-height)] z-20 py-2.5 bg-white/95 backdrop-blur-2xl border-y border-slate-200/80 shadow-xs my-4', className)}>
      <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide py-1">
        {pills.map((pill) => (
          <button
            key={pill.id}
            type="button"
            onClick={pill.onClick}
            className={cn(
              'flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-300 select-none shadow-xs hover:-translate-y-0.5',
              pill.highlight
                ? 'bg-rose-50 border-[#e23744] text-[#e23744] hover:bg-rose-100 hover:border-[#cb202d]'
                : 'bg-white border-slate-200 text-slate-700 hover:border-[#e23744] hover:text-[#e23744] hover:shadow-sm'
            )}
          >
            {pill.icon}
            <span>{pill.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

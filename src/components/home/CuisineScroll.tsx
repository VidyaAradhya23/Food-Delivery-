import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface CuisineItem {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  image: string;
  offer: string;
  href: string;
}

const CUISINES: CuisineItem[] = [
  {
    id: 'biryani',
    name: 'Dum Biryani',
    subtitle: 'Royal Pots & Spices',
    icon: '🍛',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
    offer: '50% OFF',
    href: '/search?category=biryani',
  },
  {
    id: 'pizza',
    name: 'Artisan Pizza',
    subtitle: 'Sourdough & Basil',
    icon: '🍕',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
    offer: '40% OFF',
    href: '/search?category=pizzas',
  },
  {
    id: 'burger',
    name: 'Smash Burgers',
    subtitle: 'Brioche & Truffle',
    icon: '🍔',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    offer: '₹100 OFF',
    href: '/search?category=burgers',
  },
  {
    id: 'north-indian',
    name: 'North Indian',
    subtitle: 'Clay Oven & Gravies',
    icon: '🥘',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80',
    offer: '30% OFF',
    href: '/search?category=north-indian',
  },
  {
    id: 'chinese',
    name: 'Pan-Asian Wok',
    subtitle: 'Dim Sums & Truffle Bao',
    icon: '🍜',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=80',
    offer: '40% OFF',
    href: '/search?category=chinese',
  },
  {
    id: 'rolls',
    name: 'Kathi & Rolls',
    subtitle: 'Flaky Wraps',
    icon: '🌯',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=80',
    offer: 'FROM ₹149',
    href: '/search?category=rolls',
  },
  {
    id: 'south-indian',
    name: 'South Indian',
    subtitle: 'Ghee Podi Dosas',
    icon: '🥞',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=80',
    offer: '30% OFF',
    href: '/search?category=south-indian',
  },
  {
    id: 'desserts',
    name: 'Desserts & Gelatos',
    subtitle: 'Dark Chocolate & Berries',
    icon: '🍰',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80',
    offer: '50% OFF',
    href: '/search?category=desserts',
  },
];

export const CuisineScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-white/70 border-y border-[#DFE7E2]/70">
      <div className="container-app">
        {/* Section Header with Controls */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F3A2E] mb-1">
              <span>Fresh & Diverse</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-[#13221C]">
              Explore By Cuisine
            </h2>
            <p className="text-xs sm:text-sm text-[#73887F] mt-1">
              What are you craving today? Browse by handpicked culinary categories
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white border border-[#DFE7E2] text-[#13221C] hover:border-[#0F3A2E] hover:text-[#0F3A2E] flex items-center justify-center shadow-xs hover:shadow-md transition-all active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white border border-[#DFE7E2] text-[#13221C] hover:border-[#0F3A2E] hover:text-[#0F3A2E] flex items-center justify-center shadow-xs hover:shadow-md transition-all active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
            <Link
              to="/search"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0F3A2E] hover:text-[#E5A93C] hover:underline ml-2 transition-colors"
            >
              <span>See All Cuisines</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto scrollbar-hide py-2 scroll-smooth"
        >
          {CUISINES.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="group flex-shrink-0 w-36 sm:w-44 flex flex-col items-center text-center p-3 sm:p-4 rounded-3xl bg-white border border-[#DFE7E2] hover:border-[#0F3A2E] shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image Circle */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md bg-[#F7F9F6] border-2 border-white group-hover:scale-105 transition-transform duration-500">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <span className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-sm">
                  {item.icon}
                </span>
              </div>

              {/* Text */}
              <h3 className="font-extrabold text-sm sm:text-base text-[#13221C] group-hover:text-[#0F3A2E] transition-colors mt-3 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-[11px] text-[#73887F] font-medium truncate w-full mt-0.5">
                {item.subtitle}
              </p>

              {/* Offer Pill */}
              <span className="mt-2 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FDF6E9] text-[#C2821A] border border-[#E5A93C]/30 group-hover:bg-[#0F3A2E] group-hover:text-white group-hover:border-[#0F3A2E] transition-colors">
                {item.offer}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CuisineTile {
  title: string;
  category: string;
  href: string;
  offer: string;
  image: string;
  tag: string;
  icon: string;
}

const CUISINE_TILES: CuisineTile[] = [
  {
    title: 'Dum Biryani',
    category: 'Royal Rice Pots',
    href: '/search?category=biryani',
    offer: 'UP TO 50% OFF',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    tag: 'Bestseller',
    icon: '🍛',
  },
  {
    title: 'Artisan Pizzas',
    category: 'Woodfired Italian',
    href: '/search?category=pizzas',
    offer: 'MIN 40% OFF',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    tag: 'Cheesy & Hot',
    icon: '🍕',
  },
  {
    title: 'Gourmet Burgers',
    category: 'Smash & Crispy',
    href: '/search?category=burgers',
    offer: 'FLAT ₹100 OFF',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    tag: 'Loaded',
    icon: '🍔',
  },
  {
    title: 'North Indian',
    category: 'Butter Chicken & Naan',
    href: '/search?category=north-indian',
    offer: 'MIN 30% OFF',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80',
    tag: 'Rich Gravies',
    icon: '🥘',
  },
  {
    title: 'Pan-Asian Wok',
    category: 'Noodles & Dim Sums',
    href: '/search?category=chinese',
    offer: 'UP TO 40% OFF',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80',
    tag: 'Smoky Wok',
    icon: '🍜',
  },
  {
    title: 'Kathi Rolls',
    category: 'Wraps & Shawarmas',
    href: '/search?category=rolls',
    offer: 'STARTING ₹149',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    tag: 'Quick Bite',
    icon: '🌯',
  },
  {
    title: 'South Indian',
    category: 'Crispy Dosas & Tiffins',
    href: '/search?category=south-indian',
    offer: 'FLAT 30% OFF',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
    tag: 'Pure Ghee',
    icon: '🥞',
  },
  {
    title: 'Desserts & Sweets',
    category: 'Lava Cakes & Shakes',
    href: '/search?category=desserts',
    offer: 'UP TO 50% OFF',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    tag: 'Sweet Tooth',
    icon: '🍰',
  },
];

export const ShopByCategory: React.FC = () => {
  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 font-display flex items-center gap-2">
            <span>Inspiration for your first order</span>
            <span className="text-[#e23744] text-sm">🔥</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Top-rated delicacies and trending cuisines in Bengaluru</p>
        </div>

        <Link
          to="/search"
          className="text-xs font-bold text-[#e23744] hover:text-[#cb202d] hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
        >
          <span>View All Dishes</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 py-2">
        {CUISINE_TILES.map((tile) => (
          <Link
            key={tile.title}
            to={tile.href}
            className="group flex flex-col items-center text-center transition-all focus-visible:outline-none"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] group-hover:shadow-[0_12px_28px_-6px_rgba(226,55,68,0.25)] transition-all duration-500 relative border-2 border-slate-200/80 group-hover:border-[#e23744] p-1 bg-white group-hover:-translate-y-1.5">
              <img
                src={tile.image}
                alt={tile.title}
                loading="lazy"
                className="w-full h-full object-cover rounded-full group-hover:scale-112 transition-transform duration-700 ease-out"
              />
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white border border-slate-200 backdrop-blur-md flex items-center justify-center text-xs shadow-md group-hover:scale-110 transition-transform">
                {tile.icon}
              </span>
            </div>

            <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 group-hover:text-[#e23744] transition-colors mt-3 truncate max-w-full">
              {tile.title}
            </h3>
            <span className="text-[10px] font-black text-amber-800 mt-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 group-hover:bg-rose-50 group-hover:border-rose-200 group-hover:text-[#e23744] transition-colors shadow-xs">
              {tile.offer}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

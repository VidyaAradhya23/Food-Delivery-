import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';
import type { DealOfTheDay as DealType, Product } from '../../types';
import { CountdownTimer } from '../ui/CountdownTimer';
import { ProductCard } from '../product/ProductCard';
import { Carousel } from '../ui/Carousel';

interface DealOfTheDayProps {
  deal: DealType;
  products: Product[];
}

export const DealOfTheDay: React.FC<DealOfTheDayProps> = ({ deal, products }) => {
  if (!deal || products.length === 0) return null;

  return (
    <section className="my-10 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_12px_35px_-8px_rgba(0,0,0,0.06)] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-400/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#e23744] via-amber-500 to-amber-400 text-white flex items-center justify-center shadow-md shrink-0 border border-amber-200/40">
            <Flame size={24} className="fill-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-slate-900 font-display">
                {deal.title}
              </h2>
              <span className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-[#e23744] to-amber-500 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                Lightning Tasting
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{deal.subtitle}</p>
          </div>
        </div>

        {/* Live Countdown */}
        <div className="flex items-center gap-4">
          <CountdownTimer targetDate={deal.endTime} variant="boxed" />
          <Link
            to="/search?discount=50"
            className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-[#e23744] hover:text-[#cb202d] transition-colors uppercase tracking-wider"
          >
            All Flash Deals <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Deals Carousel */}
      <Carousel scrollStep={380}>
        {products.map((p) => (
          <div
            key={p.id}
            className="w-44 sm:w-52 md:w-60 flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

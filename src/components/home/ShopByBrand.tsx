import React from 'react';
import { Link } from 'react-router-dom';
import type { Brand } from '../../types';

interface ShopByBrandProps {
  brands: Brand[];
}

export const ShopByBrand: React.FC<ShopByBrandProps> = ({ brands }) => {
  if (!brands || brands.length === 0) return null;

  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 font-display flex items-center gap-2">
            <span>Top brands for you</span>
            <span className="text-[#e23744] text-sm">⚡</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Most loved restaurants and chains delivering fresh to your doorstep</p>
        </div>

        <Link
          to="/search?sort=popularity"
          className="text-xs font-bold text-[#e23744] hover:text-[#cb202d] hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
        >
          <span>View All Brands</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {brands.slice(0, 12).map((b) => (
          <Link
            key={b.id}
            to={`/search?brand=${encodeURIComponent(b.name)}`}
            className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#e23744]/50 hover:shadow-[0_14px_30px_-6px_rgba(226,55,68,0.16)] hover:-translate-y-1.5 transition-all duration-300 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)]"
          >
            <div
              className="w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-md border-2 border-slate-100 group-hover:border-[#e23744] group-hover:scale-108 transition-all duration-500"
              style={{ background: b.gradient || 'linear-gradient(135deg, #e23744, #f97316)' }}
            >
              <span className="drop-shadow-md font-display text-white">{b.name[0]}</span>
            </div>

            <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 group-hover:text-[#e23744] transition-colors mt-3 truncate max-w-full">
              {b.name}
            </h3>
            <span className="text-[10px] text-slate-600 font-semibold mt-1 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 flex items-center gap-1 group-hover:border-rose-200 group-hover:text-[#e23744] group-hover:bg-rose-50 transition-colors">
              <span className="text-[#e23744]">⏱</span> 20–30 mins
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

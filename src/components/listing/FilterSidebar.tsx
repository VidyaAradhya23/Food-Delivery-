import React, { useState } from 'react';
import type { FilterState, Product } from '../../types';
import { extractFilterOptions, countActiveFilters } from '../../utils/filters';
import { ChevronDown, Star, Search } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface FilterSidebarProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearAll: () => void;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  products,
  filters,
  onFilterChange,
  onClearAll,
  className,
}) => {
  const options = extractFilterOptions(products);
  const activeCount = countActiveFilters(filters);
  const [brandSearch, setBrandSearch] = useState('');

  // Accordion collapsed state for filter sections
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxToggle = (key: 'brands' | 'colors' | 'sizes' | 'fits' | 'fabrics' | 'occasions', value: string) => {
    const list = [...filters[key]];
    const idx = list.indexOf(value);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(value);
    }
    onFilterChange({ ...filters, [key]: list, page: 1 });
  };

  const handleVegToggle = () => {
    onFilterChange({
      ...filters,
      vegOnly: !filters.vegOnly,
      page: 1,
    });
  };

  const handlePriceBucket = (range: [number, number] | null) => {
    onFilterChange({
      ...filters,
      priceRange: filters.priceRange?.[0] === range?.[0] && filters.priceRange?.[1] === range?.[1] ? null : range,
      page: 1,
    });
  };

  const handleDiscountToggle = (min: number) => {
    onFilterChange({
      ...filters,
      discountMin: filters.discountMin === min ? null : min,
      page: 1,
    });
  };

  const handleRatingToggle = (min: number) => {
    onFilterChange({
      ...filters,
      ratingMin: filters.ratingMin === min ? null : min,
      page: 1,
    });
  };

  const filteredBrands = options.brands.filter((b) =>
    b.label.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const priceBuckets: { label: string; range: [number, number] }[] = [
    { label: 'Under ₹200 (Pocket Friendly)', range: [0, 200] },
    { label: '₹200 - ₹350 (Popular)', range: [200, 350] },
    { label: '₹350 - ₹500 (Gourmet)', range: [350, 500] },
    { label: '₹500 & Above (Feast & Combos)', range: [500, 10000] },
  ];

  return (
    <aside
      aria-label="Food Menu Filters"
      className={cn('w-full space-y-5 text-xs text-primary pr-4', className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="font-extrabold uppercase tracking-wider text-sm">Filters</span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-black">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-bold text-accent hover:underline uppercase tracking-wider"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Pure Veg Quick Toggle Card */}
      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-xs border-2 border-emerald-500 bg-slate-900 flex items-center justify-center p-0.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div>
            <span className="font-extrabold text-xs text-emerald-300 block leading-tight">Pure Veg Only</span>
            <span className="text-[10px] text-emerald-400/80 font-medium">Hide all meat dishes</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleVegToggle}
          role="switch"
          aria-checked={Boolean(filters.vegOnly)}
          className={cn(
            'w-10 h-5 rounded-full transition-colors relative focus-visible:outline-none',
            filters.vegOnly ? 'bg-emerald-600' : 'bg-gray-300'
          )}
        >
          <span
            className={cn(
              'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-xs',
              filters.vegOnly && 'translate-x-5'
            )}
          />
        </button>
      </div>

      {/* Restaurant Kitchen Filter */}
      {options.brands.length > 0 && (
        <div className="border-b border-border pb-4">
          <button
            type="button"
            onClick={() => toggleSection('brand')}
            className="flex items-center justify-between w-full font-extrabold uppercase tracking-wider text-xs mb-2.5"
          >
            <span>Kitchen / Restaurant ({options.brands.length})</span>
            <ChevronDown
              size={15}
              className={cn('transition-transform duration-200 text-muted', collapsed.brand && 'rotate-180')}
            />
          </button>

          {!collapsed.brand && (
            <div className="space-y-2">
              {options.brands.length > 4 && (
                <div className="relative mb-2">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    placeholder="Search kitchen..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="w-full pl-7 pr-2 py-1.5 text-[11px] border border-border rounded-lg focus:border-accent outline-none"
                  />
                </div>
              )}
              <div className="max-h-48 overflow-y-auto space-y-1.5 scrollbar-hide">
                {filteredBrands.map((b) => (
                  <label
                    key={b.value}
                    className="flex items-center justify-between gap-2 cursor-pointer hover:text-accent select-none"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(b.value)}
                        onChange={() => handleCheckboxToggle('brands', b.value)}
                        className="rounded border-gray-300 text-accent focus:ring-accent accent-accent w-3.5 h-3.5"
                      />
                      <span className="font-medium text-gray-700">{b.label}</span>
                    </div>
                    <span className="text-muted text-[11px]">({b.count})</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Price Buckets */}
      <div className="border-b border-border pb-4">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full font-extrabold uppercase tracking-wider text-xs mb-2.5"
        >
          <span>Price Range</span>
          <ChevronDown
            size={15}
            className={cn('transition-transform duration-200 text-muted', collapsed.price && 'rotate-180')}
          />
        </button>

        {!collapsed.price && (
          <div className="space-y-1.5">
            {priceBuckets.map((b, i) => {
              const isChecked =
                filters.priceRange &&
                filters.priceRange[0] === b.range[0] &&
                filters.priceRange[1] === b.range[1];
              return (
                <label
                  key={i}
                  className="flex items-center gap-2 cursor-pointer hover:text-accent select-none"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(isChecked)}
                    onChange={() => handlePriceBucket(b.range)}
                    className="rounded border-gray-300 text-accent focus:ring-accent accent-accent w-3.5 h-3.5"
                  />
                  <span className="font-medium text-gray-700">{b.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Discount / Offers Filter */}
      <div className="border-b border-border pb-4">
        <button
          type="button"
          onClick={() => toggleSection('discount')}
          className="flex items-center justify-between w-full font-extrabold uppercase tracking-wider text-xs mb-2.5"
        >
          <span>Offers & Discounts</span>
          <ChevronDown
            size={15}
            className={cn('transition-transform duration-200 text-muted', collapsed.discount && 'rotate-180')}
          />
        </button>

        {!collapsed.discount && (
          <div className="space-y-1.5">
            {[20, 30, 40, 50].map((d) => (
              <label
                key={d}
                className="flex items-center gap-2 cursor-pointer hover:text-accent select-none"
              >
                <input
                  type="checkbox"
                  checked={filters.discountMin === d}
                  onChange={() => handleDiscountToggle(d)}
                  className="rounded border-gray-300 text-accent focus:ring-accent accent-accent w-3.5 h-3.5"
                />
                <span className="font-medium text-gray-700">{d}% off & above</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Portions / Size Filter */}
      {options.sizes.length > 0 && (
        <div className="border-b border-border pb-4">
          <button
            type="button"
            onClick={() => toggleSection('size')}
            className="flex items-center justify-between w-full font-extrabold uppercase tracking-wider text-xs mb-2.5"
          >
            <span>Portion Size</span>
            <ChevronDown
              size={15}
              className={cn('transition-transform duration-200 text-muted', collapsed.size && 'rotate-180')}
            />
          </button>

          {!collapsed.size && (
            <div className="flex flex-wrap gap-2 pt-1">
              {options.sizes.map((s) => {
                const isSelected = filters.sizes.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleCheckboxToggle('sizes', s)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-bold border transition-all',
                      isSelected
                        ? 'border-accent bg-accent text-white shadow-xs'
                        : 'border-border text-gray-700 hover:border-gray-400 bg-white'
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Rating Filter */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full font-extrabold uppercase tracking-wider text-xs mb-2.5"
        >
          <span>Customer Rating</span>
          <ChevronDown
            size={15}
            className={cn('transition-transform duration-200 text-muted', collapsed.rating && 'rotate-180')}
          />
        </button>

        {!collapsed.rating && (
          <div className="space-y-1.5">
            {[4, 3].map((r) => (
              <label
                key={r}
                className="flex items-center gap-2 cursor-pointer hover:text-accent select-none"
              >
                <input
                  type="checkbox"
                  checked={filters.ratingMin === r}
                  onChange={() => handleRatingToggle(r)}
                  className="rounded border-gray-300 text-accent focus:ring-accent accent-accent w-3.5 h-3.5"
                />
                <span className="flex items-center gap-1 font-semibold text-gray-700">
                  {r}★ & above
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

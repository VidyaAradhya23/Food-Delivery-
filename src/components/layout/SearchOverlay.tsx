import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { searchProducts } from '../../utils/search';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/price';

const POPULAR_SEARCHES = ['Hyderabadi Dum Biryani', 'Butter Chicken', 'Truffle Pizza', 'Crispy Smash Burger', 'Paneer Butter Masala', 'Masala Dosa'];

export const SearchOverlay: React.FC = () => {
  const { searchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cravedash_recent_searches');
      return saved ? JSON.parse(saved) : ['Dum Biryani', 'Woodfired Pizza', 'Smash Burger'];
    } catch {
      return ['Dum Biryani', 'Woodfired Pizza', 'Smash Burger'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, closeSearch]);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('cravedash_recent_searches', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    saveRecentSearch(term);
    closeSearch();
    navigate(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('cravedash_recent_searches');
  };

  if (!searchOpen) return null;

  // Matching preview products
  const liveResults = query.trim() ? searchProducts(products, query).slice(0, 5) : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-modal bg-black/75 backdrop-blur-md flex flex-col justify-start pt-12 md:pt-20 px-4 animate-fade-in"
      onClick={closeSearch}
    >
      <div
        className="w-full max-w-2xl mx-auto bg-white border border-[#DFE7E2] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-[#13221C]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center gap-3 px-5 py-4 border-b border-[#DFE7E2] bg-[#F7F9F6]">
          <Search size={20} className="text-[#0F3A2E] flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for restaurants, cuisines, or a dish..."
            className="flex-1 text-sm md:text-base outline-none text-[#13221C] placeholder-[#73887F] bg-transparent font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#73887F] hover:text-[#13221C] p-1"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={closeSearch}
            className="text-xs font-bold text-[#4D6158] hover:text-[#13221C] px-2.5 py-1 rounded-lg bg-white border border-[#DFE7E2] shadow-xs"
          >
            ESC
          </button>
        </form>

        {/* Search Content */}
        <div className="overflow-y-auto p-5 space-y-6">
          {/* Real-time search matches if user typed something */}
          {query.trim().length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#73887F]">
                  Suggested Dishes
                </span>
                <button
                  type="button"
                  onClick={() => handleSearch(query)}
                  className="text-xs font-bold text-[#0F3A2E] flex items-center gap-1 hover:underline"
                >
                  View all results <ArrowRight size={13} />
                </button>
              </div>

              {liveResults.length > 0 ? (
                <div className="divide-y divide-[#EBF0ED]">
                  {liveResults.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        closeSearch();
                        navigate(`/product/${p.slug}`);
                      }}
                      className="w-full flex items-center gap-3 py-3 px-2 hover:bg-[#F2F8F5] rounded-xl text-left transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#F7F9F6] flex-shrink-0 overflow-hidden border border-[#DFE7E2]">
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#F7F9F6]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#0F3A2E] truncate uppercase">{p.brand}</div>
                        <div className="text-xs text-[#13221C] font-semibold truncate">{p.title}</div>
                      </div>
                      <div className="text-xs font-black text-[#13221C] flex-shrink-0">
                        {formatPrice(p.price)}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-[#73887F]">
                  No direct dishes found for "{query}". Press Enter to search all kitchens.
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#73887F] flex items-center gap-1.5">
                      <Clock size={13} className="text-[#E5A93C]" /> Recent Searches
                    </span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs text-[#73887F] hover:text-[#0F3A2E] font-medium"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSearch(term)}
                        className="px-3.5 py-1.5 rounded-full bg-[#F7F9F6] border border-[#DFE7E2] text-xs font-semibold text-[#13221C] hover:bg-[#E8F4F0] hover:border-[#0F3A2E] hover:text-[#0F3A2E] transition-colors flex items-center gap-1.5"
                      >
                        <Search size={12} className="text-[#0F3A2E]" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#73887F] flex items-center gap-1.5">
                  <TrendingUp size={13} className="text-[#25A18E]" /> Trending Cuisines & Dishes
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSearch(term)}
                      className="px-3.5 py-1.5 rounded-full bg-[#F7F9F6] border border-[#DFE7E2] text-xs font-semibold text-[#13221C] hover:border-[#0F3A2E] hover:text-[#0F3A2E] hover:bg-[#E8F4F0] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

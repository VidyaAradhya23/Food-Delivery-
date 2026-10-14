import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Plus, Minus, Heart, ArrowRight, Sparkles } from 'lucide-react';
import type { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useToastStore } from '../../store/useToastStore';
import { formatPrice } from '../../utils/price';
import { cn } from '../../utils/helpers';

interface PopularNearYouProps {
  products: Product[];
}

export const PopularNearYou: React.FC<PopularNearYouProps> = ({ products }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'veg' | 'topRated' | 'fast'>('all');
  const { items: cartItems, addItem, updateQuantity, removeItem } = useCartStore();
  const { isWishlisted, toggle: toggleWishlist } = useWishlistStore();
  const { showToast } = useToastStore();

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (activeTab === 'veg') {
      list = list.filter((p) => p.isVeg);
    } else if (activeTab === 'topRated') {
      list = list.filter((p) => p.rating >= 4.6);
    } else if (activeTab === 'fast') {
      list = list.filter((p) => p.prepTime && (p.prepTime.includes('15') || p.prepTime.includes('20')));
    }
    return list.slice(0, 8);
  }, [products, activeTab]);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      title: product.title,
      brand: product.brand,
      restaurantName: product.brand,
      size: 'Regular',
      color: 'Standard',
      quantity: 1,
      mrp: product.mrp,
      price: product.price,
      image: product.images?.[0] || '',
      slug: product.slug,
      maxStock: 25,
      isVeg: product.isVeg,
    });
    showToast(`Added ${product.title} to your bag`, 'success');
  };

  const handleWishlist = (e: React.MouseEvent, productId: string, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
    if (!isWishlisted(productId)) {
      showToast(`Saved ${title} to Favourites`, 'success');
    }
  };

  return (
    <section className="py-14 sm:py-20">
      <div className="container-app">
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F3A2E] mb-1.5">
              <Sparkles size={14} className="text-[#E5A93C] fill-[#E5A93C]" />
              <span>Trending Delicacies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-[#13221C]">
              Popular Near You
            </h2>
            <p className="text-xs sm:text-sm text-[#73887F] mt-1">
              Top ordered dishes, sizzling recipes, and local favorites delivering in under 30 minutes
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0',
                activeTab === 'all'
                  ? 'bg-[#0F3A2E] text-white shadow-md'
                  : 'bg-white border border-[#DFE7E2] text-[#4D6158] hover:border-[#0F3A2E] hover:text-[#13221C]'
              )}
            >
              All Cravings
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('veg')}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5',
                activeTab === 'veg'
                  ? 'bg-[#25A18E] text-white shadow-md'
                  : 'bg-white border border-[#DFE7E2] text-[#4D6158] hover:border-[#25A18E] hover:text-[#25A18E]'
              )}
            >
              <span className="w-2 h-2 rounded-full bg-[#25A18E] inline-block" />
              Pure Veg
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('topRated')}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1',
                activeTab === 'topRated'
                  ? 'bg-[#13221C] text-white shadow-md'
                  : 'bg-white border border-[#DFE7E2] text-[#4D6158] hover:border-[#E5A93C] hover:text-[#13221C]'
              )}
            >
              <Star size={12} className="fill-[#E5A93C] text-[#E5A93C]" />
              Top Rated 4.6+
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('fast')}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1',
                activeTab === 'fast'
                  ? 'bg-[#0F3A2E] text-white shadow-md'
                  : 'bg-white border border-[#DFE7E2] text-[#4D6158] hover:border-[#0F3A2E] hover:text-[#0F3A2E]'
              )}
            >
              <Clock size={12} />
              Fast Delivery
            </button>
          </div>
        </div>

        {/* 4-Column Responsive Grid with 16-24px rounded cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const cartItem = cartItems.find((i) => i.productId === p.id);
            const inCart = !!cartItem;
            const wishlisted = isWishlisted(p.id);

            return (
              <div
                key={p.id}
                className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-[#DFE7E2] shadow-[0_8px_24px_-4px_rgba(15,58,46,0.06)] hover:shadow-[0_20px_40px_-8px_rgba(15,58,46,0.12)] hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image Wrap */}
                <Link to={`/product/${p.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-[#F7F9F6]">
                  <img
                    src={p.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-60 pointer-events-none" />

                  {/* Veg / Non-Veg Indicator */}
                  <div className="absolute top-3 left-3 z-10">
                    <div
                      className={cn(
                        'w-5 h-5 rounded-md border-2 bg-white/95 backdrop-blur-md flex items-center justify-center p-0.5 shadow-xs',
                        p.isVeg ? 'border-[#25A18E]' : 'border-[#B83A3A]'
                      )}
                      title={p.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    >
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full',
                          p.isVeg ? 'bg-[#25A18E]' : 'bg-[#B83A3A]'
                        )}
                      />
                    </div>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => handleWishlist(e, p.id, p.title)}
                    className={cn(
                      'absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/95 backdrop-blur-md border border-[#DFE7E2] shadow-xs hover:scale-110 active:scale-95',
                      wishlisted ? 'text-[#E5A93C]' : 'text-[#73887F] hover:text-[#E5A93C]'
                    )}
                    aria-label="Save to favourites"
                  >
                    <Heart size={15} className={wishlisted ? 'fill-[#E5A93C]' : ''} />
                  </button>

                  {/* ETA & Rating Floating Pills */}
                  <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
                    <div className="bg-white/95 backdrop-blur-md border border-[#DFE7E2] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#13221C] shadow-xs flex items-center gap-1">
                      <Clock size={12} className="text-[#0F3A2E]" />
                      <span>{p.prepTime || '20–25 mins'}</span>
                    </div>

                    {p.rating > 0 && (
                      <div className="bg-[#E5A93C] text-white px-2.5 py-0.5 rounded-full text-[11px] font-black shadow-xs flex items-center gap-1">
                        <span>{p.rating}</span>
                        <Star size={10} className="fill-white" />
                      </div>
                    )}
                  </div>
                </Link>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#73887F]">
                      {p.brand}
                    </span>
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="font-extrabold text-base text-[#13221C] group-hover:text-[#0F3A2E] transition-colors line-clamp-1 mt-0.5" title={p.title}>
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#73887F] mt-1 line-clamp-1">
                      {p.portionSize || 'Serves 1-2'} • Freshly prepared
                    </p>
                  </div>

                  {/* Price & Add Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#EBF0ED] mt-auto">
                    <div>
                      <div className="text-base sm:text-lg font-black text-[#13221C]">
                        {formatPrice(p.price)}
                      </div>
                      {p.mrp > p.price && (
                        <div className="text-[11px] text-[#73887F] line-through">
                          {formatPrice(p.mrp)}
                        </div>
                      )}
                    </div>

                    {!inCart ? (
                      <button
                        type="button"
                        onClick={(e) => handleAdd(e, p)}
                        className="pill-btn-primary px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95"
                      >
                        <Plus size={14} className="stroke-[3]" />
                        <span>ADD</span>
                      </button>
                    ) : (
                      <div className="flex items-center bg-[#0F3A2E] text-white rounded-full overflow-hidden shadow-sm">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (cartItem.quantity <= 1) {
                              removeItem(cartItem.productId, cartItem.size);
                            } else {
                              updateQuantity(cartItem.productId, cartItem.size, cartItem.quantity - 1);
                            }
                          }}
                          className="px-2.5 py-1.5 hover:bg-black/20 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} className="stroke-[3]" />
                        </button>
                        <span className="px-2 text-xs font-black min-w-[20px] text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateQuantity(cartItem.productId, cartItem.size, cartItem.quantity + 1);
                          }}
                          className="px-2.5 py-1.5 hover:bg-black/20 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} className="stroke-[3]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            to="/search"
            className="pill-btn-secondary px-8 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider inline-flex items-center gap-2 shadow-xs"
          >
            <span>Explore All 5,000+ Dishes</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

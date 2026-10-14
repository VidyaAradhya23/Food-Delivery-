import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Sparkles, ArrowRight, Tag, Star, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useToastStore } from '../../store/useToastStore';

export const FeaturedDealsBanner: React.FC = () => {
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();

  // Dynamic countdown timer for urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOrderDealDish = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: 'deal-smoky-bbq-pizza',
      title: 'Truffle & Smoked Mozzarella Woodfired Feast',
      brand: 'Naples Fire Kitchen',
      restaurantName: 'Naples Fire Kitchen',
      size: '12" Large',
      color: 'Hand Tossed',
      quantity: 1,
      mrp: 699,
      price: 349,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
      slug: 'truffle-woodfired-feast',
      maxStock: 10,
      isVeg: true,
    });
    showToast('Deal added! Truffle Woodfired Feast is in your bag for ₹349 (50% OFF).', 'success');
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container-app">
        <div className="relative rounded-[28px] md:rounded-[36px] bg-[#13221C] text-[#F7F9F6] overflow-hidden p-6 sm:p-10 lg:p-14 border border-white/10 shadow-2xl">
          {/* Ambient colored glowing orbs */}
          <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#0F3A2E]/40 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-[350px] h-[350px] bg-[#E5A93C]/20 rounded-full blur-[120px] pointer-events-none" />

          {/* Background subtle diagonal stripe pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge strip */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5A93C] text-[#13221C] font-extrabold text-xs tracking-wider uppercase shadow-md">
                  <Sparkles size={14} className="fill-[#13221C]" />
                  Today's Chef Special
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white/90 font-medium text-xs backdrop-blur-md border border-white/10">
                  <Tag size={12} className="text-[#25A18E]" />
                  Use Code: <span className="font-bold text-[#E5A93C]">GOURMET50</span>
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
                  Flat <span className="text-[#E5A93C]">50% OFF</span> on Artisanal Woodfired Pies
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl">
                  Slow-fermented sourdough, imported San Marzano tomato sauce, fresh buffalo mozzarella, and aromatic basil leaves. Baked at 450°C.
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="inline-flex items-center gap-3 p-3 sm:px-5 sm:py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-xs text-white/70">
                  <Clock size={16} className="text-[#E5A93C] animate-pulse" />
                  <span className="font-semibold uppercase tracking-wider text-[11px]">Deal Expires In:</span>
                </div>
                <div className="flex items-center gap-2 font-mono font-bold text-sm sm:text-base text-white">
                  <span className="px-2 py-1 bg-white/10 rounded-md">
                    {String(timeLeft.hours).padStart(2, '0')}h
                  </span>
                  <span>:</span>
                  <span className="px-2 py-1 bg-white/10 rounded-md">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </span>
                  <span>:</span>
                  <span className="px-2 py-1 bg-white/10 rounded-md text-[#E5A93C]">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black font-display text-white">₹349</span>
                  <span className="text-lg text-white/40 line-through">₹699</span>
                  <span className="text-xs font-bold text-[#25A18E] bg-[#25A18E]/20 px-2.5 py-0.5 rounded-full">
                    SAVE ₹350
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleOrderDealDish}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#E5A93C] hover:bg-[#CF942E] text-[#13221C] font-black text-sm shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    <ShoppingBag size={17} />
                    <span>Claim Deal Now</span>
                  </button>
                  <Link
                    to="/search?category=pizzas"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all"
                  >
                    <span>View All Deals</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Food Visual Collage */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-[380px] aspect-square">
                {/* Glow ring */}
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#E5A93C]/30 animate-spin-slow pointer-events-none" />

                {/* Main Food Photo in circular soft frame */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/15 shadow-2xl group">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80"
                    alt="Artisanal Woodfired Pizza"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Badge 1: Rating */}
                <div className="absolute -top-2 -left-2 bg-white text-[#13221C] px-4 py-2 rounded-2xl shadow-xl border border-white/20 flex items-center gap-2 animate-bounce-gentle">
                  <div className="w-6 h-6 rounded-full bg-[#E5A93C] text-white flex items-center justify-center">
                    <Star size={12} className="fill-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black">4.9 / 5</p>
                    <p className="text-[10px] text-[#73887F]">Chef Choice</p>
                  </div>
                </div>

                {/* Floating Badge 2: Fresh Baked */}
                <div className="absolute -bottom-3 right-0 bg-[#F7F9F6] text-[#13221C] px-4 py-2 rounded-2xl shadow-xl border border-[#DFE7E2] flex items-center gap-2">
                  <Sparkles size={16} className="text-[#E5A93C]" />
                  <div>
                    <p className="text-xs font-black">Woodfired at 450°C</p>
                    <p className="text-[10px] text-[#25A18E] font-semibold">Ready in 20 mins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

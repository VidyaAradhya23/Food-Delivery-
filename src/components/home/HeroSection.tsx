import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Star, Clock, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      navigate(`/search?q=${encodeURIComponent(address.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const quickCuisines = [
    { label: 'Biryani', icon: '🍛', href: '/search?category=biryani' },
    { label: 'Artisan Pizza', icon: '🍕', href: '/search?category=pizzas' },
    { label: 'Smash Burgers', icon: '🍔', href: '/search?category=burgers' },
    { label: 'North Indian', icon: '🥘', href: '/search?category=north-indian' },
    { label: 'Desserts', icon: '🍰', href: '/search?category=desserts' },
  ];

  return (
    <section className="relative pt-6 pb-14 md:pt-12 md:pb-20 overflow-hidden">
      {/* Background Soft Organic Radial Blobs */}
      <div className="absolute top-0 right-10 w-[550px] h-[550px] bg-[#0F3A2E]/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-[450px] h-[450px] bg-[#E5A93C]/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
        {/* Left Column: Big Headline & Search Bar */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F4F0] border border-[#DFE7E2] text-xs font-extrabold text-[#0F3A2E] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0F3A2E] animate-ping" />
            <Sparkles size={14} className="text-[#E5A93C]" />
            <span className="tracking-wide uppercase">Farm-to-Table Fresh • 25-Min Delivery</span>
          </div>

          {/* Big Bold Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-[#13221C] leading-[1.12]">
            Craving artisan food? <br />
            <span className="text-[#0F3A2E] relative inline-block">
              We deliver it hot
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E5A93C]/40" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>{' '}
            & fresh.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#4D6158] font-normal max-w-xl leading-relaxed">
            Order chef-curated delicacies from 5,000+ top kitchens across the city.
            Zero contact delivery, live GPS tracking, and piping hot guaranteed.
          </p>

          {/* Address search bar + "Find Food" button */}
          <form
            onSubmit={handleSearch}
            className="p-2 sm:p-2.5 bg-white border border-[#DFE7E2] rounded-full shadow-[0_12px_36px_-6px_rgba(15,58,46,0.08)] flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl transition-all focus-within:border-[#0F3A2E] focus-within:ring-4 focus-within:ring-[#0F3A2E]/10"
          >
            <div className="flex items-center gap-3 px-3 py-2 flex-1">
              <MapPin size={20} className="text-[#0F3A2E] shrink-0" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter delivery address, dish or gourmet kitchen..."
                className="w-full text-xs sm:text-sm bg-transparent outline-none text-[#13221C] placeholder-[#73887F] font-medium"
              />
            </div>
            <button
              type="submit"
              className="pill-btn-primary px-7 py-3 text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-102 active:scale-98"
            >
              <span>Find Food</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Popular Cuisine Tags */}
          <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#73887F] font-semibold">Popular right now:</span>
            {quickCuisines.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.href)}
                className="px-3 py-1 rounded-full bg-white border border-[#DFE7E2] text-[#13221C] hover:border-[#0F3A2E] hover:text-[#0F3A2E] hover:shadow-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Trust Metrics Bar */}
          <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#DFE7E2]/80 max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-black font-display text-[#13221C]">5,000+</div>
              <div className="text-xs text-[#73887F] font-medium">Top Kitchens</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-display text-[#0F3A2E]">25 Mins</div>
              <div className="text-xs text-[#73887F] font-medium">Average Delivery</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-display text-[#E5A93C]">4.9 / 5</div>
              <div className="text-xs text-[#73887F] font-medium">Customer Love</div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Food Image Collage & Floating Cutouts */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            {/* Outer Decorative Gradient Ring */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#0F3A2E]/15 via-[#FDF6E9] to-[#25A18E]/15 border-2 border-dashed border-[#DFE7E2] pointer-events-none" />

            {/* Main Central Appetizing Dish Plate */}
            <div className="relative z-10 w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 rounded-full overflow-hidden shadow-[0_25px_60px_-15px_rgba(15,58,46,0.25)] border-8 border-white group">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80"
                alt="Gourmet Double Smash Burger"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 inset-x-0 text-center text-white drop-shadow-md">
                <span className="text-[11px] font-black uppercase tracking-widest bg-[#0F3A2E] text-white border border-[#E5A93C]/40 px-3 py-1 rounded-full shadow-md">
                  ★ Chef's Special
                </span>
              </div>
            </div>

            {/* Floating Cutout 1: 25 Mins Delivery ETA */}
            <div className="absolute -top-3 -left-3 sm:-left-6 z-20 bg-white border border-[#DFE7E2] rounded-2xl p-3 shadow-[0_12px_28px_rgba(15,58,46,0.1)] flex items-center gap-3 animate-float-slow">
              <div className="w-10 h-10 rounded-full bg-[#E8F4F0] text-[#0F3A2E] flex items-center justify-center font-bold">
                <Clock size={20} />
              </div>
              <div>
                <div className="text-[10px] text-[#73887F] font-bold uppercase tracking-wider">Fast Dispatch</div>
                <div className="text-sm font-black text-[#13221C]">20–25 Mins</div>
              </div>
            </div>

            {/* Floating Cutout 2: High Rating Badge */}
            <div className="absolute -bottom-2 -left-2 sm:-left-4 z-20 bg-white border border-[#DFE7E2] rounded-2xl p-3 shadow-[0_12px_28px_rgba(15,58,46,0.1)] flex items-center gap-2.5 animate-float-reverse">
              <div className="w-9 h-9 rounded-full bg-[#E5A93C] text-white flex items-center justify-center font-bold shadow-xs">
                <Star size={18} className="fill-white" />
              </div>
              <div>
                <div className="text-sm font-black text-[#13221C] flex items-center gap-1">
                  <span>4.9</span>
                  <span className="text-xs text-[#E5A93C]">★★★★★</span>
                </div>
                <div className="text-[10px] text-[#73887F] font-semibold">12,500+ happy foodies</div>
              </div>
            </div>

            {/* Floating Cutout 3: Flat 50% OFF Pill */}
            <div className="absolute top-1/4 -right-4 sm:-right-8 z-20 bg-[#13221C] text-white border border-[#E5A93C]/40 rounded-2xl p-3 shadow-xl animate-float-slow">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#E5A93C]">
                <Sparkles size={16} className="fill-[#E5A93C]" />
                <span>FLAT 50% OFF</span>
              </div>
              <div className="text-[11px] text-[#DFE7E2] font-medium mt-0.5">Code: GOURMET50</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

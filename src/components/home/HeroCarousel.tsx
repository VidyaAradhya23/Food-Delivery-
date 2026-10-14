import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { Banner } from '../../types';
import { Button } from '../ui/Button';

interface HeroCarouselProps {
  banners: Banner[];
  autoSlideInterval?: number;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  banners,
  autoSlideInterval = 5000,
}) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  }, [banners.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const timer = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(timer);
  }, [isPaused, banners.length, autoSlideInterval, nextSlide]);

  if (!banners || banners.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl shadow-[0_12px_36px_-8px_rgba(0,0,0,0.12)] my-6 group select-none border border-slate-200/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="w-full flex-shrink-0 relative min-h-[280px] sm:min-h-[360px] md:min-h-[440px] flex items-center p-6 sm:p-12 md:p-16 overflow-hidden"
            style={{
              background: banner.gradient || 'linear-gradient(135deg, #e23744 0%, #c62828 100%)',
              color: banner.textColor || '#ffffff',
            }}
          >
            {/* Background Image with Vibrant Blend */}
            {banner.image && (
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 transition-transform duration-1000"
              />
            )}

            {/* Radiant Directional Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent pointer-events-none" />

            {/* Content Box */}
            <div className="relative z-10 max-w-xl space-y-3.5 sm:space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-white backdrop-blur-xl shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                ✦ ZOMATO EXPRESS & CURATED FEASTS ✦
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md font-display leading-[1.15] text-white">
                {banner.title}
              </h1>
              <p className="text-sm sm:text-lg text-slate-300 font-medium max-w-md leading-relaxed drop-shadow-sm">
                {banner.subtitle}
              </p>
              <div className="pt-2">
                <Link to={banner.href}>
                  <Button
                    variant="accent"
                    size="lg"
                    className="shadow-[0_0_30px_rgba(255,30,86,0.55)] hover:shadow-[0_0_45px_rgba(255,30,86,0.8)] hover:scale-105 active:scale-95 transition-all bg-gradient-to-r from-[#ff1e56] to-[#d90429] hover:from-[#ff386e] hover:to-[#ff1e56] text-white font-black tracking-wider border border-[#ff3b6f]/50 rounded-xl"
                    icon={<ArrowRight size={18} />}
                  >
                    {banner.cta || 'Order Now'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next Controls */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-rose-500/20 text-white hover:text-rose-400 flex items-center justify-center backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all shadow-md"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-rose-500/20 text-white hover:text-rose-400 flex items-center justify-center backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all shadow-md"
      >
        <ChevronRight size={22} />
      </button>

      {/* Slide Dots Indicator */}
      <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === i ? 'w-8 bg-gradient-to-r from-[#ff1e56] to-amber-400 shadow-[0_0_15px_rgba(255,30,86,0.9)]' : 'w-2 bg-white/20 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

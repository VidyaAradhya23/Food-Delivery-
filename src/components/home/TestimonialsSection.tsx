import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Heart, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  role: string;
  rating: number;
  dishLoved: string;
  comment: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Aanya Sharma',
    location: 'Indiranagar, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    role: 'Food Blogger & Designer',
    rating: 5,
    dishLoved: 'Hyderabadi Dum Biryani',
    comment:
      'CraveDash completely raised my standards. The biryani arrived boiling hot in under 22 minutes! The thermo-seal packaging kept all the saffron aroma intact. My everyday go-to.',
  },
  {
    id: '2',
    name: 'Rohan Deshmukh',
    location: 'Koramangala, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    role: 'Tech Lead & Pizza Fanatic',
    rating: 5,
    dishLoved: 'Truffle Woodfired Pizza',
    comment:
      'The crust had proper leopard spotting and the burrata was creamy and fresh. Most food delivery apps give you soggy dough, but CraveDash delivers like you are sitting right inside the pizzeria.',
  },
  {
    id: '3',
    name: 'Priyanka Iyer',
    location: 'HSR Layout, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    role: 'Fitness Coach',
    rating: 5,
    dishLoved: 'Mediterranean Grilled Bowl',
    comment:
      'Their Pure Veg and healthy meal filters are insanely accurate. Transparent nutrition info, crisp veggies, zero oil spills, and couriers who always follow contactless instructions.',
  },
  {
    id: '4',
    name: 'Vikramaditya Sen',
    location: 'Whitefield, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    role: 'Product Manager',
    rating: 5,
    dishLoved: 'Double Smash Cheeseburger',
    comment:
      'Late-night cravings at 1:30 AM saved! Delivered in 24 minutes flat with crisp fries and ice-cold soda. The UI is ridiculously sleek and fast.',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeReview = TESTIMONIALS[currentIndex];

  return (
    <section className="py-14 md:py-20 bg-white/70 border-t border-[#DFE7E2]/70 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#0F3A2E]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#E5A93C]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-app relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F4F0] border border-[#DFE7E2] text-xs font-bold text-[#0F3A2E]">
              <Heart size={13} className="fill-[#E5A93C] text-[#E5A93C]" />
              <span className="uppercase tracking-wider">Loved by 250,000+ Foodies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-[#13221C] tracking-tight">
              What Food Lovers Say
            </h2>
            <p className="text-sm sm:text-base text-[#4D6158]">
              Real stories from everyday customers who refuse to compromise on hot, fresh meals.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full bg-white border border-[#DFE7E2] text-[#13221C] hover:bg-[#F7F9F6] hover:border-[#0F3A2E] hover:text-[#0F3A2E] flex items-center justify-center transition-all shadow-xs active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full bg-[#0F3A2E] text-white hover:bg-[#092820] flex items-center justify-center transition-all shadow-md active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Highlighted Review Card Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-[#FCFDFB] border border-[#DFE7E2] rounded-[28px] p-8 sm:p-12 shadow-xl relative overflow-hidden transition-all duration-500">
            {/* Top decorative quotation mark */}
            <div className="absolute top-6 right-8 text-[#0F3A2E]/8 pointer-events-none">
              <Quote size={80} />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Rating Stars + Dish Tag */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#E5A93C] text-[#E5A93C]" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-[#13221C]">5.0 Verified Order</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F7F5] text-[#25A18E] text-xs font-bold border border-[#25A18E]/25">
                  <CheckCircle2 size={13} />
                  <span>Crave: {activeReview.dishLoved}</span>
                </div>
              </div>

              {/* Quote Body */}
              <blockquote className="text-lg sm:text-2xl font-medium text-[#13221C] leading-relaxed italic">
                "{activeReview.comment}"
              </blockquote>

              {/* Author Info */}
              <div className="pt-6 border-t border-[#DFE7E2]/60 flex items-center gap-4">
                <img
                  src={activeReview.avatar}
                  alt={activeReview.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#E5A93C] shadow-xs"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-base font-bold text-[#13221C] flex items-center gap-1.5">
                    {activeReview.name}
                    <CheckCircle2 size={15} className="text-[#25A18E]" />
                  </h4>
                  <p className="text-xs text-[#73887F] font-medium">{activeReview.role} • {activeReview.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-[#0F3A2E]' : 'w-2.5 bg-[#DFE7E2] hover:bg-[#73887F]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

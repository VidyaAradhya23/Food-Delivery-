import React, { useEffect, useState } from 'react';
import { SEO } from '../components/ui/SEO';
import { HeroSection } from '../components/home/HeroSection';
import { CuisineScroll } from '../components/home/CuisineScroll';
import { PopularNearYou } from '../components/home/PopularNearYou';
import { HowItWorks } from '../components/home/HowItWorks';
import { FeaturedDealsBanner } from '../components/home/FeaturedDealsBanner';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { AppDownloadSection } from '../components/home/AppDownloadSection';
import { getAllProducts } from '../services/api/products';
import type { Product } from '../types';

export const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const allProds = await getAllProducts();
        if (isMounted) {
          setProducts(allProds);
        }
      } catch (err) {
        console.error('Failed to load homepage dishes', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="CraveDash — Crave It. Order It. Delivered Fast & Fresh"
        description="Order chef-curated dishes from 5,000+ top kitchens across the city. Superfast 25-minute doorstep delivery, live GPS tracking, and pure veg options."
      />

      <div className="relative overflow-hidden bg-[#F7F9F6] text-[#13221C]">
        {/* Soft Organic Ambient Blobs */}
        <div className="absolute top-1/4 -left-32 w-[650px] h-[650px] bg-[#0F3A2E]/4 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-2/3 -right-32 w-[650px] h-[650px] bg-[#E5A93C]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* 2. Split hero: big headline, subtext, address search bar + 'Find Food' button, food collage on right */}
        <HeroSection />

        {/* 3. Horizontally scrollable cuisine category icons */}
        <CuisineScroll />

        {/* 4. 'Popular Near You' restaurant cards (image, rating, delivery time, price) */}
        {loading ? (
          <section className="py-12 md:py-16">
            <div className="container-app space-y-6">
              <div className="h-8 w-64 bg-[#DFE7E2]/50 rounded-xl animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-72 rounded-[24px] bg-[#DFE7E2]/40 animate-pulse border border-[#DFE7E2]" />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <PopularNearYou products={products} />
        )}

        {/* 5. 'How It Works' in 3 steps */}
        <HowItWorks />

        {/* 6. Today's deals / featured dish banner with bold contrasting background */}
        <FeaturedDealsBanner />

        {/* 7. Testimonials carousel */}
        <TestimonialsSection />

        {/* 8. App download CTA section */}
        <AppDownloadSection />
      </div>
    </>
  );
};

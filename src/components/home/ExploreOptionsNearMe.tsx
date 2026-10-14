import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/helpers';

interface AccordionSection {
  id: string;
  title: string;
  items: { label: string; href: string }[];
}

const SECTIONS: AccordionSection[] = [
  {
    id: 'cuisines',
    title: 'Popular cuisines near me',
    items: [
      { label: 'Bakery food near me', href: '/search?category=desserts' },
      { label: 'Biryani food near me', href: '/search?category=biryani' },
      { label: 'Burger food near me', href: '/search?category=burgers' },
      { label: 'Chinese food near me', href: '/search?category=chinese' },
      { label: 'Desserts food near me', href: '/search?category=desserts' },
      { label: 'Ice Cream food near me', href: '/search?category=desserts' },
      { label: 'North Indian food near me', href: '/search?category=north-indian' },
      { label: 'Pizza food near me', href: '/search?category=pizzas' },
      { label: 'Rolls food near me', href: '/search?category=rolls' },
      { label: 'South Indian food near me', href: '/search?category=south-indian' },
      { label: 'Street food near me', href: '/search' },
    ],
  },
  {
    id: 'types',
    title: 'Popular restaurant types near me',
    items: [
      { label: 'Bakeries near me', href: '/search?category=desserts' },
      { label: 'Bars & Pubs near me', href: '/search?nightlife=1' },
      { label: 'Beverage Shops near me', href: '/search' },
      { label: 'Cafés near me', href: '/search' },
      { label: 'Dessert Parlours near me', href: '/search?category=desserts' },
      { label: 'Fine Dining near me', href: '/search?dining=1' },
      { label: 'Food Courts near me', href: '/search' },
      { label: 'Quick Bites near me', href: '/search?category=burgers' },
    ],
  },
  {
    id: 'chains',
    title: 'Top Restaurant Chains',
    items: [
      { label: "Domino's Pizza", href: '/search?brand=Dominos' },
      { label: 'KFC', href: '/search?brand=KFC' },
      { label: "McDonald's", href: '/search?brand=McDonalds' },
      { label: 'Pizza Hut', href: '/search?brand=PizzaHut' },
      { label: 'Subway', href: '/search?brand=Subway' },
      { label: 'Burger King', href: '/search?brand=BurgerKing' },
      { label: "Haldiram's", href: '/search?brand=Haldirams' },
      { label: 'Biryani By Kilo', href: '/search?brand=BiryaniByKilo' },
    ],
  },
  {
    id: 'cities',
    title: 'Cities We Deliver To',
    items: [
      { label: 'Bengaluru', href: '#' },
      { label: 'Delhi NCR', href: '#' },
      { label: 'Mumbai', href: '#' },
      { label: 'Hyderabad', href: '#' },
      { label: 'Chennai', href: '#' },
      { label: 'Pune', href: '#' },
      { label: 'Kolkata', href: '#' },
      { label: 'Ahmedabad', href: '#' },
      { label: 'Chandigarh', href: '#' },
      { label: 'Jaipur', href: '#' },
    ],
  },
];

export const ExploreOptionsNearMe: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    cuisines: false,
    types: false,
    chains: false,
    cities: false,
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="my-14 space-y-4">
      <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-display mb-4">
        Explore options near me
      </h2>

      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const isOpen = openIds[section.id];
          return (
            <div
              key={section.id}
              className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden hover:border-[#e23744]/40 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.04)]"
            >
              <button
                type="button"
                onClick={() => toggle(section.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-slate-800 hover:text-[#e23744] transition-colors focus-visible:outline-none"
              >
                <span>{section.title}</span>
                <ChevronDown
                  size={18}
                  className={cn(
                    'text-slate-400 transition-transform duration-300 shrink-0',
                    isOpen && 'rotate-180 text-[#e23744]'
                  )}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 animate-fade-in">
                  <div className="flex flex-wrap gap-x-2.5 gap-y-2 text-xs text-slate-500">
                    {section.items.map((item, idx) => (
                      <React.Fragment key={item.label}>
                        <Link
                          to={item.href}
                          className="hover:text-[#e23744] hover:underline transition-colors"
                        >
                          {item.label}
                        </Link>
                        {idx < section.items.length - 1 && (
                          <span className="text-slate-300">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

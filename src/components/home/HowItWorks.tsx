import React from 'react';
import { Utensils, Zap, Smile, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Pick your cravings',
      description: 'Explore curated menus from 5,000+ verified chef kitchens, from aromatic biryanis to woodfired truffle pizzas.',
      icon: Utensils,
      highlight: '5,000+ Menus',
      badgeBg: 'bg-[#E8F4F0]',
      badgeColor: 'text-[#0F3A2E]',
      iconBg: 'bg-[#E8F4F0]',
      iconColor: 'text-[#0F3A2E]',
    },
    {
      step: '02',
      title: 'Express live dispatch',
      description: 'Chefs prepare your meal fresh on order while our insulated express couriers race with live GPS tracking.',
      icon: Zap,
      highlight: 'Avg. 25 Mins',
      badgeBg: 'bg-[#E9F7F5]',
      badgeColor: 'text-[#25A18E]',
      iconBg: 'bg-[#E9F7F5]',
      iconColor: 'text-[#25A18E]',
    },
    {
      step: '03',
      title: 'Enjoy piping hot',
      description: 'Delivered in tamper-proof thermo-sealed packaging so every aroma and bite tastes kitchen-fresh.',
      icon: Smile,
      highlight: '100% Fresh Guarantee',
      badgeBg: 'bg-[#FDF6E9]',
      badgeColor: 'text-[#C2821A]',
      iconBg: 'bg-[#FDF6E9]',
      iconColor: 'text-[#C2821A]',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-white/70 border-y border-[#DFE7E2]/70 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#0F3A2E]/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-[#E5A93C]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container-app relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F4F0] border border-[#DFE7E2] text-xs font-bold text-[#0F3A2E]">
            <ShieldCheck size={14} />
            <span className="uppercase tracking-wider">Fast & Hassle-Free</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-[#13221C] tracking-tight">
            How CraveDash Works
          </h2>
          <p className="text-sm sm:text-base text-[#4D6158] leading-relaxed">
            From the pan to your plate in 3 simple steps. No cold food, no delayed orders, ever.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative bg-[#FCFDFB] border border-[#DFE7E2] rounded-[24px] p-7 sm:p-8 hover:border-[#0F3A2E]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step indicator watermark */}
                <div className="absolute top-5 right-6 text-4xl sm:text-5xl font-black font-display text-[#13221C]/6 select-none group-hover:text-[#0F3A2E]/15 transition-colors">
                  {item.step}
                </div>

                <div className="space-y-5">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon size={26} strokeWidth={2.2} />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${item.badgeBg} ${item.badgeColor} border border-[#DFE7E2]/60`}>
                      {item.highlight}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-display text-[#13221C] group-hover:text-[#0F3A2E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4D6158] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom step progress connector pill */}
                <div className="mt-6 pt-4 border-t border-[#DFE7E2]/60 flex items-center justify-between text-xs font-semibold text-[#73887F]">
                  <span>Step {idx + 1} of 3</span>
                  <span className="w-8 h-1 rounded-full bg-[#DFE7E2] group-hover:bg-[#0F3A2E] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <Link
            to="/search"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0F3A2E] hover:bg-[#092820] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <span>Start Your Order Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

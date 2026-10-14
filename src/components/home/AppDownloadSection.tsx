import React, { useState } from 'react';
import { Smartphone, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { useToastStore } from '../../store/useToastStore';

export const AppDownloadSection: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sent, setSent] = useState(false);
  const { showToast } = useToastStore();

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 10) {
      setSent(true);
      showToast('Download link sent to your phone via SMS!', 'success');
      setPhoneNumber('');
      setTimeout(() => setSent(false), 5000);
    } else {
      showToast('Please enter a valid 10-digit mobile number', 'error');
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container-app">
        <div className="relative rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#E8F4F0] via-[#FCFDFB] to-[#FDF6E9] border border-[#DFE7E2] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0F3A2E]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E5A93C]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center relative z-10">
            {/* Left Column: Text & Download actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DFE7E2] text-xs font-bold text-[#0F3A2E] shadow-xs">
                <Smartphone size={15} />
                <span className="uppercase tracking-wider">CraveDash Pocket App</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#13221C] tracking-tight leading-tight">
                Get the CraveDash App for exclusive offers.
              </h2>

              <p className="text-sm sm:text-base text-[#4D6158] leading-relaxed max-w-xl">
                Experience ultra-smooth live delivery tracking, 1-tap reordering, app-only flash deals, and priority customer care right on your fingertips.
              </p>

              {/* App feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#13221C]">
                  <CheckCircle2 size={18} className="text-[#25A18E] flex-shrink-0" />
                  <span>Real-time GPS rider tracking</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#13221C]">
                  <CheckCircle2 size={18} className="text-[#25A18E] flex-shrink-0" />
                  <span>Exclusive ₹150 OFF first order</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#13221C]">
                  <CheckCircle2 size={18} className="text-[#25A18E] flex-shrink-0" />
                  <span>Zero delivery fees above ₹199</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#13221C]">
                  <CheckCircle2 size={18} className="text-[#25A18E] flex-shrink-0" />
                  <span>Seamless 1-tap UPI checkout</span>
                </div>
              </div>

              {/* SMS Input Form */}
              <form onSubmit={handleSendLink} className="pt-2 max-w-md">
                <label className="block text-xs font-bold text-[#13221C] mb-2 uppercase tracking-wider">
                  Get app link sent directly to your phone
                </label>
                <div className="flex items-center gap-2 p-1.5 rounded-full bg-white border-2 border-[#DFE7E2] focus-within:border-[#0F3A2E] shadow-sm transition-all">
                  <span className="pl-4 text-xs font-bold text-[#13221C] border-r border-[#DFE7E2] pr-2.5">+91</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit number"
                    className="w-full bg-transparent px-2 text-sm text-[#13221C] placeholder-[#73887F] focus:outline-none font-medium"
                    maxLength={10}
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0F3A2E] hover:bg-[#092820] text-white text-xs font-bold transition-all shadow-md active:scale-95"
                  >
                    <span>{sent ? 'Sent!' : 'Send Link'}</span>
                    <Send size={13} />
                  </button>
                </div>
              </form>

              {/* App Store / Google Play badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#playstore"
                  onClick={(e) => { e.preventDefault(); showToast('Redirecting to Google Play Store...', 'info'); }}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#13221C] hover:bg-[#1D3129] text-white border border-white/10 shadow-md transition-all active:scale-95 group"
                >
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-.926V2.74c0-.348.118-.686.33-1.026l.279.1zM14.852 13.06l2.368 2.368-12.87 7.43a2.002 2.002 0 0 0 .5-.102l10.002-9.696zm2.368-2.12L14.852 8.572 4.85 1.144a2.008 2.008 0 0 0-.5-.102l12.87 7.898zm.94 1.06l3.526 2.035c.78.45.78 1.18 0 1.63L18.16 17.72 15.688 15.25l2.472-3.25z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-white/60 uppercase leading-none">Download on</p>
                    <p className="text-xs font-black tracking-wide">Google Play</p>
                  </div>
                </a>

                <a
                  href="#appstore"
                  onClick={(e) => { e.preventDefault(); showToast('Redirecting to Apple App Store...', 'info'); }}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#13221C] hover:bg-[#1D3129] text-white border border-white/10 shadow-md transition-all active:scale-95 group"
                >
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2 .6-2.65 1.35-.58.65-1.08 1.72-.94 2.76 1.01.08 2.06-.49 2.67-1.24z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-white/60 uppercase leading-none">Download on</p>
                    <p className="text-xs font-black tracking-wide">App Store</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Phone Mockup with floating live tracking */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-64 sm:w-72">
                {/* Modern Phone Frame Mockup */}
                <div className="relative bg-[#13221C] rounded-[44px] p-3 shadow-2xl border-4 border-[#1D3129]">
                  {/* Speaker Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20" />

                  {/* Inner Phone Screen */}
                  <div className="relative rounded-[36px] overflow-hidden bg-white text-[#13221C] aspect-[9/18]">
                    {/* Screen Image with food & app UI */}
                    <img
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80"
                      alt="CraveDash App Mockup"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Inside Phone Floating Card: Order Status */}
                    <div className="absolute bottom-5 inset-x-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-white/20 text-left">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase text-[#0F3A2E] bg-[#E8F4F0] px-2 py-0.5 rounded-full font-sans">
                          On the way 🛵
                        </span>
                        <span className="text-xs font-bold text-[#13221C]">8 mins left</span>
                      </div>
                      <p className="text-xs font-black text-[#13221C] truncate">Double Cheese Feast Burger</p>
                      <p className="text-[10px] text-[#73887F]">Rider Rajesh is 1.2 km away</p>
                    </div>
                  </div>
                </div>

                {/* Floating Rating Badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-[#DFE7E2] flex items-center gap-2 animate-bounce-gentle">
                  <div className="w-8 h-8 rounded-full bg-[#E5A93C] text-white flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#13221C]">4.8 Stars</p>
                    <p className="text-[10px] text-[#73887F]">100K+ Reviews</p>
                  </div>
                </div>

                {/* Floating Discount Tag */}
                <div className="absolute bottom-16 -left-6 bg-[#E5A93C] text-[#13221C] rounded-2xl px-4 py-2 shadow-xl flex items-center gap-1.5 animate-float-slow font-black">
                  <Sparkles size={14} className="fill-[#13221C]" />
                  <span className="text-xs font-black">₹150 OFF App Deal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

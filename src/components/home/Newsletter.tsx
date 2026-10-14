import React, { useState } from 'react';
import { Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [inputType, setInputType] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      setSent(true);
    }
  };

  return (
    <section className="my-14 bg-gradient-to-br from-[#fff5f5] via-[#fff9f0] to-[#fff1f2] text-slate-900 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-[0_12px_40px_-10px_rgba(226,55,68,0.12)] border border-rose-200/80">
      {/* Background Ambient Glows */}
      <div className="absolute -right-10 -bottom-10 w-96 h-96 rounded-full bg-rose-400/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-72 h-72 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 max-w-5xl mx-auto">
        {/* Left: App Showcase Visual */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-52 sm:w-60 aspect-[9/16] rounded-3xl bg-white border-4 border-slate-300 shadow-xl p-3 flex flex-col justify-between overflow-hidden group">
            {/* Phone Speaker Notch */}
            <div className="w-20 h-3 rounded-full bg-slate-200 mx-auto" />

            {/* Inner Phone UI Mockup */}
            <div className="space-y-3 pt-3 flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="font-black italic text-lg text-[#e23744]">zomato</span>
                <span className="text-[10px] bg-rose-50 text-[#e23744] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                  LIVE
                </span>
              </div>

              <div className="rounded-xl overflow-hidden aspect-video bg-slate-100 relative shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80"
                  alt="Zomato App Food"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 text-[9px] bg-black/70 text-white font-bold px-1.5 py-0.5 rounded">
                  20 MINS ETA
                </span>
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="h-3 w-3/4 rounded bg-slate-200" />
                <div className="h-2.5 w-1/2 rounded bg-slate-100" />
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                  ★ 4.9 (25,000+ Reviews)
                </div>
              </div>

              <div className="w-full py-2 bg-[#e23744] text-white text-[11px] font-black rounded-lg text-center uppercase tracking-wider shadow-sm">
                Order in 1-Click
              </div>
            </div>

            {/* Home Indicator */}
            <div className="w-16 h-1 rounded-full bg-slate-300 mx-auto mt-2" />
          </div>
        </div>

        {/* Right: App Download Form */}
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-[#e23744] text-xs font-bold uppercase tracking-wider">
            <Smartphone size={14} className="text-[#e23744]" />
            <span>Mobile App Experience</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-slate-900 leading-tight">
            Get the Zomato App
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
            We will send you a link, open it on your phone to download the app and unlock exclusive app-only flat 50% discount coupons.
          </p>

          {/* Radio toggle: Email or Phone */}
          <div className="flex items-center gap-6 text-xs text-slate-700 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="downloadType"
                checked={inputType === 'email'}
                onChange={() => {
                  setInputType('email');
                  setValue('');
                  setSent(false);
                }}
                className="accent-rose-500 w-4 h-4"
              />
              <span className="font-semibold">Email</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="downloadType"
                checked={inputType === 'phone'}
                onChange={() => {
                  setInputType('phone');
                  setValue('');
                  setSent(false);
                }}
                className="accent-rose-500 w-4 h-4"
              />
              <span className="font-semibold">Phone</span>
            </label>
          </div>

          {sent ? (
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-800 px-5 py-3 rounded-xl text-xs font-semibold animate-fade-in shadow-xs">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>Link sent successfully! Check your {inputType} to install the Zomato App.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md pt-1">
              <input
                type={inputType === 'email' ? 'email' : 'tel'}
                required
                placeholder={inputType === 'email' ? 'Enter your email address' : 'Enter 10-digit mobile number'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl text-xs bg-white border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#e23744] shadow-xs"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#e23744] to-[#c62828] hover:from-[#cb202d] hover:to-[#e23744] text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 shrink-0"
              >
                <span>Share App Link</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          {/* App Store Pills */}
          <div className="pt-2">
            <span className="text-[11px] text-slate-500 block mb-2 font-medium">Download app from</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer transition-all shadow-xs">
                <span className="text-xl"></span>
                <div className="text-left">
                  <span className="text-[8px] text-slate-500 block uppercase leading-none">Download on the</span>
                  <span className="text-xs font-bold text-slate-900 leading-tight">App Store</span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer transition-all shadow-xs">
                <span className="text-xl">▶</span>
                <div className="text-left">
                  <span className="text-[8px] text-slate-500 block uppercase leading-none">Get it on</span>
                  <span className="text-xs font-bold text-slate-900 leading-tight">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

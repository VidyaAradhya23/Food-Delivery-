import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Heart, Send, Sparkles } from 'lucide-react';
import { useToastStore } from '../../store/useToastStore';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToastStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      showToast('Welcome to CraveClub! Check your email for ₹150 OFF voucher.', 'success');
      setEmail('');
    } else {
      showToast('Please enter a valid email address.', 'error');
    }
  };

  return (
    <footer className="bg-[#13221C] text-[#F7F9F6] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#0F3A2E]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#E5A93C]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-app relative z-10 space-y-12">
        {/* Top Newsletter & Brand Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-center">
          <div className="lg:col-span-6 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-[#0F3A2E] border border-white/10 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Sparkles size={20} className="text-[#E5A93C] fill-[#E5A93C]" />
              </div>
              <span className="text-2xl font-black font-display tracking-tight text-white">
                Crave<span className="text-[#E5A93C]">Dash</span>
              </span>
            </Link>
            <p className="text-sm text-white/70 max-w-md leading-relaxed">
              Premium chef-crafted dining delivered steaming hot to your doorstep in 25 minutes. No cold meals. No compromises.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="space-y-2">
              <label className="block text-xs font-bold text-white uppercase tracking-wider">
                Join CraveClub & Unlock ₹150 OFF
              </label>
              <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/10 border border-white/15 focus-within:border-[#E5A93C] backdrop-blur-md transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for weekly perks"
                  className="w-full bg-transparent px-4 text-sm text-white placeholder-white/40 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#E5A93C] hover:bg-[#CF942E] text-[#13221C] text-xs font-black transition-all shadow-md active:scale-95"
                >
                  <span>Subscribe</span>
                  <Send size={13} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Multi-column Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs">
          {/* Column 1: Popular Cuisines */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider font-display">
              Popular Cuisines
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li><Link to="/search?category=biryani" className="hover:text-[#E5A93C] transition-colors">Dum Biryani</Link></li>
              <li><Link to="/search?category=pizzas" className="hover:text-[#E5A93C] transition-colors">Artisan Woodfired Pizza</Link></li>
              <li><Link to="/search?category=burgers" className="hover:text-[#E5A93C] transition-colors">Smash Gourmet Burgers</Link></li>
              <li><Link to="/search?category=north-indian" className="hover:text-[#E5A93C] transition-colors">North Indian Curries</Link></li>
              <li><Link to="/search?category=chinese" className="hover:text-[#E5A93C] transition-colors">Pan-Asian & Dimsums</Link></li>
              <li><Link to="/search?category=desserts" className="hover:text-[#E5A93C] transition-colors">Bakes & Gelatos</Link></li>
            </ul>
          </div>

          {/* Column 2: Top Dining Hubs */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider font-display">
              Delivery Hubs
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li><Link to="/search?location=Indiranagar" className="hover:text-[#E5A93C] transition-colors flex items-center gap-1.5"><MapPin size={12} className="text-[#E5A93C]" /> Indiranagar, BLR</Link></li>
              <li><Link to="/search?location=Koramangala" className="hover:text-[#E5A93C] transition-colors flex items-center gap-1.5"><MapPin size={12} className="text-[#E5A93C]" /> Koramangala, BLR</Link></li>
              <li><Link to="/search?location=HSR" className="hover:text-[#E5A93C] transition-colors flex items-center gap-1.5"><MapPin size={12} className="text-[#E5A93C]" /> HSR Layout, BLR</Link></li>
              <li><Link to="/search?location=Whitefield" className="hover:text-[#E5A93C] transition-colors flex items-center gap-1.5"><MapPin size={12} className="text-[#E5A93C]" /> Whitefield, BLR</Link></li>
              <li><Link to="/search?location=Jayanagar" className="hover:text-[#E5A93C] transition-colors flex items-center gap-1.5"><MapPin size={12} className="text-[#E5A93C]" /> Jayanagar, BLR</Link></li>
              <li><Link to="/search?location=CBD" className="hover:text-[#E5A93C] transition-colors flex items-center gap-1.5"><MapPin size={12} className="text-[#E5A93C]" /> MG Road & CBD</Link></li>
            </ul>
          </div>

          {/* Column 3: About CraveDash */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider font-display">
              Company
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li><Link to="/about" className="hover:text-[#E5A93C] transition-colors">Our Story & Mission</Link></li>
              <li><Link to="/careers" className="hover:text-[#E5A93C] transition-colors">Careers (We're Hiring!)</Link></li>
              <li><Link to="/kitchen-partner" className="hover:text-[#E5A93C] transition-colors">Partner as a Restaurant</Link></li>
              <li><Link to="/rider-partner" className="hover:text-[#E5A93C] transition-colors">Ride with CraveDash</Link></li>
              <li><Link to="/press" className="hover:text-[#E5A93C] transition-colors">Newsroom & Press Kit</Link></li>
              <li><Link to="/blog" className="hover:text-[#E5A93C] transition-colors">Food Culture Blog</Link></li>
            </ul>
          </div>

          {/* Column 4: Help & Contact */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider font-display">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li><Link to="/contact" className="hover:text-[#E5A93C] transition-colors">24/7 Live Support</Link></li>
              <li><Link to="/help" className="hover:text-[#E5A93C] transition-colors">Order Tracking FAQs</Link></li>
              <li><Link to="/refund-policy" className="hover:text-[#E5A93C] transition-colors">Instant Refund Guarantee</Link></li>
              <li><Link to="/safety" className="hover:text-[#E5A93C] transition-colors">FSSAI Hygiene Standards</Link></li>
              <li><Link to="/report-issue" className="hover:text-[#E5A93C] transition-colors">Report Order Issue</Link></li>
            </ul>
          </div>

          {/* Column 5: Trust & Socials */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider font-display">
              Follow Our Cravings
            </h4>
            <div className="flex items-center gap-2.5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E5A93C] hover:text-[#13221C] text-white flex items-center justify-center transition-all">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E5A93C] hover:text-[#13221C] text-white flex items-center justify-center transition-all">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E5A93C] hover:text-[#13221C] text-white flex items-center justify-center transition-all">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E5A93C] hover:text-[#13221C] text-white flex items-center justify-center transition-all">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-[#25A18E] bg-[#25A18E]/15 px-3 py-1.5 rounded-xl border border-[#25A18E]/30 font-semibold">
                <ShieldCheck size={16} />
                <span>100% Certified Kitchens</span>
              </div>
              <p className="text-[10px] text-white/50 leading-relaxed">
                Central Kitchen Hygiene Lic. #10019022009843
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} CraveDash Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/security" className="hover:text-white transition-colors">Security</Link>
            <span className="flex items-center gap-1 text-white/40">
              Made with <Heart size={12} className="text-[#E5A93C] fill-[#E5A93C]" /> for food lovers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

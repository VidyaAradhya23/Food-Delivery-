import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, User, MapPin, ChevronDown, LogOut, Package, Sparkles } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { cn } from '../../utils/helpers';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { toggleMobileDrawer, openSearch } = useUIStore();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const handleProfileMouseEnter = () => {
    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    setProfileDropdownOpen(true);
  };

  const handleProfileMouseLeave = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setProfileDropdownOpen(false);
    }, 200);
  };

  const [selectedLocation, setSelectedLocation] = useState('Indiranagar, Bengaluru');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [isVegOnly, setIsVegOnly] = useState(false);

  const locations = [
    'Indiranagar, Bengaluru',
    'Koramangala 4th Block, Bengaluru',
    'HSR Layout Sector 2, Bengaluru',
    'Whitefield, Bengaluru',
    'Powai, Mumbai',
    'Connaught Place, New Delhi',
  ];

  const handleToggleVeg = () => {
    const next = !isVegOnly;
    setIsVegOnly(next);
    if (next) {
      navigate('/search?veg=1');
    } else {
      navigate('/search');
    }
  };

  return (
    <header className="sticky top-0 z-sticky bg-[#F7F9F6]/92 backdrop-blur-xl border-b border-[#DFE7E2]/80 shadow-[0_4px_20px_-4px_rgba(15,58,46,0.05)] transition-all">
      <div className="container-app flex items-center justify-between h-[var(--header-height)] gap-3 sm:gap-6">
        {/* Left: Mobile Menu & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMobileDrawer}
            className="p-2 -ml-1 text-[#13221C] hover:text-[#0F3A2E] lg:hidden rounded-full hover:bg-white/80 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2.5 focus-visible:outline-none group">
            <div className="w-9 h-9 rounded-2xl bg-[#0F3A2E] text-white flex items-center justify-center font-black text-lg shadow-[0_8px_20px_-4px_rgba(15,58,46,0.35)] group-hover:scale-105 transition-transform border border-white/10">
              <Sparkles size={18} className="text-[#E5A93C] fill-[#E5A93C]" />
            </div>
            <div className="flex items-baseline">
              <span className="font-extrabold text-2xl tracking-tight text-[#13221C] font-display">
                Crave<span className="text-[#E5A93C]">Dash</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#25A18E] ml-1 mb-0.5" />
            </div>
          </Link>
        </div>

        {/* Center: Location Pill & Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:flex items-center gap-3">
          {/* Location Selector Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-[#DFE7E2] rounded-full text-xs font-semibold text-[#13221C] hover:border-[#0F3A2E] shadow-xs transition-all truncate max-w-[190px]"
              title="Change Delivery Location"
            >
              <MapPin size={15} className="text-[#0F3A2E] shrink-0" />
              <span className="truncate">{selectedLocation.split(',')[0]}, BLR</span>
              <ChevronDown size={13} className="text-[#73887F] shrink-0" />
            </button>

            {locationDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#DFE7E2] p-2 z-dropdown animate-fade-in text-xs space-y-1">
                <div className="px-3 py-1.5 font-bold text-[11px] text-[#73887F] uppercase tracking-wider border-b border-[#EBF0ED] flex items-center justify-between">
                  <span>Deliver To</span>
                  <button
                    type="button"
                    className="text-[10px] text-[#E5A93C] font-bold cursor-pointer hover:underline"
                    onClick={() => {
                      setSelectedLocation('Indiranagar, Bengaluru');
                      setLocationDropdownOpen(false);
                    }}
                  >
                    Current GPS
                  </button>
                </div>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc);
                      setLocationDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center gap-2',
                      selectedLocation === loc ? 'bg-[#E8F4F0] text-[#0F3A2E] font-bold' : 'hover:bg-[#F2F8F5] text-[#13221C]'
                    )}
                  >
                    <MapPin size={13} className={selectedLocation === loc ? 'text-[#0F3A2E]' : 'text-[#73887F]'} />
                    <span className="truncate">{loc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Search Trigger Pill */}
          <button
            type="button"
            onClick={openSearch}
            className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-white border border-[#DFE7E2] rounded-full text-xs text-[#73887F] hover:border-[#0F3A2E] hover:text-[#13221C] shadow-xs transition-all text-left group"
          >
            <Search size={16} className="text-[#0F3A2E] group-hover:scale-110 transition-transform shrink-0" />
            <span className="truncate">Search artisanal bowls, truffle pasta, organic greens...</span>
            <span className="ml-auto text-[10px] bg-[#FDF6E9] text-[#C2821A] font-extrabold px-2 py-0.5 rounded-full border border-[#E5A93C]/30">
              ⌘K
            </span>
          </button>

          {/* Pure Veg Mode Toggle */}
          <button
            type="button"
            onClick={handleToggleVeg}
            className={cn(
              'flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold border transition-all shrink-0',
              isVegOnly
                ? 'bg-[#25A18E]/10 border-[#25A18E] text-[#25A18E] shadow-xs'
                : 'bg-white border-[#DFE7E2] text-[#4D6158] hover:border-[#25A18E]/50 hover:text-[#13221C]'
            )}
            title="Toggle Pure Vegetarian"
          >
            <span className={cn('w-3.5 h-3.5 rounded-xs border-2 flex items-center justify-center p-0.5', isVegOnly ? 'border-[#25A18E]' : 'border-[#73887F]')}>
              <span className={cn('w-1.5 h-1.5 rounded-full', isVegOnly ? 'bg-[#25A18E]' : 'bg-[#73887F]')} />
            </span>
            <span>VEG</span>
          </button>
        </div>

        {/* Right: Actions (Wishlist, Cart, Login / Profile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={openSearch}
            className="md:hidden p-2.5 text-[#13221C] hover:text-[#0F3A2E] rounded-full hover:bg-white transition-colors"
            aria-label="Search food"
          >
            <Search size={20} />
          </button>

          {/* Favorites */}
          <Link
            to="/wishlist"
            className="relative p-2.5 text-[#13221C] hover:text-[#0F3A2E] rounded-full hover:bg-white transition-colors hidden sm:flex items-center justify-center"
            title="Saved Dishes"
            aria-label="Saved Dishes"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 text-[10px] min-w-[16px] h-[16px] px-1 bg-[#E5A93C] text-white font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Pill Button */}
          <Link
            to="/bag"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#DFE7E2] hover:border-[#0F3A2E] shadow-xs hover:shadow-md transition-all group"
            title="View Food Cart"
            aria-label="Food Cart"
          >
            <div className="relative">
              <ShoppingBag size={18} className="text-[#13221C] group-hover:text-[#0F3A2E] transition-colors" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[9px] min-w-[15px] h-[15px] px-0.5 bg-[#0F3A2E] text-white font-black rounded-full flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-[#13221C] group-hover:text-[#0F3A2E] hidden sm:inline">
              Cart
            </span>
          </Link>

          {/* User Profile / Login */}
          <div
            className="relative"
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            {isAuthenticated && user ? (
              <button
                type="button"
                onClick={() => navigate('/account/profile')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#DFE7E2] hover:border-[#0F3A2E] shadow-xs transition-all focus-visible:outline-none"
              >
                <div className="w-7 h-7 rounded-full bg-[#0F3A2E]/10 text-[#0F3A2E] flex items-center justify-center font-bold text-xs">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-xs font-bold text-[#13221C] hidden sm:inline max-w-[80px] truncate">
                  {user.name?.split(' ')[0]}
                </span>
                <ChevronDown size={13} className="text-[#73887F] hidden sm:inline" />
              </button>
            ) : (
              <Link
                to="/login"
                className="pill-btn-primary px-5 py-2 text-xs font-bold shadow-md hover:scale-102"
              >
                Sign In
              </Link>
            )}

            {/* Profile Dropdown */}
            {profileDropdownOpen && isAuthenticated && user && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#DFE7E2] py-3 z-dropdown animate-fade-in text-xs text-[#13221C]">
                <div className="px-4 pb-3 border-b border-[#EBF0ED]">
                  <div className="font-bold text-sm text-[#13221C]">{user.name}</div>
                  <div className="text-[11px] text-[#73887F] truncate">{user.email || user.phone}</div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#C2821A] bg-[#FDF6E9] px-2 py-0.5 rounded-full mt-1.5 border border-[#E5A93C]/30">
                    VIP Gourmet Member
                  </span>
                </div>

                <div className="py-1">
                  <Link
                    to="/account/orders"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F2F8F5] text-[#4D6158] hover:text-[#0F3A2E] transition-colors font-medium"
                  >
                    <Package size={15} />
                    <span>My Food Orders</span>
                  </Link>

                  <Link
                    to="/account/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F2F8F5] text-[#4D6158] hover:text-[#0F3A2E] transition-colors font-medium"
                  >
                    <User size={15} />
                    <span>Profile & Addresses</span>
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F2F8F5] text-[#4D6158] hover:text-[#0F3A2E] transition-colors font-medium"
                  >
                    <Heart size={15} />
                    <span>Saved Delicacies</span>
                  </Link>

                  <Link
                    to="/admin"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#E8F4F0] text-[#0F3A2E] transition-colors font-bold"
                  >
                    <Package size={15} />
                    <span>Restaurant Admin Portal</span>
                  </Link>
                </div>

                <div className="pt-2 border-t border-[#EBF0ED] px-4">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left font-bold text-[#D64545] hover:underline flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

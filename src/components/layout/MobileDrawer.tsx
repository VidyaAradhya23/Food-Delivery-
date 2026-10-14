import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight, ChevronDown, Heart, ShoppingBag, User as UserIcon, Package, Sparkles } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';
import { categoryTree } from '../../data/categories';

export const MobileDrawer: React.FC = () => {
  const { mobileDrawerOpen, closeMobileDrawer } = useUIStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [expandedSection, setExpandedSection] = useState<string | null>('men');

  if (!mobileDrawerOpen) return null;

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-modal bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
      onClick={closeMobileDrawer}
    >
      <div
        className="w-4/5 max-w-sm h-full bg-[#F7F9F6] border-r border-[#DFE7E2] text-[#13221C] flex flex-col shadow-2xl animate-slide-right overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#DFE7E2] flex items-center justify-between bg-white">
          <Link
            to="/"
            onClick={closeMobileDrawer}
            className="flex items-center gap-2 font-display"
          >
            <div className="w-8 h-8 rounded-xl bg-[#0F3A2E] flex items-center justify-center text-white">
              <Sparkles size={16} className="text-[#E5A93C] fill-[#E5A93C]" />
            </div>
            <span className="text-xl font-black text-[#13221C]">
              Crave<span className="text-[#E5A93C]">Dash</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={closeMobileDrawer}
            className="p-1.5 rounded-full hover:bg-[#F2F8F5] text-[#73887F] hover:text-[#13221C]"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Authentication Status Banner */}
        <div className="p-4 bg-[#E8F4F0] border-b border-[#DFE7E2]">
          {isAuthenticated && user ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#4D6158] block">Signed in as</span>
                <span className="font-bold text-sm text-[#13221C] block truncate">{user.name}</span>
                <span className="text-[10px] text-[#C2821A] font-bold uppercase">VIP Gourmet Member</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  closeMobileDrawer();
                }}
                className="text-xs text-[#D64545] font-bold hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-[#13221C] block">Welcome to CraveDash</span>
                <span className="text-[11px] text-[#4D6158] block">Sign in to track orders & earn rewards</span>
              </div>
              <Link
                to="/login"
                onClick={closeMobileDrawer}
                className="px-4 py-1.5 rounded-full bg-[#0F3A2E] hover:bg-[#092820] text-white font-bold text-xs uppercase tracking-wider shadow-xs"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Quick User Actions */}
        <div className="grid grid-cols-4 divide-x divide-[#DFE7E2] border-b border-[#DFE7E2] py-3 bg-white text-center text-xs text-[#4D6158]">
          <Link
            to={isAuthenticated ? '/account/orders' : '/login'}
            onClick={closeMobileDrawer}
            className="flex flex-col items-center gap-1 hover:text-[#0F3A2E]"
          >
            <Package size={18} />
            <span>Orders</span>
          </Link>
          <Link
            to="/wishlist"
            onClick={closeMobileDrawer}
            className="flex flex-col items-center gap-1 hover:text-[#0F3A2E]"
          >
            <Heart size={18} />
            <span>Saved</span>
          </Link>
          <Link
            to="/bag"
            onClick={closeMobileDrawer}
            className="flex flex-col items-center gap-1 hover:text-[#0F3A2E]"
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
          </Link>
          <Link
            to={isAuthenticated ? '/account/profile' : '/login'}
            onClick={closeMobileDrawer}
            className="flex flex-col items-center gap-1 hover:text-[#0F3A2E]"
          >
            <UserIcon size={18} />
            <span>Account</span>
          </Link>
        </div>

        {/* Category Navigation Accordion */}
        <div className="flex-1 divide-y divide-[#DFE7E2] py-2">
          {categoryTree.map((cat) => {
            const isExpanded = expandedSection === cat.id;

            return (
              <div key={cat.id}>
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white"
                  onClick={() => toggleSection(cat.id)}
                >
                  <Link
                    to={`/${cat.slug}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMobileDrawer();
                    }}
                    className="font-bold text-sm text-[#13221C] uppercase tracking-wide hover:text-[#0F3A2E]"
                  >
                    {cat.label}
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(cat.id);
                    }}
                    className="p-1 text-[#73887F]"
                    aria-label={`Toggle ${cat.label}`}
                  >
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                </div>

                {isExpanded && cat.children && (
                  <div className="bg-white/80 px-4 py-2 space-y-3">
                    {cat.children.map((sub) => (
                      <div key={sub.id} className="space-y-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F3A2E]">
                          {sub.label}
                        </span>
                        <ul className="pl-2 space-y-1.5 text-xs text-[#4D6158]">
                          {sub.children?.map((leaf) => (
                            <li key={leaf.id}>
                              <Link
                                to={`/${cat.slug}/${leaf.slug}`}
                                onClick={closeMobileDrawer}
                                className="block py-0.5 hover:text-[#0F3A2E]"
                              >
                                {leaf.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Sale Link */}
          <div className="px-4 py-3">
            <Link
              to="/search?gold=1"
              onClick={closeMobileDrawer}
              className="flex items-center justify-between text-sm font-bold text-[#0F3A2E] uppercase tracking-wide"
            >
              <span>Gourmet Club Perks</span>
              <span className="text-xs bg-[#FDF6E9] text-[#C2821A] border border-[#E5A93C]/40 px-2.5 py-0.5 rounded-full font-black">
                FREE DEL
              </span>
            </Link>
          </div>
        </div>

        {/* Footer info in Drawer */}
        <div className="p-4 border-t border-[#DFE7E2] bg-white text-xs text-[#4D6158] space-y-1">
          <p className="font-semibold text-[#13221C]">CraveDash — Crave It. Order It.</p>
          <p className="text-[11px] text-[#73887F]">⚡ 25-min doorstep delivery | Live GPS tracking</p>
        </div>
      </div>
    </div>
  );
};

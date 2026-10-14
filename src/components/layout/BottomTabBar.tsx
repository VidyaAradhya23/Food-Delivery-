import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useUIStore } from '../../store/useUIStore';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/helpers';

export const BottomTabBar: React.FC = () => {
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { toggleMobileDrawer } = useUIStore();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-sticky bg-[#F7F9F6]/95 backdrop-blur-xl border-t border-[#DFE7E2] flex items-center justify-around h-[var(--bottom-bar-height)] md:hidden shadow-lg"
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(
            'flex flex-col items-center justify-center flex-1 h-full text-[10px] font-medium transition-colors',
            isActive ? 'text-[#0F3A2E] font-black' : 'text-[#73887F] hover:text-[#13221C]'
          )
        }
      >
        <Home size={19} />
        <span className="mt-0.5 font-bold">Delivery</span>
      </NavLink>

      <button
        type="button"
        onClick={toggleMobileDrawer}
        className="flex flex-col items-center justify-center flex-1 h-full text-[10px] font-medium text-[#73887F] hover:text-[#13221C] transition-colors"
      >
        <Grid size={19} />
        <span className="mt-0.5">Cuisines</span>
      </button>

      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          cn(
            'flex flex-col items-center justify-center flex-1 h-full text-[10px] font-medium transition-colors relative',
            isActive ? 'text-[#0F3A2E] font-black' : 'text-[#73887F] hover:text-[#13221C]'
          )
        }
      >
        <div className="relative">
          <Heart size={19} />
          {wishlistCount > 0 && (
            <Badge
              count={wishlistCount}
              className="absolute -top-1.5 -right-2 text-[9px] min-w-[14px] h-[14px] px-0.5 bg-[#E5A93C] text-white"
            />
          )}
        </div>
        <span className="mt-0.5">Saved</span>
      </NavLink>

      <NavLink
        to="/bag"
        className={({ isActive }) =>
          cn(
            'flex flex-col items-center justify-center flex-1 h-full text-[10px] font-medium transition-colors relative',
            isActive ? 'text-[#0F3A2E] font-black' : 'text-[#73887F] hover:text-[#13221C]'
          )
        }
      >
        <div className="relative">
          <ShoppingBag size={19} />
          {totalCartCount > 0 && (
            <Badge
              count={totalCartCount}
              className="absolute -top-1.5 -right-2 text-[9px] min-w-[14px] h-[14px] px-0.5 bg-[#0F3A2E] text-white"
            />
          )}
        </div>
        <span className="mt-0.5">Cart</span>
      </NavLink>

      <NavLink
        to="/account/profile"
        className={({ isActive }) =>
          cn(
            'flex flex-col items-center justify-center flex-1 h-full text-[10px] font-medium transition-colors',
            isActive ? 'text-[#0F3A2E] font-black' : 'text-[#73887F] hover:text-[#13221C]'
          )
        }
      >
        <User size={19} />
        <span className="mt-0.5">Profile</span>
      </NavLink>
    </nav>
  );
};

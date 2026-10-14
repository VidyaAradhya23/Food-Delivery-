import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Minus, Clock, Flame } from 'lucide-react';
import type { Product, ProductCardData } from '../../types';
import { ProductImage } from './ProductImage';
import { PriceDisplay } from '../ui/PriceDisplay';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { useToastStore } from '../../store/useToastStore';
import { cn } from '../../utils/helpers';

interface ProductCardProps {
  product: Product | ProductCardData;
  className?: string;
  showWishlist?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  showWishlist = true,
}) => {
  const { isWishlisted, toggle: toggleWishlist } = useWishlistStore();
  const { items: cartItems, addItem, updateQuantity, removeItem } = useCartStore();
  const { showToast } = useToastStore();

  const wishlisted = isWishlisted(product.id);
  const isVeg = 'isVeg' in product ? product.isVeg : true;
  const isBestseller = 'isBestseller' in product ? product.isBestseller : product.rating >= 4.7;
  const prepTime = 'prepTime' in product ? product.prepTime : '20-25 mins';
  const portionSize = 'portionSize' in product ? product.portionSize : 'Serves 1-2';

  const cartItem = cartItems.find((i) => i.productId === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!wishlisted) {
      showToast(`Saved ${product.title} to Favorites`, 'success');
    } else {
      showToast(`Removed from Favorites`, 'info');
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      title: product.title,
      brand: product.brand,
      restaurantName: product.brand,
      size: 'Regular',
      color: 'Standard',
      quantity: 1,
      mrp: product.mrp,
      price: product.price,
      image: product.images?.[0] || '',
      slug: product.slug,
      maxStock: 20,
      isVeg,
    });
    showToast(`Added ${product.title} to Cart`, 'success');
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.productId, cartItem.size, cartItem.quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      if (cartItem.quantity <= 1) {
        removeItem(cartItem.productId, cartItem.size);
      } else {
        updateQuantity(cartItem.productId, cartItem.size, cartItem.quantity - 1);
      }
    }
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/90 transition-all duration-300 hover:border-[#e23744]/60 hover:shadow-[0_16px_36px_-10px_rgba(226,55,68,0.18),0_8px_16px_-4px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)]',
        className
      )}
    >
      {/* Clickable Image Area with Large Hero Visual */}
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[16/11] bg-slate-100">
        <div className="w-full h-full transform group-hover:scale-108 transition-transform duration-700 ease-out">
          <ProductImage
            src={product.images?.[0]}
            alt={product.title}
            id={product.id}
            category={product.categoryPath?.[product.categoryPath.length - 1]}
            aspectRatio="product"
          />
        </div>

        {/* Ambient Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-60 pointer-events-none" />

        {/* Floating Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          {/* Veg / Non-Veg Indicator */}
          <div
            className={cn(
              'w-5 h-5 rounded-md border-2 bg-white/95 backdrop-blur-md flex items-center justify-center p-0.5 shadow-md',
              isVeg ? 'border-emerald-600' : 'border-[#e23744]'
            )}
            title={isVeg ? '100% Pure Vegetarian' : 'Non-Vegetarian'}
          >
            <div
              className={cn(
                'w-2 h-2 rounded-full',
                isVeg ? 'bg-emerald-600' : 'bg-[#e23744]'
              )}
            />
          </div>

          {isBestseller && (
            <span className="text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Flame size={10} className="fill-slate-950" /> Bestseller
            </span>
          )}
        </div>

        {/* Floating Wishlist Button */}
        {showWishlist && (
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={wishlisted ? 'Remove from favorites' : 'Add to favorites'}
            className={cn(
              'absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-[#e23744] shadow-md hover:scale-115 active:scale-95 focus-visible:outline-none',
              wishlisted ? 'text-[#e23744] border-rose-300 bg-rose-50' : 'text-slate-600 hover:text-[#e23744]'
            )}
          >
            <Heart
              size={15}
              className={cn(
                'transition-all duration-300',
                wishlisted ? 'fill-[#e23744] stroke-[#e23744] scale-110' : 'stroke-current'
              )}
            />
          </button>
        )}

        {/* Floating Bottom Offer Ribbon & Delivery ETA */}
        <div className="absolute bottom-2.5 inset-x-2.5 z-10 flex items-center justify-between pointer-events-none">
          <div className="bg-gradient-to-r from-[#e23744] to-[#c62828] text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-md">
            50% OFF UP TO ₹100
          </div>

          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 px-2.5 py-0.5 rounded-md text-[10px] font-bold text-slate-800 shadow-md flex items-center gap-1">
            <Clock size={11} className="text-[#e23744]" />
            <span>{prepTime}</span>
          </div>
        </div>
      </Link>

      {/* Info Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <Link to={`/product/${product.slug}`} className="block focus-visible:outline-none space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-[15px] text-slate-900 line-clamp-1 group-hover:text-[#e23744] transition-colors" title={product.title}>
              {product.title}
            </h3>

            {/* Glowing Emerald Rating Badge */}
            {product.rating > 0 && (
              <span className="bg-emerald-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md flex items-center gap-0.5 shrink-0 shadow-xs">
                <span>{product.rating}</span>
                <span className="text-[9px]">★</span>
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="truncate max-w-[150px] font-semibold text-slate-700">{product.brand}</span>
            <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/70">{portionSize}</span>
          </div>
        </Link>

        {/* Price & Add to Cart Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
          <PriceDisplay
            price={product.price}
            mrp={product.mrp}
            discountPercent={product.discountPercent}
            size="sm"
          />

          {quantityInCart === 0 ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="px-4 py-1.5 rounded-lg border border-[#e23744] bg-rose-50 text-[#e23744] hover:bg-[#e23744] hover:text-white transition-all text-xs font-black uppercase tracking-wider flex items-center gap-1 active:scale-95 shadow-xs hover:shadow-md"
            >
              <Plus size={14} className="stroke-[3]" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="flex items-center bg-[#e23744] text-white rounded-lg overflow-hidden shadow-md border border-[#c62828]">
              <button
                type="button"
                onClick={handleDecrement}
                className="px-2.5 py-1.5 hover:bg-black/10 transition-colors focus-visible:outline-none"
                aria-label="Decrease quantity"
              >
                <Minus size={13} className="stroke-[3]" />
              </button>
              <span className="px-2.5 text-xs font-black min-w-[22px] text-center">
                {quantityInCart}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="px-2.5 py-1.5 hover:bg-black/10 transition-colors focus-visible:outline-none"
                aria-label="Increase quantity"
              >
                <Plus size={13} className="stroke-[3]" />
              </button>
            </div>
          )}
        </div>

        {/* Safety & Chef Status Strip */}
        <div className="pt-2 border-t border-dashed border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
          <span className="flex items-center gap-1 text-slate-600 font-medium">
            ✓ 1,500+ orders this week
          </span>
          <span className="text-amber-800 font-bold bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded shadow-xs">
            Zomato Verified
          </span>
        </div>
      </div>
    </div>
  );
};

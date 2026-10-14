import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { ProductImage } from '../product/ProductImage';
import { PriceDisplay } from '../ui/PriceDisplay';
import { cn } from '../../utils/helpers';

interface WishlistItemCardProps {
  product: Product;
  onRemove: (productId: string) => void;
  onMoveToBag: (product: Product) => void;
  className?: string;
}

export const WishlistItemCard: React.FC<WishlistItemCardProps> = ({
  product,
  onRemove,
  onMoveToBag,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col bg-white rounded-lg border border-border overflow-hidden transition-all duration-200 hover:shadow-md',
        className
      )}
    >
      {/* Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(product.id)}
        aria-label="Remove from Wishlist"
        className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-gray-700 flex items-center justify-center backdrop-blur shadow-sm transition-transform hover:scale-105"
      >
        <X size={15} />
      </button>

      {/* Clickable Image */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden">
        <ProductImage
          src={product.images?.[0]}
          alt={product.title}
          id={product.id}
          category={product.categoryPath?.[product.categoryPath.length - 1]}
          aspectRatio="product"
        />
      </Link>

      {/* Product Information */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <Link to={`/product/${product.slug}`} className="block focus-visible:outline-none mb-2">
          <div className="flex items-center gap-1.5 mb-1">
            <div
              className={`w-3 h-3 rounded-xs border-2 flex items-center justify-center flex-shrink-0 ${
                product.isVeg ? 'border-emerald-600' : 'border-rose-600'
              }`}
            >
              <div
                className={`w-1 h-1 rounded-full ${
                  product.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              />
            </div>
            <span className="font-bold text-xs uppercase tracking-wider text-primary truncate">
              {product.brand}
            </span>
          </div>
          <div className="text-xs text-muted truncate mb-2" title={product.title}>
            {product.title}
          </div>
          <PriceDisplay
            price={product.price}
            mrp={product.mrp}
            discountPercent={product.discountPercent}
            size="sm"
          />
        </Link>

        {/* Move to Cart Action */}
        <button
          type="button"
          onClick={() => onMoveToBag(product)}
          className="w-full py-2.5 px-3 rounded-md bg-white border border-border hover:border-accent text-accent hover:bg-rose-50/50 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none"
        >
          <ShoppingBag size={14} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

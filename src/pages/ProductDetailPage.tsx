import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Check, Tag } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ProductGallery } from '../components/product/ProductGallery';
import { PriceDisplay } from '../components/ui/PriceDisplay';
import { StarRating } from '../components/ui/StarRating';
import { ColorSelector } from '../components/product/ColorSelector';
import { SizeSelector } from '../components/product/SizeSelector';
import { SizeChartModal } from '../components/product/SizeChartModal';
import { PincodeChecker } from '../components/product/PincodeChecker';
import { ProductAccordion } from '../components/product/ProductAccordion';
import { RatingSummary } from '../components/product/RatingSummary';
import { SimilarProducts } from '../components/product/SimilarProducts';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';

import { getProductBySlug, getRelatedProducts } from '../services/api/products';
import { getProductReviews } from '../services/api/reviews';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useRecentlyViewedStore } from '../store/useRecentlyViewedStore';
import { useReviewStore } from '../store/useReviewStore';
import { useToastStore } from '../store/useToastStore';
import type { Product, Review, BreadcrumbItem } from '../types';
import { cn } from '../../src/utils/helpers';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Selection state
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [addedToCartFeedback, setAddedToCartFeedback] = useState(false);

  // Zustand stores
  const { addItem, items: cartItems } = useCartStore();
  const { isWishlisted, toggle: toggleWishlist } = useWishlistStore();
  const { add: addToRecentlyViewed } = useRecentlyViewedStore();
  const { showToast } = useToastStore();

  useEffect(() => {
    let mounted = true;

    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      setSizeError(false);
      setAddedToCartFeedback(false);

      try {
        const prod = await getProductBySlug(slug);
        if (!mounted) return;

        setProduct(prod);

        if (prod) {
          // Record to recently viewed
          addToRecentlyViewed(prod.id);

          // Defaults
          setSelectedColor(prod.colors[0]?.name || null);
          const firstInStockSize = prod.sizes.find((s) => s.stock > 0)?.name || null;
          setSelectedSize(firstInStockSize);

          // Related & reviews
          const [rel, rev] = await Promise.all([
            getRelatedProducts(prod.id, 8),
            getProductReviews(prod.id),
          ]);

          const storeReviews = useReviewStore.getState().getProductReviews(prod.id);
          const mergedReviews = [
            ...storeReviews,
            ...rev.filter((r) => !storeReviews.some((sr) => sr.id === r.id)),
          ];

          if (mounted) {
            setRelated(rel);
            setReviews(mergedReviews);
          }
        }
      } catch (err) {
        console.error('Failed to load product details', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProduct();
    return () => {
      mounted = false;
    };
  }, [slug, addToRecentlyViewed]);

  if (loading) {
    return (
      <div className="container-app py-8 space-y-8">
        <Skeleton variant="text" width="30%" height={16} />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <Skeleton variant="rect" className="w-full aspect-[3/4] rounded-lg" />
          </div>
          <div className="md:col-span-5 space-y-4">
            <Skeleton variant="text" width="40%" height={24} />
            <Skeleton variant="text" width="90%" height={32} />
            <Skeleton variant="text" width="60%" height={28} />
            <Skeleton variant="rect" className="w-full h-24 rounded-lg" />
            <Skeleton variant="rect" className="w-full h-12 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-app py-16">
        <EmptyState
          title="Dish Not Found"
          description="The culinary dish or delicacy you are looking for is currently unavailable or sold out for today."
          actionLabel="Explore Popular Cuisines"
          onAction={() => navigate('/')}
        />
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const alreadyInCart = cartItems.some(
    (i) => i.productId === product.id && i.size === selectedSize
  );

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Cuisines', href: '/' },
    ...(product.cuisine ? [{ label: product.cuisine, href: `/search?cuisine=${encodeURIComponent(product.cuisine)}` }] : []),
    { label: product.title },
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    const sizeObj = product.sizes.find((s) => s.name === selectedSize);

    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      brand: product.brand,
      restaurantName: product.brand,
      price: product.price,
      mrp: product.mrp,
      size: selectedSize,
      color: selectedColor || 'Standard',
      image: product.images?.[0] || '',
      quantity: 1,
      maxStock: sizeObj?.stock || 10,
      isVeg: product.isVeg,
    });

    setAddedToCartFeedback(true);
    showToast(`Added ${product.title} (${selectedSize}) to your Cart!`, 'success');
    setTimeout(() => setAddedToCartFeedback(false), 3000);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    if (!wishlisted) {
      showToast(`Saved ${product.title} to your Favourites`, 'success');
    } else {
      showToast(`Removed from Favourites`, 'info');
    }
  };

  return (
    <>
      <SEO
        title={`${product.title} — ${product.brand} | Zomato`}
        description={`${product.title} prepared fresh by ${product.brand}. ${product.description}. Price: ₹${product.price}. Express food delivery in 25-30 mins.`}
        type="product"
      />

      <div className="container-app py-4 space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Main Product Layout: Gallery (left) + Details (right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Gallery */}
          <div className="md:col-span-7">
            <ProductGallery
              images={product.images}
              productTitle={product.title}
              productId={product.id}
              category={product.categoryPath?.[product.categoryPath.length - 1]}
            />
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-5 space-y-5">
            {/* Restaurant & Dish Title */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {/* Veg / Non-Veg Indicator */}
                <div
                  className={cn(
                    'w-4 h-4 rounded-sm border-2 flex items-center justify-center flex-shrink-0',
                    product.isVeg ? 'border-emerald-600' : 'border-rose-600'
                  )}
                  title={product.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                >
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full',
                      product.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'text-[11px] font-extrabold uppercase tracking-wider',
                    product.isVeg ? 'text-emerald-700' : 'text-rose-700'
                  )}
                >
                  {product.isVeg ? 'Pure Veg' : 'Non-Veg'}
                </span>
                {product.isBestseller && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    ⭐ Chef Bestseller
                  </span>
                )}
              </div>

              <Link
                to={`/search?brand=${encodeURIComponent(product.brand)}`}
                className="font-black text-xl text-primary hover:text-accent uppercase tracking-wider block"
              >
                {product.brand}
              </Link>
              <h1 className="text-lg font-bold text-gray-800 mt-1 leading-snug">
                {product.title}
              </h1>

              {/* Rating badge */}
              {product.rating > 0 && (
                <div className="mt-2.5">
                  <StarRating
                    rating={product.rating}
                    count={product.ratingCount}
                    size="md"
                    variant="chip"
                  />
                </div>
              )}
            </div>

            {/* Quick Kitchen Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 bg-surface/70 p-3 rounded-xl border border-border">
              {product.prepTime && (
                <span className="font-semibold flex items-center gap-1">
                  ⏱️ {product.prepTime}
                </span>
              )}
              {product.portionSize && (
                <span className="font-semibold flex items-center gap-1 border-l border-gray-300 pl-2">
                  🍽️ {product.portionSize}
                </span>
              )}
              {product.calories && (
                <span className="font-semibold flex items-center gap-1 border-l border-gray-300 pl-2">
                  🔥 {product.calories} kcal
                </span>
              )}
              {product.cuisine && (
                <span className="font-semibold flex items-center gap-1 border-l border-gray-300 pl-2 text-accent">
                  🍛 {product.cuisine}
                </span>
              )}
            </div>

            <div className="border-t border-border" />

            {/* Price Section */}
            <div className="space-y-1">
              <PriceDisplay
                price={product.price}
                mrp={product.mrp}
                discountPercent={product.discountPercent}
                size="xl"
              />
              <p className="text-[11px] font-semibold text-emerald-700">
                Inclusive of all taxes • Freshly prepared upon order
              </p>
            </div>

            {/* Spice / Customization Swatches */}
            {product.colors && product.colors.length > 0 && (
              <ColorSelector
                colors={product.colors}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
              />
            )}

            {/* Portion / Serving Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-1.5">
                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onSelectSize={(s) => {
                    setSelectedSize(s);
                    setSizeError(false);
                  }}
                  onOpenSizeChart={() => setIsSizeChartOpen(true)}
                />
                {sizeError && (
                  <p className="text-xs font-semibold text-accent animate-pulse">
                    Please select a portion size to proceed
                  </p>
                )}
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant={addedToCartFeedback ? 'secondary' : 'accent'}
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 shadow-lg font-bold text-xs uppercase tracking-wider h-12"
                icon={
                  addedToCartFeedback ? (
                    <Check size={18} className="text-emerald-600" />
                  ) : (
                    <ShoppingBag size={18} />
                  )
                }
              >
                {addedToCartFeedback
                  ? 'Added to Cart!'
                  : alreadyInCart
                  ? 'Add More to Cart'
                  : 'Add to Cart'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleWishlist}
                className={cn(
                  'h-12 px-6 font-bold text-xs uppercase tracking-wider',
                  wishlisted && 'border-accent text-accent bg-rose-50'
                )}
                icon={
                  <Heart
                    size={18}
                    className={wishlisted ? 'fill-accent text-accent' : ''}
                  />
                }
              >
                {wishlisted ? 'Saved' : 'Favourite'}
              </Button>
            </div>

            {/* Zomato Food Deals & Offers Card */}
            <div className="bg-[#111827]/90 border border-amber-500/30 rounded-xl p-3.5 space-y-2 text-xs backdrop-blur-md shadow-md">
              <div className="flex items-center gap-1.5 font-black text-amber-300 uppercase text-[11px] tracking-wider">
                <Tag size={14} className="text-amber-400" />
                Zomato Offers & Gold Benefits
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>
                  • First Order Delight: Use code <strong className="text-rose-400">ZOMATO50</strong> for 50% OFF up to ₹150.
                </li>
                <li>
                  • Zomato Gold: Unlimited free delivery on orders above ₹199.
                </li>
                <li>
                  • Express Delivery: Guaranteed hot & fresh in 25–30 minutes.
                </li>
              </ul>
            </div>

            {/* Pincode Checker */}
            <PincodeChecker />

            {/* Expandable Product Details Accordion */}
            <ProductAccordion product={product} />

            {/* Customer Ratings Breakdown */}
            <RatingSummary
              rating={product.rating}
              ratingCount={product.ratingCount}
              reviews={reviews}
            />
          </div>
        </div>

        {/* Similar Products Recommendation Row */}
        <SimilarProducts products={related} />

        {/* Size Chart Modal (if opened) */}
        <SizeChartModal
          isOpen={isSizeChartOpen}
          onClose={() => setIsSizeChartOpen(false)}
          category={product.categoryPath?.[1] || 'Apparel'}
        />
      </div>
    </>
  );
};


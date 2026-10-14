import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, UtensilsCrossed, Bike, MessageSquare } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { EmptyState } from '../components/ui/EmptyState';
import { BagItemCard } from '../components/bag/BagItemCard';
import { BagDeliveryBar } from '../components/bag/BagDeliveryBar';
import { CouponModal } from '../components/bag/CouponModal';
import { PriceSummaryCard } from '../components/checkout/PriceSummaryCard';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useToastStore } from '../store/useToastStore';

const QUICK_INSTRUCTION_TAGS = [
  'Less spicy',
  'Extra mint chutney',
  'Don’t ring bell 🤫',
  'Leave at door',
  'Well cooked',
];

export const BagPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    updateSize,
    removeItem,
    moveToWishlist,
    tipAmount,
    setTipAmount,
    cookingInstructions,
    setCookingInstructions,
    noCutlery,
    setNoCutlery,
  } = useCartStore();

  const { items: wishlistIds } = useWishlistStore();
  const { showToast } = useToastStore();

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleApplyCoupon = (coupon: any) => {
    applyCoupon(coupon);
    showToast(`Coupon ${coupon.code} applied! You saved on this feast.`, 'success');
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    showToast('Coupon removed', 'info');
  };

  const handleMoveToWishlist = (productId: string, size: string) => {
    moveToWishlist(productId, size);
    showToast('Dish saved to Favourites', 'success');
  };

  const handleRemoveItem = (productId: string, size: string) => {
    removeItem(productId, size);
    showToast('Dish removed from Cart', 'info');
  };

  const handlePlaceOrder = () => {
    navigate('/checkout/address');
  };

  const handleAddTagToInstructions = (tag: string) => {
    if (cookingInstructions.includes(tag)) return;
    const updated = cookingInstructions
      ? `${cookingInstructions}, ${tag}`
      : tag;
    setCookingInstructions(updated);
  };

  if (items.length === 0) {
    return (
      <>
        <SEO title="Food Cart — Zomato" description="Your delicious Zomato food cart is empty" />
        <div className="container-app py-16">
          <EmptyState
            icon={<ShoppingBag size={40} className="text-accent" />}
            title="Good food is always cooking!"
            description="Your cart is currently empty. Explore our top restaurants and dishes."
            actionLabel={wishlistIds.length > 0 ? 'View Saved Delicacies' : 'Explore Top Dishes'}
            onAction={() => navigate(wishlistIds.length > 0 ? '/wishlist' : '/')}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title={`Food Cart (${items.length} items) — Zomato`} />

      <div className="container-app py-6 space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-primary font-display">
              Your Food Cart ({items.length} {items.length === 1 ? 'dish' : 'dishes'})
            </h1>
            <p className="text-xs text-muted mt-0.5">
              Freshly cooked & dispatched directly from restaurant kitchens
            </p>
          </div>
          <Link
            to="/wishlist"
            className="text-xs font-bold text-accent hover:underline uppercase tracking-wider flex items-center gap-1.5"
          >
            <Heart size={14} />
            <span>Favourites ({wishlistIds.length})</span>
          </Link>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery Bar, Dishes, Notes, Tips */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <BagDeliveryBar />

            {/* Dishes list */}
            <div className="space-y-3">
              {items.map((item) => (
                <BagItemCard
                  key={`${item.productId}-${item.size}`}
                  item={item}
                  onUpdateQuantity={(qty) => updateQuantity(item.productId, item.size, qty)}
                  onUpdateSize={(newSize, newStock) =>
                    updateSize(item.productId, item.size, newSize, newStock)
                  }
                  onRemove={() => handleRemoveItem(item.productId, item.size)}
                  onMoveToWishlist={() => handleMoveToWishlist(item.productId, item.size)}
                />
              ))}
            </div>

            {/* Cooking & Delivery Instructions Note Box */}
            <div className="bg-white border border-border rounded-xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <MessageSquare size={16} className="text-accent" />
                <span>Cooking & Delivery Notes for the Kitchen</span>
              </div>

              <input
                type="text"
                value={cookingInstructions}
                onChange={(e) => setCookingInstructions(e.target.value)}
                placeholder="e.g. Less spicy, send extra green chutney, please don’t ring bell"
                className="w-full px-3 py-2 text-xs border border-border rounded-lg outline-none focus:border-accent transition-colors"
              />

              {/* Quick tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-muted">Quick add:</span>
                {QUICK_INSTRUCTION_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddTagToInstructions(tag)}
                    className="text-[11px] bg-surface hover:bg-rose-50 hover:text-accent border border-border rounded-full px-2.5 py-0.5 transition-colors font-medium text-gray-700"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Cutlery Opt-out Toggle (Eco-friendly) */}
            <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-xl p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <UtensilsCrossed size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    Opt-out of disposable cutlery 🌱
                  </h4>
                  <p className="text-[11px] text-emerald-800">
                    Help reduce plastic waste. Check this if you don't need disposable spoons or forks.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={noCutlery}
                  onChange={(e) => setNoCutlery(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600" />
              </label>
            </div>

            {/* Delivery Partner Tip Box */}
            <div className="bg-white border border-border rounded-xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Bike size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary">Tip your delivery hero 🛵</h4>
                    <p className="text-[11px] text-muted">100% of your tip goes directly to the delivery rider</p>
                  </div>
                </div>
                {tipAmount > 0 && (
                  <button
                    type="button"
                    onClick={() => setTipAmount(0)}
                    className="text-[11px] font-bold text-accent hover:underline"
                  >
                    Remove Tip
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                {[20, 30, 50, 80].map((amount) => {
                  const isSelected = tipAmount === amount;
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setTipAmount(isSelected ? 0 : amount)}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                        isSelected
                          ? 'border-accent bg-accent text-white shadow-sm'
                          : 'border-border text-gray-700 bg-surface hover:border-gray-400'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Coupons, Bill Breakdown & Checkout CTA */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
            <PriceSummaryCard
              items={items}
              coupon={appliedCoupon}
              deliveryTip={tipAmount}
              onRemoveCoupon={handleRemoveCoupon}
              onOpenCoupons={() => setIsCouponModalOpen(true)}
              ctaText="Proceed to Checkout"
              onCtaClick={handlePlaceOrder}
            />
          </div>
        </div>

        {/* Coupons Modal */}
        <CouponModal
          isOpen={isCouponModalOpen}
          onClose={() => setIsCouponModalOpen(false)}
          subtotal={subtotal}
          items={items}
          appliedCoupon={appliedCoupon}
          onApplyCoupon={handleApplyCoupon}
          onRemoveCoupon={handleRemoveCoupon}
        />
      </div>
    </>
  );
};


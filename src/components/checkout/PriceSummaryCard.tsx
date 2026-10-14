import React from 'react';
import { Tag, ShieldCheck, Wallet, Award } from 'lucide-react';
import type { CartItem, Coupon } from '../../types';
import { calcPricingBreakdown, formatPrice } from '../../utils/price';
import { Button } from '../ui/Button';

interface PriceSummaryCardProps {
  items: CartItem[];
  coupon?: Coupon | null;
  isCod?: boolean;
  onRemoveCoupon?: () => void;
  ctaText?: string;
  onCtaClick?: () => void;
  ctaDisabled?: boolean;
  ctaLoading?: boolean;
  className?: string;
  onOpenCoupons?: () => void;
  walletDeduction?: number;
  loyaltyDeduction?: number;
  deliveryTip?: number;
}

export const PriceSummaryCard: React.FC<PriceSummaryCardProps> = ({
  items,
  coupon,
  isCod = false,
  onRemoveCoupon,
  ctaText = 'Place Order',
  onCtaClick,
  ctaDisabled = false,
  ctaLoading = false,
  className = '',
  onOpenCoupons,
  walletDeduction = 0,
  loyaltyDeduction = 0,
  deliveryTip,
}) => {
  const breakdown = calcPricingBreakdown(items, {
    coupon,
    isCod,
    isFirstOrder: true,
    deliveryTip: deliveryTip ?? 0,
  });

  const payableAmount = Math.max(
    0,
    breakdown.finalTotal - walletDeduction - loyaltyDeduction
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Coupon Strip Trigger (if onOpenCoupons is passed) */}
      {onOpenCoupons && (
        <div className="bg-white border border-border rounded-xl p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-accent" />
            <div>
              <span className="font-bold text-xs text-primary block">Apply Coupons</span>
              <span className="text-[11px] text-muted">Unlock discounts & free delivery</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenCoupons}
            className="px-3 py-1.5 border border-accent text-accent hover:bg-rose-50 rounded text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      {/* Bill Details Box */}
      <div className="bg-white border border-border rounded-xl p-5 space-y-4 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted border-b border-gray-100 pb-2.5">
          Bill Summary ({breakdown.itemCount} {breakdown.itemCount === 1 ? 'Dish' : 'Dishes'})
        </h4>

        <div className="space-y-2.5 text-xs text-gray-700">
          <div className="flex justify-between">
            <span>Item Total</span>
            <span className="font-semibold text-primary">{formatPrice(breakdown.subtotal)}</span>
          </div>

          {breakdown.productDiscount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Item Discounts</span>
              <span className="font-semibold">-{formatPrice(breakdown.productDiscount)}</span>
            </div>
          )}

          {breakdown.couponDiscount > 0 && (
            <div className="flex justify-between text-emerald-700 items-center">
              <span className="flex items-center gap-1">
                Coupon Savings ({coupon?.code})
                {onRemoveCoupon && (
                  <button
                    type="button"
                    onClick={onRemoveCoupon}
                    className="text-[10px] text-accent font-bold hover:underline ml-1"
                  >
                    [Remove]
                  </button>
                )}
              </span>
              <span className="font-semibold">-{formatPrice(breakdown.couponDiscount)}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span>Delivery Partner Fee</span>
            <span>
              {breakdown.deliveryFee === 0 ? (
                <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
              ) : (
                formatPrice(breakdown.deliveryFee)
              )}
            </span>
          </div>

          <div className="flex justify-between items-center text-gray-600">
            <span>Restaurant Packaging & Taxes</span>
            <span>{formatPrice(breakdown.packagingFee)}</span>
          </div>

          <div className="flex justify-between items-center text-gray-600">
            <span>Platform Fee</span>
            <span>{formatPrice(breakdown.platformFee)}</span>
          </div>

          {breakdown.deliveryTip > 0 && (
            <div className="flex justify-between items-center text-emerald-700">
              <span>Delivery Partner Tip</span>
              <span className="font-semibold">+{formatPrice(breakdown.deliveryTip)}</span>
            </div>
          )}

          {isCod && (
            <div className="flex justify-between text-gray-700">
              <span>Pay on Delivery Charge</span>
              <span>{formatPrice(breakdown.codFee)}</span>
            </div>
          )}

          {walletDeduction > 0 && (
            <div className="flex justify-between text-emerald-400 items-center">
              <span className="flex items-center gap-1.5">
                <Wallet size={13} /> Nocturne Credits
              </span>
              <span className="font-semibold">-{formatPrice(walletDeduction)}</span>
            </div>
          )}

          {loyaltyDeduction > 0 && (
            <div className="flex justify-between text-amber-400 items-center">
              <span className="flex items-center gap-1.5">
                <Award size={13} /> Noir VIP Points
              </span>
              <span className="font-semibold">-{formatPrice(loyaltyDeduction)}</span>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-3.5 flex justify-between items-baseline font-bold text-sm text-primary">
          <span>To Pay</span>
          <span className="text-base text-accent font-black">
            {formatPrice(payableAmount)}
          </span>
        </div>

        {breakdown.totalSavings > 0 && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] font-semibold text-center">
            🎉 Almost there! You saved {formatPrice(breakdown.totalSavings)} on this feast
          </div>
        )}

        {onCtaClick && (
          <Button
            variant="accent"
            size="lg"
            disabled={ctaDisabled}
            loading={ctaLoading}
            onClick={onCtaClick}
            className="w-full font-bold text-xs uppercase tracking-wider h-12 shadow-lg"
          >
            {ctaText}
          </Button>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-muted">
        <ShieldCheck size={15} className="text-emerald-600" />
        <span>100% Contactless Delivery • FSSAI Certified Kitchens</span>
      </div>
    </div>
  );
};

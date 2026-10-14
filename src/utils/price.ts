import { LOCALE, CURRENCY, FREE_DELIVERY_THRESHOLD, COD_FEE } from './constants';
import type { CartItem, Coupon } from '../types';

/**
 * Format a number as INR currency string (e.g., ₹1,299)
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate discount percentage from MRP and price
 */
export function calcDiscountPercent(mrp: number, price: number): number {
  if (mrp <= 0) return 0;
  const discount = Math.round(((mrp - price) / mrp) * 100);
  return Math.max(0, discount);
}

/**
 * Calculate MRP total for cart items
 */
export function calcMrpTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
}

/**
 * Calculate selling price total for cart items
 */
export function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Calculate total discount (MRP total - subtotal)
 */
export function calcTotalDiscount(items: CartItem[]): number {
  return calcMrpTotal(items) - calcSubtotal(items);
}

/**
 * Calculate delivery fee — free above threshold
 */
export function calcDeliveryFee(subtotal: number): number {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 35;
}

/**
 * Calculate COD fee
 */
export function calcCodFee(isCod: boolean): number {
  return isCod ? COD_FEE : 0;
}

/**
 * Platform fee for instant dispatch and live tracking
 */
export const PLATFORM_FEE = 5;

/**
 * Hygienic thermal packaging fee
 */
export const PACKAGING_FEE = 15;

/**
 * Validate and apply coupon to cart
 */
export function applyCoupon(
  coupon: Coupon,
  subtotal: number,
  _items: CartItem[],
  isFirstOrder: boolean = false
): { valid: boolean; discount: number; message: string } {
  // Check expiry
  if (new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, discount: 0, message: 'This coupon has expired.' };
  }

  // Check min cart value
  if (subtotal < coupon.minCartValue) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum cart value of ${formatPrice(coupon.minCartValue)} required.`,
    };
  }

  // Check first-order restriction
  if (coupon.firstOrderOnly && !isFirstOrder) {
    return {
      valid: false,
      discount: 0,
      message: 'This coupon is valid for first orders only.',
    };
  }

  // Calculate discount
  let discount = 0;
  if (coupon.type === 'percent') {
    discount = Math.round((subtotal * coupon.value) / 100);
    if (coupon.maxDiscount) {
      discount = Math.min(discount, coupon.maxDiscount);
    }
  } else {
    discount = coupon.value;
  }

  // Never discount more than the subtotal
  discount = Math.min(discount, subtotal);

  return {
    valid: true,
    discount,
    message: `Coupon applied! You save ${formatPrice(discount)}.`,
  };
}

/**
 * Calculate wallet/points deduction
 */
export function calcWalletDeduction(
  walletBalance: number,
  total: number,
  useWallet: boolean
): number {
  if (!useWallet) return 0;
  return Math.min(walletBalance, total);
}

/**
 * Calculate loyalty points deduction (10 points = ₹1)
 */
export function calcPointsDeduction(
  points: number,
  total: number,
  usePoints: boolean
): number {
  if (!usePoints) return 0;
  const value = Math.floor(points / 10);
  return Math.min(value, total);
}

/**
 * Full pricing breakdown for food delivery
 */
export function calcPricingBreakdown(
  items: CartItem[],
  options: {
    coupon?: Coupon | null;
    isCod?: boolean;
    walletBalance?: number;
    useWallet?: boolean;
    loyaltyPoints?: number;
    usePoints?: boolean;
    isFirstOrder?: boolean;
    deliveryTip?: number;
  } = {}
) {
  const mrpTotal = calcMrpTotal(items);
  const subtotal = calcSubtotal(items);
  const productDiscount = mrpTotal - subtotal;
  const deliveryFee = items.length === 0 ? 0 : calcDeliveryFee(subtotal);
  const codFee = calcCodFee(options.isCod ?? false);
  const platformFee = items.length === 0 ? 0 : PLATFORM_FEE;
  const packagingFee = items.length === 0 ? 0 : PACKAGING_FEE;
  const deliveryTip = options.deliveryTip ?? 0;

  let couponDiscount = 0;
  let couponMessage = '';
  if (options.coupon) {
    const result = applyCoupon(
      options.coupon,
      subtotal,
      items,
      options.isFirstOrder ?? false
    );
    if (result.valid) {
      couponDiscount = result.discount;
      couponMessage = result.message;
    } else {
      couponMessage = result.message;
    }
  }

  let afterCoupon =
    subtotal -
    couponDiscount +
    deliveryFee +
    codFee +
    platformFee +
    packagingFee +
    deliveryTip;

  const walletDeduction = calcWalletDeduction(
    options.walletBalance ?? 0,
    afterCoupon,
    options.useWallet ?? false
  );
  afterCoupon -= walletDeduction;

  const pointsDeduction = calcPointsDeduction(
    options.loyaltyPoints ?? 0,
    afterCoupon,
    options.usePoints ?? false
  );

  const finalTotal = afterCoupon - pointsDeduction;

  return {
    mrpTotal,
    subtotal,
    productDiscount,
    couponDiscount,
    couponMessage,
    deliveryFee,
    codFee,
    platformFee,
    packagingFee,
    deliveryTip,
    walletDeduction,
    pointsDeduction,
    finalTotal: Math.max(0, finalTotal),
    totalSavings: productDiscount + couponDiscount,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

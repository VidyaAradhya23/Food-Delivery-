import type { Coupon } from '../types/index.js';

export const coupons: Coupon[] = [
  { id: 'c1', code: 'HUNGRY50', type: 'percent', value: 50, minCartValue: 199, maxDiscount: 100, description: '50% off up to ₹100 on your first food order. Min cart ₹199.', firstOrderOnly: true, expiresAt: '2027-12-31T23:59:59Z', stackable: false },
  { id: 'c2', code: 'FEAST150', type: 'flat', value: 150, minCartValue: 499, description: 'Flat ₹150 off on feasts above ₹499.', firstOrderOnly: false, expiresAt: '2027-12-31T23:59:59Z', stackable: false },
  { id: 'c3', code: 'FREEDEL', type: 'flat', value: 35, minCartValue: 249, description: 'Free delivery on orders above ₹249.', firstOrderOnly: false, expiresAt: '2027-12-31T23:59:59Z', stackable: false },
  { id: 'c4', code: 'CRAVE20', type: 'percent', value: 20, minCartValue: 299, maxDiscount: 80, description: '20% off up to ₹80 on all meals. Min cart ₹299.', firstOrderOnly: false, expiresAt: '2027-12-31T23:59:59Z', stackable: false },
  { id: 'c5', code: 'WELCOME100', type: 'flat', value: 100, minCartValue: 299, description: '₹100 off on your first food delivery order. Min cart ₹299.', firstOrderOnly: true, expiresAt: '2027-12-31T23:59:59Z', stackable: false },
  { id: 'c6', code: 'BIRYANI75', type: 'flat', value: 75, minCartValue: 349, description: 'Flat ₹75 off on Biryani & Rice Handis.', firstOrderOnly: false, expiresAt: '2027-12-31T23:59:59Z', categoryRestriction: ['Biryani & Rice', 'Dum Biryani'], stackable: false },
];

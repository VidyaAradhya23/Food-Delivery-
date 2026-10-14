import type { Banner, DealOfTheDay, BankOffer } from '../types';

export const heroBanners: Banner[] = [
  {
    id: 'hb1',
    title: 'Royal Dum Biryani: Michelin Craft Flat 50% OFF',
    subtitle: 'Slow-cooked Awadhi & Hyderabadi handi with saffron gulab jamun • Code: ZOMATO50',
    cta: 'Order Royal Biryani',
    href: '/search?category=biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1600&auto=format&fit=crop&q=80',
    gradient: 'linear-gradient(135deg, rgba(200, 24, 38, 0.95) 0%, rgba(226, 55, 68, 0.88) 50%, rgba(185, 28, 28, 0.95) 100%)',
    textColor: '#ffffff',
  },
  {
    id: 'hb2',
    title: 'Zomato Gold Carnival: Unlimited Free Delivery',
    subtitle: 'Extra 20% OFF at 10,000+ top luxury dining partners across Bengaluru',
    cta: 'Explore Gold Privileges',
    href: '/search?gold=1',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&auto=format&fit=crop&q=80',
    gradient: 'linear-gradient(135deg, rgba(180, 83, 9, 0.95) 0%, rgba(217, 119, 6, 0.88) 50%, rgba(245, 158, 11, 0.95) 100%)',
    textColor: '#ffffff',
  },
  {
    id: 'hb3',
    title: 'Smash Burgers & Truffle Crispy Fries',
    subtitle: 'Wagyu & Angus gourmet patties, smoked cheddar & brioche buns in 20 mins',
    cta: 'Savor Gourmet Burgers',
    href: '/search?category=burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&auto=format&fit=crop&q=80',
    gradient: 'linear-gradient(135deg, rgba(225, 29, 72, 0.95) 0%, rgba(244, 63, 94, 0.88) 50%, rgba(190, 18, 60, 0.95) 100%)',
    textColor: '#ffffff',
  },
  {
    id: 'hb4',
    title: 'Late Night Michelin Dining 24/7 Active',
    subtitle: 'Hot artisan meals, midnight kathi rolls & molten lava cakes delivered until 4 AM',
    cta: 'Order Midnight Bites',
    href: '/search?sort=popularity',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1600&auto=format&fit=crop&q=80',
    gradient: 'linear-gradient(135deg, rgba(13, 148, 136, 0.95) 0%, rgba(20, 184, 166, 0.88) 50%, rgba(15, 118, 110, 0.95) 100%)',
    textColor: '#ffffff',
  },
];

export const dealOfTheDay: DealOfTheDay = {
  id: 'dotd1',
  title: 'Zomato Lightning Tasting Menu',
  subtitle: 'Freshly prepared chef curations at special celebratory prices — resets daily',
  endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
  productIds: ['f1', 'f3', 'f7', 'f11', 'f18', 'f22'],
  bannerGradient: 'linear-gradient(135deg, #030712 0%, #0a0f1d 50%, #ff1e56 100%)',
};

export const bankOffers: BankOffer[] = [
  { id: 'bo1', bank: 'HDFC Bank Cards', title: 'Flat ₹150 OFF', description: 'On HDFC Credit & Debit Cards. Min order ₹499.', code: 'HDFCFEAST', minCartValue: 499, maxDiscount: 150, validTill: '2026-12-31T23:59:59Z' },
  { id: 'bo2', bank: 'UPI / Paytm Wallet', title: 'Assured ₹50 Instant Cashback', description: 'Instant cashback on orders above ₹199 via UPI.', code: 'ZOMATO50', minCartValue: 199, maxDiscount: 50, validTill: '2026-12-31T23:59:59Z' },
  { id: 'bo3', bank: 'ICICI Bank', title: '20% Instant Discount', description: 'Up to ₹120 on ICICI Bank Netbanking & Cards.', code: 'ICICITREAT', minCartValue: 399, maxDiscount: 120, validTill: '2026-12-31T23:59:59Z' },
  { id: 'bo4', bank: 'Welcome Offer', title: '50% OFF First Food Order', description: 'Up to ₹150 discount on your very first Zomato order.', code: 'WELCOME50', minCartValue: 149, maxDiscount: 150, validTill: '2026-12-31T23:59:59Z' },
  { id: 'bo5', bank: 'Free Delivery', title: 'Zero Delivery Fee', description: 'Unlimited free delivery on all orders above ₹299.', code: 'FREEDEL', minCartValue: 299, maxDiscount: 40, validTill: '2026-12-31T23:59:59Z' },
];

export const minDiscountTiles = [
  {
    label: 'FLAT 50% OFF',
    subtitle: 'BIRYS & BOWLS',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    href: '/search?category=biryani',
    gradient: 'linear-gradient(135deg, rgba(226, 55, 68, 0.9) 0%, rgba(17, 24, 39, 0.85) 100%)',
  },
  {
    label: 'UP TO 60% OFF',
    subtitle: 'PIZZAS & SIDES',
    discount: 60,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    href: '/search?category=pizzas',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(17, 24, 39, 0.85) 100%)',
  },
  {
    label: 'BUY 1 GET 1',
    subtitle: 'GOURMET BURGERS',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    href: '/search?category=burgers',
    gradient: 'linear-gradient(135deg, rgba(226, 55, 68, 0.85) 0%, rgba(16, 185, 129, 0.85) 100%)',
  },
  {
    label: 'FREE DELIVERY',
    subtitle: 'ZOMATO GOLD SPECIAL',
    discount: 40,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    href: '/search?gold=1',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(226, 55, 68, 0.9) 100%)',
  },
];


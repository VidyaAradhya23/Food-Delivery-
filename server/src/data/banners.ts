import type { Banner, DealOfTheDay, BankOffer } from '../types/index.js';

export const heroBanners: Banner[] = [
  {
    id: 'hb1',
    title: 'Royal Biryani Festival',
    subtitle: 'Flat 50% OFF + Free Dessert with code HUNGRY50',
    cta: 'Order Biryani Now',
    href: '/search?category=biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1600&auto=format&fit=crop&q=80',
    gradient: 'linear-gradient(135deg, rgba(225, 29, 72, 0.88) 0%, rgba(30, 41, 59, 0.94) 100%)',
    textColor: '#ffffff',
  },
  {
    id: 'hb2',
    title: 'Woodfired Artisan Pizzas',
    subtitle: 'Crispy sourdough crusts delivered piping hot in 20 mins',
    cta: 'Explore Pizzas',
    href: '/search?category=pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&auto=format&fit=crop&q=80',
    gradient: 'linear-gradient(135deg, rgba(234, 88, 12, 0.88) 0%, rgba(15, 23, 42, 0.94) 100%)',
    textColor: '#ffffff',
  },
  {
    id: 'hb3',
    title: 'Gourmet Smash Burgers',
    subtitle: 'Juicy patties, melted cheddar & loaded peri-peri fries',
    cta: 'Grab a Burger',
    href: '/search?category=burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&auto=format&fit=crop&q=80',
    gradient: 'linear-gradient(135deg, rgba(217, 119, 6, 0.90) 0%, rgba(30, 41, 59, 0.94) 100%)',
    textColor: '#ffffff',
  },
  {
    id: 'hb4',
    title: 'Late Night Munchies 24/7',
    subtitle: 'Midnight cravings delivered right to your door in 25 mins',
    cta: 'Order Midnight Bites',
    href: '/search?sort=popularity',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1600&auto=format&fit=crop&q=80',
    gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.88) 0%, rgba(15, 23, 42, 0.94) 100%)',
    textColor: '#ffffff',
  },
];

export const dealOfTheDay: DealOfTheDay = {
  id: 'dotd1',
  title: 'Flash Cravings of the Day',
  subtitle: 'Chef specials at lightning prices — timer resets at midnight!',
  endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
  productIds: ['f1', 'f3', 'f7', 'f11', 'f18', 'f22'],
  bannerGradient: 'linear-gradient(135deg, #ff4722 0%, #f59e0b 100%)',
};

export const bankOffers: BankOffer[] = [
  { id: 'bo1', bank: 'HDFC Bank', title: 'Flat ₹150 OFF', description: 'On HDFC Credit & Debit Cards. Min order ₹499.', code: 'HDFCFOOD', minCartValue: 499, maxDiscount: 150, validTill: '2026-12-31T23:59:59Z' },
  { id: 'bo2', bank: 'Paytm UPI', title: 'Assured ₹50 Cashback', description: 'Instant cash on your first 3 food orders via Paytm UPI.', code: 'PAYTMFOOD', minCartValue: 249, maxDiscount: 50, validTill: '2026-12-31T23:59:59Z' },
  { id: 'bo3', bank: 'ICICI Bank', title: '20% Instant Discount', description: 'Up to ₹120 on ICICI Bank NetBanking & Cards.', code: 'ICICICRAVE', minCartValue: 399, maxDiscount: 120, validTill: '2026-12-31T23:59:59Z' },
  { id: 'bo4', bank: 'First Order', title: '50% OFF Welcome Bonus', description: 'Up to ₹100 discount on your very first Zomato order.', code: 'ZOMATO50', minCartValue: 199, maxDiscount: 100, validTill: '2026-12-31T23:59:59Z' },
  { id: 'bo5', bank: 'Free Delivery', title: 'Zero Delivery Fee', description: 'Free contactless delivery on orders above ₹299.', code: 'FREEDEL', minCartValue: 299, maxDiscount: 35, validTill: '2026-12-31T23:59:59Z' },
];

export const minDiscountTiles = [
  {
    label: 'Combos Under ₹199',
    subtitle: 'Pocket Friendly Cravings',
    discount: 30,
    gradient: 'linear-gradient(135deg, rgba(234, 88, 12, 0.88), rgba(245, 158, 11, 0.88))',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    href: '/search?price=0-199',
  },
  {
    label: 'Min 40% Off Pizzas',
    subtitle: 'Crust & Cheese Feast',
    discount: 40,
    gradient: 'linear-gradient(135deg, rgba(225, 29, 72, 0.88), rgba(251, 113, 133, 0.88))',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    href: '/search?category=pizzas&discount=40',
  },
  {
    label: 'Min 50% Off Biryani',
    subtitle: 'Dum Cooked Royal Pots',
    discount: 50,
    gradient: 'linear-gradient(135deg, rgba(180, 83, 9, 0.88), rgba(245, 158, 11, 0.88))',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    href: '/search?category=biryani&discount=50',
  },
  {
    label: 'Desserts & Shakes',
    subtitle: 'Sweet Tooth Delights',
    discount: 35,
    gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.88), rgba(192, 132, 252, 0.88))',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    href: '/search?category=desserts',
  },
];

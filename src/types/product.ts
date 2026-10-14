import type { Gender } from './common';

export interface ProductSize {
  name: string;
  stock: number;
  priceModifier?: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface DishAddon {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string; // Restaurant Name
  restaurantName?: string;
  restaurantId?: string;
  gender: Gender;
  categoryPath: string[];
  mrp: number;
  price: number;
  discountPercent: number;
  sizes: ProductSize[]; // Portions
  colors: ProductColor[]; // Variants or Spice choices
  fabric: string; // Cuisine or Dietary
  fit: string; // Portion or Preparation
  pattern: string;
  occasion: string[];
  rating: number;
  ratingCount: number;
  images: string[];
  description: string;
  highlights: string[];
  careInstructions: string[];
  deliveryEstimateDays: number;
  returnWindowDays: number;
  tags: string[];
  createdAt: string;

  // Dedicated Food Delivery Properties
  isVeg?: boolean;
  cuisine?: string;
  prepTime?: string; // e.g. "20-25 mins"
  portionSize?: string; // e.g. "Serves 1-2"
  calories?: number;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Spicy';
  isBestseller?: boolean;
  addOns?: DishAddon[];
}

export interface ProductCardData {
  id: string;
  slug: string;
  title: string;
  brand: string;
  mrp: number;
  price: number;
  discountPercent: number;
  rating: number;
  ratingCount: number;
  images: string[];
  gender: Gender;
  categoryPath: string[];
  isVeg?: boolean;
  restaurantName?: string;
  prepTime?: string;
  portionSize?: string;
  isBestseller?: boolean;
}


export type SortOption =
  | 'recommended'
  | 'delivery_time'
  | 'whats_new'
  | 'popularity'
  | 'price_low_high'
  | 'price_high_low'
  | 'better_discount'
  | 'customer_rating';

export interface FilterState {
  brands: string[];
  categories: string[];
  priceRange: [number, number] | null;
  colors: string[];
  sizes: string[];
  discountMin: number | null;
  ratingMin: number | null;
  fits: string[];
  fabrics: string[];
  occasions: string[];
  sort: SortOption;
  page: number;
  vegOnly?: boolean;
  deliveryTimeMax?: number | null;
  cuisines?: string[];
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Relevance & Recommended' },
  { value: 'delivery_time', label: 'Fastest Delivery' },
  { value: 'customer_rating', label: 'Rating: High to Low' },
  { value: 'price_low_high', label: 'Cost: Low to High' },
  { value: 'price_high_low', label: 'Cost: High to Low' },
  { value: 'better_discount', label: 'Top Offers & Deals' },
  { value: 'popularity', label: 'Most Popular' },
];

export const DEFAULT_FILTER_STATE: FilterState = {
  brands: [],
  categories: [],
  priceRange: null,
  colors: [],
  sizes: [],
  discountMin: null,
  ratingMin: null,
  fits: [],
  fabrics: [],
  occasions: [],
  sort: 'recommended',
  page: 1,
  vegOnly: false,
  deliveryTimeMax: null,
  cuisines: [],
};


export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterSection {
  key: keyof FilterState;
  label: string;
  type: 'checkbox' | 'color' | 'range' | 'rating';
  options?: FilterOption[];
}

export interface CartItem {
  productId: string;
  title: string;
  brand: string; // Restaurant Name
  restaurantName?: string;
  size: string; // Portion
  color: string; // Customization / Spice Level
  quantity: number;
  mrp: number;
  price: number;
  image?: string;
  slug: string;
  maxStock: number;
  isVeg?: boolean;
  notes?: string;
  addons?: string[];
}


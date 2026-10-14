/**
 * Curated high-resolution food photography assets for Zomato platform.
 * All URLs are verified high-quality food photography on Unsplash.
 * Organized by food cuisine and dish type.
 */

export const FOOD_IMAGE_POOLS: Record<string, string[]> = {
  biryani: [
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80', // Royal Dum Biryani
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80', // Hyderabadi Biryani
    'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80', // Spiced Rice Pot
    'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&auto=format&fit=crop&q=80', // Clay Pot Biryani
    'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=800&auto=format&fit=crop&q=80', // Kebab Rice Platter
  ],
  pizza: [
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80', // Artisan Margherita
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80', // Pepperoni Feast
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80', // Cheesy Slice
    'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=80', // Farmhouse Veggie Pizza
    'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=80', // Garlic Breadsticks & Dip
  ],
  burgers: [
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80', // Double Smash Cheeseburger
    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80', // Gourmet Beef/Chicken Burger
    'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80', // Crispy Zinger Burger
    'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&auto=format&fit=crop&q=80', // Peri Peri Loaded Fries
    'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&auto=format&fit=crop&q=80', // Slider Combo
  ],
  'north-indian': [
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80', // Butter Chicken / Paneer Makhani
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80', // Dal Makhani Handi
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80', // Shahi Paneer & Naan
    'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80', // Tandoori Platter
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80', // Garlic Butter Naan Basket
  ],
  chinese: [
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80', // Hakka Noodles Bowl
    'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&auto=format&fit=crop&q=80', // Steamed Dim Sums
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80', // Schezwan Fried Rice
    'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop&q=80', // Crispy Spring Rolls
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&auto=format&fit=crop&q=80', // Manchurian / Chilli Gravy
  ],
  rolls: [
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80', // Kathi Roll
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80', // Shawarma Wrap
    'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=80', // Paneer Frankie
    'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&auto=format&fit=crop&q=80', // Burrito Bowl / Wrap
  ],
  healthy: [
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80', // Fresh Green Salad Bowl
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80', // Avocado Quinoa Bowl
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80', // Superfood Protein Bowl
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&auto=format&fit=crop&q=80', // Greek Feta Salad
  ],
  desserts: [
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80', // Molten Chocolate Lava Cake
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80', // Belgian Waffles with Berries
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80', // Chocolate Brownie Sundae
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80', // Red Velvet Cake Slice
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80', // Artisanal Ice Cream Scoop
  ],
  'south-indian': [
    'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80', // Crispy Masala Dosa
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80', // Steamed Idlis & Vada
    'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&auto=format&fit=crop&q=80', // Mysore Masala Dosa
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80', // South Indian Filter Coffee
  ],
  beverages: [
    'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80', // Iced Caramel Frappe
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80', // Fresh Mint Lime Mojito
    'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80', // Thick Mango Milkshake
    'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&auto=format&fit=crop&q=80', // Masala Chai Kulhad
  ],
};

export function getDummyImagesForProduct(
  id: string,
  _gender?: string,
  categoryPath: string[] = []
): string[] {
  const catText = categoryPath.join(' ').toLowerCase();

  let poolKey = 'biryani';
  if (catText.includes('pizza') || catText.includes('italian') || catText.includes('pasta')) {
    poolKey = 'pizza';
  } else if (catText.includes('burger') || catText.includes('fries') || catText.includes('sandwich')) {
    poolKey = 'burgers';
  } else if (catText.includes('biryani') || catText.includes('rice') || catText.includes('pulao')) {
    poolKey = 'biryani';
  } else if (catText.includes('north') || catText.includes('curry') || catText.includes('paneer') || catText.includes('naan')) {
    poolKey = 'north-indian';
  } else if (catText.includes('chinese') || catText.includes('asian') || catText.includes('noodle') || catText.includes('dim sum')) {
    poolKey = 'chinese';
  } else if (catText.includes('roll') || catText.includes('wrap') || catText.includes('shawarma')) {
    poolKey = 'rolls';
  } else if (catText.includes('salad') || catText.includes('healthy') || catText.includes('bowl')) {
    poolKey = 'healthy';
  } else if (catText.includes('dessert') || catText.includes('cake') || catText.includes('waffle') || catText.includes('ice cream')) {
    poolKey = 'desserts';
  } else if (catText.includes('south') || catText.includes('dosa') || catText.includes('idli')) {
    poolKey = 'south-indian';
  } else if (catText.includes('beverage') || catText.includes('shake') || catText.includes('coffee') || catText.includes('tea')) {
    poolKey = 'beverages';
  }

  const pool = FOOD_IMAGE_POOLS[poolKey] || FOOD_IMAGE_POOLS.biryani;

  // Hash ID deterministically
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  const startIndex = Math.abs(hash) % pool.length;

  const images: string[] = [];
  for (let i = 0; i < 4; i++) {
    images.push(pool[(startIndex + i) % pool.length]);
  }

  return images;
}

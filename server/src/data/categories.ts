import type { CategoryNode, MegaMenuSection } from '../types/index.js';

export const categoryTree: CategoryNode[] = [
  {
    id: 'biryani',
    label: 'Biryani & Rice',
    slug: 'biryani',
    gender: 'men',
    children: [
      {
        id: 'dum-biryani', label: 'Dum Biryani', slug: 'dum-biryani', children: [
          { id: 'hyderabadi-biryani', label: 'Hyderabadi Chicken Biryani', slug: 'hyderabadi-chicken-biryani', productCount: 6 },
          { id: 'mutton-biryani', label: 'Awadhi Mutton Biryani', slug: 'awadhi-mutton-biryani', productCount: 4 },
          { id: 'paneer-biryani', label: 'Paneer Tikka Biryani', slug: 'paneer-tikka-biryani', productCount: 5 },
        ]
      },
      {
        id: 'rice-bowls', label: 'Rice Bowls', slug: 'rice-bowls', children: [
          { id: 'dal-makhani-rice', label: 'Dal Makhani Rice Bowl', slug: 'dal-makhani-rice', productCount: 4 },
          { id: 'butter-chicken-rice', label: 'Butter Chicken Bowl', slug: 'butter-chicken-rice', productCount: 5 },
        ]
      },
    ],
  },
  {
    id: 'pizzas',
    label: 'Pizzas & Italian',
    slug: 'pizzas',
    gender: 'women',
    children: [
      {
        id: 'woodfired-pizzas', label: 'Woodfired Pizzas', slug: 'woodfired-pizzas', children: [
          { id: 'margherita', label: 'Classic Margherita', slug: 'classic-margherita', productCount: 6 },
          { id: 'pepperoni', label: 'Spicy Pepperoni', slug: 'spicy-pepperoni', productCount: 4 },
          { id: 'farmhouse', label: 'Farmhouse Veggie', slug: 'farmhouse-veggie', productCount: 5 },
        ]
      },
      {
        id: 'pastas-sides', label: 'Pastas & Garlic Bread', slug: 'pastas-sides', children: [
          { id: 'alfredo-pasta', label: 'Creamy Alfredo Pasta', slug: 'creamy-alfredo-pasta', productCount: 4 },
          { id: 'garlic-bread', label: 'Cheesy Garlic Breadsticks', slug: 'cheesy-garlic-breadsticks', productCount: 4 },
        ]
      },
    ],
  },
  {
    id: 'burgers',
    label: 'Burgers & Fast Food',
    slug: 'burgers',
    gender: 'kids',
    children: [
      {
        id: 'smash-burgers', label: 'Gourmet Burgers', slug: 'smash-burgers', children: [
          { id: 'cheese-burger', label: 'Double Cheeseburger', slug: 'double-cheeseburger', productCount: 5 },
          { id: 'crispy-chicken', label: 'Crispy Zinger Burger', slug: 'crispy-zinger-burger', productCount: 4 },
          { id: 'veg-patty', label: 'Spicy Veg Crunch Burger', slug: 'spicy-veg-crunch-burger', productCount: 4 },
        ]
      },
      {
        id: 'fries-sides', label: 'Loaded Fries & Wings', slug: 'fries-sides', children: [
          { id: 'peri-peri-fries', label: 'Peri Peri Loaded Fries', slug: 'peri-peri-loaded-fries', productCount: 4 },
          { id: 'crispy-wings', label: 'BBQ Chicken Wings', slug: 'bbq-chicken-wings', productCount: 3 },
        ]
      },
    ],
  },
  {
    id: 'north-indian',
    label: 'North Indian Curries',
    slug: 'north-indian',
    gender: 'men',
    children: [
      {
        id: 'curries', label: 'Curries & Gravies', slug: 'curries', children: [
          { id: 'butter-chicken', label: 'Butter Chicken Boneless', slug: 'butter-chicken-boneless', productCount: 5 },
          { id: 'paneer-butter-masala', label: 'Paneer Butter Masala', slug: 'paneer-butter-masala', productCount: 5 },
          { id: 'dal-makhani', label: 'Special Dal Makhani', slug: 'special-dal-makhani', productCount: 4 },
        ]
      },
      {
        id: 'tandoor-breads', label: 'Breads & Tandoor', slug: 'tandoor-breads', children: [
          { id: 'garlic-naan', label: 'Butter Garlic Naan', slug: 'butter-garlic-naan', productCount: 3 },
          { id: 'tandoori-chicken', label: 'Tandoori Chicken Full', slug: 'tandoori-chicken-full', productCount: 4 },
        ]
      },
    ],
  },
  {
    id: 'chinese',
    label: 'Pan-Asian & Chinese',
    slug: 'chinese',
    gender: 'women',
    children: [
      {
        id: 'noodles-dimsum', label: 'Noodles & Dim Sums', slug: 'noodles-dimsum', children: [
          { id: 'hakka-noodles', label: 'Veg Hakka Noodles', slug: 'veg-hakka-noodles', productCount: 4 },
          { id: 'dim-sums', label: 'Steamed Chicken Dim Sums', slug: 'steamed-chicken-dim-sums', productCount: 4 },
          { id: 'schezwan-rice', label: 'Schezwan Fried Rice', slug: 'schezwan-fried-rice', productCount: 3 },
        ]
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts & Shakes',
    slug: 'desserts',
    gender: 'kids',
    children: [
      {
        id: 'sweet-cravings', label: 'Sweet Treats', slug: 'sweet-cravings', children: [
          { id: 'lava-cake', label: 'Choco Lava Cake', slug: 'choco-lava-cake', productCount: 4 },
          { id: 'waffles', label: 'Belgian Nutella Waffles', slug: 'belgian-nutella-waffles', productCount: 3 },
          { id: 'gulab-jamun', label: 'Warm Gulab Jamun with Rabdi', slug: 'gulab-jamun-rabdi', productCount: 3 },
        ]
      },
    ],
  },
  {
    id: 'men',
    label: 'Biryani & North Indian',
    slug: 'men',
    gender: 'men',
    children: [
      {
        id: 'men-biryani', label: 'Biryani Specials', slug: 'biryani', children: [
          { id: 'dum-biryani-m', label: 'Dum Biryani', slug: 'dum-biryani', productCount: 8 },
          { id: 'kebabs-m', label: 'Tandoori Kebabs', slug: 'kebabs', productCount: 6 },
        ]
      },
    ],
  },
  {
    id: 'women',
    label: 'Pizzas & Asian Bowls',
    slug: 'women',
    gender: 'women',
    children: [
      {
        id: 'women-pizzas', label: 'Gourmet Pizzas', slug: 'pizzas', children: [
          { id: 'woodfired-w', label: 'Woodfired Pizzas', slug: 'woodfired-pizzas', productCount: 8 },
          { id: 'pastas-w', label: 'Italian Pastas', slug: 'pastas', productCount: 6 },
        ]
      },
    ],
  },
  {
    id: 'kids',
    label: 'Burgers & Desserts',
    slug: 'kids',
    gender: 'kids',
    children: [
      {
        id: 'kids-burgers', label: 'Kids Meal Combos', slug: 'burgers', children: [
          { id: 'mini-burgers-k', label: 'Junior Burgers', slug: 'junior-burgers', productCount: 6 },
          { id: 'desserts-k', label: 'Shakes & Sundaes', slug: 'shakes-sundaes', productCount: 5 },
        ]
      },
    ],
  },
];

export const megaMenuSections: MegaMenuSection[] = [
  {
    label: 'CUISINES',
    gender: 'cuisines',
    columns: [
      {
        title: 'Biryani & Rice',
        links: [
          { label: 'Hyderabadi Dum Biryani', href: '/search?category=biryani' },
          { label: 'Awadhi Mutton Biryani', href: '/search?category=biryani' },
          { label: 'Paneer Tikka Biryani', href: '/search?category=biryani&veg=1', highlight: true },
          { label: 'Butter Chicken Rice Bowl', href: '/search?category=rice-bowls' },
        ],
      },
      {
        title: 'Pizzas & Italian',
        links: [
          { label: 'Woodfired Margherita', href: '/search?category=pizzas' },
          { label: 'Spicy Pepperoni Feast', href: '/search?category=pizzas' },
          { label: 'Creamy Alfredo Pasta', href: '/search?category=pizzas' },
          { label: 'Cheesy Garlic Breadsticks', href: '/search?category=pizzas' },
        ],
      },
      {
        title: 'Burgers & Fast Food',
        links: [
          { label: 'Double Smash Cheeseburger', href: '/search?category=burgers' },
          { label: 'Crispy Zinger Chicken', href: '/search?category=burgers' },
          { label: 'Peri Peri Loaded Fries', href: '/search?category=burgers' },
          { label: 'BBQ Chicken Wings', href: '/search?category=burgers' },
        ],
      },
      {
        title: 'North Indian & Curries',
        links: [
          { label: 'Butter Chicken Boneless', href: '/search?category=north-indian' },
          { label: 'Paneer Butter Masala', href: '/search?category=north-indian&veg=1', highlight: true },
          { label: 'Dal Makhani Slow Cooked', href: '/search?category=north-indian' },
          { label: 'Butter Garlic Naan', href: '/search?category=north-indian' },
        ],
      },
      {
        title: 'Desserts & Sweets',
        links: [
          { label: 'Molten Choco Lava Cake', href: '/search?category=desserts', highlight: true },
          { label: 'Belgian Nutella Waffles', href: '/search?category=desserts' },
          { label: 'Gulab Jamun with Rabdi', href: '/search?category=desserts' },
          { label: 'Artisanal Thick Shakes', href: '/search?category=beverages' },
        ],
      },
    ],
  },
  {
    label: 'TOP RESTAURANTS',
    gender: 'restaurants',
    columns: [
      {
        title: 'Iconic Kitchens',
        links: [
          { label: 'Royal Biryani Darbar (4.8 ★)', href: '/search?brand=Royal+Biryani+Darbar' },
          { label: 'Artisan Pizza Co. (4.7 ★)', href: '/search?brand=Artisan+Pizza+Co.' },
          { label: 'The Burger Forge (4.6 ★)', href: '/search?brand=The+Burger+Forge' },
          { label: 'Golden Dragon Wok (4.5 ★)', href: '/search?brand=Golden+Dragon+Wok' },
        ],
      },
      {
        title: 'Specialty Hubs',
        links: [
          { label: 'Spice Symphony (4.8 ★)', href: '/search?brand=Spice+Symphony' },
          { label: 'Dosa Central (4.7 ★)', href: '/search?brand=Dosa+Central' },
          { label: 'Crust & Crumb Bakery (4.9 ★)', href: '/search?brand=Crust+%26+Crumb+Bakery' },
          { label: 'Green Bowl Organics (4.6 ★)', href: '/search?brand=Green+Bowl+Organics' },
        ],
      },
      {
        title: 'Quick Bites',
        links: [
          { label: 'Roll Nation (18 mins)', href: '/search?brand=Roll+Nation' },
          { label: 'Chai & Samosa Co. (12 mins)', href: '/search?brand=Chai+%26+Samosa+Co.' },
          { label: 'Wok This Way (22 mins)', href: '/search?brand=Wok+This+Way' },
        ],
      },
    ],
  },
  {
    label: 'OFFERS',
    gender: 'offers',
    columns: [
      {
        title: 'Mega Discounts',
        links: [
          { label: 'Flat 50% OFF (Code HUNGRY50)', href: '/search?discount=50', highlight: true },
          { label: 'Min 40% OFF Super Deals', href: '/search?discount=40', highlight: true },
          { label: 'Combos Under ₹199', href: '/search?price=0-199' },
          { label: 'Free Delivery Orders', href: '/search?discount=20' },
        ],
      },
      {
        title: 'Cuisine Deals',
        links: [
          { label: 'Biryani Festival 40% OFF', href: '/search?category=biryani&discount=40' },
          { label: 'Pizza Bonanza 30% OFF', href: '/search?category=pizzas&discount=30' },
          { label: 'Burger Mania Combos', href: '/search?category=burgers' },
        ],
      },
    ],
  },
  {
    label: 'FAST DELIVERY',
    gender: 'fast',
    columns: [
      {
        title: 'Express Delivery (<20 mins)',
        links: [
          { label: 'Quick Pizzas & Slices', href: '/search?category=pizzas' },
          { label: 'Instant Burgers & Fries', href: '/search?category=burgers' },
          { label: 'Hot Kathi Rolls', href: '/search?category=rolls' },
          { label: 'Chai & Quick Snacks', href: '/search?brand=Chai+%26+Samosa+Co.' },
        ],
      },
    ],
  },
  {
    label: 'PURE VEG',
    gender: 'veg',
    columns: [
      {
        title: '100% Vegetarian Delights',
        links: [
          { label: 'Paneer Butter Masala', href: '/search?category=north-indian&veg=1', highlight: true },
          { label: 'Paneer Dum Biryani', href: '/search?category=biryani&veg=1', highlight: true },
          { label: 'Farmhouse Veg Pizza', href: '/search?category=pizzas&veg=1' },
          { label: 'Crispy Masala Dosa', href: '/search?category=south-indian&veg=1' },
          { label: 'Fresh Healthy Salads', href: '/search?category=healthy&veg=1' },
        ],
      },
    ],
  },
];

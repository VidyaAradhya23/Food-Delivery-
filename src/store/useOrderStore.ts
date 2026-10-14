import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, OrderStatus } from '../types';
import { useAuthStore } from './useAuthStore';

interface OrderStore {
  orders: Order[];
  createOrder: (
    data: Omit<Order, 'id' | 'createdAt' | 'status' | 'timeline' | 'estimatedDelivery'>
  ) => Order;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByUser: (userId: string) => Order[];
  cancelOrder: (orderId: string, reason: string) => boolean;
  requestReturn: (
    orderId: string,
    itemId: string,
    reason: string,
    type: 'refund' | 'exchange',
    newSize?: string,
    refundToWallet?: boolean
  ) => boolean;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  clearOrders: () => void;
}

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ZOM-912048',
    userId: 'usr-demo-1',
    status: 'out_for_delivery',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    estimatedDelivery: '15-20 mins (Rider on the way)',
    deliveryPin: '5819',
    driver: {
      name: 'Vikram Singh',
      phone: '+91 98765 43210',
      vehicle: 'Electric Scooter (KA-03-EV-1928)',
      rating: 4.9,
    },
    shippingAddress: 'Rahul Sharma, 402, Lotus Grandeur, 12th Main, Indiranagar, Bengaluru, Karnataka - 560038, Ph: 9876543210',
    paymentMethod: 'UPI (rahul@okhdfcbank)',
    subtotal: 789,
    discount: 100,
    deliveryFee: 0,
    total: 724,
    couponCode: 'HUNGRY50',
    cookingInstructions: 'Please send extra salan and mint chutney',
    items: [
      {
        productId: 'prod-biryani-1',
        title: 'Awadhi Dum Gosht Biryani',
        brand: 'Royal Biryani Darbar',
        size: 'Regular (Serves 1-2)',
        color: 'Medium Spicy',
        quantity: 1,
        mrp: 549,
        price: 499,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
      },
      {
        productId: 'prod-north-2',
        title: 'Garlic Butter Naan (2 pcs)',
        brand: 'Royal Biryani Darbar',
        size: '2 pcs',
        color: 'Crispy Butter',
        quantity: 1,
        mrp: 140,
        price: 120,
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
      },
    ],
    timeline: [
      {
        status: 'placed',
        timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
        description: 'Order placed & payment verified. Sent to Royal Biryani Darbar kitchen.',
      },
      {
        status: 'confirmed',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        description: 'Chef accepted the order. Fresh Dum preparation in progress.',
      },
      {
        status: 'packed',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        description: 'Meal packed hot in thermal insulated sealed handi bag.',
      },
      {
        status: 'out_for_delivery',
        timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
        description: 'Delivery partner Vikram Singh picked up order. Heading towards Indiranagar.',
      },
    ],
  },
  {
    id: 'NOC-839210',
    userId: 'usr-demo-1',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    estimatedDelivery: '25-30 mins',
    deliveryPin: '3194',
    driver: {
      name: 'Arjun Rao',
      phone: '+91 98111 22334',
      vehicle: 'TVS iQube (KA-05-EV-4421)',
      rating: 4.8,
    },
    shippingAddress: 'Rahul Sharma, 402, Lotus Grandeur, 12th Main, Indiranagar, Bengaluru, Karnataka - 560038, Ph: 9876543210',
    paymentMethod: 'Credit Card (HDFC **** 4012)',
    subtotal: 679,
    discount: 50,
    deliveryFee: 0,
    total: 649,
    couponCode: 'FEAST150',
    items: [
      {
        productId: 'prod-pizza-1',
        title: 'Truffle Mushroom & Smoked Mozzarella Sourdough Pizza',
        brand: 'Artisan Pizza Co.',
        size: '11 inch Medium',
        color: 'Crispy Thin Crust',
        quantity: 1,
        mrp: 699,
        price: 549,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
      },
      {
        productId: 'prod-beverage-2',
        title: 'Berry Hibiscus Iced Tea',
        brand: 'Artisan Pizza Co.',
        size: '350ml Glass Bottle',
        color: 'Chilled',
        quantity: 1,
        mrp: 160,
        price: 130,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
      },
    ],
    timeline: [
      {
        status: 'placed',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        description: 'Order placed successfully. Thank you for choosing NOCTURNE Haute Cuisine!',
      },
      {
        status: 'confirmed',
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        description: 'Artisan Pizza Co. kitchen is stone-baking your wood-fired sourdough pizza.',
      },
    ],
  },
  {
    id: 'NOC-782419',
    userId: 'usr-demo-1',
    status: 'delivered',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: 'Delivered in 28 mins',
    deliveryPin: '7102',
    shippingAddress: 'Rahul Sharma, 402, Lotus Grandeur, 12th Main, Indiranagar, Bengaluru, Karnataka - 560038, Ph: 9876543210',
    paymentMethod: 'UPI (rahul@okhdfcbank)',
    subtotal: 580,
    discount: 100,
    deliveryFee: 0,
    total: 515,
    items: [
      {
        productId: 'prod-burger-1',
        title: 'The Monster Smash Double Cheeseburger',
        brand: 'The Burger Forge',
        size: 'Double Patty',
        color: 'Spicy Secret Relish',
        quantity: 1,
        mrp: 449,
        price: 369,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
      },
      {
        productId: 'prod-dessert-2',
        title: 'Warm Belgian Chocolate Lava Cake',
        brand: 'The Burger Forge',
        size: 'Single Portion',
        color: 'Warm Molten Center',
        quantity: 1,
        mrp: 240,
        price: 189,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
      },
    ],
    timeline: [
      {
        status: 'placed',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        description: 'Order placed successfully.',
      },
      {
        status: 'confirmed',
        timestamp: new Date(Date.now() - 23.8 * 60 * 60 * 1000).toISOString(),
        description: 'Kitchen grilled burgers fresh on flat top griddle.',
      },
      {
        status: 'packed',
        timestamp: new Date(Date.now() - 23.6 * 60 * 60 * 1000).toISOString(),
        description: 'Packed hot in foil-lined insulated packaging.',
      },
      {
        status: 'out_for_delivery',
        timestamp: new Date(Date.now() - 23.4 * 60 * 60 * 1000).toISOString(),
        description: 'Rider was out for delivery to Indiranagar.',
      },
      {
        status: 'delivered',
        timestamp: new Date(Date.now() - 23.2 * 60 * 60 * 1000).toISOString(),
        description: 'Delivered hot to door. Verified via Delivery PIN 7102.',
      },
    ],
  },
];

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: INITIAL_DEMO_ORDERS,

      createOrder: (data) => {
        const orderId = `ZOM-${Math.floor(100000 + Math.random() * 900000)}`;
        const now = new Date();

        const newOrder: Order = {
          ...data,
          id: orderId,
          status: 'placed',
          createdAt: now.toISOString(),
          estimatedDelivery: '25-35 mins (Express Delivery)',
          deliveryPin: String(Math.floor(1000 + Math.random() * 9000)),
          driver: {
            name: 'Vikram Singh',
            phone: '+91 98765 43210',
            vehicle: 'Electric Scooter (KA-03-EV-1928)',
            rating: 4.9,
          },
          timeline: [
            {
              status: 'placed',
              timestamp: now.toISOString(),
              description: 'Order placed & payment verified. Sent to restaurant kitchen! 🍳',
            },
            {
              status: 'confirmed',
              timestamp: new Date(now.getTime() + 60 * 1000).toISOString(),
              description: 'Kitchen confirmed! Express delivery partner assigned.',
            },
          ],
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      getOrderById: (id) => {
        return get().orders.find((o) => o.id === id);
      },

      getOrdersByUser: (userId) => {
        return get().orders.filter((o) => o.userId === userId || userId === 'usr-demo-1');
      },

      cancelOrder: (orderId, reason) => {
        const order = get().orders.find((o) => o.id === orderId);
        if (!order || (order.status !== 'placed' && order.status !== 'confirmed' && order.status !== 'packed')) {
          return false;
        }

        const now = new Date().toISOString();
        const updatedTimeline = [
          ...order.timeline,
          {
            status: 'cancelled' as OrderStatus,
            timestamp: now,
            description: `Order cancelled by user: "${reason}". Full refund of ₹${order.total} credited to StyleBazaar Wallet.`,
          },
        ];

        // Automatic instant refund to wallet
        useAuthStore.getState().addWalletBalance(
          order.total,
          `Instant Refund for Cancelled Order #${order.id}`
        );

        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: 'cancelled',
                  cancellationReason: reason,
                  cancellationDate: now,
                  refundAmount: order.total,
                  timeline: updatedTimeline,
                }
              : o
          ),
        }));

        return true;
      },

      requestReturn: (orderId, itemId, reason, type, newSize, refundToWallet = true) => {
        const order = get().orders.find((o) => o.id === orderId);
        if (!order || order.status !== 'delivered') {
          return false;
        }

        const targetItem = order.items.find((i) => i.productId === itemId);
        const itemRefund = targetItem ? targetItem.price * targetItem.quantity : order.total;
        const now = new Date().toISOString();
        const pickupDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        });

        const updatedTimeline = [
          ...order.timeline,
          {
            status: 'returned' as OrderStatus,
            timestamp: now,
            description: `${type === 'exchange' ? `Exchange request for size ${newSize}` : 'Return request'} approved. Doorstep pickup scheduled for ${pickupDate}. Reason: ${reason}.`,
          },
        ];

        if (type === 'refund' && refundToWallet) {
          useAuthStore.getState().addWalletBalance(
            itemRefund,
            `Instant Wallet Refund for Returned Item in #${order.id}`
          );
        }

        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: 'returned',
                  returnRequest: {
                    itemId,
                    reason,
                    type,
                    newSize,
                    status: 'pickup_scheduled',
                    pickupDate,
                    refundAmount: itemRefund,
                  },
                  timeline: updatedTimeline,
                }
              : o
          ),
        }));

        return true;
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        }));
      },

      clearOrders: () => set({ orders: [] }),
    }),
    { name: 'stylebazaar-orders' }
  )
);

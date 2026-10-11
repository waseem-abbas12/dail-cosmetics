import { create } from 'zustand';
import type { Product, CartItem, OrderDetails, PageView, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';

interface StoreState {
  // Navigation & Page State
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Cart State
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Promo / Voucher State
  appliedVoucher: string | null;
  discountPercentage: number;
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;

  // Calculations
  freeShippingThreshold: number;
  flatShippingFee: number;
  getCartSubtotal: () => number;
  getCartDiscount: () => number;
  getShippingFee: () => number;
  getCartTotal: () => number;
  getTotalItemsCount: () => number;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  selectedConcern: string;
  setSelectedConcern: (concern: string) => void;

  // Orders
  currentOrder: OrderDetails | null;
  orders: OrderDetails[];
  createOrder: (orderData: Omit<OrderDetails, 'orderId' | 'date' | 'status'>) => OrderDetails;
  trackOrderById: (orderId: string) => OrderDetails | null;
}

export const useStore = create<StoreState>((set, get) => ({
  currentPage: 'home',
  setCurrentPage: (page) => {
    set({ currentPage: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  selectedProduct: PRODUCTS[0],
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  cart: [
    {
      product: PRODUCTS[0],
      quantity: 1,
    }
  ],
  isCartOpen: false,
  setIsCartOpen: (open) => set({ isCartOpen: open }),

  addToCart: (product, quantity = 1) => {
    const { cart } = get();
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      set({ cart: updated, isCartOpen: true });
    } else {
      set({ cart: [...cart, { product, quantity }], isCartOpen: true });
    }
  },

  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.product.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    const updated = get().cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    set({ cart: updated });
  },

  clearCart: () => set({ cart: [], appliedVoucher: null, discountPercentage: 0 }),

  // Vouchers: 'ORGANIC10' gives 10% off, 'DALI20' gives 20% off
  appliedVoucher: null,
  discountPercentage: 0,
  applyVoucher: (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ORGANIC10') {
      set({ appliedVoucher: 'ORGANIC10', discountPercentage: 10 });
      return { success: true, message: 'Voucher applied! 10% discount added.' };
    }
    if (cleanCode === 'DALI20') {
      set({ appliedVoucher: 'DALI20', discountPercentage: 20 });
      return { success: true, message: 'Special Welcome Code! 20% discount applied.' };
    }
    return { success: false, message: 'Invalid voucher code. Try "ORGANIC10"' };
  },
  removeVoucher: () => set({ appliedVoucher: null, discountPercentage: 0 }),

  freeShippingThreshold: 3500, // PKR 3,500 for free delivery in Pakistan
  flatShippingFee: 250,        // PKR 250 nationwide

  getCartSubtotal: () => {
    return get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  getCartDiscount: () => {
    const subtotal = get().getCartSubtotal();
    return Math.round((subtotal * get().discountPercentage) / 100);
  },

  getShippingFee: () => {
    const subtotal = get().getCartSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= get().freeShippingThreshold ? 0 : get().flatShippingFee;
  },

  getCartTotal: () => {
    const subtotal = get().getCartSubtotal();
    const discount = get().getCartDiscount();
    const shipping = get().getShippingFee();
    return Math.max(0, subtotal - discount + shipping);
  },

  getTotalItemsCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Search & Filter
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: 'all',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  selectedConcern: 'all',
  setSelectedConcern: (concern) => set({ selectedConcern: concern }),

  // Orders
  currentOrder: null,
  orders: [
    {
      orderId: 'DALI-PK-7821',
      date: '2026-10-09',
      customerName: 'Zainab Malik',
      email: 'zainab@gmail.com',
      phone: '03001234567',
      address: 'House 42-B, Sector F-8/2',
      city: 'Islamabad',
      province: 'Federal Capital',
      paymentMethod: 'cod',
      items: [
        {
          productId: 'dali-royal-hair-oil',
          name: 'Dali Royal 32-Herb Infusion Hair Oil',
          price: 2450,
          quantity: 1,
          image: PRODUCTS[0].image
        }
      ],
      subtotal: 2450,
      shippingFee: 250,
      discount: 0,
      total: 2700,
      status: 'dispatched',
      courierName: 'Trax Logistics Pakistan',
      trackingNumber: 'TRX-8941920-PK'
    }
  ],

  createOrder: (orderData) => {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `DALI-PK-${randNum}`;
    const newOrder: OrderDetails = {
      ...orderData,
      orderId: newOrderId,
      date: new Date().toISOString().split('T')[0],
      status: 'confirmed',
      courierName: 'Trax Express / TCS Pakistan',
      trackingNumber: `TRX-${Math.floor(1000000 + Math.random() * 9000000)}-PK`
    };

    set((state) => ({
      orders: [newOrder, ...state.orders],
      currentOrder: newOrder,
      cart: [],
      appliedVoucher: null,
      discountPercentage: 0
    }));

    return newOrder;
  },

  trackOrderById: (orderId) => {
    const searchId = orderId.trim().toUpperCase();
    const found = get().orders.find((o) => o.orderId.toUpperCase() === searchId);
    return found || null;
  }
}));

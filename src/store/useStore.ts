import { create } from 'zustand';
import type { Product, CartItem, OrderDetails, PageView, ProductCategory, ProductReview } from '../types';
import { PRODUCTS, REVIEWS } from '../data/products';

interface StoreState {
  // Navigation & Page State
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Global Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Wishlist State
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  addAllWishlistToCart: () => void;

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
  maxPriceFilter: number;
  setMaxPriceFilter: (price: number) => void;

  // Reviews
  reviews: ProductReview[];
  addReview: (review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => void;

  // Orders & Admin
  currentOrder: OrderDetails | null;
  orders: OrderDetails[];
  createOrder: (orderData: Omit<OrderDetails, 'orderId' | 'date' | 'status'>) => OrderDetails;
  updateOrderStatus: (orderId: string, status: OrderDetails['status']) => void;
  trackOrderById: (orderIdOrPhone: string) => OrderDetails | null;
}

// Initial orders for realistic demo
const INITIAL_ORDERS: OrderDetails[] = [
  {
    orderId: 'DAIL-PK-9824',
    date: '2026-10-10',
    customerName: 'Ayesha Siddiqui',
    email: 'ayesha.siddiqui@gmail.com',
    phone: '03214567890',
    address: 'Flat 402, Al-Ghafoor Tower, Gulshan-e-Iqbal',
    city: 'Karachi',
    province: 'Sindh',
    paymentMethod: 'cod',
    items: [
      {
        productId: 'dail-complete-trio-box',
        name: 'Dail Complete 3-in-1 Regimen Box (Full Trio)',
        price: 3890,
        quantity: 1,
        image: PRODUCTS[3]?.image || '/images/dail_packaging.jpg'
      }
    ],
    subtotal: 3890,
    shippingFee: 0,
    discount: 0,
    total: 3890,
    status: 'dispatched',
    courierName: 'Trax Logistics Pakistan',
    trackingNumber: 'TRX-9824102-PK'
  },
  {
    orderId: 'DAIL-PK-7821',
    date: '2026-10-09',
    customerName: 'Zainab Malik',
    email: 'zainab.malik@gmail.com',
    phone: '03001234567',
    address: 'House 42-B, Sector F-8/2',
    city: 'Islamabad',
    province: 'Federal Capital',
    paymentMethod: 'cod',
    items: [
      {
        productId: 'dail-herbal-hair-oil-120ml',
        name: 'Dail 100% Organic Herbal Hair Oil (120ml)',
        price: 1450,
        quantity: 2,
        image: PRODUCTS[0].image
      }
    ],
    subtotal: 2900,
    shippingFee: 0,
    discount: 0,
    total: 2900,
    status: 'delivered',
    courierName: 'TCS Pakistan',
    trackingNumber: 'TCS-7821903-PK'
  }
];

export const useStore = create<StoreState>((set, get) => ({
  currentPage: 'home',
  setCurrentPage: (page) => {
    set({ currentPage: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  selectedProduct: PRODUCTS[0],
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  quickViewProduct: null,
  setQuickViewProduct: (product) => set({ quickViewProduct: product }),

  isSearchOpen: false,
  setIsSearchOpen: (open) => set({ isSearchOpen: open }),

  wishlist: [PRODUCTS[0].id, PRODUCTS[1].id],
  toggleWishlist: (productId) => {
    const { wishlist } = get();
    if (wishlist.includes(productId)) {
      set({ wishlist: wishlist.filter((id) => id !== productId) });
    } else {
      set({ wishlist: [...wishlist, productId] });
    }
  },
  isInWishlist: (productId) => get().wishlist.includes(productId),
  clearWishlist: () => set({ wishlist: [] }),
  addAllWishlistToCart: () => {
    const { wishlist, addToCart } = get();
    wishlist.forEach((id) => {
      const prod = PRODUCTS.find((p) => p.id === id);
      if (prod) addToCart(prod, 1);
    });
  },

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

  // Vouchers
  appliedVoucher: null,
  discountPercentage: 0,
  applyVoucher: (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ORGANIC10') {
      set({ appliedVoucher: 'ORGANIC10', discountPercentage: 10 });
      return { success: true, message: 'Voucher applied! 10% discount added.' };
    }
    if (cleanCode === 'DAIL20' || cleanCode === 'DALI20') {
      set({ appliedVoucher: 'DAIL20', discountPercentage: 20 });
      return { success: true, message: 'Special Welcome Code! 20% discount applied.' };
    }
    return { success: false, message: 'Invalid voucher code. Try "ORGANIC10" or "DAIL20"' };
  },
  removeVoucher: () => set({ appliedVoucher: null, discountPercentage: 0 }),

  freeShippingThreshold: 2500, // PKR 2,500 for free delivery in Pakistan
  flatShippingFee: 200,        // PKR 200 nationwide

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
  maxPriceFilter: 5000,
  setMaxPriceFilter: (price) => set({ maxPriceFilter: price }),

  // Reviews
  reviews: REVIEWS,
  addReview: (review) => {
    const newRev: ProductReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 1,
    };
    set((state) => ({ reviews: [newRev, ...state.reviews] }));
  },

  // Orders & Admin
  currentOrder: null,
  orders: INITIAL_ORDERS,

  createOrder: (orderData) => {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `DAIL-PK-${randNum}`;
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

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((o) => (o.orderId === orderId ? { ...o, status } : o)),
      currentOrder: state.currentOrder?.orderId === orderId ? { ...state.currentOrder, status } : state.currentOrder
    }));
  },

  trackOrderById: (orderIdOrPhone) => {
    const search = orderIdOrPhone.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!search) return null;
    const found = get().orders.find((o) => {
      const cleanOrderId = o.orderId.toUpperCase().replace(/[^A-Z0-9]/g, '');
      const cleanPhone = o.phone.replace(/[^0-9]/g, '');
      return cleanOrderId.includes(search) || cleanPhone.includes(search);
    });
    return found || null;
  }
}));

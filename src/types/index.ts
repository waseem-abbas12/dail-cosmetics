export type ProductCategory = 'all' | 'hair-oil' | 'cream' | 'mist' | 'bundles';

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  urduName?: string;
  tagline: string;
  category: ProductCategory;
  concern: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Best Seller' | 'New' | '100% Organic' | 'Top Rated' | 'Without Steroid';
  volume: string;
  image: string;
  galleryImages: string[];
  description: string;
  benefits: string[];
  keyIngredients: {
    name: string;
    description: string;
    icon?: string;
  }[];
  howToUse: string[];
  fullIngredients: string;
  inStock: boolean;
  modelType: 'oil' | 'beauty-cream' | 'hand-foot' | 'bottle' | 'jar' | 'spray';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer';
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'processing' | 'dispatched' | 'delivered';
  courierName?: string;
  trackingNumber?: string;
}

export interface VideoTestimonial {
  id: string;
  title: string;
  author: string;
  city: string;
  productName: string;
  duration: string;
  thumbnailUrl: string;
  quote: string;
}

export type PageView = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'checkout' 
  | 'track-order' 
  | 'wishlist'
  | 'about' 
  | 'contact'
  | 'admin';

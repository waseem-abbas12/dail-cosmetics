import React from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, setCurrentPage } = useStore();

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-2 border border-rose-100">
            <Heart className="w-6 h-6 fill-rose-500" />
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            My Saved Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-normal">
            Your personal collection of botanical formulations and hair regimens.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/90 max-w-lg mx-auto p-8 shadow-xs space-y-4">
            <div className="text-3xl">🤍</div>
            <h3 className="font-serif-luxury text-xl font-bold text-stone-800">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-stone-500">
              Browse our official catalog and tap the heart icon on any product to save it here.
            </p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-6 py-3 rounded-full bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold transition-all inline-flex items-center gap-2"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

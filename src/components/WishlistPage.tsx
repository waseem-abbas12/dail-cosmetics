import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist, addAllWishlistToCart, setCurrentPage, setIsCartOpen } = useStore();
  const [toast, setToast] = useState<string | null>(null);

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleAddAll = () => {
    addAllWishlistToCart();
    setToast('Added all wishlist items to your bag!');
    setIsCartOpen(true);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-2 border border-rose-100">
            <Heart className="w-6 h-6 fill-rose-500" />
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            My Saved Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-normal">
            Your personal collection of botanical hair oils and restorative creams.
          </p>
        </div>

        {toast && (
          <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl text-center max-w-md mx-auto border border-emerald-300">
            ✓ {toast}
          </div>
        )}

        {wishlistProducts.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
            <span className="text-xs text-stone-600 font-medium">
              You have <strong>{wishlistProducts.length}</strong> items saved in your wishlist.
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Wishlist</span>
              </button>

              <button
                onClick={handleAddAll}
                className="px-5 py-2 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add All to Bag</span>
              </button>
            </div>
          </div>
        )}

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/90 max-w-lg mx-auto p-8 shadow-xs space-y-4">
            <div className="text-4xl">🤍</div>
            <h3 className="font-serif-luxury text-xl font-bold text-stone-800">
              Your wishlist is currently empty
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Tap the heart icon on any product in our apothecary to save your favorite formulations here.
            </p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-6 py-3 rounded-full bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Explore Formulations</span>
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

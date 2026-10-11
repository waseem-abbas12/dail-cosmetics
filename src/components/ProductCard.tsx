import React from 'react';
import type { Product } from '../types';
import { useStore } from '../store/useStore';
import { Star, ShoppingBag, Eye, Heart, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    setSelectedProduct, 
    setCurrentPage, 
    setQuickViewProduct,
    isInWishlist,
    toggleWishlist 
  } = useStore();

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={handleCardClick}
      className="group relative cursor-pointer rounded-2xl bg-white border border-stone-200/80 p-4 transition-all duration-300 hover:border-[#c59b27]/60 hover:shadow-xl hover:shadow-stone-900/5 flex flex-col justify-between"
    >
      {/* 1. Image Showcase Container */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-stone-50 border border-stone-100 flex items-center justify-center p-3">
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges on Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.badge && (
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs ${
              product.badge === 'Without Steroid' || product.id.includes('beauty')
                ? 'bg-[#7b3e1d] text-white'
                : 'bg-[#c59b27] text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-[#7b3e1d]">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button on Top Right */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-stone-400 hover:text-rose-500 shadow-xs transition-colors"
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button (Hover Overlay) */}
        <div className="absolute bottom-2.5 inset-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2">
          <button
            onClick={handleQuickView}
            className="w-full py-2 px-3 rounded-lg bg-white/95 hover:bg-white text-stone-800 text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-colors border border-stone-200"
          >
            <Eye className="w-3.5 h-3.5 text-[#7b3e1d]" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Volume Pill */}
        <div className="absolute bottom-2.5 left-2.5 group-hover:opacity-0 transition-opacity z-10">
          <span className="px-2 py-0.5 rounded-md bg-stone-900/75 text-[10px] text-white font-medium">
            {product.volume}
          </span>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="mt-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Star Rating & Verified Count */}
          <div className="flex items-center gap-1.5 text-xs text-amber-500">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-stone-700 font-bold text-[11px]">{product.rating}</span>
            <span className="text-stone-400 text-[10px]">({product.reviewCount} reviews)</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-luxury text-base font-bold text-stone-900 group-hover:text-[#7b3e1d] transition-colors line-clamp-1 mt-1">
            {product.name}
          </h3>

          {/* Micro Tagline */}
          <p className="text-xs text-stone-500 line-clamp-1 font-light mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* In-Stock Indicator */}
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">In Stock & Ready for Dispatch</span>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#7b3e1d]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-900 hover:bg-[#7b3e1d] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
            title="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Add +</span>
          </button>
        </div>
      </div>
    </div>
  );
};

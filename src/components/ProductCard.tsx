import React, { useState } from 'react';
import type { Product } from '../types';
import { useStore } from '../store/useStore';
import { Star, ShoppingBag, Eye, Heart, MessageCircle, Sparkles } from 'lucide-react';

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

  const [activeAngle, setActiveAngle] = useState<'product' | 'box'>('product');

  const isFavorited = isInWishlist(product.id);
  const packagingBoxImage = product.galleryImages?.[1] || '/images/dail_packaging.jpg';
  const displayImage = activeAngle === 'product' ? product.image : packagingBoxImage;

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

  const handleAngleToggle = (e: React.MouseEvent, angle: 'product' | 'box') => {
    e.stopPropagation();
    setActiveAngle(angle);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `As-salamu alaykum Dail Cosmetics! I want to order:\n• ${product.name} (Rs. ${product.price.toLocaleString()})\n\nPlease deliver via Cash on Delivery.`
    );
    window.open(`https://wa.me/923000000000?text=${text}`, '_blank');
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={handleCardClick}
      className="group relative cursor-pointer rounded-2xl sm:rounded-3xl bg-white border border-stone-200/90 p-2.5 sm:p-3.5 transition-all duration-300 hover:border-[#c59b27]/60 hover:shadow-xl hover:shadow-stone-900/8 flex flex-col justify-between"
    >
      {/* 1. Ultra-Luxury Editorial Studio Visual Stage */}
      <div className="relative w-full aspect-4/5 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#f7f2ea] to-[#eee5d8] border border-stone-200/70 flex flex-col items-center justify-center p-2 sm:p-4 group/image">
        
        {/* Soft Ambient Studio Spotlight Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9)_0%,rgba(247,242,234,0.4)_60%,transparent_100%)] pointer-events-none" />

        {/* Product Visual */}
        <div className="relative z-10 w-full h-[85%] flex items-center justify-center">
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-[0_16px_22px_rgba(123,62,29,0.18)] group-hover/image:scale-106 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Subtle Grounding Pedestal Shadow */}
        <div className="w-3/4 h-2.5 rounded-[50%] bg-[#7b3e1d]/12 blur-[5px] -mt-2 z-5 pointer-events-none transition-all duration-300 group-hover/image:w-4/5 group-hover/image:bg-[#7b3e1d]/18" />

        {/* Badges on Top Left */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 items-start z-20 pointer-events-none">
          {product.badge && (
            <span className={`px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-xs ${
              product.badge === 'Without Steroid' || product.id.includes('beauty')
                ? 'bg-[#7b3e1d] text-white'
                : 'bg-[#c59b27] text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-amber-100/90 text-[#7b3e1d] backdrop-blur-xs">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button on Top Right */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-20 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white text-stone-400 hover:text-rose-500 shadow-xs transition-colors cursor-pointer"
          title="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Interactive Dual-View Toggle Pills (Bottle vs Box) */}
        <div className="absolute bottom-2 left-2 z-20 flex items-center bg-white/90 backdrop-blur-md rounded-lg p-0.5 border border-stone-200/80 shadow-xs">
          <button
            onClick={(e) => handleAngleToggle(e, 'product')}
            className={`px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-md transition-all cursor-pointer ${
              activeAngle === 'product'
                ? 'bg-[#7b3e1d] text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Inspect Bottle/Jar"
          >
            Bottle
          </button>
          <button
            onClick={(e) => handleAngleToggle(e, 'box')}
            className={`px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-md transition-all cursor-pointer ${
              activeAngle === 'box'
                ? 'bg-[#7b3e1d] text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Inspect Official Packaging Box"
          >
            Box
          </button>
        </div>

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 hidden sm:flex">
          <button
            onClick={handleQuickView}
            className="py-1 px-2 rounded-lg bg-stone-900/90 hover:bg-stone-900 text-white text-[10px] font-bold shadow-md flex items-center gap-1 transition-colors backdrop-blur-xs cursor-pointer"
          >
            <Eye className="w-3 h-3 text-[#c59b27]" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Volume Chip */}
        <div className="absolute bottom-2 right-2 group-hover:opacity-0 transition-opacity z-10 sm:block">
          <span className="px-1.5 py-0.5 rounded-md bg-stone-900/70 text-[9px] sm:text-[10px] text-white font-medium backdrop-blur-xs">
            {product.volume.split('/')[0]}
          </span>
        </div>
      </div>

      {/* 2. Product Details Section */}
      <div className="mt-2.5 sm:mt-3 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Star Rating & Verified Count */}
          <div className="flex items-center gap-1 text-[11px] text-amber-500">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-stone-700 font-bold text-[10px] sm:text-[11px]">{product.rating}</span>
            <span className="text-stone-400 text-[9px] sm:text-[10px]">({product.reviewCount})</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-luxury text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#7b3e1d] transition-colors line-clamp-1 mt-0.5 leading-snug">
            {product.name}
          </h3>

          {/* Micro Tagline */}
          <p className="text-[11px] text-stone-500 line-clamp-1 font-normal mt-0.5">
            {product.urduName || product.tagline}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-1.5">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-bold text-[#7b3e1d]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleWhatsAppOrder}
              className="p-1.5 sm:p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleAddToCart}
              className="px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-stone-900 hover:bg-[#7b3e1d] text-white text-[11px] sm:text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors shrink-0 cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingBag className="w-3 h-3 text-amber-300" />
              <span className="hidden sm:inline">Add +</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

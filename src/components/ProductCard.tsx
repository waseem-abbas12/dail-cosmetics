import React from 'react';
import type { Product } from '../types';
import { useStore } from '../store/useStore';
import { Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, setCurrentPage } = useStore();

  const handleCardClick = () => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={handleCardClick}
      className="group relative cursor-pointer rounded-3xl bg-gradient-to-b from-[#15171e] via-[#0d0e12] to-[#07080a] border border-[#d4af37]/25 p-4 sm:p-5 transition-all duration-400 hover:border-[#d4af37] hover:shadow-2xl hover:shadow-amber-950/40 flex flex-col justify-between"
    >
      {/* Top Image Container with Real Cropped Packaging Photos */}
      <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#0a0b0e] flex items-center justify-center p-2 border border-[#d4af37]/15">
        
        {/* Subtle Warm Specular Glow on Hover */}
        <div className="absolute inset-0 bg-[#d4af37]/5 group-hover:bg-[#d4af37]/15 transition-colors" />

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
          loading="lazy"
        />

        {/* Badges on Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          {product.badge && (
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
              product.badge === 'Without Steroid' || product.id.includes('beauty')
                ? 'bg-[#c41e3a] text-white'
                : 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black'
            }`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-black">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* 3D Inspect Quick Pill on Hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#d4af37]/50 text-[#f3e5ab] text-[11px] font-bold flex items-center gap-1 shadow-xl">
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" /> 3D View
          </span>
        </div>

        {/* Volume badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-md bg-black/85 text-[10px] text-stone-200 font-mono border border-stone-800">
            {product.volume}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-amber-400">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-bold text-[11px]">{product.rating}</span>
            <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-[#f3e5ab] transition-colors line-clamp-1 mt-1">
            {product.name}
          </h3>

          {/* Urdu subtitle */}
          {product.urduName && (
            <p className="text-[#d4af37]/90 text-xs font-serif line-clamp-1 text-right mt-0.5">
              {product.urduName}
            </p>
          )}

          {/* Tagline */}
          <p className="text-stone-300 text-xs line-clamp-2 mt-1 font-light leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action Bar */}
        <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-500 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#d4af37] block font-medium">PKR • Cash On Delivery</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="p-3 rounded-full btn-gold-luxury flex items-center justify-center shadow-lg active:scale-95 transition-all group/btn"
            title="Add to Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-black group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

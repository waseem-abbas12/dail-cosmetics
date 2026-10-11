import React from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ShoppingBag, Star, Sparkles, Check, Truck, ShieldCheck } from 'lucide-react';

export const RegimenDuoSection: React.FC = () => {
  const { addToCart, setIsCartOpen } = useStore();

  const hairOil = PRODUCTS[0];
  const beautyCream = PRODUCTS[1];

  const duoOriginalPrice = hairOil.price + beautyCream.price;
  const duoDiscountedPrice = 2490; // Special bundle deal
  const savings = duoOriginalPrice - duoDiscountedPrice;

  const handleAddDuo = () => {
    addToCart(hairOil, 1);
    addToCart(beautyCream, 1);
    setIsCartOpen(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#fbf8f3] via-white to-[#f5efe6] border border-amber-200/80 p-6 sm:p-10 lg:p-14 shadow-sm overflow-hidden">
        
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-[#7b3e1d] text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
          <span>Most Popular Value Regimen</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Bundle Details & Offer */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              The Complete Daily Ritual: <br />
              <span className="text-[#7b3e1d] italic">Herbal Hair Oil + Steroid-Free Cream</span>
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl">
              Experience the full botanical synergy. <strong>Dail Herbal Hair Oil (120ml)</strong> strengthens roots and stimulates rapid regrowth, while <strong>Dail Beauty Cream (50g)</strong> infuses Kashmiri saffron and niacinamide to clear pigmentation without thinning the skin.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700 py-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>120ml Cold-Pressed Hair Oil</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>50g Steroid-Free Beauty Cream</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#7b3e1d] shrink-0" />
                <span><strong>FREE</strong> Nationwide Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Genuine Packaging Sealed</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 flex flex-wrap items-center justify-between gap-4 max-w-lg shadow-xs">
              <div>
                <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Bundle Price</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#7b3e1d]">
                    Rs. {duoDiscountedPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-stone-400 line-through">
                    Rs. {duoOriginalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Save Rs. {savings.toLocaleString()} (Instant 15% Off)
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddDuo}
              className="py-4 px-8 rounded-2xl bg-[#7b3e1d] hover:bg-[#622f14] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add The Complete Duo to Bag • Rs. {duoDiscountedPrice.toLocaleString()}</span>
            </button>
          </div>

          {/* Right: Dual Product Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Product 1: Hair Oil */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs text-center space-y-2">
                <div className="aspect-square rounded-xl overflow-hidden bg-stone-50 p-2">
                  <img
                    src={hairOil.image}
                    alt={hairOil.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-xs font-bold text-stone-900 line-clamp-1">{hairOil.name}</span>
                <span className="text-[11px] text-[#7b3e1d] font-bold block">120ml Bottle</span>
              </div>

              {/* Product 2: Beauty Cream */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs text-center space-y-2">
                <div className="aspect-square rounded-xl overflow-hidden bg-stone-50 p-2">
                  <img
                    src={beautyCream.image}
                    alt={beautyCream.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-xs font-bold text-stone-900 line-clamp-1">{beautyCream.name}</span>
                <span className="text-[11px] text-[#7b3e1d] font-bold block">0% Steroid (50g)</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

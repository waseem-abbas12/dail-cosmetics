import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ShoppingBag, Star, Sparkles, Check, Truck, ShieldCheck, Eye } from 'lucide-react';

export const RegimenDuoSection: React.FC = () => {
  const { addToCart, setIsCartOpen, setSelectedProduct, setCurrentPage } = useStore();
  const [activeDuoView, setActiveDuoView] = useState<'combined' | 'oil' | 'cream'>('combined');

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

  const views = {
    combined: {
      title: 'Full Regimen Duo & Official Box',
      image: '/images/dail_packaging.jpg',
      badge: 'Official Export Duo',
      desc: 'Hair Oil (120ml) + Beauty Cream (50g)',
    },
    oil: {
      title: '100% Herbal Hair Oil (120ml)',
      image: '/images/dail_hair_oil.jpg',
      badge: 'Cold-Pressed Actives',
      desc: 'Stops Hair Fall & Revitalizes Follicles',
    },
    cream: {
      title: 'Dail Beauty Cream (50g)',
      image: '/images/dail_beauty_cream.jpg',
      badge: 'Strictly Without Steroid',
      desc: '5-Day Radiance & Melasma Control',
    },
  };

  const currentViewData = views[activeDuoView];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="relative rounded-2xl sm:rounded-[36px] bg-gradient-to-br from-[#fbf8f3] via-white to-[#f5efe6] border border-amber-200/90 p-4 sm:p-8 lg:p-12 shadow-sm overflow-hidden">
        
        {/* Soft Warm Radial Backdrop */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#7b3e1d] text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
          <span>Most Popular Value Regimen</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Bundle Details & Offer */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              The Complete Daily Ritual: <br />
              <span className="text-[#7b3e1d] italic">Herbal Hair Oil + Steroid-Free Cream</span>
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl">
              Experience the full botanical synergy. <strong>Dail Herbal Hair Oil (120ml)</strong> strengthens roots and stops acute shedding, while <strong>Dail Beauty Cream (50g)</strong> clears spots and evens skin tone without thinning or damaging delicate capillary barriers.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 py-1 sm:py-2">
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
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/90 flex flex-wrap items-center justify-between gap-3 max-w-lg shadow-xs">
              <div>
                <span className="text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-wider block">Special Duo Price</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#7b3e1d]">
                    Rs. {duoDiscountedPrice.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm text-stone-400 line-through">
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
              className="w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl bg-[#7b3e1d] hover:bg-[#622f14] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              <span>Add The Complete Duo to Bag • Rs. {duoDiscountedPrice.toLocaleString()}</span>
            </button>
          </div>

          {/* Right: Unique Studio Duo Showcase Stage */}
          <div className="lg:col-span-5 relative">
            
            {/* View Switcher Tabs */}
            <div className="flex items-center justify-between gap-1 p-1 bg-white/80 backdrop-blur-md rounded-xl border border-stone-200/90 mb-3 text-xs">
              <button
                onClick={() => setActiveDuoView('combined')}
                className={`flex-1 py-1 px-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all text-center cursor-pointer ${
                  activeDuoView === 'combined'
                    ? 'bg-[#7b3e1d] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Combined Duo
              </button>
              <button
                onClick={() => setActiveDuoView('oil')}
                className={`flex-1 py-1 px-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all text-center cursor-pointer ${
                  activeDuoView === 'oil'
                    ? 'bg-[#7b3e1d] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                120ml Oil
              </button>
              <button
                onClick={() => setActiveDuoView('cream')}
                className={`flex-1 py-1 px-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all text-center cursor-pointer ${
                  activeDuoView === 'cream'
                    ? 'bg-[#7b3e1d] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                50g Cream
              </button>
            </div>

            {/* Daylight Studio Showcase Stage */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#fefbf6] via-[#f7f2ea] to-[#eee5d8] border border-stone-200/90 shadow-md aspect-4/5 sm:aspect-square lg:aspect-4/5 flex flex-col justify-between p-4 sm:p-6 group">
              
              {/* Radial Spotlight Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(247,242,234,0.4)_65%,transparent_100%)] pointer-events-none" />

              {/* Top Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-bold text-[#7b3e1d] border border-stone-200 shadow-2xs">
                  {currentViewData.badge}
                </span>

                <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                  Free Express Shipping
                </span>
              </div>

              {/* Product Visual */}
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-2">
                <img
                  src={currentViewData.image}
                  alt={currentViewData.title}
                  className="max-h-[80%] max-w-[90%] object-contain drop-shadow-[0_20px_26px_rgba(123,62,29,0.2)] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="w-3/4 h-3 rounded-[50%] bg-[#7b3e1d]/14 blur-[6px] -mt-2 pointer-events-none" />
              </div>

              {/* Bottom Caption Pill */}
              <div className="relative z-10 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900">{currentViewData.title}</h4>
                  <p className="text-[10px] text-stone-500">{currentViewData.desc}</p>
                </div>

                <button
                  onClick={handleAddDuo}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-[#7b3e1d] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Buy Duo
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

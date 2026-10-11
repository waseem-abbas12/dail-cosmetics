import React, { useState } from 'react';
import { Dali3DCanvas } from './3d/Dali3DCanvas';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ShoppingBag, Phone, CheckCircle2, Star, Sparkles, ShieldCheck, Box } from 'lucide-react';

export const Studio3DSpotlight: React.FC = () => {
  const { addToCart, setCurrentPage, setSelectedProduct } = useStore();
  const [selectedProductIdx, setSelectedProductIdx] = useState<number>(0);

  const heroProducts = PRODUCTS.slice(0, 3);
  const currentProduct = heroProducts[selectedProductIdx];

  const modelTypeMap: ('oil' | 'beauty-cream' | 'hand-foot')[] = ['oil', 'beauty-cream', 'hand-foot'];

  const handleInspectFullPDP = () => {
    setSelectedProduct(currentProduct);
    setCurrentPage('product-detail');
  };

  const handleAddCurrent = () => {
    addToCart(currentProduct, 1);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Dail Cosmetics! I want to order "${currentProduct.name}" (Rs. ${currentProduct.price}, Cash on Delivery). Please confirm!`
  );

  return (
    <section id="studio-3d-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Clean Luxury Studio Container */}
      <div className="rounded-3xl sm:rounded-[36px] bg-white border border-stone-200/90 p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#7b3e1d] text-xs font-bold uppercase tracking-wider">
            <Box className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Interactive 360° Packaging Inspector</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            Examine Every <span className="text-[#7b3e1d] italic">Detail & Security Seal</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-normal">
            Drag to rotate the packaging in 3D, inspect our signature embossed lids, and verify our 100% organic, steroid-free formulations.
          </p>
        </div>

        {/* Product Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {heroProducts.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedProductIdx(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                selectedProductIdx === idx
                  ? 'bg-[#7b3e1d] text-white border-[#7b3e1d] shadow-sm scale-102'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {idx === 0 && '🧴 120ml Herbal Hair Oil'}
              {idx === 1 && '✨ Dail Beauty Cream (0% Steroid)'}
              {idx === 2 && '💛 Hand & Foot Whitening'}
            </button>
          ))}
        </div>

        {/* 3D Canvas + Spec Sheet Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive 3D Canvas Stage */}
          <div className="lg:col-span-7 h-[420px] sm:h-[480px] rounded-2xl bg-gradient-to-b from-[#fbf9f5] via-[#f4eee4] to-[#ebe3d4] border border-stone-200/80 overflow-hidden relative shadow-inner">
            <Dali3DCanvas
              key={currentProduct.id}
              initialModel={modelTypeMap[selectedProductIdx]}
              className="w-full h-full"
            />
          </div>

          {/* Right Column: Spec Sheet & Direct Buy */}
          <div className="lg:col-span-5 space-y-5">
            
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-500 mb-1.5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-stone-800">{currentProduct.rating}</span>
                <span className="text-stone-500">({currentProduct.reviewCount} verified reviews)</span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {currentProduct.name}
              </h3>
              
              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Key Benefits List */}
            <div className="space-y-2 py-3 border-y border-stone-100">
              {currentProduct.benefits.slice(0, 3).map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#7b3e1d]">
                Rs. {currentProduct.price.toLocaleString()}
              </span>
              {currentProduct.originalPrice && (
                <span className="text-base text-stone-400 line-through">
                  Rs. {currentProduct.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-[#7b3e1d]">
                {currentProduct.volume}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={handleAddCurrent}
                className="w-full py-3.5 px-6 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • Rs. {currentProduct.price.toLocaleString()}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleInspectFullPDP}
                  className="py-2.5 px-4 rounded-xl border border-stone-300 hover:border-stone-800 text-stone-800 text-xs font-bold transition-colors text-center"
                >
                  Full Specifications
                </button>

                <a
                  href={`https://wa.me/923001234567?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Trust Pill */}
            <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dermatologically tested • Free from betamethasone & mercury</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

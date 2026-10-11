import React, { useState } from 'react';
import { Dali3DCanvas } from './3d/Dali3DCanvas';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ShoppingBag, Phone, CheckCircle2, Star, Sparkles } from 'lucide-react';

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
    `Hi Dail Cosmetics! I want to order "${currentProduct.name}" (Rs. ${currentProduct.price}, COD Delivery). Please confirm!`
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Container with High-End Gold & Obsidian Framing */}
      <div className="rounded-[40px] sm:rounded-[48px] bg-gradient-to-b from-[#13151b] via-[#0d0e12] to-[#07080a] border-2 border-[#d4af37]/35 p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
        
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3e5ab] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Interactive 360° Packaging Inspector</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
            Examine Every <span className="text-gold-gradient italic">Detail & Security Seal</span>
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light">
            Rotate the packaging in 3D, inspect our signature embossed lids, and verify the 100% organic without-steroids formulation.
          </p>
        </div>

        {/* Product Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {heroProducts.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedProductIdx(idx)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                selectedProductIdx === idx
                  ? 'btn-gold-luxury border-[#f3e5ab] scale-105 shadow-xl'
                  : 'bg-black/60 text-stone-300 border-[#d4af37]/25 hover:border-[#d4af37]/60 hover:text-white'
              }`}
            >
              {idx === 0 && '🧴 120ml Herbal Hair Oil'}
              {idx === 1 && '✨ Dail Beauty Cream'}
              {idx === 2 && '💛 Hand & Foot Whitening'}
            </button>
          ))}
        </div>

        {/* 3D Canvas + Spec Sheet Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive 3D Canvas */}
          <div className="lg:col-span-7 h-[460px] sm:h-[540px] rounded-3xl bg-black/50 border border-[#d4af37]/25 overflow-hidden relative shadow-inner">
            <Dali3DCanvas
              key={currentProduct.id}
              initialModel={modelTypeMap[selectedProductIdx]}
              className="w-full h-full"
            />
          </div>

          {/* Right Column: Dynamic Spec Sheet & Direct Action */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">{currentProduct.rating}</span>
                <span className="text-stone-400">({currentProduct.reviewCount} reviews)</span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                {currentProduct.name}
              </h3>
              
              {currentProduct.urduName && (
                <p className="text-[#f3e5ab] font-serif text-base italic mt-1">
                  {currentProduct.urduName}
                </p>
              )}

              <p className="text-stone-300 text-xs sm:text-sm font-light mt-3 leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-black/60 border border-[#d4af37]/30 flex items-center justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Rs. {currentProduct.price.toLocaleString()}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-xs text-stone-500 line-through ml-2">
                    Rs. {currentProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="block text-[11px] text-[#d4af37] font-semibold mt-0.5">
                  🇵🇰 Free Nationwide Delivery Over Rs. 3,500
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-950/80 text-[#f3e5ab] text-xs font-mono border border-amber-500/30">
                {currentProduct.volume}
              </span>
            </div>

            {/* Benefit Bullets */}
            <ul className="space-y-2 text-xs text-stone-200">
              {currentProduct.benefits.slice(0, 3).map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Dual CTAs: Add to Basket + WhatsApp 1-Click Order */}
            <div className="space-y-2.5 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleAddCurrent}
                  className="flex-1 py-3.5 px-6 rounded-full btn-gold-luxury text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket (COD)</span>
                </button>

                <button
                  onClick={handleInspectFullPDP}
                  className="px-5 py-3.5 rounded-full bg-black/70 border border-[#d4af37]/40 text-stone-200 hover:text-white text-xs font-semibold transition-colors"
                >
                  Full Specs
                </button>
              </div>

              <a
                href={`https://wa.me/923001234567?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#1b4329] hover:bg-[#225735] border border-emerald-500/40 text-emerald-100 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-[#25d366]" />
                <span>Instant Order on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

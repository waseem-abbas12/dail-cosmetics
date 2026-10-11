import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ArrowRight, ShieldCheck, Star, Sparkles, CheckCircle2, ShoppingBag, MessageCircle, Eye } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, addToCart, setSelectedProduct } = useStore();
  const [selectedHeroTab, setSelectedHeroTab] = useState<number>(0);

  const heroItems = [
    {
      title: '120ml Herbal Hair Oil',
      short: 'Hair Oil',
      image: '/images/dail_hair_oil.jpg',
      product: PRODUCTS[0],
      tag: '100% Cold-Pressed Botanicals',
      tagline: 'Stops Acute Hair Fall at the Root',
      price: PRODUCTS[0].price,
      chip1: '🌿 Rosemary & Kalonji',
      chip2: '⚡ 14-Day Follicle Regrowth',
    },
    {
      title: '50g Dail Beauty Cream',
      short: 'Beauty Cream',
      image: '/images/dail_beauty_cream.jpg',
      product: PRODUCTS[1],
      tag: 'Strictly Without Steroid',
      tagline: '5-Day Cellular Glow Without Skin Thinning',
      price: PRODUCTS[1].price,
      chip1: '🛡️ 0% Betamethasone/Mercury',
      chip2: '✨ Kashmiri Saffron Actives',
    },
    {
      title: 'Complete Regimen & Box',
      short: 'Official Duo & Box',
      image: '/images/dail_packaging.jpg',
      product: PRODUCTS[0],
      tag: 'Official Export Packaging',
      tagline: 'Tamper-Proof Embossed Gold Seal',
      price: 2490,
      chip1: '🇵🇰 Export Batch Quality',
      chip2: '🎁 Free Delivery Nationwide',
    },
  ];

  const currentHero = heroItems[selectedHeroTab];

  const handleOpenCatalog = () => {
    setSelectedCategory('all');
    setCurrentPage('shop');
  };

  const scrollToStudio = () => {
    const el = document.getElementById('product-studio-spotlight');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickAdd = () => {
    if (selectedHeroTab === 2) {
      addToCart(PRODUCTS[0], 1);
      addToCart(PRODUCTS[1], 1);
    } else {
      addToCart(currentHero.product, 1);
    }
  };

  const handleInspectProduct = () => {
    setSelectedProduct(currentHero.product);
    setCurrentPage('product-detail');
  };

  return (
    <section className="relative px-3 sm:px-6 lg:px-8 py-3 sm:py-8 max-w-7xl mx-auto">
      
      {/* Editorial Luxury Container (Clean Warm Ivory & White) */}
      <div className="relative rounded-2xl sm:rounded-[36px] bg-white border border-stone-200/90 p-4 sm:p-8 lg:p-12 shadow-sm overflow-hidden">
        
        {/* Soft Ambient Warm Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f7f1e6] rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50/70 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Brand Headline & Proof */}
          <div className="lg:col-span-7 space-y-5 z-10">
            
            {/* Prestige Badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/70 text-[#7b3e1d] text-[11px] sm:text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                100% PURE HERBAL FORMULATIONS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] sm:text-xs font-bold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                STRICTLY ZERO STEROIDS
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] sm:text-xs font-semibold">
                🇵🇰 Export Quality
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-1.5">
              <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.14] text-[#1a1a1a] tracking-tight">
                Pure Herbal Radiance. <br />
                <span className="text-[#7b3e1d] italic font-serif">Zero Harmful Steroids.</span>
              </h1>
              
              {/* Urdu Emotional Brand Subtitle */}
              <p className="text-[#c59b27] font-serif text-sm sm:text-lg italic font-medium">
                « خالص جڑی بوٹیوں کا نچوڑ — بنا کسی سائیڈ ایفیکٹ اور اسٹیرائیڈ کے »
              </p>
            </div>

            {/* Description Copy */}
            <p className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl font-normal">
              Pakistan's most trusted certified organic beauty brand. Formulated with authentic 
              cold-pressed botanical oils and natural actives. Our iconic <strong>Dail 100% Organic Herbal Hair Oil (120ml)</strong> stops hair fall at the root, while our <strong>Dail Beauty Cream (5-Day Plan)</strong> restores glowing, fresh skin without mercury, bleaching, or skin thinning.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={handleOpenCatalog}
                className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all group cursor-pointer"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToStudio}
                className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#c59b27]" />
                <span>Explore Product Studio</span>
              </button>
            </div>

            {/* Live Social Proof Strip */}
            <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div>
                  <span className="font-bold text-stone-900">4.9 / 5.0</span>
                  <span className="text-stone-500 block text-[10px] sm:text-[11px]">(1,400+ Verified Reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] sm:text-xs">Cash on Delivery across Pakistan</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7b3e1d] shrink-0" />
                <span className="text-[11px] sm:text-xs">Tamper-Proof Gold Foil Seal</span>
              </div>
            </div>

          </div>

          {/* Right Column: Unique Interactive Hero Product Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Interactive Switcher Bar */}
            <div className="flex items-center justify-between gap-1 p-1 bg-stone-100/90 rounded-2xl border border-stone-200/80 mb-3 text-xs">
              {heroItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHeroTab(idx)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all text-center cursor-pointer ${
                    selectedHeroTab === idx
                      ? 'bg-white text-[#7b3e1d] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {item.short}
                </button>
              ))}
            </div>

            {/* Full-Impact Visual Stage */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#fefbf6] via-[#f7f1e6] to-[#ece1cf] border border-stone-200/90 shadow-md aspect-4/5 sm:aspect-square lg:aspect-4/5 flex flex-col justify-between p-4 sm:p-6 group">
              
              {/* Soft Ambient Radiance Behind Product */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,rgba(247,241,230,0.5)_60%,transparent_100%)] pointer-events-none" />

              {/* Top Floating Badge & Pill */}
              <div className="relative z-10 flex items-center justify-between gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-bold text-[#7b3e1d] border border-stone-200 shadow-2xs">
                  {currentHero.tag}
                </span>

                <button
                  onClick={handleInspectProduct}
                  className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-[#7b3e1d] shadow-2xs transition-colors cursor-pointer"
                  title="Inspect Details"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Central Hero Product Visual */}
              <div 
                onClick={handleInspectProduct}
                className="relative z-10 flex-1 flex flex-col items-center justify-center cursor-pointer my-2"
              >
                <img
                  src={currentHero.image}
                  alt={currentHero.title}
                  className="max-h-[75%] max-w-[88%] object-contain drop-shadow-[0_22px_28px_rgba(123,62,29,0.22)] group-hover:scale-105 transition-transform duration-500"
                />
                {/* Grounding Podium Shadow */}
                <div className="w-3/4 h-3 rounded-[50%] bg-[#7b3e1d]/14 blur-[6px] -mt-2 pointer-events-none" />
              </div>

              {/* Floating Botanical Feature Chips */}
              <div className="relative z-10 flex flex-wrap gap-1.5 mb-2 pointer-events-none">
                <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-stone-800 border border-stone-200 shadow-2xs">
                  {currentHero.chip1}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-stone-800 border border-stone-200 shadow-2xs">
                  {currentHero.chip2}
                </span>
              </div>

              {/* Bottom Quick-Action Control Bar */}
              <div className="relative z-10 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-xs flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-stone-500 font-medium block">
                    {currentHero.title}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm sm:text-base font-bold text-[#7b3e1d]">
                      Rs. {currentHero.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">
                      COD Available
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleQuickAdd}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#7b3e1d] hover:bg-[#622f14] text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

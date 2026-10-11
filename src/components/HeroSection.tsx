import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowRight, ShieldCheck, Star, Droplets, Sparkles, CheckCircle2, Box } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, setSelectedCategory } = useStore();

  const handleOpenCatalog = () => {
    setSelectedCategory('all');
    setCurrentPage('shop');
  };

  const scrollTo3D = () => {
    const el = document.getElementById('studio-3d-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-7xl mx-auto">
      
      {/* Editorial Luxury Container (Clean Warm Ivory & White) */}
      <div className="relative rounded-3xl sm:rounded-[36px] bg-white border border-stone-200/90 p-6 sm:p-10 lg:p-14 shadow-sm overflow-hidden">
        
        {/* Soft Ambient Warm Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f5efe6] rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50/60 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Brand Headline */}
          <div className="lg:col-span-7 space-y-6 z-10">
            
            {/* Prestige Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/70 text-[#7b3e1d] text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                100% PURE HERBAL FORMULATIONS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-bold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                STRICTLY ZERO STEROIDS
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
                🇵🇰 Export Quality
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-2">
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] text-[#1a1a1a] tracking-tight">
                Pure Herbal Radiance. <br />
                <span className="text-[#7b3e1d] italic font-serif">Zero Harmful Steroids.</span>
              </h1>
              
              {/* Urdu Emotional Brand Subtitle */}
              <p className="text-[#c59b27] font-serif text-base sm:text-lg italic font-medium">
                « خالص جڑی بوٹیوں کا نچوڑ — بنا کسی سائیڈ ایفیکٹ اور اسٹیرائیڈ کے »
              </p>
            </div>

            {/* Description Copy */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Pakistan's most trusted certified organic beauty brand. Formulated with authentic 
              cold-pressed botanical oils and natural actives. Our iconic <strong>Dail 100% Organic Herbal Hair Oil (120ml)</strong> stops hair fall at the root, while our <strong>Dail Beauty Cream (5-Day Plan)</strong> and <strong>Hand & Foot Whitening Cream</strong> restore radiant, flawless skin without mercury, bleaching, or skin thinning.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleOpenCatalog}
                className="px-7 py-3.5 rounded-full bg-[#7b3e1d] hover:bg-[#622f14] text-white text-sm font-bold flex items-center gap-2 shadow-sm transition-all group"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollTo3D}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-sm font-semibold flex items-center gap-2 transition-all"
              >
                <Box className="w-4 h-4 text-[#c59b27]" />
                <span>Interactive 3D Studio</span>
              </button>
            </div>

            {/* Live Social Proof Strip */}
            <div className="pt-6 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div>
                  <span className="font-bold text-stone-900">4.9 / 5.0</span>
                  <span className="text-stone-500 block text-[11px]">(1,400+ Verified Reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cash on Delivery across Pakistan</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7b3e1d] shrink-0" />
                <span>Tamper-Proof Gold Foil Seal</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-End Packaging Visual Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Clean Editorial Card */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-lg aspect-4/5 sm:aspect-square lg:aspect-4/5 group">
              <img
                src="/images/dail_packaging.jpg"
                alt="Official Dail Cosmetics Herbal Hair Oil and Beauty Cream Packaging"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />

              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

              {/* Floating Quality Callout 1 (Hair Oil) */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs border border-stone-200/80 rounded-2xl p-2.5 shadow-sm text-stone-800 text-xs flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-[#7b3e1d] flex items-center justify-center font-bold text-xs">
                  🌿
                </div>
                <div>
                  <span className="font-bold block text-[11px] text-stone-900">100% Herbal Hair Oil</span>
                  <span className="text-[10px] text-stone-500">120ml Cold-Pressed Formula</span>
                </div>
              </div>

              {/* Floating Quality Callout 2 (Beauty Cream) */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs border border-stone-200/80 rounded-2xl p-3 shadow-md text-stone-800 text-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#7b3e1d]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dail Beauty Cream (Without Steroid)</span>
                  </div>
                  <span className="text-[11px] text-stone-500">
                    5-Day Beauty Plan • Export Quality Sealed
                  </span>
                </div>
                <button
                  onClick={handleOpenCatalog}
                  className="px-3 py-1.5 bg-[#7b3e1d] text-white rounded-lg font-bold text-xs hover:bg-[#622f14] transition-colors"
                >
                  Buy Now
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

import React from 'react';
import { useStore } from '../store/useStore';
import { Dali3DCanvas } from './3d/Dali3DCanvas';
import { ArrowRight, ShieldCheck, Star, Droplets } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, setSelectedCategory } = useStore();

  const handleOpenCatalog = () => {
    setSelectedCategory('all');
    setCurrentPage('shop');
  };

  return (
    <section className="relative px-3 sm:px-6 lg:px-12 py-6 sm:py-10 max-w-[1400px] mx-auto overflow-hidden">
      
      {/* Background Ambient Botanical Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-700/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-[#6aa84f]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Dribbble-Style Luxury Framed Container */}
      <div className="relative rounded-[36px] sm:rounded-[48px] bg-gradient-to-b from-[#0e3120] to-[#071c13] border border-emerald-500/25 p-6 sm:p-10 lg:p-14 shadow-2xl shadow-emerald-950/80 overflow-hidden">
        
        {/* Subtle Decorative Foliage Overlay in Corner */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* ---------------- TOP HALF: HERO SHOWCASE ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 z-10 space-y-6">
            
            {/* Export Quality & Without Steroid Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#133e28]/90 border border-emerald-400/40 text-[#a4e38b] text-[11px] font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#78c459] animate-pulse" />
                <span>EXPORT QUALITY</span>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-[11px] font-bold tracking-wider uppercase">
                <span>🛡️ WITHOUT STEROID</span>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
                <span>100% ORGANIC</span>
              </div>
            </div>

            {/* Editorial Serif Giant Heading */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.06] text-white tracking-tight">
              Dail <br />
              <span className="text-[#a4e38b] italic font-normal">Cosmetics</span>
            </h1>

            {/* Urdu Subtitle Badge */}
            <p className="text-emerald-300/90 text-base sm:text-lg font-serif italic">
              «100٪ آرگینک ہربل ہیئر آئل اور بغیر اسٹیرائیڈ بیوٹی کریم»
            </p>

            {/* Description Copy tailored to real packaging */}
            <p className="text-emerald-100/75 text-sm sm:text-base leading-relaxed max-w-lg font-light">
              Pakistan's trusted export quality formulations. <strong>100% Organic Herbal Hair Oil (120ml)</strong> for instant hair fall control, plus our iconic <strong>Dail Beauty Cream (5-Day Plan)</strong> and <strong>Hand & Foot Whitening Cream</strong> — strictly without steroids, mercury, or harmful bleaches.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleOpenCatalog}
                className="px-7 py-3.5 rounded-full bg-[#6aa84f] hover:bg-[#7bc05d] text-white text-sm font-semibold tracking-wide shadow-lg shadow-emerald-900/50 hover:shadow-emerald-700/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group"
              >
                <span>Shop Dail Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentPage('about')}
                className="px-5 py-3 rounded-full text-emerald-200 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5 hover:underline decoration-emerald-400 underline-offset-4"
              >
                <span>Why Without Steroids?</span>
                <span className="text-xs">→</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-emerald-500/20 text-xs text-emerald-200/90">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#78c459] shrink-0" />
                <span>Zero Steroids / Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#78c459] shrink-0" />
                <span>120ml Cold-Pressed</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400" />
                <span>4.9★ (Export Quality)</span>
              </div>
            </div>

          </div>

          {/* Right Hero: Interactive 3D Canvas Centerpiece */}
          <div className="lg:col-span-6 relative w-full h-[450px] sm:h-[520px] lg:h-[580px] flex items-center justify-center">
            
            {/* Radial glow backdrop */}
            <div className="absolute inset-0 bg-radial from-emerald-600/20 via-transparent to-transparent pointer-events-none rounded-3xl" />
            
            {/* The 3D Scene */}
            <Dali3DCanvas className="w-full h-full rounded-2xl" />

          </div>

        </div>

        {/* ---------------- BOTTOM HALF: ACTUAL PACKING SHOWCASE CARD ---------------- */}
        <div className="mt-12 sm:mt-16 rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#14422b] to-[#0f3422] border border-emerald-400/20 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400 block">
              Official Pakistani Packaging
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white leading-tight">
              Pure <span className="italic text-[#a4e38b]">Export Quality</span> Formulations
            </h2>

            <p className="text-emerald-100/75 text-sm sm:text-base leading-relaxed">
              Every Dail Cosmetics package is factory-sealed with the signature embossed round tin lid and hologram guarantee. Engineered specifically for South Asian hair & skin to deliver visible results without damaging your skin barrier.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('bundles');
                  setCurrentPage('shop');
                }}
                className="text-xs uppercase tracking-wider font-semibold text-[#78c459] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Get the Complete 3-in-1 Regimen Box (Save Rs. 1,001)</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Highlights & Actual Product Images */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-3">
            
            <div 
              onClick={() => { setSelectedCategory('hair-oil'); setCurrentPage('shop'); }}
              className="group cursor-pointer rounded-2xl bg-emerald-950/70 border border-emerald-500/20 p-2.5 text-center transition-all hover:border-[#78c459]"
            >
              <div className="w-full h-32 rounded-xl overflow-hidden bg-black/40 mb-2">
                <img 
                  src="/images/dail_hair_oil.jpg" 
                  alt="Dail Herbal Hair Oil" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <strong className="text-white text-xs block truncate">Hair Oil 120ml</strong>
              <span className="text-[10px] text-[#a4e38b] font-bold block mt-0.5">Rs. 1,850</span>
            </div>

            <div 
              onClick={() => { setSelectedCategory('cream'); setCurrentPage('shop'); }}
              className="group cursor-pointer rounded-2xl bg-emerald-950/70 border border-emerald-500/20 p-2.5 text-center transition-all hover:border-[#78c459]"
            >
              <div className="w-full h-32 rounded-xl overflow-hidden bg-black/40 mb-2">
                <img 
                  src="/images/dail_beauty_cream.jpg" 
                  alt="Dail Beauty Cream" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <strong className="text-white text-xs block truncate">Beauty Cream</strong>
              <span className="text-[10px] text-[#a4e38b] font-bold block mt-0.5">Rs. 1,450</span>
            </div>

            <div 
              onClick={() => { setSelectedCategory('cream'); setCurrentPage('shop'); }}
              className="group cursor-pointer rounded-2xl bg-emerald-950/70 border border-emerald-500/20 p-2.5 text-center transition-all hover:border-[#78c459]"
            >
              <div className="w-full h-32 rounded-xl overflow-hidden bg-black/40 mb-2">
                <img 
                  src="/images/dail_hand_foot.jpg" 
                  alt="Dail Hand & Foot Cream" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <strong className="text-white text-xs block truncate">Hand & Foot</strong>
              <span className="text-[10px] text-[#a4e38b] font-bold block mt-0.5">Rs. 1,350</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

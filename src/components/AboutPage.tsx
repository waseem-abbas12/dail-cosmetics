import React from 'react';
import { useStore } from '../store/useStore';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Hero Banner with Official Logo */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="w-20 h-20 rounded-full mx-auto p-1 bg-white border-2 border-amber-400 shadow-xl overflow-hidden mb-2">
          <img 
            src="/images/dail_logo.png" 
            alt="Dail Cosmetics" 
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#78c459]">
          Export Quality • Made In Pakistan
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white leading-tight">
          The <span className="italic text-[#a4e38b]">Dail Cosmetics</span> Philosophy
        </h1>
        <p className="text-emerald-200/80 text-sm sm:text-base font-light leading-relaxed">
          At Dail Cosmetics, we took a strict pledge: to protect Pakistani skin and hair from the dangerous steroids, mercury, and chemical bleaches that plague the commercial market. Every formulation is 100% organic, export quality, and tested for lasting natural results.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-8 rounded-[32px] bg-gradient-to-b from-[#0f3422] to-[#071d13] border border-emerald-500/25 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-950/80 flex items-center justify-center text-2xl border border-rose-500/40">
            🛡️
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-white">Strictly Without Steroid</h3>
          <p className="text-emerald-200/70 text-xs sm:text-sm leading-relaxed">
            Most beauty creams in Pakistan damage capillaries and cause steroid addiction. Dail Beauty Cream and Hand & Foot Cream are 100% steroid-free, safely promoting natural cellular illumination and barrier repair.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-gradient-to-b from-[#0f3422] to-[#071d13] border border-emerald-500/25 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#1d5534] flex items-center justify-center text-2xl border border-emerald-400/30">
            🧴
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-white">100% Organic Herbal Hair Oil</h3>
          <p className="text-emerald-200/70 text-xs sm:text-sm leading-relaxed">
            Our 120ml signature hair oil is cold-infused with pure mountain Rosemary, Amla, Kalonji (Black Seed), and Bhringraj. Stops hair fall, thickens roots, and stimulates new baby hair growth naturally.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-gradient-to-b from-[#0f3422] to-[#071d13] border border-emerald-500/25 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-950/80 flex items-center justify-center text-2xl border border-amber-500/40">
            ⭐
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-white">Export Quality Standards</h3>
          <p className="text-emerald-200/70 text-xs sm:text-sm leading-relaxed">
            From the embossed gold tin lids to strict hygiene seals, every piece is manufactured to international export grade standards, making Dail Cosmetics a proud Pakistani benchmark brand.
          </p>
        </div>

      </div>

      {/* Official Factory Packaging Banner */}
      <div className="rounded-[40px] bg-gradient-to-r from-[#103823] to-[#082216] border border-emerald-400/25 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#78c459] font-bold">
            Factory Sealed Quality
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Tested for Pakistani Water & Climate Conditions
          </h2>
          <p className="text-emerald-200/80 text-sm leading-relaxed">
            Whether it’s hard tap water in Karachi, smog and humidity in Lahore, or dry winter winds in Islamabad, Dail Cosmetics formulations are engineered to protect your hair follicles and skin barrier year-round.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-emerald-200">
            <span className="flex items-center gap-1 text-[#a4e38b]">✓ 100% Halal & Cruelty Free</span>
            <span className="flex items-center gap-1 text-[#a4e38b]">✓ Export Quality Certification</span>
            <span className="flex items-center gap-1 text-[#a4e38b]">✓ Cash On Delivery Nationwide</span>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-4 rounded-full bg-[#6aa84f] hover:bg-[#7bc05d] text-white text-sm font-bold tracking-wide shadow-xl shadow-emerald-950/80 transition-all hover:scale-105 active:scale-95"
          >
            Shop Official Dail Products →
          </button>
        </div>
      </div>

    </div>
  );
};

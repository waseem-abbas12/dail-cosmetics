import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const SplitPromoBanners: React.FC = () => {
  const { setSelectedCategory, setCurrentPage } = useStore();

  const handleSkincare = () => {
    setSelectedCategory('cream');
    setCurrentPage('shop');
  };

  const handleHaircare = () => {
    setSelectedCategory('hair-care');
    setCurrentPage('shop');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Banner 1: Skincare Routine */}
        <div 
          onClick={handleSkincare}
          className="relative min-h-[320px] sm:min-h-[380px] rounded-xs overflow-hidden group cursor-pointer border border-[#e8e8e1] shadow-2xs hover:shadow-lg transition-all"
        >
          {/* Background Image */}
          <img 
            src="/images/dail_beauty_cream.jpg" 
            alt="Dail Skincare Routine"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Banner Content */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-heading font-extrabold tracking-[0.2em] uppercase text-[#c59b27] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              STRICTLY ZERO STEROIDS
            </span>
            <h3 className="font-heading text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2 leading-tight">
              Natural Glow Routine
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm font-normal max-w-sm mb-4 line-clamp-2">
              5-Day beauty plan formulated with saffron and botanicals to brighten and smooth skin without thinning.
            </p>
            <div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSkincare();
                }}
                className="btn-gp-primary px-5 py-2.5 sm:px-6 sm:py-3 text-[11px] sm:text-xs font-extrabold tracking-[0.16em] inline-flex items-center gap-2 group-hover:bg-[#b83a32] shadow-md cursor-pointer"
              >
                <span>SHOP SKINCARE</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Banner 2: Hair Care Range */}
        <div 
          onClick={handleHaircare}
          className="relative min-h-[320px] sm:min-h-[380px] rounded-xs overflow-hidden group cursor-pointer border border-[#e8e8e1] shadow-2xs hover:shadow-lg transition-all"
        >
          {/* Background Image */}
          <img 
            src="/images/dail_hair_oil.jpg" 
            alt="Dail Hair Care Range"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Banner Content */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-heading font-extrabold tracking-[0.2em] uppercase text-emerald-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% PURE ORGANIC FORMULATION
            </span>
            <h3 className="font-heading text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2 leading-tight">
              Herbal Hair Fall Defense
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm font-normal max-w-sm mb-4 line-clamp-2">
              Cold-pressed rosemary bio-actives, mountain amla & kalonji to stop shedding and spur 14-day follicle regrowth.
            </p>
            <div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleHaircare();
                }}
                className="btn-gp-primary px-5 py-2.5 sm:px-6 sm:py-3 text-[11px] sm:text-xs font-extrabold tracking-[0.16em] inline-flex items-center gap-2 group-hover:bg-[#b83a32] shadow-md cursor-pointer"
              >
                <span>SHOP HAIR CARE</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

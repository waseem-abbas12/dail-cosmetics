import React from 'react';
import { ShieldAlert, ShieldCheck, XCircle, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export const SteroidComparisonSection: React.FC = () => {
  const { setCurrentPage } = useStore();

  const cheapMarketFlaws = [
    'Packed with cheap Corticosteroids (Clobetasol) & toxic Mercury',
    'Temporarily bleaches skin but thins the epidermal barrier',
    'Causes extreme redness, burning in sunlight, and visible green veins',
    'Severe rebound acne and black patches once you stop using it',
    'Hair oils diluted with 80% industrial mineral oil & synthetic fragrance',
  ];

  const dailStandards = [
    'Strictly 100% WITHOUT STEROID — Certified clean herbal alchemy',
    'Nourishes and thickens the skin barrier with Kashmiri Saffron & Niacinamide',
    'Safe for lifelong use — no sun redness, no burning, no facial hair growth',
    'Permanent healthy lit radiance and cellular moisture retention',
    '120ml Pure Cold-Pressed Rosemary, Kalonji & Amla with zero mineral oils',
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-widest">
          <span>⚠️ The Pakistani Cosmetics Reality</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
          Why "Without Steroids" is <br className="hidden sm:block" />
          <span className="text-gold-gradient italic">A Non-Negotiable Promise</span>
        </h2>
        <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
          Over 90% of local beauty creams sold in Pakistan secretly destroy skin with dangerous steroids. Here is why Dail Cosmetics refuses shortcuts and formulates only export-quality organic healing.
        </p>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Card: Cheap Market Creams (Red / Negative) */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-b from-[#1a0e10] to-[#0d0708] border border-rose-500/25 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 pb-4 border-b border-rose-500/20">
            <div className="w-12 h-12 rounded-2xl bg-rose-950 flex items-center justify-center text-rose-400 shrink-0 border border-rose-500/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Ordinary Commercial Creams</h3>
              <span className="text-xs text-rose-400 font-semibold uppercase tracking-wider">Dangerous Steroids & Chemical Bleach</span>
            </div>
          </div>

          <ul className="space-y-4 text-xs sm:text-sm text-stone-300">
            {cheapMarketFlaws.map((flaw, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{flaw}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/20 text-xs text-rose-300 font-medium">
            Result: Short-term artificial bleach followed by permanent skin damage & dependency.
          </div>
        </div>

        {/* Right Card: Dail Cosmetics (Gold / Positive / Hero) */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-b from-[#181a17] via-[#101210] to-[#07080a] border-2 border-[#d4af37]/60 space-y-6 shadow-2xl shadow-amber-950/30 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black text-[11px] font-black uppercase tracking-wider shadow-md">
            The Dail Standard
          </div>

          <div className="flex items-center gap-3 pb-4 border-b border-[#d4af37]/20">
            <div className="w-12 h-12 rounded-2xl bg-black/60 flex items-center justify-center text-[#d4af37] shrink-0 border border-[#d4af37]/40 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Dail Cosmetics Pakistan</h3>
              <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">100% Organic • Without Steroid • Export Quality</span>
            </div>
          </div>

          <ul className="space-y-4 text-xs sm:text-sm text-stone-200">
            {dailStandards.map((std, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="font-medium">{std}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 p-3.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs text-[#f3e5ab] font-medium flex items-center justify-between">
            <span>Result: Deep cellular health, natural glow, and 100% peace of mind.</span>
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-3 py-1 rounded-full bg-[#d4af37] text-black font-bold text-[10px] shrink-0 hover:bg-[#fae29f] transition-colors"
            >
              Shop Safe Now
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};

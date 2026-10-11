import React from 'react';
import { ShieldAlert, ShieldCheck, XCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export const SteroidComparisonSection: React.FC = () => {
  const { setCurrentPage } = useStore();

  const cheapMarketFlaws = [
    'Formulated with cheap Corticosteroids (Clobetasol) & toxic Mercury',
    'Temporarily bleaches melanin but irreversibly thins the epidermal skin layer',
    'Causes extreme heat sensation, sun sensitivity, and visible spider veins',
    'Severe rebound black patches and cystic acne once usage is stopped',
    'Hair oils diluted with 80% industrial mineral oil & synthetic chemical perfumes',
  ];

  const dailStandards = [
    'Strictly 100% WITHOUT STEROID — Certified clean herbal active ingredients',
    'Nourishes and restores the natural barrier with Kashmiri Saffron & Niacinamide',
    'Safe for lifelong use — no sun redness, zero peeling, zero abnormal hair growth',
    'Permanent, natural, luminous radiance and cellular moisture retention',
    '120ml Pure Cold-Pressed Rosemary, Kalonji & Amla with zero mineral filler oils',
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>The Pakistani Cosmetics Reality</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          Why "Without Steroids" is <br className="hidden sm:block" />
          <span className="text-[#7b3e1d] italic">A Non-Negotiable Medical Promise</span>
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed">
          Over 90% of local formula creams sold in Pakistan secretly destroy skin with dangerous steroids. Here is why Dail Cosmetics refuses shortcuts and formulates only export-quality organic healing.
        </p>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Left Card: Ordinary Commercial Creams (Negative) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-rose-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0 border border-rose-200">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-stone-900">
                Ordinary Commercial Formula Creams
              </h3>
              <span className="text-xs text-rose-600 font-semibold uppercase tracking-wider">
                Dangerous Steroids & Chemical Bleach
              </span>
            </div>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
            {cheapMarketFlaws.map((flaw, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{flaw}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 text-xs text-rose-700 bg-rose-50/80 p-3 rounded-xl border border-rose-200">
            ⚠️ <strong>Clinical Risk:</strong> Steroid-induced rosacea, skin atrophy, and permanent discoloration upon discontinuation.
          </div>
        </div>

        {/* Right Card: Official Dail Cosmetics (Positive Clean Luxury) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-300 shadow-sm space-y-5 relative">
          
          <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Official Dail Standard
          </div>

          <div className="flex items-center gap-3 pb-4 border-b border-emerald-100">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-stone-900">
                Dail Cosmetics Organic Formulations
              </h3>
              <span className="text-xs text-emerald-700 font-semibold uppercase tracking-wider">
                Strictly 0% Steroids • 100% Herbal Actives
              </span>
            </div>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
            {dailStandards.map((std, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{std}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
            <span>🛡️ <strong>Certified Pure:</strong> 5-Day beauty plan formulated for authentic skin barrier restoration.</span>
          </div>

        </div>

      </div>

    </section>
  );
};
